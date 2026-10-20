#!/usr/bin/env python3
"""Recover publicly listed vendors from the original Way To Knot search API.

Fail-closed: never writes to Cloudflare D1. Archives exact source rows as JSONL.
Requires a complete, consistent paginated response; never invents missing vendors.
"""
import argparse, json, pathlib, urllib.parse, urllib.request, time, sys

def fetch(origin,page):
    url=origin.rstrip("/")+"/api/search?"+urllib.parse.urlencode({"page":page})
    headers={"User-Agent":"WayToKnotRecovery/1.0","Accept":"application/json"}
    with urllib.request.urlopen(urllib.request.Request(url,headers=headers),timeout=35) as response:
        if urllib.parse.urlsplit(response.geturl()).hostname != urllib.parse.urlsplit(origin).hostname:
            raise ValueError("Unexpected cross-host redirect")
        data=json.load(response)
    if not isinstance(data,dict) or not isinstance(data.get("results"),list):
        raise ValueError(f"Page {page}: not a search API response")
    return data

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--origin",default="https://gelin-cicegi.mighty-chair-7509.chatgpt.site")
    p.add_argument("--output",type=pathlib.Path,default=pathlib.Path(".catalog-work/original-recovery.jsonl"))
    p.add_argument("--expected",type=int,default=969)
    a=p.parse_args()
    if not a.origin.startswith("https://"):raise SystemExit("HTTPS origin required")
    first=fetch(a.origin,1)
    count=first.get("indexed_count")
    total=first.get("total")
    pages=first.get("pages")
    if not all(isinstance(x,int) for x in (count,total,pages)):
        raise SystemExit("Missing integer API metadata")
    if count!=a.expected or total!=a.expected:
        raise SystemExit(f"Source count does not match expected {a.expected}: indexed_count={count}, total={total}; no archive written")
    rows=[]
    for page in range(1,pages+1):
        payload=first if page==1 else fetch(a.origin,page)
        if payload.get("indexed_count")!=count or payload.get("total")!=total or payload.get("pages")!=pages:
            raise SystemExit(f"Pagination metadata changed on page {page}; no archive written")
        rows.extend(payload["results"])
        if page%20==0:print(f"Fetched {page}/{pages} pages",flush=True)
        if page<pages:time.sleep(0.05)
    ids=[str(r.get("id","")) for r in rows]
    if len(rows)!=a.expected or any(not x for x in ids) or len(set(ids))!=len(ids):
        raise SystemExit(f"Incomplete or duplicate API records: rows={len(rows)}, ids={len(set(ids))}; no archive written")
    a.output.parent.mkdir(parents=True,exist_ok=True)
    a.output.write_text("".join(json.dumps(x,ensure_ascii=False)+"\n" for x in rows),encoding="utf-8")
    print(json.dumps({"recovered":len(rows),"file":str(a.output),"source":a.origin},ensure_ascii=False))

if __name__=="__main__": main()
