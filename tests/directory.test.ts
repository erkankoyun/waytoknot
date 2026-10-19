import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {vendors,searchVendors,weddingCategories} from '../lib/catalog';
import {businessKey,importDirectoryRecords,invalidateDirectoryMetadata,searchDirectory,validateDirectoryRecord,type DirectoryInput} from '../lib/directory';

function fixture(){
 const sql=new DatabaseSync(':memory:');
 sql.exec(readFileSync(new URL('../drizzle/0001_light_mentor.sql',import.meta.url),'utf8'));
 const db={prepare(text:string){let args:unknown[]=[];const stmt=sql.prepare(text);const query={bind(...values:unknown[]){args=values;return query;},async all(){return {results:stmt.all(...args as never[])};},async first(){return stmt.get(...args as never[])||null;},async run(){return {meta:{changes:stmt.run(...args as never[]).changes}};}};return query;},async batch(statements:Array<{run:()=>Promise<unknown>}>){sql.exec('BEGIN');try{const result=[];for(const s of statements)result.push(await s.run());sql.exec('COMMIT');return result;}catch(e){sql.exec('ROLLBACK');throw e;}}} as unknown as D1Database;
 invalidateDirectoryMetadata();return {sql,db};
}
test('all requested categories exist and accept English/Turkish aliases',()=>{
 assert.equal(weddingCategories.length,44);
 for(const [query,id] of [['berberler','barber'],['kuyumcular','jeweler'],['jewelers','jeweler'],['takım elbise','groom'],['hediyelik eşya','gifts'],['güzellik salonları Saratoga','beauty']]){
  const result=searchVendors(query.includes('Saratoga')?query:query+' Albany');assert.ok(result.categories.includes(id));
  assert.ok(result.total>0,query);assert.ok(result.results.every(v=>v.category===id),query);
 }
});
test('reviewed records publish, candidates stay private, dedupe keeps separate branches',async()=>{
 const {db,sql}=fixture();
 const seed={...vendors[0],verification:'manual' as const};
 await importDirectoryRecords(db,[validateDirectoryRecord(seed)]);
 const pending={...seed,id:'pending',name:'Pending Shop',verification:undefined};
 await importDirectoryRecords(db,[pending]);
 assert.equal((await searchDirectory(db,'')).indexed_count,1);
 await importDirectoryRecords(db,[{...seed,id:'same-business',url:seed.url.replace('https:','http:')}]);
 assert.equal((await searchDirectory(db,'')).indexed_count,1);
 await importDirectoryRecords(db,[{...seed,id:'branch',city:'Different City'}]);
 assert.equal((await searchDirectory(db,'')).indexed_count,2);
 assert.notEqual(businessKey(seed),businessKey({...seed,address:'Second branch'}));
 assert.throws(()=>validateDirectoryRecord({...seed,url:'file:///etc/passwd'}));
 assert.throws(()=>validateDirectoryRecord({...seed,verification:'website-fetched',verificationUrl:'https://other.example.com/'}));
 sql.close();invalidateDirectoryMetadata();
});
test('database search handles the reviewed seed, typo correction, city radius and new categories',async()=>{
 const {db,sql}=fixture();
 for(let i=0;i<vendors.length;i+=25)await importDirectoryRecords(db,vendors.slice(i,i+25).map(v=>({...v,verification:'manual' as const})));
 assert.equal((await searchDirectory(db,'photogrpher in Albany')).results[0]?.id,'elario');
 const nearby=await searchDirectory(db,'outdoor venues near Albany');
 assert.ok(nearby.results.some(v=>v.id==='birch-hill-estate'));
 assert.ok((await searchDirectory(db,'jewelers Albany')).results.some(v=>v.id==='glennpeter-albany'));
 assert.equal((await searchDirectory(db,'DJ near me')).total,0);
 assert.equal((await searchDirectory(db,'quantum gravity')).total,0);
 sql.close();invalidateDirectoryMetadata();
});
test('FTS-backed pagination works with 100,000 synthetic test records without loading the full index',async()=>{
 const {db,sql}=fixture();
 const template=vendors[0];
 sql.exec('BEGIN');const stmt=sql.prepare('INSERT INTO directory_records(id,dedupe_key,name,category,city,city_key,state,country,url,source,status,latitude,longitude,search_text,payload,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
 for(let i=0;i<100000;i++){
  const v={...template,id:'fixture-'+i,name:'Fixture Barber '+i,category:'barber',city:'Fixture City',state:'NY'};
  stmt.run(v.id,v.id,v.name,'barber','Fixture City','fixture city','NY','US',v.url,v.source,'approved','42.65','-73.75','fixture barber '+i,JSON.stringify(v),'2026-10-19');
 }
 sql.exec('COMMIT');sql.prepare('INSERT INTO directory_cities(key,name,state,latitude,longitude) VALUES(?,?,?,?,?)').run('fixture city','Fixture City','NY','42.65','-73.75');
 const result=await searchDirectory(db,'barbers in Fixture City','','',10000);
 assert.equal(result.total,100000);assert.equal(result.results.length,10);assert.equal(result.page,10000);assert.equal(result.pages,10000);
 sql.close();invalidateDirectoryMetadata();
});
