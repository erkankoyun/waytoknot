import {env} from 'cloudflare:workers';
import {crawlBusiness} from '@/lib/business-crawl';
import {digest,formRateLimit,formJson} from '@/lib/public-forms';
import type {Vendor} from '@/lib/catalog';
function details(v:Vendor){return {images:v.images,openingHours:v.openingHours,detailsSource:v.detailsSource,detailsCheckedAt:v.detailsCheckedAt,phone:v.phone,address:v.address,streetAddress:v.streetAddress,postalCode:v.postalCode};}
export async function GET(request:Request){
 const id=new URL(request.url).searchParams.get('id')||'';if(!id||id.length>200)return formJson({error:'A valid business is required.'},400);
 const db=(env as Cloudflare.Env).DB;if(!db)return formJson({error:'Live business details are unavailable.'},503);
 try{
  const row=await db.prepare("SELECT payload FROM directory_records WHERE id=? AND status IN ('approved','listed')").bind(id).first<{payload:string}>();if(!row)return formJson({error:'Business not found.'},404);
  const v=JSON.parse(row.payload) as Vendor,current=details(v);
  if(v.detailsCheckedAt&&Date.now()-Date.parse(v.detailsCheckedAt)<7*86400000)return formJson(current);
  const ip=request.headers.get('CF-Connecting-IP')||'anonymous';if(!await formRateLimit(db,'details:'+await digest(ip),60))return formJson({...current,notice:'Refresh limit reached. Visit the official website for current details.'});
  const found=await crawlBusiness(v);
  await db.prepare("UPDATE directory_records SET payload=json_patch(payload,?) WHERE id=? AND status IN ('approved','listed')").bind(JSON.stringify(found),id).run();
  return formJson({...current,...found});
 }catch{return formJson({error:'The official website could not be reached. Please try again later.'},503);}
}
