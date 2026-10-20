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
 const d=extractBusinessDetails('<meta content="/photo.jpg?a=1&amp;b=2" property="og:image"><meta property="og:image"><script type="application/ld+json">broken</script>','https://example.com/','Albany','Shop');
 assert.deepEqual(d.images,['https://example.com/photo.jpg?a=1&b=2']);assert.equal(d.openingHours,undefined);
 for(const url of ['https://127.0.0.1/','https://localhost/','https://host.local/','https://user:password@example.com/','https://example.com:8080/','http://example.com/','https://[::1]/'])assert.equal(publicBusinessUrl(url),null,url);
});
