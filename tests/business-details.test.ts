import {test} from 'node:test';
import assert from 'node:assert/strict';
import {extractBusinessDetails,publicBusinessUrl} from '../lib/business-details';
test('business enrichment uses only published details for the matching location',()=>{
 const records=[{name:'Other branch',address:{addressLocality:'Boston'},openingHours:'Mo 01:00-02:00',image:'https://example.com/wrong.jpg'},{name:'Albany Shop',address:{addressLocality:'Albany'},openingHoursSpecification:{dayOfWeek:['https://schema.org/Monday'],opens:'09:00',closes:'17:00'},image:{url:'/albany.jpg'}}];
 const details=extractBusinessDetails('<script type="application/ld+json">'+JSON.stringify(records)+'</script>','https://example.com/albany','Albany','Albany Shop');
 assert.deepEqual(details.images,['https://example.com/albany.jpg']);assert.deepEqual(details.openingHours,['Monday: 09:00–17:00']);
 assert.equal(details.detailsSource,'https://example.com/albany');
});
test('enrichment never invents hours and restricts URL protocols, credentials and local targets',()=>{
 const d=extractBusinessDetails('<h1>Shop</h1><meta content="/photo.jpg?a=1&amp;b=2" property="og:image"><meta property="og:image"><script type="application/ld+json">broken</script>','https://example.com/','Albany','Shop');
 assert.deepEqual(d.images,['https://example.com/photo.jpg?a=1&b=2']);assert.equal(d.openingHours,undefined);
 for(const url of ['https://127.0.0.1/','https://localhost/','https://host.local/','https://user:password@example.com/','https://example.com:8080/','http://example.com/','https://[::1]/'])assert.equal(publicBusinessUrl(url),null,url);
});
test('matching business photos exclude logos, tracking pixels and unrelated pages',()=>{
 const html='<h1>Albany Shop</h1><meta property="og:image" content="/logo_white.png"><img src="/favicon.png"><img src="/bakery.jpg" width="800" height="600"><img src="/pixel.jpg" width="1" height="1"><img data-src="/interior.jpg" src="data:image/png;base64,AA=="><img src="/mark.png" alt="Company logo">';
 assert.deepEqual(extractBusinessDetails(html,'https://example.com/','Albany','Albany Shop').images,['https://example.com/bakery.jpg','https://example.com/interior.jpg']);
 assert.equal(extractBusinessDetails('<h1>Other business</h1><meta property="og:image" content="/wrong.jpg"><img src="/wrong.jpg">','https://example.com/','Albany','Albany Shop').images,undefined);
});
test('same-city unrelated businesses and other branches do not supply phone or hours',()=>{
 const nodes=[{name:'Other Shop',address:{addressLocality:'Albany'},telephone:'5185551000',openingHours:'Mo 01:00-02:00'},{name:'Our Shop',address:{addressLocality:'Boston'},telephone:'6175551000',openingHours:'Mo 03:00-04:00'}];
 const details=extractBusinessDetails('<script type="application/ld+json">'+JSON.stringify(nodes)+'</script>','https://example.com/albany','Albany','Our Shop');assert.equal(details.phone,undefined);assert.equal(details.openingHours,undefined);
});
test('one published phone and visible published hours are extracted without guessing',()=>{
 const d=extractBusinessDetails('<h1>Albany Shop</h1><a href="tel:518-555-1234">Call us</a><p>Monday - Friday: 9:00 AM - 5:00 PM</p>','https://example.com/','Albany','Albany Shop');assert.equal(d.phone,'+15185551234');assert.deepEqual(d.openingHours,['Monday - Friday: 9:00 AM - 5:00 PM']);
 const ambiguous=extractBusinessDetails('<h1>Albany Shop</h1><a href="tel:5185551234">One</a><a href="tel:5185556789">Two</a>','https://example.com/','Albany','Albany Shop');assert.equal(ambiguous.phone,undefined);
});
test('a conflicting street address is rejected even when business name and city match',()=>{
 const d=extractBusinessDetails('<script type="application/ld+json">'+JSON.stringify({name:'Chain',url:'https://example.com/',address:{addressLocality:'Albany',streetAddress:'99 Other St'},telephone:'5185551234',openingHours:'Mo 09:00-17:00'})+'</script>','https://example.com/','Albany','Chain','1 Main Street');assert.equal(d.phone,undefined);assert.equal(d.openingHours,undefined);
});
