import {env} from 'cloudflare:workers';
import {extractBusinessDetails,publicBusinessUrl,type BusinessDetails} from '@/lib/business-details';
import {digest,formRateLimit,formJson} from '@/lib/public-forms';
import type {Vendor} from '@/lib/catalog';
const runtime=env as Cloudflare.Env;
function details(v:Vendor):BusinessDetails{return {images:v.images,openingHours:v.openingHours,detailsSource:v.detailsSource,detailsCheckedAt:v.detailsCheckedAt,phone:v.phone,address:v.address,streetAddress:v.streetAddress,postalCode:v.postalCode};}
export async function GET(request:Request){
 const id=new URL(request.url).searchParams.get('id')||'';if(!id||id.length>200)return formJson({error:'A valid business is required.'},400);
 const db=runtime.DB;if(!db)return formJson({error:'Live business details are unavailable.'},503);
 try{
  const row=await db.prepare("SELECT payload FROM directory_records WHERE id=? AND status IN ('approved','listed')").bind(id).first<{payload:string}>();if(!row)return formJson({error:'Business not found.'},404);
  const v=JSON.parse(row.payload) as Vendor;const current=details(v);
  if(v.detailsCheckedAt&&Date.now()-Date.parse(v.detailsCheckedAt)<7*86400000)return formJson(current);
  const ip=request.headers.get('CF-Connecting-IP')||'anonymous';if(!await formRateLimit(db,'details:'+await digest(ip),60))return formJson({...current,notice:'Refresh limit reached. Visit the official website for current details.'});
  let candidate=v.url;try{const input=new URL(candidate);if(input.protocol==='http:')input.protocol='https:';candidate=input.href;}catch{}
  let url=publicBusinessUrl(candidate);if(!url)return formJson(current);
  const domain=new URL(url).hostname.replace(/^www\./,'');let response:Response|undefined;
  for(let n=0;n<4;n++){
   response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(8000),headers:{Accept:'text/html','User-Agent':'WayToKnot-BusinessDetails/1.0 (+https://waytoknot.com)'}});
   if(response.status>=300&&response.status<400){const next=publicBusinessUrl(response.headers.get('location'),url);await response.body?.cancel();if(!next||new URL(next).hostname.replace(/^www\./,'')!==domain)return formJson(current);url=next;continue;}
   break;
  }
  if(!response?.ok||!response.headers.get('content-type')?.includes('text/html')){await response?.body?.cancel();return formJson(current);}
  const reader=response.body?.getReader();if(!reader)return formJson(current);let html='',size=0;const decoder=new TextDecoder();
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>1500000){await reader.cancel();return formJson(current);}html+=decoder.decode(value,{stream:true});}html+=decoder.decode();
  const found=extractBusinessDetails(html,url,v.city,v.name,v.streetAddress||'');
  await db.prepare("UPDATE directory_records SET payload=json_patch(payload,?) WHERE id=? AND status IN ('approved','listed')").bind(JSON.stringify(found),id).run();
  return formJson({...current,...found});
 }catch{return formJson({error:'The official website could not be reached. Please try again later.'},503);}
}
