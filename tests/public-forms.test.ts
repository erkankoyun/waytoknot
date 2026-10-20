import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { formBody, formRateLimit, savePrivateRecord } from '../lib/public-forms';
import { parseVendorInquiry } from '../lib/vendor-inquiry';
import { validateSeatingPlan } from '../lib/seating-plan';
function fixture(){const sql=new DatabaseSync(':memory:');sql.exec('CREATE TABLE api_limits(key TEXT PRIMARY KEY,window INTEGER,count INTEGER); CREATE TABLE advisor_sessions(id TEXT PRIMARY KEY,data TEXT,email TEXT,created_at INTEGER,updated_at INTEGER,expires_at INTEGER)');const db={prepare(text:string){const stmt=sql.prepare(text);let values:unknown[]=[];const q={bind(...args:unknown[]){values=args;return q;},async first(){return stmt.get(...values as never[])||null;},async run(){return {meta:{changes:stmt.run(...values as never[]).changes}};}};return q;}} as unknown as D1Database;return {sql,db};}
test('seating snapshots preserve placements and assignments while restricting imported objects and sizes',()=>{
 const plan=validateSeatingPlan({version:1,configs:[{layout:'round-6',count:2}],guestsText:'Emma | Family | stage\nJames | Family',pairsText:'Emma | James',tables:[{id:'table-1',position:{x:240,y:160},area:'annex',collapsed:true}],assignments:[{guestId:'guest-0-emma',seatId:'table-1-seat-1'}],objects:[{type:'bar',label:'Bar',position:{x:20,y:30}}]});
 assert.equal(plan.tables[0].position.x,240);assert.equal(plan.tables[0].area,'annex');assert.equal(plan.assignments[0].seatId,'table-1-seat-1');assert.equal(plan.objects[0].label,'Bar');assert.deepEqual(validateSeatingPlan(JSON.parse(JSON.stringify(plan))),plan);
 assert.throws(()=>validateSeatingPlan({...plan,configs:[{layout:'<script>',count:1}]}));assert.throws(()=>validateSeatingPlan({...plan,guestsText:'Guest\n'.repeat(2001)}));assert.throws(()=>validateSeatingPlan({...plan,version:9}));
 const bounded=validateSeatingPlan({...plan,objects:[{type:'bad-type',label:'label',position:{x:1e10,y:-7}}]});assert.equal(bounded.objects[0].type,'ozel');assert.deepEqual(bounded.objects[0].position,{x:20000,y:0});
});
test('business inquiries require contact details, a supported category and consent, and reject script URLs',()=>{
 const valid={city:'Albany, NY',category:'photography',business:'Example Studio',contact:'Example Person',phone:'5185550100',email:'INFO@example.com',website:'https://example.com',consent:true};
 assert.equal(parseVendorInquiry(valid).email,'info@example.com');assert.throws(()=>parseVendorInquiry({...valid,consent:false}));assert.throws(()=>parseVendorInquiry({...valid,website:'javascript:alert(1)'}));assert.throws(()=>parseVendorInquiry({...valid,category:'nonexistent'}));
});
test('public form endpoints reject cross-origin and oversized bodies',async()=>{
 await assert.rejects(()=>formBody(new Request('https://waytoknot.com/api/seating',{method:'POST',headers:{Origin:'https://other.example'},body:'{}'})));
 await assert.rejects(()=>formBody(new Request('https://waytoknot.com/api/seating',{method:'POST',body:'{"text":"oversized"}'}),5));
 assert.deepEqual(await formBody(new Request('https://waytoknot.com/api/seating',{method:'POST',headers:{Origin:'https://waytoknot.com'},body:'{"mode":"load"}'})),{mode:'load'});
});
test('private record writes preserve creation time and rate limits are enforced atomically',async()=>{
 const {db,sql}=fixture();assert.equal(await formRateLimit(db,'test-key',2),true);assert.equal(await formRateLimit(db,'test-key',2),true);assert.equal(await formRateLimit(db,'test-key',2),false);
 await savePrivateRecord(db,'seating-test',{plan:1},'person@example.com',9999999999);const first=sql.prepare('SELECT * FROM advisor_sessions WHERE id=?').get('seating-test');await savePrivateRecord(db,'seating-test',{plan:2},'person@example.com',9999999999);const second=sql.prepare('SELECT * FROM advisor_sessions WHERE id=?').get('seating-test');assert.equal(first?.created_at,second?.created_at);assert.equal(JSON.parse(String(second?.data)).plan,2);sql.close();
});
