import {env} from 'cloudflare:workers';
export async function GET(){
 const db=(env as Cloudflare.Env).DB;if(!db)return Response.json({error:'Live directory unavailable'},{status:503});
 const job=await db.prepare("SELECT processed,with_images,with_hours,with_phone,started_at,updated_at,completed_at FROM catalog_enrichment_jobs WHERE id='business-details-v1'").first();
 return Response.json({job,status:job?.completed_at?'complete':'in_progress',notice:'Only information published by official business websites is saved. Missing or inaccessible information is not guessed.'},{headers:{'Cache-Control':'public, max-age=30'}});
}
