import {test} from 'node:test';
import assert from 'node:assert/strict';
import {crawlBusiness,robotsAllowed} from '../lib/business-crawl';
import type {Vendor} from '../lib/catalog';
const business={id:'test',name:'Test Salon',city:'Albany',state:'NY',url:'https://example.org/albany',streetAddress:'1 Main St'} as Vendor;
test('robots rules select the crawler group and longest matching allow rule',()=>{
 const rules='User-agent: *\nDisallow: /private\nAllow: /private/public\n';assert.equal(robotsAllowed(rules,'/private/x'),false);assert.equal(robotsAllowed(rules,'/private/public/x'),true);
 assert.equal(robotsAllowed(rules+'User-agent: WayToKnotDirectoryBot\nDisallow: /albany\n','/albany'),false);
});
test('crawler respects robots and never contacts a disallowed business page',async()=>{
 const original=globalThis.fetch,calls:string[]=[];globalThis.fetch=(async(input:RequestInfo|URL)=>{calls.push(String(input));return new Response('User-agent: *\nDisallow: /albany',{headers:{'Content-Type':'text/plain'}});}) as typeof fetch;
 try{const result=await crawlBusiness(business);assert.equal(result.detailsCheckState,'unavailable');assert.equal(result.detailsCheckReason,'robots_disallowed');assert.deepEqual(calls,['https://example.org/robots.txt']);}finally{globalThis.fetch=original;}
});
test('crawler follows one official contact link and saves only matching published details',async()=>{
 const original=globalThis.fetch,calls:string[]=[];globalThis.fetch=(async(input:RequestInfo|URL)=>{
  const url=String(input);calls.push(url);if(url.endsWith('/robots.txt'))return new Response('',{status:404,headers:{'Content-Type':'text/plain'}});
  if(url.endsWith('/contact'))return new Response('<h1>Test Salon</h1><a href="tel:5185551234">Call</a><p>Monday: 9 AM - 5 PM</p>',{headers:{'Content-Type':'text/html'}});
  return new Response('<h1>Test Salon</h1><meta property="og:image" content="https://example.org/salon.jpg"><a href="/contact">Contact</a>',{headers:{'Content-Type':'text/html'}});
 }) as typeof fetch;
 try{const result=await crawlBusiness(business);assert.equal(result.phone,'+15185551234');assert.deepEqual(result.images,['https://example.org/salon.jpg']);assert.deepEqual(result.openingHours,['Monday: 9 AM - 5 PM']);assert.equal(calls.length,3);}finally{globalThis.fetch=original;}
});
