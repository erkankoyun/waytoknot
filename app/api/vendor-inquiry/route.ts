import { env } from 'cloudflare:workers';
import { digest,field,formBody,formJson,formRateLimit,randomToken,savePrivateRecord } from '@/lib/public-forms';
import { parseVendorInquiry } from '@/lib/vendor-inquiry';
export async function POST(request:Request){
 let body:Record<string,unknown>;
 try{body=await formBody(request,15000);}catch{return formJson({error:'Invalid request.'},400);}
 if(field(body.fax,100))return formJson({error:'This request could not be submitted.'},400);
 let inquiry;try{inquiry=parseVendorInquiry(body);}catch(error){return formJson({error:error instanceof Error?error.message:'Please check your entries.'},400);}
 const db=(env as {DB?:D1Database}).DB;if(!db)return formJson({error:'Business requests are temporarily unavailable.'},503);
 try{
  const ip=await digest(request.headers.get('cf-connecting-ip')||'anonymous');
  if(!await formRateLimit(db,'vendor-inquiry:'+ip,5))return formJson({error:'Too many requests. Please try again later.'},429);
  const reference='vendor_'+randomToken();
  await savePrivateRecord(db,reference,{kind:'vendor_inquiry',status:'pending',submitted_at:new Date().toISOString(),...inquiry},inquiry.email,Math.floor(Date.now()/1000)+90*86400);
  return formJson({saved:true,reference},201);
 }catch{return formJson({error:'The live database could not save your request. Please try again later.'},503);}
}
