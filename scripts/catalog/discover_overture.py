#!/usr/bin/env python3
"""Fetch candidate metadata, not verified websites. Ingest with pipeline.py next."""
import argparse,json,os,re,urllib.request
from pathlib import Path

def main():
 p=argparse.ArgumentParser();p.add_argument('--limit',type=int,default=0,help='Maximum results; 0 means no row limit');p.add_argument('--output',type=Path,default=Path('.catalog-work/overture-candidates.jsonl'));p.add_argument('--bbox',default='-125,24,-66,50',help='west,south,east,north; default contiguous US');p.add_argument('--release');p.add_argument('--state',default='',help='Optional US state, e.g. NY');a=p.parse_args()
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
 pattern='barber|hair|beauty|nail|jewel|baker|dessert|chocolate|gift|florist|flower|wedding|bridal|formal|clothing|photograph|photo_booth|photo_booth|video|cater|disc_jockey|dj|tuxedo|event|limousine|limo|party|hotel|lodging|travel_agency|dance|security|clean|spa|massage|tailor|alteration|shoe|music|band|musician|rental|printing|stationery|sign|balloon|transport|child_care|pet_care|food_truck|bar_service|bartend|officiant'
 print('Reading all matching NY candidate metadata from Overture release',release,flush=True)
 sql='''SELECT id,names.primary AS name,taxonomy.primary AS source_category,websites[1] AS website,addresses[1].locality AS city,addresses[1].region AS state,addresses[1].country AS country,bbox.ymin AS latitude,bbox.xmin AS longitude,confidence,CAST(sources AS JSON) AS sources FROM read_parquet(?) WHERE addresses[1].country='US' AND websites[1] IS NOT NULL AND names.primary IS NOT NULL AND bbox.xmin BETWEEN ? AND ? AND bbox.ymin BETWEEN ? AND ? AND regexp_matches(lower(coalesce(taxonomy.primary,'')),?) AND (? = '' OR upper(coalesce(addresses[1].region,'')) IN (?,?))'''
 params=[path,west,east,south,north,pattern,a.state.upper(),a.state.upper(),'US-'+a.state.upper()]
 if a.limit>0:sql+=' LIMIT ?';params.append(a.limit)
 c.execute('CREATE TEMP TABLE candidates AS '+sql,params)
 a.output.parent.mkdir(parents=True,exist_ok=True)
 c.execute("COPY candidates TO '"+str(a.output).replace("'","''")+"' (FORMAT JSON)")
 print(json.dumps({'candidates':c.execute('SELECT count(*) FROM candidates').fetchone()[0],'release':release,'websites_verified':0,'output':str(a.output),'limit':a.limit or 'none'}))
