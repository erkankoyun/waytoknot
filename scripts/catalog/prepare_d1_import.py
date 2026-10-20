#!/usr/bin/env python3
"""Prepare D1 staging import from a verified complete original export.

Usage:
 python scripts/catalog/prepare_d1_import.py --original /secure/path/original-export.jsonl --out-dir .catalog-work/d1-import

Does not connect to D1 or change production. Requires full original 969-row export.
Output is staged SQL only. Review before applying to waytoknot-staging.
"""
import argparse, json, pathlib, hashlib, urllib.parse, re

ROOT=pathlib.Path(__file__).resolve().parents[2]
EXPANSION=ROOT/"scripts/catalog/data/2026-10-19-category-expansion.jsonl"
EXPECTED_ORIGINAL=969
EXPECTED_EXPANSION=880
EXPECTED_TOTAL=1849

def records(path):
    with open(path,encoding="utf-8") as f:
        for n,line in enumerate(f,1):
            if line.strip():
                obj=json.loads(line)
                if not isinstance(obj,dict): raise ValueError(f"{path}:{n} must be JSON object")
                yield obj

def key(r):
    # Preserve branch identity; exact ID is favored, domain/name/location are supplementary.
    return str(r["id"])

def normalize(s):
    return re.sub(r"\s+"," ",re.sub(r"[^a-z0-9 ]"," ",str(s).lower())).strip()

def quote(s): return "'"+str(s).replace("'","''")+"'"

def sql_record(r):
    required=["id","name","category","city","state","url","source","description","keywords","coords"]
    missing=[x for x in required if x not in r]
    if missing:raise ValueError(f"Missing {missing}: {r.get('id')}")
    if not isinstance(r["coords"],list) or len(r["coords"])!=2:raise ValueError("Invalid coords")
    if urllib.parse.urlsplit(r["url"]).scheme not in ("https","http"):raise ValueError("Invalid URL")
    status="approved" if r.get("verification") in ("manual","website-fetched") else "listed"
    # Expansion records must remain labeled unverified. Never assign review dates.
    city_key=normalize(r["city"])
    host=urllib.parse.urlsplit(r["url"])
    dedupe="|".join([host.netloc.lower().removeprefix("www."),host.path.rstrip("/"),normalize(r["name"]),city_key,str(r["state"]).upper(),normalize(r.get("address",""))])
    search=normalize(" ".join([r["name"],r["city"],r["state"],r["category"],r["description"],*r["keywords"],*r.get("tags",[])]))
    checked=r.get("checkedAt") if status=="approved" else None
    values=[r["id"],dedupe,r["name"],r["category"],r["city"],city_key,r["state"],"US",r["url"],r["source"],status,str(r["coords"][0]),str(r["coords"][1]),search,json.dumps(r,ensure_ascii=False,separators=(",",":")),checked,"2026-10-20T00:00:00Z"]
    v=",".join("NULL" if x is None else quote(x) for x in values)
    return "INSERT INTO directory_records(id,dedupe_key,name,category,city,city_key,state,country,url,source,status,latitude,longitude,search_text,payload,site_checked_at,updated_at) VALUES("+v+") ON CONFLICT(dedupe_key) DO NOTHING;"

def main():
    p=argparse.ArgumentParser();p.add_argument("--original",type=pathlib.Path,required=True);p.add_argument("--out-dir",type=pathlib.Path,required=True);a=p.parse_args()
    old=list(records(a.original));extra=list(records(EXPANSION))
    if len(old)!=EXPECTED_ORIGINAL or len(extra)!=EXPECTED_EXPANSION:
        raise SystemExit(f"Count mismatch: original={len(old)} (expected 969), expansion={len(extra)} (expected 880); stopping")
    seen=set();all_rows=[]
    for r in old+extra:
        k=key(r)
        if k in seen:raise SystemExit(f"Duplicate id {k}; stopping")
        seen.add(k);all_rows.append(r)
    if len(all_rows)!=EXPECTED_TOTAL:raise SystemExit("Incomplete archive")
    # No SQL is generated until completeness/format checks pass.
    statements=[sql_record(r) for r in all_rows]
    a.out_dir.mkdir(parents=True,exist_ok=True)
    for i in range(0,len(statements),50):
        dest=a.out_dir/f"batch-{i//50+1:03d}.sql"
        dest.write_text("\n".join(statements[i:i+50])+"\n",encoding="utf-8")
    print(json.dumps({"source_original":len(old),"source_expansion":len(extra),"total":len(all_rows),"batches":(len(all_rows)+49)//50,"destination":str(a.out_dir)},indent=2))
    print("IMPORTANT: Review the source export, category provenance and deduplication. These batches do not alter your database until explicitly applied.")
if __name__=="__main__":main()
