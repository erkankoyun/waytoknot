import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { mapDirectoryView, mapOptions, mapVendor } from '../lib/map-directory';

function fixture(){
 const sql=new DatabaseSync(':memory:');sql.exec(readFileSync(new URL('../scripts/cloudflare-staging-schema.sql',import.meta.url),'utf8'));sql.exec(readFileSync(new URL('../scripts/map-viewport-index.sql',import.meta.url),'utf8'));
 const statement=sql.prepare('INSERT INTO directory_records VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
 sql.exec('BEGIN');
 for(let i=0;i<5001;i++){
  const v={id:'v'+i,name:'Studio '+i,category:i%2?'hairsalon':'photography',city:i%2?'Boston':'Albany',state:i%2?'MA':'NY',coords:[42+(i%100)/1000,-73+(i%100)/1000],phone:'+15185551234',address:'1 Main St',url:'https://example.com/',images:['https://example.com/photo.jpg'],openingHours:['Mo 09:00-17:00']};
  statement.run(v.id,v.id,v.name,v.category,v.city,v.city.toLowerCase(),v.state,'US',v.url,v.url,i===100?'pending':'listed',String(v.coords[0]),String(v.coords[1]),v.name.toLowerCase()+' '+v.city.toLowerCase(),JSON.stringify(v),null,'now');
 }
 for(const [id,lon] of [['east',179.5],['west',-179.5]] as const){const v={id,name:id,category:'photography',city:'Island',state:'NY',coords:[0,lon]};statement.run(id,id,id,'photography','Island','island','NY','US','https://example.com','https://example.com','listed','0',String(lon),id,JSON.stringify(v),null,'now');}
 sql.exec('COMMIT');
 const db={prepare(text:string){const statement=sql.prepare(text);let args:unknown[]=[];const query={bind(...v:unknown[]){args=v;return query;},async all(){return {results:statement.all(...args as never[])};},async first(){return statement.get(...args as never[])||null;}};return query;}} as unknown as D1Database;
 return {sql,db};
}
test('viewport clusters represent every matching business while the list stays bounded',async()=>{
 const {sql,db}=fixture();const options=mapOptions(new URLSearchParams());const view=await mapDirectoryView(db,options);if(view.mode!=='viewport')throw Error();
 assert.equal(view.total,5002);assert.equal(view.results.length,80);assert.ok(view.clusters.length<700);assert.equal(view.clusters.reduce((n,c)=>n+c.count,0),5002);
 const ids=new Set(view.results.map(v=>v.id));let cursor=view.next_cursor;
 while(cursor){const page=await mapDirectoryView(db,{...options,cursor:Number(cursor)},true);for(const v of page.results){assert.ok(!ids.has(v.id));ids.add(v.id);}cursor=page.next_cursor;}
 assert.equal(ids.size,5002);assert.ok(!ids.has('v100'));sql.close();
});
test('moving the map, category and natural-language searches filter the full database',async()=>{
 const {sql,db}=fixture();
 const view=await mapDirectoryView(db,mapOptions(new URLSearchParams({bbox:'-73.1,41,-72,43',q:'photographers in New York state'})));if(view.mode!=='viewport')throw Error();assert.equal(view.total,2500);assert.ok(view.results.every(v=>v.category==='photography'&&v.state==='NY'));
 const category=await mapDirectoryView(db,mapOptions(new URLSearchParams({category:'hairsalon'})));if(category.mode!=='viewport')throw Error();assert.equal(category.total,2500);
 const none=await mapDirectoryView(db,mapOptions(new URLSearchParams({q:'unicornxyz'})));if(none.mode!=='viewport')throw Error();assert.equal(none.total,0);
 sql.close();
});
test('dateline views and oversized zoom requests keep clusters bounded',async()=>{
 const {sql,db}=fixture();const view=await mapDirectoryView(db,mapOptions(new URLSearchParams({bbox:'170,-10,-170,10',zoom:'19'})));if(view.mode!=='viewport')throw Error();assert.equal(view.total,2);
 const world=await mapDirectoryView(db,mapOptions(new URLSearchParams({zoom:'19'})));if(world.mode!=='viewport')throw Error();assert.equal(world.total,5002);assert.ok(world.clusters.length<700);sql.close();
});
test('business details preserve phone images hours website and location, pending stays private',async()=>{
 const {sql,db}=fixture();const business=await mapVendor(db,'v0');assert.equal(business?.name,'Studio 0');assert.deepEqual(business?.coords,[42,-73]);assert.equal(business?.phone,'+15185551234');assert.ok(business?.images?.length);assert.ok(business?.openingHours?.length);assert.equal(await mapVendor(db,'v100'),null);assert.equal(await mapVendor(db,'missing'),null);sql.close();
});
test('invalid viewport inputs fail before a database query',()=>{
 for(const params of [{bbox:'NaN,0,1,1'},{bbox:'0,10,1,-10'},{bbox:'0,,1,1'},{bbox:'0,0,0,1'},{category:'invalid'},{zoom:'Infinity'},{cursor:'-1'}])assert.throws(()=>mapOptions(new URLSearchParams(params)));
});
