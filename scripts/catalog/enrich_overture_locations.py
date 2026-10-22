#!/usr/bin/env python3
"""Prepare phone and source-point patches for existing GERS listings; never add firms."""
import argparse,datetime,json,re,struct,urllib.request
from pathlib import Path
from pipeline import category


def phone(value):
    digits=re.sub(r'\D','',str(value or ''))
    if re.fullmatch(r'[2-9]\d{2}[2-9]\d{6}',digits):return '+1'+digits
    if re.fullmatch(r'1[2-9]\d{2}[2-9]\d{6}',digits):return '+'+digits
    return None


def point(hex_wkb):
    raw=bytes.fromhex(hex_wkb)
    endian='<' if raw[0]==1 else '>'
    kind=struct.unpack_from(endian+'I',raw,1)[0]
    if kind!=1:raise ValueError('Only 2D source points are supported')
    lon,lat=struct.unpack_from(endian+'dd',raw,5)
    if not (-180<=lon<=180 and -90<=lat<=90):raise ValueError('Invalid source point')
    return [lat,lon]


def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--state',required=True);p.add_argument('--output',type=Path,required=True);args=p.parse_args()
    if not re.fullmatch('[A-Z]{2}',args.state):raise ValueError('Use a state code')
    import duckdb
    with urllib.request.urlopen('https://stac.overturemaps.org/catalog.json',timeout=25) as r:release=json.load(r)['latest']
    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}\.\d+',release):raise ValueError('Invalid release')
    db=duckdb.connect();db.execute('INSTALL httpfs');db.execute('LOAD httpfs');db.execute("SET s3_region='us-west-2'");db.execute("SET memory_limit='1GB'");db.execute('SET threads=4')
    path=f's3://overturemaps-us-west-2/release/{release}/theme=places/type=place/*'
    pattern='barber|hair|beauty|nail|jewel|baker|dessert|chocolate|gift|florist|flower|wedding|bridal|formal|photograph|photo_booth|video|cater|dj|tuxedo|event|limo|party|hotel|lodging|travel_agent|travel_agency|dance|security|clean|spa|massage|tailor|alteration|shoe|musician|rental|printing|stationery|sign|balloon|transport|child_care|pet_care|food_truck|bar_service|bartend|officiant|officiating|clothing|pet_sit|calligraphy|mobile_bar|disc_jockey|live_music'
    query="""SELECT id,names.primary AS name,websites[1] AS website,phones[1] AS phone,addresses[1].freeform AS street,addresses[1].locality AS city,addresses[1].postcode AS postcode,addresses[1].region AS state,hex(geometry) AS geometry,operating_status FROM read_parquet(?) WHERE addresses[1].country='US' AND upper(addresses[1].region) IN (?,?) AND websites[1] IS NOT NULL AND names.primary IS NOT NULL AND addresses[1].locality IS NOT NULL AND regexp_matches(lower(coalesce(taxonomy.primary,'')),?)"""
    query=query.replace('operating_status FROM','operating_status,taxonomy.primary AS source_category FROM')
    query=query.replace(" AND regexp_matches(lower(coalesce(taxonomy.primary,'')),?)",'')
    db.execute(query,[path,args.state,'US-'+args.state]);args.output.parent.mkdir(parents=True,exist_ok=True)
    counts={'state':args.state,'release':release,'patches':0,'with_phone':0,'with_street':0,'invalid_geometry':0,'permanently_closed':0,'live_updated':False}
    now=datetime.datetime.now(datetime.timezone.utc).isoformat()
    with args.output.open('w') as out:
        while rows:=db.fetchmany(1000):
            for source_id,name,website,raw_phone,street,city,postcode,region,geometry,operating,source_category in rows:
                if not category(source_category):continue
                try:coords=point(geometry)
                except (ValueError,struct.error,IndexError):counts['invalid_geometry']+=1;continue
                state=region.removeprefix('US-').upper()
                patch={'coords':coords,'city':city.strip(),'state':state,'locationAccuracy':'source-point','locationSource':'https://explore.overturemaps.org/','locationRelease':release,'locationCheckedAt':now[:10]}
                tel=phone(raw_phone)
                if tel:patch['phone']=tel;patch['phoneSource']='https://explore.overturemaps.org/';counts['with_phone']+=1
                if street and street.strip():patch['address']=', '.join(x for x in [street.strip(),city.strip(),state,postcode] if x);patch['streetAddress']=street.strip();counts['with_street']+=1
                if postcode:patch['postalCode']=postcode
                if operating:patch['operatingStatus']=operating
                if operating=='permanently_closed':counts['permanently_closed']+=1
                out.write(json.dumps({'id':'overture-'+source_id,'name':name,'url':website,'patch':patch},ensure_ascii=False)+'\n');counts['patches']+=1
    args.output.with_suffix('.report.json').write_text(json.dumps(counts,indent=2)+'\n');print(json.dumps(counts))

if __name__=='__main__':main()
