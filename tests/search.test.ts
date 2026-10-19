import {test} from 'node:test';
import assert from 'node:assert/strict';
import {searchVendors as search,vendors} from '../lib/catalog';

test('typos and Turkish natural-language requests recover the intended category and location',()=>{
 const typo=search('photogrpher in Albany');
 assert.ok(typo.total>0);assert.match(typo.corrected_query!,/photographer/);
 assert.ok(typo.results.every(v=>v.category==='photography'&&v.city==='Albany'));
 const english=search('outdoor wedding venues near Albany');
 const turkish=search('Albany yakınlarında açık hava düğün mekanı');
 assert.deepEqual(turkish.results.map(v=>v.id),english.results.map(v=>v.id));
 assert.ok(english.results.some(v=>v.id==='birch-hill-estate'));
 assert.ok(english.results.every(v=>v.tags?.includes('outdoor')));
 assert.ok(english.results.every(v=>v.distanceMiles!==undefined&&v.distanceMiles<=50));
 assert.ok(search("I'm looking for the best wedding photographer near Albany").total>0);
 assert.ok(search('florits near Albany').results.every(v=>v.category==='florist'));
});
test('nearby search respects the radius, explicit filters and unknown locations',()=>{
 const narrow=search('venue within 1 mile of Albany');
 assert.ok(narrow.total>0);assert.ok(narrow.results.every(v=>v.city==='Albany'));
 assert.equal(search('venue within 1 mile of Albany','','',1,25).radius_miles,25);
 assert.ok(search('venue within 1 mile of Albany','','',1,25).results.some(v=>v.id==='birch-hill-estate'));
 assert.equal(search('DJ near me').needs_location,true);
 assert.equal(search('DJ near me').total,0);
 assert.equal(search('venues near Atlantis').total,0);
 assert.equal(search('quantum gravity').total,0);
 assert.ok(search('wedding photographer','photography','Albany').results.every(v=>v.city==='Albany'));
 assert.ok(search('bridal Washington DC').results.some(v=>v.state==='DC'));
 assert.ok(search('NYC bridal').results.every(v=>v.city==='New York'));
 assert.equal(search('affordable venue near Albany').unsupported_constraints,true);
});
test('prefix suggestions, pagination and records remain consistent across the expanded index',()=>{
 assert.ok(search('Conw','','',1,50,true).results.some(v=>v.id==='conway-entertainment'));
 const all=search('');const ids=[];
 for(let p=1;p<=all.pages;p++)ids.push(...search('','','',p).results.map(v=>v.id));
 assert.equal(new Set(ids).size,vendors.length);
 assert.equal(new Set(vendors.map(v=>v.id)).size,vendors.length);
 assert.ok(all.categories.length>=15);
 for(const v of vendors){
  assert.ok(search(v.name).results.some(r=>r.id===v.id),v.name);
  assert.equal(new URL(v.source).protocol,'https:');assert.equal(new URL(v.url).protocol,'https:');
  assert.ok(v.coords.length===2&&v.coords[0]>=-90&&v.coords[0]<=90&&v.coords[1]>=-180&&v.coords[1]<=180);
  assert.match(v.checkedAt,/^\d{4}-\d{2}-\d{2}$/);
 }
 const empty=search('outdoor venues in Seattle');assert.equal(empty.total,0);assert.ok(empty.suggestions.length>0);
});
