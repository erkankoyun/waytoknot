import {env} from 'cloudflare:workers';
import {importDirectoryRecords,validateDirectoryRecord,type DirectoryInput} from '@/lib/directory';
const runtime=env as {DB?:D1Database;CATALOG_IMPORT_TOKEN?:string};
const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 const token=runtime.CATALOG_IMPORT_TOKEN;
 if(!token||request.headers.get('Authorization')!=='Bearer '+token)return json({error:'Not found'},404);
 if(!runtime.DB)return json({error:'Directory storage unavailable'},503);
 if(!request.headers.get('Content-Type')?.includes('application/json'))return json({error:'JSON required'},415);
 const raw=await request.text();if(raw.length>1000000)return json({error:'Batch too large'},413);
 let records:DirectoryInput[];
 try{const data=JSON.parse(raw);if(!Array.isArray(data.records)||!data.records.length||data.records.length>50)throw Error('Use batches of 1–50 records');records=data.records.map(validateDirectoryRecord);}catch(e){return json({error:e instanceof Error?e.message:'Invalid records'},400);}
 try{return json(await importDirectoryRecords(runtime.DB,records));}catch{return json({error:'Import failed; no batch was committed'},500);}
}
