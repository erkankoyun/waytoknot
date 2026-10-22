import {crawlBusiness,crawlSession} from './business-crawl';
import type {Vendor} from './catalog';
const jobId='business-details-v1';
export async function enrichDirectoryBatch(db:D1Database){
 const now=Date.now();
 const job=await db.prepare('UPDATE catalog_enrichment_jobs SET lease_until=? WHERE id=? AND completed_at IS NULL AND lease_until<? RETURNING cursor,processed,with_images,with_hours,with_phone').bind(now+10*60*1000,jobId,now).first<{cursor:number;processed:number;with_images:number;with_hours:number;with_phone:number}>();
 if(!job)return;
 try{
  const rows=await db.prepare("SELECT rowid AS position,payload FROM directory_records NOT INDEXED WHERE rowid>? AND status IN ('approved','listed') ORDER BY rowid LIMIT 80").bind(job.cursor).all<{position:number;payload:string}>();
  if(!rows.results.length){await db.prepare('UPDATE catalog_enrichment_jobs SET completed_at=?,lease_until=0 WHERE id=?').bind(new Date().toISOString(),jobId).run();return;}
  const session=crawlSession();let offset=0,images=0,hours=0,phones=0;
  async function worker(){
   while(offset<rows.results.length){
    const row=rows.results[offset++],v=JSON.parse(row.payload) as Vendor;
    if(v.detailsCheckedAt&&Date.now()-Date.parse(v.detailsCheckedAt)<7*86400000)continue;
    const patch=await crawlBusiness(v,session);
    // Never replace existing published contact data with an empty/uncertain result.
    await db.prepare("UPDATE directory_records SET payload=json_patch(payload,?) WHERE id=? AND status IN ('approved','listed')").bind(JSON.stringify(patch),v.id).run();
    if(patch.images?.length)images++;if(patch.openingHours?.length)hours++;if(patch.phone)phones++;
   }
  }
  await Promise.all(Array.from({length:6},()=>worker()));
  await db.prepare('UPDATE catalog_enrichment_jobs SET cursor=?,processed=processed+?,with_images=with_images+?,with_hours=with_hours+?,with_phone=with_phone+?,lease_until=0,updated_at=? WHERE id=?').bind(rows.results[rows.results.length-1].position,rows.results.length,images,hours,phones,new Date().toISOString(),jobId).run();
 }catch(error){console.error('Business enrichment batch failed',error instanceof Error?error.message:'unknown');await db.prepare('UPDATE catalog_enrichment_jobs SET lease_until=0 WHERE id=?').bind(jobId).run();}
}
