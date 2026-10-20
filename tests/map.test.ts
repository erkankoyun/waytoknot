import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { mapDirectoryPage } from '../lib/map-directory';

test('map keyset pages cover the live directory without exposing pending vendors or dropping records', async () => {
  const sql = new DatabaseSync(':memory:');
  sql.exec('CREATE TABLE directory_records(id TEXT PRIMARY KEY, status TEXT, payload TEXT)');
  const insert = sql.prepare('INSERT INTO directory_records VALUES(?,?,?)');
  for (let i=0;i<1201;i++) insert.run(String(i).padStart(5,'0'), i===600?'pending':i%2?'approved':'listed', JSON.stringify({id:String(i).padStart(5,'0'),name:'Vendor '+i}));
  const db = {prepare(text:string) { const statement=sql.prepare(text); let args:string[]=[];const query={bind(...values:string[]){args=values;return query;},async all(){return {results:statement.all(...args)};}};return query;}} as unknown as D1Database;
  let cursor='', ids:string[]=[];const lengths:number[]=[];
  do {const page=await mapDirectoryPage(db,cursor);ids.push(...page.results.map(v=>v.id));lengths.push(page.results.length);cursor=page.next_cursor||'';} while(cursor);
  assert.deepEqual(lengths,[500,500,200]);assert.equal(ids.length,1200);assert.equal(new Set(ids).size,1200);assert.ok(!ids.includes('00600'));
  assert.deepEqual((await mapDirectoryPage(db,'zzzz')).results,[]);sql.close();
});
