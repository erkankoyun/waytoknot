#!/usr/bin/env python3
"""Weekly bounded website rechecks. A transient failure never demotes an approved listing."""
import argparse
import hashlib
import json
import sqlite3
from pathlib import Path
from pipeline import ROOT, TODAY, database, ingest, crawl, review, key

def refresh(db, limit):
    # Oldest first: rotate checks so a large directory is covered over several weeks.
    rows = db.execute(
        "SELECT key,payload FROM queue WHERE status='approved' ORDER BY COALESCE(json_extract(payload,'$.lastRefreshAttempt'),'') ASC,key LIMIT ?",
        (limit,)
    ).fetchall()
    counts = {'checked': 0, 'changed': 0, 'unchanged': 0, 'failed': 0}
    seen_hosts = set()
    from urllib.parse import urlsplit
    for entry_key, raw in rows:
        value = json.loads(raw)
        hostname = urlsplit(value['url']).hostname
        if hostname in seen_hosts:
            continue
        seen_hosts.add(hostname)
        before = {k: value.get(k) for k in ('name','url','category','city','state')}
        previous_site = value.get('verificationUrl')
        status,reason,checked = review(dict(value))
        value['lastRefreshAttempt'] = TODAY()
        counts['checked'] += 1
        if status == 'approved':
            # Verification confirms website accessibility, not wedding service availability.
            current_site = checked.get('verificationUrl')
            difference = previous_site is not None and previous_site != current_site
            # A first successful refresh updates the timestamp; metadata change detection is conservative.
            if difference or any(before[k] != checked.get(k) for k in before):
                counts['changed'] += 1
            else:
                counts['unchanged'] += 1
            checked['lastRefreshAttempt'] = TODAY()
            value = checked
        else:
            counts['failed'] += 1
            value['lastRefreshIssue'] = reason
            # Keep the last good review instead of promoting a transient failure to deletion.
        db.execute('UPDATE queue SET payload=?,reason=?,updated_at=? WHERE key=?',
                   (json.dumps(value,ensure_ascii=False),reason,TODAY(),entry_key))
        db.commit()
    return counts

def main():
    p = argparse.ArgumentParser()
    p.add_argument('--db',type=Path,default=ROOT/'.catalog-work/queue.sqlite')
    p.add_argument('--limit',type=int,default=250)
    p.add_argument('--new-limit',type=int,default=100)
    args=p.parse_args()
    db=database(args.db)
    # Only bootstrap a new checkpoint. Candidate rows are NOT presumed verified.
    if db.execute('SELECT count(*) FROM queue').fetchone()[0] == 0:
        seed=ROOT/'data/2026-10-19-category-expansion.jsonl'
        if seed.exists():
            ingest(db,str(seed))
    changes=refresh(db,max(0,min(args.limit,1000)))
    if args.new_limit:
        crawl(db,max(1,min(args.new_limit,500)),4)
    print(json.dumps({'week':TODAY(),'refresh':changes}))
if __name__=='__main__':
    main()
