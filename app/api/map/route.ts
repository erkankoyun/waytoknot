import { env } from 'cloudflare:workers';
import { mapDirectoryView, mapOptions, mapVendor } from '@/lib/map-directory';

export async function GET(request:Request) {
  const db=(env as Cloudflare.Env).DB;
  if(!db)return Response.json({error:'The live directory is not connected.'},{status:503});
  const params=new URL(request.url).searchParams;
  let options;
  try {options=mapOptions(params);if(params.has('vendor')&&(!params.get('vendor')||params.get('vendor')!.length>200))throw Error('Invalid business');}
  catch(error){return Response.json({error:error instanceof Error?error.message:'Invalid map request'},{status:400});}
  try {
    if(params.has('vendor')){const vendor=await mapVendor(db,params.get('vendor')!);return Response.json(vendor?{vendor}:{error:'Business not found'},{status:vendor?200:404,headers:{'Cache-Control':'public, max-age=60'}});}
    const data=await mapDirectoryView(db,options,params.get('list')==='1');
    return Response.json(data,{headers:{'Cache-Control':'public, max-age=60','Server-Timing':'map;desc="viewport query"'}});
  } catch(error) {
    console.error('Vendor map query failed:',error instanceof Error?error.message:'unknown');
    return Response.json({error:'Live vendor data is temporarily unavailable. Please retry.'},{status:503,headers:{'Cache-Control':'no-store'}});
  }
}
