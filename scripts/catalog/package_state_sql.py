#!/usr/bin/env python3
"""Build resumable 1000-record Pennsylvania D1 SQL batches from the saved queue.
Never connects to the database. Keeps existing rows intact (ON CONFLICT DO NOTHING).
"""
import argparse, importlib.util, json, pathlib, sqlite3, hashlib

ROOT=pathlib.Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location("d1prep",ROOT/"scripts/catalog/prepare_d1_import.py")
mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--db",type=pathlib.Path,required=True)
    p.add_argument("--out-dir",type=pathlib.Path,required=True)
    p.add_argument("--expected",type=int,default=37402)
    p.add_argument("--batch-size",type=int,default=1000)
    a=p.parse_args()
    if not (1<=a.batch_size<=1000):raise SystemExit("Batch size must be between 1 and 1000")
    db=sqlite3.connect(a.db)
    rows=db.execute("SELECT payload FROM queue ORDER BY key").fetchall()
    if len(rows)!=a.expected:raise SystemExit(f"Unexpected PA record count {len(rows)} (expected {a.expected}); stopped")
    a.out_dir.mkdir(parents=True,exist_ok=True)
    seen_ids=set()
    counts={}
    sql=[]
    for (raw,) in rows:
        r=json.loads(raw)
        if r.get('state','').upper()!='PA':raise SystemExit(f"Unexpected state on {r.get('id')}")
        if r['id'] in seen_ids:raise SystemExit(f"Repeated ID {r['id']}")
        seen_ids.add(r['id'])
        # Candidates are unverified: never promote to reviewed automatically.
        r.pop('verification',None)
        r.pop('verificationUrl',None)
        r['checkedAt']=''
        r['publishUnverified']=True
        sql.append(mod.sql_record(r))
        counts[r['category']]=counts.get(r['category'],0)+1
    paths=[]
    for i in range(0,len(sql),a.batch_size):
        path=a.out_dir/f"PA-{i//a.batch_size+1:04d}.sql"
        path.write_text("\n".join(sql[i:i+a.batch_size])+"\n",encoding="utf-8")
        paths.append(path.name)
    (a.out_dir/"manifest.json").write_text(json.dumps({"state":"PA","source_candidates":len(rows),"records_per_file":a.batch_size,"total_files":len(paths),"files":paths,"categories":counts,"status":"listed / unverified","dedupe":"ON CONFLICT DO NOTHING","note":"Generated SQL only. No database changed."},indent=2),encoding="utf-8")
    cmd=[
        "@echo off","setlocal EnableExtensions","cd /d \"%~dp0\"",
        "echo Pennsylvania 1000-record import into waytoknot-staging.",
        "echo Already-completed SQL files are skipped on rerun.",
        'if not exist ".completed" mkdir ".completed"',
    ]
    for f in paths:
        cmd += [
            f'if exist ".completed\\{f}.ok" goto skip_{f[:-4]}',
            f'echo Importing {f} ...',
            f'call npx wrangler d1 execute waytoknot-staging --remote --file="{f}"',
            'if errorlevel 1 (',
            f'  echo FAILED on {f}. Resume by running IMPORT-PA.cmd again.',
            '  exit /b 1',
            ')',
            f'echo OK > ".completed\\{f}.ok"',
            f':skip_{f[:-4]}'
        ]
    cmd += ['echo Pennsylvania import batches finished.','echo Validate counts in Cloudflare D1 before assuming all 37402 were added.','pause']
    (a.out_dir/"IMPORT-PA.cmd").write_text("\r\n".join(cmd)+"\r\n",encoding="utf-8")
    print(json.dumps({"records":len(sql),"batch_size":a.batch_size,"batches":len(paths),"categories":len(counts),"output":str(a.out_dir)}))
if __name__=="__main__":main()
