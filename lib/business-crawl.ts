import {extractBusinessDetails,publicBusinessUrl,type BusinessDetails} from './business-details';
import type {Vendor} from './catalog';
const agent='WayToKnotDirectoryBot';
export function robotsAllowed(text:string,path:string){
 const groups:Array<{agents:string[];rules:Array<{allow:boolean;path:string}>}>=[];let group:{agents:string[];rules:Array<{allow:boolean;path:string}>}|undefined;
 for(const line of text.split(/\r?\n/)){const clean=line.replace(/#.*/,'').trim();const separator=clean.indexOf(':');if(separator<0)continue;const key=clean.slice(0,separator).trim().toLowerCase(),value=clean.slice(separator+1).trim();
  if(key==='user-agent'){if(!group||group.rules.length){group={agents:[],rules:[]};groups.push(group);}group.agents.push(value.toLowerCase());}
  else if(group&&(key==='allow'||key==='disallow')&&value)group.rules.push({allow:key==='allow',path:value});
 }
 const specific=groups.filter(g=>g.agents.some(a=>a!=='*'&&agent.toLowerCase().includes(a)));const chosen=specific.length?specific:groups.filter(g=>g.agents.includes('*'));
 const matches=chosen.flatMap(g=>g.rules).filter(rule=>{const pattern=rule.path.replace(/[.+?^{}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*');return new RegExp('^'+pattern).test(path);}).sort((a,b)=>b.path.length-a.path.length||Number(b.allow)-Number(a.allow));
 return !matches.length||matches[0].allow;
}
async function page(url:string,domain:string,maxBytes:number){
 for(let n=0;n<4;n++){
  const response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(7000),headers:{'User-Agent':agent+'/1.0 (+https://waytoknot.com/)','Accept':'text/html,text/plain'}});
  if(response.status>=300&&response.status<400){const next=publicBusinessUrl(response.headers.get('location'),url);await response.body?.cancel();if(!next||new URL(next).hostname.replace(/^www\./,'')!==domain)throw Error('cross_domain_redirect');url=next;continue;}
  if(!response.ok){await response.body?.cancel();if(response.status===404)return {url,text:'',notFound:true};throw Error('http_'+response.status);}
  if(!/text\/|application\/xhtml/.test(response.headers.get('content-type')||'')){await response.body?.cancel();throw Error('not_html');}
  const reader=response.body?.getReader();if(!reader)throw Error('empty_body');const decoder=new TextDecoder();let text='',size=0;
  while(true){const chunk=await reader.read();if(chunk.done)break;size+=chunk.value.byteLength;if(size>maxBytes){await reader.cancel();throw Error('page_too_large');}text+=decoder.decode(chunk.value,{stream:true});}text+=decoder.decode();return {url,text,notFound:false};
 }
 throw Error('too_many_redirects');
}
export function crawlSession(){return {pages:new Map<string,Promise<{url:string;text:string;notFound:boolean}>>(),hosts:new Map<string,Promise<unknown>>()};}
export async function crawlBusiness(v:Vendor,session=crawlSession()):Promise<BusinessDetails&{detailsCheckState:string;detailsCheckReason?:string}>{
 const stamp={detailsCheckedAt:new Date().toISOString().slice(0,10)};
 try{
  const initial=new URL(v.url);if(initial.protocol==='http:')initial.protocol='https:';
  const url=publicBusinessUrl(initial.href);if(!url)throw Error('unsupported_website');const origin=new URL(url),domain=origin.hostname.replace(/^www\./,'');
  const read=(target:string,limit:number)=>{const cached=session.pages.get(target);if(cached)return cached;const previous=session.hosts.get(domain)||Promise.resolve();const promise=previous.catch(()=>{}).then(()=>page(target,domain,limit));session.hosts.set(domain,promise.catch(()=>{}));session.pages.set(target,promise);if(session.pages.size>12)session.pages.delete(session.pages.keys().next().value!);return promise;};
  const robots=await read(origin.origin+'/robots.txt',100000);
  if(!robotsAllowed(robots.text,origin.pathname))throw Error('robots_disallowed');
  // Respect slower crawl requests by leaving them for a dedicated review instead of rushing them.
  if(/^crawl-delay\s*:\s*[1-9]/im.test(robots.text))throw Error('crawl_delay_requires_review');
  const first=await read(url,900000);if(first.notFound)throw Error('website_not_found');
  const found=extractBusinessDetails(first.text,first.url,v.city,v.name,v.streetAddress||'');
  if(!found.openingHours?.length||!found.phone){
   for(const match of first.text.matchAll(/<a\b[^>]*href\s*=\s*["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)){
    if(!/\b(contact|hours|visit|location)\b/i.test(match[2].replace(/<[^>]*>/g,' ')))continue;
    const next=publicBusinessUrl(match[1],first.url);if(!next||next===first.url||new URL(next).hostname.replace(/^www\./,'')!==domain||!robotsAllowed(robots.text,new URL(next).pathname))continue;
    try{const second=await read(next,900000);const extra=extractBusinessDetails(second.text,second.url,v.city,v.name,v.streetAddress||'');if(!found.phone&&extra.phone)found.phone=extra.phone;if(!found.openingHours?.length&&extra.openingHours?.length)found.openingHours=extra.openingHours;if(!found.images?.length&&extra.images?.length)found.images=extra.images;}catch{/* Keep the published homepage data when the contact page is unavailable. */}
    break;
   }
  }
  return {...found,detailsCheckState:found.images?.length||found.openingHours?.length||found.phone?'found':'not_published'};
 }catch(error){return {...stamp,detailsCheckState:'unavailable',detailsCheckReason:error instanceof Error?error.message:'website_unavailable'};}
}
