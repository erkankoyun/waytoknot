#!/usr/bin/env python3
"""Build idempotent D1 phone/location updates for existing source IDs only."""
import argparse,collections,hashlib,json,math,re,unicodedata
from pathlib import Path

VERSION='2026-10-22-points-v1'
SOURCE='https://explore.overturemaps.org/'
def quote(value):return "'"+str(value).replace("'","''")+"'"
def city_key(value):
    value=unicodedata.normalize('NFD',value.lower().replace('ı','i'))
    value=''.join(c for c in value if not unicodedata.combining(c))
    return re.sub(r'\s+',' ',re.sub('[^a-z0-9 ]',' ',value)).strip()

def statements(records,batch_id,release='2026-10-21.0'):
    sql=["CREATE TABLE IF NOT EXISTS catalog_location_patch_buffer(id TEXT PRIMARY KEY,patch TEXT NOT NULL,city_key TEXT NOT NULL);",
         "CREATE TABLE IF NOT EXISTS catalog_location_imports(id TEXT PRIMARY KEY,version TEXT,source_rows INTEGER,matched_rows INTEGER,phones_added INTEGER,addresses_added INTEGER,completed_at TEXT);",
         'DELETE FROM catalog_location_patch_buffer;']
    values=[];size=0
    for row in records:
        source=row['patch'];coords=source['coords'];name=row['id']
        if not re.fullmatch(r'overture-[0-9a-f-]{36}',name):raise ValueError('Invalid source ID')
        if len(coords)!=2 or not all(isinstance(x,(int,float)) and math.isfinite(x) for x in coords) or not(-90<=coords[0]<=90 and -180<=coords[1]<=180):raise ValueError('Invalid coordinates')
        if not re.fullmatch('[A-Z]{2}',source['state']) or not source['city'].strip():raise ValueError('Invalid locality')
        patch={k:source[k] for k in ['coords','city','state','address','streetAddress','postalCode','phone','operatingStatus'] if source.get(k) is not None}
        patch['city']=patch['city'].strip()
        if patch.get('phone'):
            if not re.fullmatch(r'\+1[2-9]\d{2}[2-9]\d{6}',patch['phone']):raise ValueError('Invalid US phone')
            patch['phoneSource']=SOURCE
        text='('+','.join([quote(name),quote(json.dumps(patch,ensure_ascii=False,separators=(',',':'))),quote(city_key(patch['city']))])+')'
        if values and size+len(text.encode())>45000:
            sql.append('INSERT INTO catalog_location_patch_buffer VALUES'+','.join(values)+' ON CONFLICT(id) DO UPDATE SET patch=excluded.patch,city_key=excluded.city_key;');values=[];size=0
        values.append(text);size+=len(text.encode())
    if values:sql.append('INSERT INTO catalog_location_patch_buffer VALUES'+','.join(values)+' ON CONFLICT(id) DO UPDATE SET patch=excluded.patch,city_key=excluded.city_key;')
    match="d.id=u.id AND d.status='listed' AND json_extract(d.payload,'$.locationImportVersion') IS NOT "+quote(VERSION)
    sql.append('INSERT INTO catalog_location_imports(id,version,source_rows,matched_rows,phones_added,addresses_added) SELECT '+quote(batch_id)+','+quote(VERSION)+', (SELECT COUNT(*) FROM catalog_location_patch_buffer),COUNT(*),coalesce(SUM(CASE WHEN coalesce(json_extract(d.payload,\'$.phone\'),\'\')=\'\' AND json_extract(u.patch,\'$.phone\') IS NOT NULL THEN 1 ELSE 0 END),0),coalesce(SUM(CASE WHEN coalesce(json_extract(d.payload,\'$.address\'),\'\')=\'\' AND json_extract(u.patch,\'$.address\') IS NOT NULL THEN 1 ELSE 0 END),0) FROM directory_records d JOIN catalog_location_patch_buffer u ON '+match+' ON CONFLICT(id) DO NOTHING;')
    # Published business-site contacts and addresses take precedence over metadata.
    patch="CASE WHEN coalesce(json_extract(d.payload,'$.phone'),'')<>'' THEN json_remove(u.patch,'$.phone','$.phoneSource') ELSE u.patch END"
    patch="CASE WHEN coalesce(json_extract(d.payload,'$.detailsSource'),'')<>'' AND coalesce(json_extract(d.payload,'$.streetAddress'),'')<>'' THEN json_remove(("+patch+"),'$.address','$.streetAddress','$.postalCode') ELSE ("+patch+") END"
    common="json_object('locationAccuracy','source-point','locationSource',"+quote(SOURCE)+",'locationRelease',"+quote(release)+",'locationCheckedAt','2026-10-22','locationImportVersion',"+quote(VERSION)+')'
    sql.append("UPDATE directory_records AS d SET latitude=CAST(json_extract(u.patch,'$.coords[0]') AS TEXT),longitude=CAST(json_extract(u.patch,'$.coords[1]') AS TEXT),city=json_extract(u.patch,'$.city'),city_key=u.city_key,state=json_extract(u.patch,'$.state'),search_text=CASE WHEN d.city IS NOT json_extract(u.patch,'$.city') OR d.state IS NOT json_extract(u.patch,'$.state') THEN lower(d.name||' '||json_extract(u.patch,'$.city')||' '||json_extract(u.patch,'$.state')||' '||d.category||' '||coalesce(json_extract(d.payload,'$.description'),'')) ELSE d.search_text END,payload=json_patch(d.payload,json_patch(("+patch+'),'+common+')) FROM catalog_location_patch_buffer u WHERE '+match+';')
    sql.append("UPDATE catalog_location_imports SET completed_at=strftime('%Y-%m-%dT%H:%M:%SZ','now') WHERE id="+quote(batch_id)+' AND completed_at IS NULL;')
    sql.append('DELETE FROM catalog_location_patch_buffer;')
    return sql

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--input-root',type=Path,required=True);p.add_argument('--out-dir',type=Path,required=True);p.add_argument('--batch-size',type=int,default=10000);a=p.parse_args()
    if not 1<=a.batch_size<=10000:raise ValueError('Use at most 10,000 source records per native import')
    a.out_dir.mkdir(parents=True,exist_ok=True);manifest=[];batch=[];seen=set();states=collections.Counter();rejected=[]
    def flush():
        if not batch:return
        batch_id=f'2026-10-22-source-{len(manifest)+1:03d}';content=('\n'.join(statements(batch,batch_id))+'\n').encode();path=a.out_dir/(batch_id+'.sql');path.write_bytes(content)
        manifest.append({'id':batch_id,'file':str(path.resolve()),'name':path.name,'source_records':len(batch),'states':dict(collections.Counter(r['patch']['state'] for r in batch)),'bytes':len(content),'md5':hashlib.md5(content).hexdigest(),'sha256':hashlib.sha256(content).hexdigest()});batch.clear()
    for path in sorted(a.input_root.glob('*/*-locations.jsonl')):
        for line in path.open():
            row=json.loads(line)
            if row['id'] in seen:continue
            if not re.fullmatch('[A-Z]{2}',row['patch'].get('state','')) or not row['patch'].get('city','').strip():
                rejected.append({'id':row['id'],'reason':'empty_or_invalid_source_locality'});continue
            seen.add(row['id']);states[row['patch']['state']]+=1;batch.append(row)
            if len(batch)==a.batch_size:flush()
    flush();report={'version':VERSION,'source_records':len(seen),'states':dict(states),'rejected_source_rows':rejected,'files':manifest,'notice':'Updates existing listed GERS IDs only. Approved and pending records are untouched; existing website details are preserved.'}
    (a.out_dir/'manifest.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({'source_records':len(seen),'batches':len(manifest),'sql_bytes':sum(f['bytes'] for f in manifest)}))
if __name__=='__main__':main()
