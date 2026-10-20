export const privateHeaders={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
export function formJson(value:unknown,status=200){return Response.json(value,{status,headers:privateHeaders});}
export async function formBody(request:Request,max=300000):Promise<Record<string,unknown>>{
 const origin=request.headers.get('Origin');if(origin&&origin!==new URL(request.url).origin)throw new Error('Origin not allowed');
 if(Number(request.headers.get('content-length')||0)>max)throw new Error('Request too large');
 const raw=await request.text();if(raw.length>max)throw new Error('Request too large');
 const body=JSON.parse(raw);if(!body||typeof body!=='object'||Array.isArray(body))throw new Error('Invalid request');return body;
}
export function field(value:unknown,max:number){return typeof value==='string'?value.trim().slice(0,max):'';}
export async function digest(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).map(b=>b.toString(16).padStart(2,'0')).join('');}
export function randomToken(){return Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b=>b.toString(16).padStart(2,'0')).join('');}
export async function formRateLimit(db:D1Database,key:string,max:number,seconds=3600){
 const window=Math.floor(Date.now()/1000/seconds);
 const row=await db.prepare('INSERT INTO api_limits(key,window,count) VALUES(?,?,1) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN api_limits.window=excluded.window THEN api_limits.count+1 ELSE 1 END,window=excluded.window RETURNING count').bind(key,window).first<{count:number}>();return (row?.count||0)<=max;
}
export async function savePrivateRecord(db:D1Database,id:string,data:unknown,email:string|null,expires:number){
 const now=Math.floor(Date.now()/1000);
 await db.prepare('INSERT INTO advisor_sessions(id,data,email,created_at,updated_at,expires_at) VALUES(?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,email=excluded.email,updated_at=excluded.updated_at,expires_at=excluded.expires_at').bind(id,JSON.stringify(data),email,now,now,expires).run();
}
export function validEmail(value:string){return value.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);}
