import {env} from 'cloudflare:workers';
import { searchDirectory } from '@/lib/directory';
export async function GET(request:Request){
 const p=new URL(request.url).searchParams;
 const args:[string,string,string,number,number,boolean]=[(p.get('q')||'').slice(0,200),(p.get('category')||'').slice(0,40),(p.get('city')||'').slice(0,80),Number(p.get('page')||1),Number(p.get('radius')||0),p.get('suggest')==='1'];
 const db=(env as {DB?:D1Database}).DB;
 try{if(!db)throw new Error('Live directory unavailable');const data=await searchDirectory(db,...args,p.get('metadata')==='1');return Response.json(data,{headers:{'Cache-Control':'public, max-age=30'}});}catch{return Response.json({error:'Live directory search is temporarily unavailable. No partial results are shown.'},{status:503,headers:{'Cache-Control':'no-store'}}); }
}
