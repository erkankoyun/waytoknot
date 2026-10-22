#!/usr/bin/env python3
"""Resumable business discovery/review queue. Unreviewed publication requires an explicit flag and is labeled."""
import argparse, concurrent.futures, datetime, hashlib, ipaddress, json, os, re, socket, sqlite3, sys, time
import urllib.parse, urllib.request, urllib.robotparser
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
CATEGORIES={c['id']:c for c in json.loads((ROOT/'public/assets/wedding-categories.json').read_text())}
TODAY=lambda:datetime.datetime.now(datetime.timezone.utc).date().isoformat()

def public_url(url):
 p=urllib.parse.urlsplit(url)
 if p.scheme not in ('http','https') or not p.hostname or p.username or p.password or p.port not in (None,80,443):raise ValueError('Public HTTP(S) websites only')
 for row in socket.getaddrinfo(p.hostname,p.port or (443 if p.scheme=='https' else 80),type=socket.SOCK_STREAM):
  if not ipaddress.ip_address(row[4][0]).is_global:raise ValueError('Non-public destination rejected')
 return url
class PublicRedirects(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,req,fp,code,msg,headers,newurl):
  public_url(newurl);return super().redirect_request(req,fp,code,msg,headers,newurl)
OPENER=urllib.request.build_opener(PublicRedirects())

def fetch(url,max_bytes=600000):
 public_url(url)
 with OPENER.open(urllib.request.Request(url,headers={'User-Agent':'WayToKnotDirectoryBot/1.0 (+https://waytoknot.com/)'}),timeout=12) as response:
  content=response.read(max_bytes+1)
  if len(content)>max_bytes:raise ValueError('Page exceeds bounded review size')
  return response.geturl(),response.headers.get('Content-Type',''),content.decode('utf-8',errors='replace')

def category(source):
 source=str(source).lower()
 patterns=[
 ('barber','barber'),('hair_salon|hairdresser','hairsalon'),('makeup_art','makeup'),
 ('nail','nails'),('spa|massage','spa'),('beauty_salon','beauty'),
 ('jewel','jeweler'),('bakery|cake_shop','cake'),('chocolate|dessert','sweets'),
 ('gift_shop|^flowers_and_gifts_store$','gifts'),('florist|flower_shop','florist'),('wedding_venue|wedding_chapel|banquet_hall|event_venue','venue'),
 ('wedding_plann|event_plann','planner'),('wedding_officiant|officiant|^officiating_service$','officiant'),
 ('wedding_accessories|bridal_accessor','accessories'),('bridal','bridal'),('tuxedo|^mens_clothing_store$','groom'),
 ('tailor|alteration','alterations'),('shoe_store','shoes'),
 ('photography_service|photographer','photography'),('videograph|video_production|^video_film_production$','videography'),
 ('photo_booth','photobooth'),('cater','catering'),('food_truck','foodtruck'),
 ('disc_jockey|^dj$|^dj_service$','dj'),('wedding_band|musician|live_music','band'),
 ('limousine|limo_service','transportation'),('party_rental|event_rental|tent_rental|^party_equipment_rental$','rental'),
 ('event_decor|balloon','decor'),('lighting_service|stage_equipment|^event_technology_service$|^audiovisual_equipment_rental$','lighting'),
 ('stationery_store|invitation_print','stationery'),('sign_shop|printing_service|^calligraphy$','signage'),
 ('hotel|lodging','hotel'),('travel_agency|^travel_agent$','travel'),('dance_school|dance_studio','dance'),
 ('child_care|babysit','childcare'),('pet_sit|pet_care','petcare'),
 ('event_staff','eventstaff'),('security_service','security'),('cleaning_service','cleaning'),
 ('mobile_bar|bartend','barservice'),('wedding_favor','favors'),
 ('formal_wear|formalwear','formalwear'),
 ('entertainment_agency|party_entertain|^corporate_entertainment_service$|^party_character$','entertainment')]

 return next((dest for pattern,dest in patterns if re.search(pattern,source)),None)

