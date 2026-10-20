import { categoryLabels } from './catalog';
import { field, validEmail } from './public-forms';
export function parseVendorInquiry(body:Record<string,unknown>){
 const value={city:field(body.city,100),category:field(body.category,50),business:field(body.business,160),contact:field(body.contact,100),phone:field(body.phone,40),email:field(body.email,254).toLowerCase(),website:field(body.website,500),notes:field(body.notes,2000),consent:body.consent===true};
 if(!value.city||!Object.hasOwn(categoryLabels,value.category)||value.business.length<2||value.contact.length<2||value.phone.replace(/\D/g,'').length<10||!validEmail(value.email)||!value.consent)throw new Error('Please complete the business and contact details and accept the privacy information.');
 if(value.website){const u=new URL(value.website);if(!['http:','https:'].includes(u.protocol)||u.username||u.password)throw new Error('Please enter a public http or https website.');}
 return value;
}
