#!/usr/bin/env python3
"""Fetch candidate metadata, not verified websites. Ingest with pipeline.py next."""
import argparse,json,os,re,urllib.request
from pathlib import Path

def main():
 p=argparse.ArgumentParser();p.add_argument('--limit',type=int,default=100000);p.add_argument('--output',type=Path,default=Path('.catalog-work/overture-candidates.jsonl'));p.add_argument('--bbox',default='-125,24,-66,50',help='west,south,east,north; default contiguous US');p.add_argument('--release');p.add_argument('--state',default='',help='Optional US state, e.g. NY');a=p.parse_args()
 import duckdb
 release=a.release
 if not release:
  with urllib.request.urlopen('https://stac.overturemaps.org/catalog.json',timeout=20) as r:release=json.load(r)['latest']
 if not re.fullmatch(r'\d{4}-\d{2}-\d{2}\.\d+',release):raise ValueError('Invalid release')
 west,south,east,north=[float(x) for x in a.bbox.split(',')]
 if not (-180<=west<east<=180 and -90<=south<north<=90):raise ValueError('Invalid bounding box')
 c=duckdb.connect();c.execute('INSTALL httpfs');c.execute('LOAD httpfs');c.execute("SET s3_region='us-west-2'");c.execute('SET http_timeout=25');c.execute('SET http_retries=1');c.execute("SET memory_limit='1GB'");c.execute('SET threads=4')
 if os.environ.get('HTTPS_PROXY'):c.execute('SET http_proxy=?',[os.environ['HTTPS_PROXY']])
 path=f's3://overturemaps-us-west-2/release/{release}/theme=places/type=place/*'
 pattern='barber|hair_salon|beauty_salon|nail_salon|jewelry_store|jewelry_repair_service|bakery|gift_shop|florist|wedding|bridal|formal_wear|^mens_clothing_store$|photography_service|catering|disc_jockey|tuxedo|event_plann|limousine|party_supply'
 print('Reading candidate metadata from Overture release',release,flush=True)
 c.execute('''CREATE TEMP TABLE candidates AS SELECT id,names.primary AS name,taxonomy.primary AS source_category,websites[1] AS website,addresses[1].locality AS city,addresses[1].region AS state,addresses[1].country AS country,bbox.ymin AS latitude,bbox.xmin AS longitude,confidence,CAST(sources AS JSON) AS sources FROM read_parquet(?) WHERE addresses[1].country='US' AND websites[1] IS NOT NULL AND names.primary IS NOT NULL AND bbox.xmin BETWEEN ? AND ? AND bbox.ymin BETWEEN ? AND ? AND regexp_matches(taxonomy.primary,?) LIMIT ?''',[path,west,east,south,north,pattern,a.state.upper(),a.state.upper(),'US-'+a.state.upper(),max(1,min(a.limit,1000000))])
 a.output.parent.mkdir(parents=True,exist_ok=True)
 c.execute("COPY candidates TO '"+str(a.output).replace("'","''")+"' (FORMAT JSON)")
 print(json.dumps({'candidates':c.execute('SELECT count(*) FROM candidates').fetchone()[0],'release':release,'websites_verified':0,'output':str(a.output)}))
if __name__=='__main__':main()