def candidate(row):
 name=row.get('name')
 if not isinstance(name,str):return None
 name=name.strip()
 if not any(ch.isalnum() for ch in name):return None
 row={**row,'name':name}
 if row.get('category') in CATEGORIES and row.get('url'):return row
 cat=category(row.get('source_category',''))
 if not cat or not row.get('website') or not row.get('city') or not row.get('state'):return None
 state=row['state'].removeprefix('US-');url=row['website'].strip()
 if not url.startswith(('https://','http://')):url='https://'+url
 parsed=urllib.parse.urlsplit(url)
 host=(parsed.hostname or '').lower().removeprefix('www.')
 if not host or '.' not in host or parsed.username or parsed.password or parsed.port not in (None,80,443) or re.search(r'[\s<>]',url):return None
 if host.endswith(('.local','.localhost','.invalid','.test')):return None
 try:
  if not ipaddress.ip_address(host).is_global:return None
 except ValueError:pass
 if any(host==social or host.endswith('.'+social) for social in {'facebook.com','instagram.com','twitter.com','x.com','yelp.com','tiktok.com','google.com'}):return None
 addresses=row.get('addresses',[])
 if isinstance(addresses,str):addresses=json.loads(addresses)
 address=addresses[0] if addresses else {}
 branch_address=address.get('freeform','') if isinstance(address,dict) else ''
 return dict(id='overture-'+row['id'],name=row['name'],category=cat,city=row['city'],state=state.upper(),country='US',url=url,source='https://explore.overturemaps.org/',sourceProvider='Overture Maps',sourceRecordId=row['id'],sourceCategory=row.get('source_category'),sourceAttribution=row.get('sources'),description='Business listed by Overture Maps; confirm wedding-related services directly.',keywords=[cat,row['city']],coords=[row['latitude'],row['longitude']],checkedAt='',locationKind='place',**({'address':branch_address} if branch_address else {}))

def key(v):
 p=urllib.parse.urlsplit(v['url']);normalize=lambda s:re.sub(r'\W+',' ',s.lower()).strip()
 return '|'.join([p.netloc.lower().removeprefix('www.'),p.path.rstrip('/'),normalize(v['name']),normalize(v['city']),v['state'],normalize(v.get('address',''))])

def database(path):
 path.parent.mkdir(parents=True,exist_ok=True);db=sqlite3.connect(path)
 db.execute('CREATE TABLE IF NOT EXISTS queue (key TEXT PRIMARY KEY, payload TEXT NOT NULL, status TEXT NOT NULL, attempts INTEGER DEFAULT 0, reason TEXT, updated_at TEXT)')
 return db

def ingest(db,path,manual=False):
 accepted=duplicates=rejected=0
 stream=open(path) if path!='-' else sys.stdin
 for line in stream:
  try:
   row=json.loads(line);v=candidate(row)
   if not v:rejected+=1;continue
   if manual:
    v['verification']='manual'
    if not v.get('checkedAt'):v['checkedAt']=TODAY()
   status='approved' if manual else 'pending'
   result=db.execute('INSERT OR IGNORE INTO queue(key,payload,status,updated_at) VALUES(?,?,?,?)',(key(v),json.dumps(v,ensure_ascii=False),status,TODAY()))
   accepted+=result.rowcount;duplicates+=1-result.rowcount
  except (ValueError,KeyError,TypeError):rejected+=1
 db.commit();print(json.dumps(dict(accepted=accepted,duplicates=duplicates,rejected=rejected)))

def review(v):
 try:
  origin=urllib.parse.urlsplit(v['url']);robots_url=urllib.parse.urlunsplit((origin.scheme,origin.netloc,'/robots.txt','',''))
  try:
   _,_,robots_text=fetch(robots_url,100000);rp=urllib.robotparser.RobotFileParser();rp.parse(robots_text.splitlines())
   if not rp.can_fetch('WayToKnotDirectoryBot',v['url']):return 'blocked','robots.txt disallows review',v
   delay=rp.crawl_delay('WayToKnotDirectoryBot') or rp.crawl_delay('*')
   if delay and delay>30:return 'needs-review','Crawl delay requires a slower scheduled review',v
   if delay and delay>0:time.sleep(delay)
  except urllib.error.HTTPError as e:
   if e.code not in (404,410):return 'needs-review','robots.txt could not be checked',v
  except Exception:return 'needs-review','robots.txt could not be checked',v
  final,kind,body=fetch(v['url'])
  if 'html' not in kind:return 'needs-review','Not an HTML business page',v
  if urllib.parse.urlsplit(final).hostname.removeprefix('www.')!=origin.hostname.removeprefix('www.'):return 'needs-review','Redirected to a different domain',v
  body=re.sub(r'<(script|style)\b[^>]*>.*?</\1>', ' ', body, flags=re.S|re.I)
  visible=re.sub('<[^>]*>',' ',body).lower();words=[w for w in re.findall(r'[a-z0-9]+',v['name'].lower()) if len(w)>3]
  if not words or sum(w in visible for w in words)/len(words)<0.6:return 'needs-review','Business name not confirmed on page',v
  if re.search(r'domain (?:is )?for sale|buy this domain|website coming soon',visible):return 'needs-review','Parked or unfinished website',v
  v['verification']='website-fetched';v['verificationUrl']=final;v['checkedAt']=TODAY();v['source']=final
  return 'approved','Website fetched; name matched; services still require visitor confirmation',v
 except Exception as e:return 'unreachable',type(e).__name__,v

