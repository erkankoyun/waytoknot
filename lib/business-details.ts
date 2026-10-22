export type BusinessDetails={images?:string[];openingHours?:string[];phone?:string;phoneSource?:string;address?:string;streetAddress?:string;postalCode?:string;detailsSource?:string;detailsCheckedAt?:string};
export function publicBusinessUrl(value:unknown,base?:string){
 if(typeof value!=='string'||!value.trim())return null;
 try{const u=new URL(value,base);if(u.protocol!=='https:'||u.username||u.password||u.port&&u.port!=='443'||!u.hostname.includes('.')||u.hostname.includes(':')||/^(?:[0-9.]+|.*\.local|.*\.localhost|.*\.internal|localhost)$/.test(u.hostname))return null;return u.href;}catch{return null;}
}
export function businessPhone(value:unknown){
 if(typeof value!=='string')return null;
 const digits=value.replace(/\D/g,'');
 if(/^[2-9]\d{2}[2-9]\d{6}$/.test(digits))return '+1'+digits;
 if(/^1[2-9]\d{2}[2-9]\d{6}$/.test(digits))return '+'+digits;
 return null;
}
const decode=(s:string)=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const normal=(s:unknown)=>typeof s==='string'?s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim():'';
const street=(s:unknown)=>normal(s).replace(/\b(street|road|avenue|boulevard|drive|suite)\b/g,v=>({street:'st',road:'rd',avenue:'ave',boulevard:'blvd',drive:'dr',suite:'ste'}[v]!));
function nodes(value:unknown):Record<string,unknown>[]{if(Array.isArray(value))return value.flatMap(nodes);if(!value||typeof value!=='object')return [];const n=value as Record<string,unknown>;return [n,...nodes(n['@graph'])];}
function pictures(value:unknown):string[]{if(typeof value==='string')return [value];if(Array.isArray(value))return value.flatMap(pictures);if(value&&typeof value==='object'){const n=value as Record<string,unknown>;return pictures(n.contentUrl||n.url);}return [];}
function photo(value:string,base:string){const url=publicBusinessUrl(decode(value),base);if(!url||/[{}]|%7[bd]/i.test(url))return null;const path=new URL(url).pathname;return /(?:^|[\/_-])(?:logos?|favicon|apple-touch-icon|android-chrome|tracking|pixel)(?:[\/_\.=-]|$)|\.(?:svg|ico)$/i.test(path)?null:url;}
const photoRank=(url:string)=>Number(/\.(?:jpe?g|webp|avif)$/i.test(new URL(url).pathname));
export function extractBusinessDetails(html:string,url:string,city:string,name:string,expectedStreet=''):BusinessDetails{
 const images:string[]=[],hours:string[]=[],phones=new Set<string>(),addresses=new Map<string,{streetAddress:string;address:string;postalCode?:string}>();let conflictingBranch=false,matched=false;
 for(const match of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script\s*>/gi)){
  let entries:Record<string,unknown>[];try{entries=nodes(JSON.parse(match[1]));}catch{continue;}
  for(const n of entries){
   const addr=n.address&&typeof n.address==='object'?n.address as Record<string,unknown>:{};
   const nameMatch=normal(n.name)===normal(name),cityMatch=normal(addr.addressLocality)===normal(city),urlMatch=typeof n.url==='string'&&n.url.replace(/\/$/,'')===url.replace(/\/$/,'');
   const cityMismatch=!!normal(addr.addressLocality)&&!cityMatch;
   const addressMismatch=!!expectedStreet&&!!normal(addr.streetAddress)&&street(expectedStreet)!==street(addr.streetAddress);
   if(cityMismatch||addressMismatch){conflictingBranch=true;continue;}
   // City alone is insufficient: two unrelated businesses can be on the same page.
   if(!((nameMatch&&(cityMatch||urlMatch))||(cityMatch&&!!expectedStreet&&street(expectedStreet)===street(addr.streetAddress))))continue;
   matched=true;images.push(...pictures(n.image));const tel=businessPhone(n.telephone);if(tel)phones.add(tel);
   if(typeof addr.streetAddress==='string'&&cityMatch){const address=[addr.streetAddress,addr.addressLocality,addr.addressRegion,addr.postalCode].filter(x=>typeof x==='string'&&x.trim()).join(', ');addresses.set(street(addr.streetAddress),{streetAddress:addr.streetAddress,address,...(typeof addr.postalCode==='string'?{postalCode:addr.postalCode}:{})});}
   const raw=Array.isArray(n.openingHours)?n.openingHours:[n.openingHours];for(const x of raw)if(typeof x==='string'&&x.trim()&&x.length<=300)hours.push(x.trim());
   const specs=Array.isArray(n.openingHoursSpecification)?n.openingHoursSpecification:[n.openingHoursSpecification];
   for(const value of specs){if(!value||typeof value!=='object')continue;const h=value as Record<string,unknown>;if(h.validFrom||h.validThrough)continue;
    const days=(Array.isArray(h.dayOfWeek)?h.dayOfWeek:[h.dayOfWeek]).filter((x):x is string=>typeof x==='string').map(x=>x.split('/').pop()).filter(x=>/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/.test(x||''));
    if(days.length&&/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(String(h.opens))&&/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(String(h.closes)))hours.push(days.join(', ')+': '+(h.opens==='00:00'&&h.closes==='00:00'?'Closed':h.opens+'–'+h.closes));
   }
  }
 }
 if(!conflictingBranch){
  const visible=html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]*>/g,' ');
  const nameWords=normal(name).split(' ').filter(w=>w.length>2);const pageMatches=matched||nameWords.length>0&&nameWords.every(w=>normal(visible).includes(w));
  // Brand photos can omit a catalog suffix such as "Bakery". Contacts and hours
  // still require the stricter business/branch match below.
  const host=new URL(url).hostname.toLowerCase().replace(/^www\./,'').split('.')[0];
  const photoMatches=pageMatches||nameWords.some(w=>w.length>=4&&host.includes(w)&&normal(visible).includes(w));
  if(photoMatches){
  for(const match of html.matchAll(/<meta\b[^>]*>/gi)){
   const attrs=Object.fromEntries([...match[0].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m=>[m[1].toLowerCase(),decode(m[2]??m[3])]));
   if(attrs.content&&['og:image','twitter:image'].includes(attrs.property||attrs.name))images.push(attrs.content);
  }
  for(const match of html.matchAll(/<img\b[^>]*>/gi)){
   const attrs=Object.fromEntries([...match[0].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m=>[m[1].toLowerCase(),decode(m[2]??m[3])]));
   if(/\b(?:logo|icon|payment|spinner|tracking)\b/i.test((attrs.alt||'')+' '+(attrs.class||''))||(attrs.width&&Number(attrs.width)<120)||(attrs.height&&Number(attrs.height)<80))continue;
   const src=[attrs['data-src'],attrs.src].filter(Boolean).find(x=>photo(x,url));if(src)images.push(src);
  }
  }
  if(pageMatches&&!phones.size)for(const link of html.matchAll(/href\s*=\s*["']tel:([^"']+)["']/gi)){const tel=businessPhone(decode(link[1]));if(tel)phones.add(tel);}
  if(pageMatches&&!hours.length){
   const day='(?:Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?|Sun(?:day)?)';
   const time='(?:[0-2]?\\d(?::[0-5]\\d)?\\s*(?:a\\.?m\\.?|p\\.?m\\.?))';
   const pattern=new RegExp('\\b'+day+'(?:\\s*[-–]\\s*'+day+')?\\s*:?\\s*(?:closed|open 24 hours|'+time+'\\s*[-–]\\s*'+time+')','gi');
   for(const match of visible.matchAll(pattern))hours.push(decode(match[0]).replace(/\s+/g,' ').trim());
  }
 }
 const clean=[...new Set(images.map(x=>photo(x,url)).filter((x):x is string=>!!x))].sort((a,b)=>photoRank(b)-photoRank(a)).slice(0,12);
 return {...(clean.length?{images:clean}:{}),...(hours.length?{openingHours:[...new Set(hours)].slice(0,14)}:{}),...(phones.size===1?{phone:[...phones][0]}:{}),...(addresses.size===1?[...addresses.values()][0]:{}),detailsSource:url,detailsCheckedAt:new Date().toISOString().slice(0,10)};
}
