#!/usr/bin/env python3
"""Extract published images and opening hours from official business pages.
No guessed hours, Google scraping, or third-party photos. Writes patches only.
"""
import argparse,concurrent.futures,datetime,json,re,subprocess
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit

class Page(HTMLParser):
 def __init__(self):super().__init__();self.meta={};self.blocks=[];self.active=False;self.block=''
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta':self.meta[a.get('property',a.get('name','')).lower()]=a.get('content','')
  if tag=='script' and 'ld+json' in a.get('type',''):self.active=True;self.block=''
 def handle_data(self,data):
  if self.active:self.block+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.active:self.blocks.append(self.block);self.active=False

def nodes(v):
 if isinstance(v,list):
  for x in v:yield from nodes(x)
 elif isinstance(v,dict):
  yield v
  if '@graph' in v:yield from nodes(v['@graph'])

def image_urls(v):
 if isinstance(v,str):yield v
 elif isinstance(v,list):
  for x in v:yield from image_urls(x)
 elif isinstance(v,dict):yield from image_urls(v.get('contentUrl') or v.get('url') or '')

def extract(html,url,city,name):
 p=Page();p.feed(html);images=[];hours=[]
 for block in p.blocks:
  try:entries=list(nodes(json.loads(block)))
  except (ValueError,TypeError):continue
  for n in entries:
   address=n.get('address') or {};address=address if isinstance(address,dict) else {}
   match=(str(address.get('addressLocality','')).casefold()==city.casefold() or str(n.get('name','')).casefold()==name.casefold() or str(n.get('url','')).rstrip('/')==url.rstrip('/'))
   if not match:continue
   images.extend(image_urls(n.get('image',[])))
   raw=n.get('openingHours',[]);raw=[raw] if isinstance(raw,str) else raw
   if isinstance(raw,list):hours.extend(x.strip() for x in raw if isinstance(x,str) and x.strip())
   specs=n.get('openingHoursSpecification',[]);specs=[specs] if isinstance(specs,dict) else specs
   for h in specs if isinstance(specs,list) else []:
    if not isinstance(h,dict) or h.get('validFrom') or h.get('validThrough'):continue
    days=h.get('dayOfWeek',[]);days=[days] if isinstance(days,str) else days
    if not isinstance(days,list):continue
    days=[str(d).split('/')[-1] for d in days]
    start,end=h.get('opens',''),h.get('closes','')
    if days and re.fullmatch(r'\d{2}:\d{2}',str(start)) and re.fullmatch(r'\d{2}:\d{2}',str(end)):
     hours.append(', '.join(days)+': '+('Closed' if start==end=='00:00' else start+'–'+end))
 images.extend([p.meta.get('og:image',''),p.meta.get('twitter:image','')])
 clean=[]
 for x in images:
  u=urljoin(url,x);parts=urlsplit(u)
  if x and parts.scheme=='https' and parts.hostname and '.' in parts.hostname and not parts.username and u not in clean:clean.append(u)
 result={}
 if clean:result['images']=clean[:12]
 if hours:result['openingHours']=list(dict.fromkeys(hours))[:14]
 if result:result.update(detailsSource=url,detailsCheckedAt=datetime.date.today().isoformat())
 return result

def enrich(v):
 try:
  html=subprocess.check_output(['curl','-fLsS','--max-time','18','--max-filesize','3000000',v['url']],stderr=subprocess.DEVNULL).decode('utf-8','replace')
  d=extract(html,v['url'],v['city'],v['name'])
  return {'id':v['id'],**d} if d else None
 except Exception:return None

def main():
 p=argparse.ArgumentParser();p.add_argument('--input',required=True);p.add_argument('--output',required=True);a=p.parse_args()
 raw=open(a.input).read();records=json.loads(raw) if raw.lstrip().startswith('[') else [json.loads(s) for s in raw.splitlines() if s.strip()]
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:patches=[x for x in pool.map(enrich,records) if x]
 with open(a.output,'w') as f:json.dump(patches,f,indent=2)
 print(json.dumps({'examined':len(records),'with_images':sum(bool(x.get('images')) for x in patches),'with_hours':sum(bool(x.get('openingHours')) for x in patches)}))
if __name__=='__main__':main()
