import {env} from 'cloudflare:workers';
import {vendors,weddingCategories} from '@/lib/catalog';
export async function GET(){
 const db=(env as {DB?:D1Database}).DB;
 try{
  const rows=await db?.prepare('SELECT status,count(*) AS n FROM directory_records GROUP BY status').all<{status:string;n:number}>();
  const counts=Object.fromEntries(rows?.results.map(r=>[r.status,r.n])||[]);
  return Response.json({target:100000,categories:weddingCategories.length,published:counts.approved||vendors.length,reviewed_in_database:counts.approved||0,pending:counts.pending||0,bulk_crawl_complete:false},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Catalog status unavailable'},{status:503});}
}
