import { env } from 'cloudflare:workers';
import { digest,field,formBody,formJson,formRateLimit,randomToken,savePrivateRecord,validEmail } from '@/lib/public-forms';
import { validateSeatingPlan } from '@/lib/seating-plan';
type Runtime={DB?:D1Database;RESEND_API_KEY?:string;EMAIL_FROM?:string};
type Saved={data:string;email:string|null;expires_at:number};
export async function GET(){const runtime=env as Runtime;return formJson({email_enabled:!!(runtime.DB&&runtime.RESEND_API_KEY&&runtime.EMAIL_FROM)});}
export async function POST(request:Request){
 let body:Record<string,unknown>;try{body=await formBody(request);}catch{return formJson({error:'Invalid request.'},400);}
 const runtime=env as Runtime,db=runtime.DB;if(!db)return formJson({error:'Cloud saving is temporarily unavailable. Download your plan instead.'},503);
 const mode=field(body.mode,30),now=Math.floor(Date.now()/1000);
 try{
  const ip=await digest(request.headers.get('cf-connecting-ip')||'anonymous');
  if(!await formRateLimit(db,'seating:'+ip,40))return formJson({error:'Too many requests. Please try again later.'},429);
  if(mode==='send_code'){
   if(!runtime.RESEND_API_KEY||!runtime.EMAIL_FROM)return formJson({error:'Email access is not configured yet. Save on this device or download your plan.'},503);
   const email=field(body.email,254).toLowerCase();if(!validEmail(email))return formJson({error:'Please enter a valid email address.'},400);
   const key=await digest(email);
   if(!await formRateLimit(db,'seating-email-minute:'+key,1,60)||!await formRateLimit(db,'seating-email-hour:'+key,3))return formJson({error:'Please wait before requesting another code.'},429);
   let plan;try{if(body.plan)plan=validateSeatingPlan(body.plan);}catch(error){return formJson({error:error instanceof Error?error.message:'Invalid plan.'},400);}
   const code=String(crypto.getRandomValues(new Uint32Array(1))[0]%1000000).padStart(6,'0'),salt=randomToken();
   await savePrivateRecord(db,'seating-code:'+key,{hash:await digest(salt+code),salt,attempts:0,plan:plan||null},email,now+900);
   const response=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(15000),headers:{Authorization:'Bearer '+runtime.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'seating-code-'+salt},body:JSON.stringify({from:runtime.EMAIL_FROM,to:[email],subject:'Your Way to Knot seating plan access code',text:'Your seating plan access code is '+code+'. It expires in 15 minutes and can be used once. If you did not request this code, ignore this email.',html:'<!doctype html><html lang="en"><head><title>Your seating plan access code</title></head><body style="font:16px/1.6 Arial,sans-serif;color:#15176e"><h1 style="font-size:24px">Your seating plan access code</h1><p>Enter this code on Way to Knot to access your seating plan:</p><p style="font:32px monospace;letter-spacing:6px">'+code+'</p><p>This code expires in 15 minutes and can be used once.</p><p>If you did not request it, ignore this email.</p></body></html>'})});
   if(!response.ok){await db.prepare('DELETE FROM advisor_sessions WHERE id=?').bind('seating-code:'+key).run();return formJson({error:'The code could not be sent. Please try again later.'},502);}
   return formJson({sent:true});
  }
  if(mode==='verify_code'){
   const email=field(body.email,254).toLowerCase(),code=field(body.code,6);if(!validEmail(email)||!/^\d{6}$/.test(code))return formJson({error:'Enter your email and six-digit code.'},400);
   const key=await digest(email),id='seating-code:'+key;
   // Reserve an attempt before checking to make parallel guessing ineffective.
   const row=await db.prepare("UPDATE advisor_sessions SET data=json_set(data,'$.attempts',json_extract(data,'$.attempts')+1) WHERE id=? AND expires_at>? AND json_extract(data,'$.attempts')<5 RETURNING data,email,expires_at").bind(id,now).first<Saved>();
   if(!row)return formJson({error:'This code is expired or unavailable. Request a new code.'},400);
   const challenge=JSON.parse(row.data);if(await digest(challenge.salt+code)!==challenge.hash)return formJson({error:'The code is incorrect.'},400);
   const consumed=await db.prepare('DELETE FROM advisor_sessions WHERE id=? AND expires_at>?').bind(id,now).run();if(!consumed.meta.changes)return formJson({error:'This code has already been used.'},400);
   if(challenge.plan)await savePrivateRecord(db,'seating-plan:'+key,validateSeatingPlan(challenge.plan),email,now+90*86400);
   const token=randomToken();await savePrivateRecord(db,'seating-session:'+token,{key},email,now+7*86400);
   const saved=await db.prepare('SELECT data,email,expires_at FROM advisor_sessions WHERE id=? AND expires_at>?').bind('seating-plan:'+key,now).first<Saved>();
   return formJson({token,plan:saved?validateSeatingPlan(JSON.parse(saved.data)):null});
  }
  const token=field(body.token,64);if(!/^[a-f0-9]{64}$/.test(token))return formJson({error:'Please verify your email to access a cloud plan.'},401);
  const session=await db.prepare('SELECT data,email,expires_at FROM advisor_sessions WHERE id=? AND expires_at>?').bind('seating-session:'+token,now).first<Saved>();if(!session)return formJson({error:'Your session expired. Verify your email again.'},401);
  const {key}=JSON.parse(session.data);
  if(mode==='save'){
   let plan;try{plan=validateSeatingPlan(body.plan);}catch(error){return formJson({error:error instanceof Error?error.message:'Invalid plan.'},400);}
   await savePrivateRecord(db,'seating-plan:'+key,plan,session.email,now+90*86400);return formJson({saved:true});
  }
  if(mode==='load'){
   const saved=await db.prepare('SELECT data,email,expires_at FROM advisor_sessions WHERE id=? AND expires_at>?').bind('seating-plan:'+key,now).first<Saved>();return formJson({plan:saved?validateSeatingPlan(JSON.parse(saved.data)):null});
  }
  return formJson({error:'Unknown seating action.'},400);
 }catch{return formJson({error:'The live service could not complete this request. Your local plan is unchanged; download it to keep a copy.'},503);}
}