def crawl(db,limit,workers):
 rows=db.execute("SELECT key,payload FROM queue WHERE status IN ('pending','unreachable') AND attempts<3 ORDER BY attempts,key LIMIT ?",(limit,)).fetchall()
 # A domain is reviewed once per run, preventing parallel traffic to chain websites.
 seen=set();selected=[]
 for item in rows:
  host=urllib.parse.urlsplit(json.loads(item[1])['url']).hostname
  if host not in seen:seen.add(host);selected.append(item)
 with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
  futures={pool.submit(review,json.loads(payload)):k for k,payload in selected}
  for future in concurrent.futures.as_completed(futures):
   status,reason,v=future.result();db.execute('UPDATE queue SET status=?,reason=?,payload=?,attempts=attempts+1,updated_at=? WHERE key=?',(status,reason,json.dumps(v,ensure_ascii=False),TODAY(),futures[future]));db.commit()
 print(json.dumps(dict(db.execute('SELECT status,count(*) FROM queue GROUP BY status').fetchall())))

def export(db,path):
 with open(path,'w') as out:
  for (payload,) in db.execute("SELECT payload FROM queue WHERE status='approved' ORDER BY key"):out.write(payload+'\n')
 print('Exported reviewed records only')

def sync(db,url,include_pending=False,publish_unverified=False):
 token=os.environ.get('CATALOG_IMPORT_TOKEN')
 if not token:raise SystemExit('Set CATALOG_IMPORT_TOKEN in the process environment; never commit it.')
 target=urllib.parse.urlsplit(url)
 if target.scheme!='https' or not target.hostname or target.username or target.password or target.path not in ('','/'):raise ValueError('Use the owner-configured HTTPS site origin')
 batch=[];total=0
 def send(rows):
  headers={'Authorization':'Bearer '+token,'Content-Type':'application/json'}
  if os.environ.get('SITES_ACCESS_BEARER'):headers['OAI-Sites-Authorization']=os.environ['SITES_ACCESS_BEARER']
  req=urllib.request.Request(url.rstrip('/')+'/api/catalog/import',data=json.dumps({'records':rows}).encode(),headers=headers,method='POST')
  # Do not follow redirects while carrying the private import token.
  class NoRedirect(urllib.request.HTTPRedirectHandler):
   def redirect_request(self,*args,**kwargs):return None
  with urllib.request.build_opener(NoRedirect()).open(req,timeout=40) as response:
   result=json.load(response)
   if result.get('accepted')!=len(rows):raise ValueError('Incomplete batch')
 for (payload,) in db.execute("SELECT payload FROM queue WHERE status IN ('approved','pending','needs-review','unreachable','blocked') ORDER BY key" if include_pending else "SELECT payload FROM queue WHERE status='approved' ORDER BY key"):
  record=json.loads(payload)
  if publish_unverified and not record.get('verification'):record['publishUnverified']=True
  batch.append(record)
  if len(batch)==50:send(batch);total+=len(batch);batch=[]
 if batch:send(batch);total+=len(batch)
 print(json.dumps({'synced':total}))

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--db',type=Path,default=ROOT/'.catalog-work/queue.sqlite');sub=parser.add_subparsers(dest='command',required=True)
 p=sub.add_parser('ingest');p.add_argument('input');p.add_argument('--reviewed-seed',action='store_true')
 p=sub.add_parser('crawl');p.add_argument('--limit',type=int,default=100);p.add_argument('--workers',type=int,choices=range(1,9),default=4)
 p=sub.add_parser('export');p.add_argument('output')
 p=sub.add_parser('sync');p.add_argument('site_url');p.add_argument('--include-pending',action='store_true');p.add_argument('--publish-unverified',action='store_true',help='Publish candidates with an explicit unverified label')
 sub.add_parser('status');args=parser.parse_args();db=database(args.db)
 if args.command=='ingest':ingest(db,args.input,args.reviewed_seed)
 elif args.command=='crawl':crawl(db,max(1,min(100000,args.limit)),args.workers)
 elif args.command=='export':export(db,args.output)
 elif args.command=='sync':sync(db,args.site_url,args.include_pending or args.publish_unverified,args.publish_unverified)
 else:print(json.dumps(dict(db.execute('SELECT status,count(*) FROM queue GROUP BY status').fetchall())))
if __name__=='__main__':main()
