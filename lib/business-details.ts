export type BusinessDetails={images?:string[];openingHours?:string[];detailsSource?:string;detailsCheckedAt?:string};
export function publicBusinessUrl(value:unknown,base?:string){
 if(typeof value!=='string'||!value.trim())return null;
 try{const u=new URL(value,base);if(u.protocol!=='https:'||u.username||u.password||u.port&&u.port!=='443'||!u.hostname.includes('.')||/^(?:[0-9.]+|.*\.local|.*\.localhost|localhost)$/.test(u.hostname))return null;return u.href;}catch{return null;}
}
const decode=(s:string)=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
function nodes(value:unknown):Record<string,unknown>[]{
 if(Array.isArray(value))return value.flatMap(nodes);
 if(!value||typeof value!=='object')return [];
 const n=value as Record<string,unknown>;return [n,...nodes(n['@graph'])];
}
function pictures(value:unknown):string[]{
 if(typeof value==='string')return [value];if(Array.isArray(value))return value.flatMap(pictures);
 if(value&&typeof value==='object'){const n=value as Record<string,unknown>;return pictures(n.contentUrl||n.url);}return [];
}
export function extractBusinessDetails(html:string,url:string,city:string,name:string):BusinessDetails{
 const images:string[]=[],hours:string[]=[];
 for(const match of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script\s*>/gi)){
  let entries:Record<string,unknown>[];try{entries=nodes(JSON.parse(match[1]));}catch{continue;}
  for(const n of entries){
   const addr=n.address&&typeof n.address==='object'?n.address as Record<string,unknown>:{};
   const exact=(typeof addr.addressLocality==='string'&&addr.addressLocality.toLowerCase()===city.toLowerCase())||(typeof n.name==='string'&&n.name.toLowerCase()===name.toLowerCase())||(typeof n.url==='string'&&n.url.replace(/\/$/,'')===url.replace(/\/$/,''));if(!exact)continue;
   images.push(...pictures(n.image));
   const raw=Array.isArray(n.openingHours)?n.openingHours:[n.openingHours];for(const x of raw)if(typeof x==='string'&&x.trim()&&x.length<=300)hours.push(x.trim());
   const specs=Array.isArray(n.openingHoursSpecification)?n.openingHoursSpecification:[n.openingHoursSpecification];
   for(const value of specs){if(!value||typeof value!=='object')continue;const h=value as Record<string,unknown>;if(h.validFrom||h.validThrough)continue;
    const days=(Array.isArray(h.dayOfWeek)?h.dayOfWeek:[h.dayOfWeek]).filter((x):x is string=>typeof x==='string').map(x=>x.split('/').pop()).filter(x=>/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/.test(x||''));
    if(days.length&&/^\d{2}:\d{2}$/.test(String(h.opens))&&/^\d{2}:\d{2}$/.test(String(h.closes)))hours.push(days.join(', ')+': '+(h.opens==='00:00'&&h.closes==='00:00'?'Closed':h.opens+'–'+h.closes));
   }
  }
 }
 for(const match of html.matchAll(/<meta\b[^>]*>/gi)){
  const attrs=Object.fromEntries([...match[0].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m=>[m[1].toLowerCase(),decode(m[2]??m[3])]));
  if(attrs.content&&['og:image','twitter:image'].includes(attrs.property||attrs.name))images.push(attrs.content);
 }
 const clean=[...new Set(images.map(x=>publicBusinessUrl(decode(x),url)).filter((x):x is string=>!!x))].slice(0,12);
 return {...(clean.length?{images:clean}:{}),...(hours.length?{openingHours:[...new Set(hours)].slice(0,14)}:{}),detailsSource:url,detailsCheckedAt:new Date().toISOString().slice(0,10)};
}
