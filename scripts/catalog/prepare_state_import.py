#!/usr/bin/env python3
"""Audit a state queue and package conflict-safe D1 SQL, without database access."""
import argparse
import collections
import datetime
import hashlib
import json
from pathlib import Path
import sqlite3
import urllib.parse

from pipeline import CATEGORIES
from prepare_d1_import import normalize, quote, sql_record

STATES = {'VT': 'Vermont', 'ME': 'Maine', 'NH': 'New Hampshire'}


def prepare(db_path, state, out, batch_size=250):
    if state not in STATES or not 1 <= batch_size <= 250:
        raise ValueError('Use VT, ME or NH and batches of 1–250 records')
    with sqlite3.connect(f'file:{db_path.resolve()}?mode=ro', uri=True) as db:
        queue = db.execute('SELECT payload,status FROM queue ORDER BY key').fetchall()
    if not queue:
        raise ValueError('Empty discovery queue; refusing to create a misleading import')
    counts = collections.Counter()
    statuses = collections.Counter()
    seen_ids = set()
    sql = []
    records = []
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    for payload, status in queue:
        record = json.loads(payload)
        if record.get('state') != state or record.get('country', 'US') != 'US':
            raise ValueError(f'Unexpected state or country: {record.get("id")}')
        if record['category'] not in CATEGORIES or record['id'] in seen_ids:
            raise ValueError('Unknown category or repeated source ID')
        website = urllib.parse.urlsplit(record['url'])
        if not website.hostname or website.username or website.password:
            raise ValueError('Invalid business URL')
        seen_ids.add(record['id'])
        if status != 'approved':
            record.pop('verification', None)
            record.pop('verificationUrl', None)
            record['checkedAt'] = ''
            record['publishUnverified'] = True
        elif record.get('verification') not in ('manual', 'website-fetched'):
            raise ValueError('Approved record lacks provenance')
        # All uniqueness conflicts preserve existing data, including approved rows.
        statement = sql_record(record).replace('ON CONFLICT(dedupe_key)', 'ON CONFLICT')
        statement = statement.replace(quote('2026-10-20T00:00:00Z'), quote(now))
        sql.append(statement)
        city_values = [normalize(record['city']), record['city'], state,
                       str(record['coords'][0]), str(record['coords'][1])]
        sql.append('INSERT INTO directory_cities(key,name,state,latitude,longitude) VALUES('
                   + ','.join(quote(v) for v in city_values)
                   + ') ON CONFLICT DO NOTHING;')
        counts[record['category']] += 1
        statuses[status] += 1
        records.append(record)
    # Validate SQL, FTS triggers and repeat-import behavior before writing a package.
    schema = Path(__file__).resolve().parents[1] / 'cloudflare-staging-schema.sql'
    with sqlite3.connect(':memory:') as check:
        check.executescript(schema.read_text())
        for statement in sql:
            check.execute(statement)
        for statement in sql:
            check.execute(statement)
        if check.execute('SELECT count(*) FROM directory_records').fetchone()[0] != len(records):
            raise ValueError('SQL validation/deduplication failed')
        check.execute("INSERT INTO directory_fts(directory_fts) VALUES('integrity-check')")
    out.mkdir(parents=True, exist_ok=True)
    files = []
    for i in range(0, len(records), batch_size):
        name = f'{state}-{i // batch_size + 1:04d}.sql'
        content = '\n'.join(sql[2*i:2*(i+batch_size)]) + '\n'
        (out / name).write_text(content, encoding='utf-8')
        files.append({'name': name, 'records': min(batch_size, len(records)-i),
                      'sha256': hashlib.sha256(content.encode()).hexdigest()})
    report = {
        'state': state, 'state_name': STATES[state], 'source': 'Overture Maps',
        'generated_at': now, 'unique_candidates': len(records),
        'categories_requested': len(CATEGORIES), 'categories_with_candidates': len(counts),
        'by_category': {key: {'label': definition['label'], 'candidates': counts[key]}
                        for key, definition in CATEGORIES.items()},
        'missing_categories': [key for key in CATEGORIES if not counts[key]],
        'website_review_status': dict(statuses), 'batch_size': batch_size,
        'files': files, 'live_imported': False,
        'notice': 'Source discovery is not a census. Unreviewed websites remain explicitly unverified. '
                  'No live database was changed by packaging. Existing rows are preserved.'
    }
    (out / 'coverage.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    (out / 'records.jsonl').write_text(''.join(json.dumps(r, ensure_ascii=False)+'\n' for r in records), encoding='utf-8')
    config = {'name': 'waytoknot-catalog-import', 'compatibility_date': now[:10],
              'd1_databases': [{'binding': 'DB', 'database_name': 'waytoknot-staging',
                                'database_id': '8263ffde-ce86-45c9-9fe2-e0221e2d3cdc'}]}
    (out / 'wrangler.jsonc').write_text(json.dumps(config, indent=2)+'\n', encoding='utf-8')
    command = ['@echo off', 'setlocal EnableExtensions', 'cd /d "%~dp0"',
               f'echo Importing {STATES[state]} into waytoknot-staging.',
               'if not exist ".completed" mkdir ".completed"']
    for file in files:
        name = file['name']
        label = name[:-4]
        command += [f'if exist ".completed\\{name}.ok" goto skip_{label}',
                    f'call npx wrangler d1 execute waytoknot-staging --config wrangler.jsonc --remote --yes --file="{name}"',
                    'if errorlevel 1 exit /b 1', f'echo OK > ".completed\\{name}.ok"',
                    f':skip_{label}']
    command += [f'call npx wrangler d1 execute waytoknot-staging --config wrangler.jsonc --remote --command="SELECT state,status,COUNT(*) AS n FROM directory_records WHERE state=\'{state}\' GROUP BY state,status;"',
                'if errorlevel 1 exit /b 1', 'pause']
    (out / f'IMPORT-{state}.cmd').write_bytes(('\r\n'.join(command)+'\r\n').encode())
    print(json.dumps({k: report[k] for k in ['state', 'unique_candidates', 'categories_requested',
                                            'categories_with_candidates', 'missing_categories', 'live_imported']}))
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--db', type=Path, required=True)
    parser.add_argument('--state', choices=STATES, required=True)
    parser.add_argument('--out-dir', type=Path, required=True)
    parser.add_argument('--batch-size', type=int, default=250)
    args = parser.parse_args()
    prepare(args.db, args.state, args.out_dir, args.batch_size)
