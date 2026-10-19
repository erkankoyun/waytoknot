import { categoryLabels, normalize, parseSearch, searchVendors, weddingCategories, type Vendor } from './catalog';

export type DirectoryInput = Vendor & {verification?:'manual'|'website-fetched';verificationUrl?:string;publishUnverified?:boolean;address?:string;country?:string};
export function validateDirectoryRecord(value:unknown):DirectoryInput {
  if(!value||typeof value!=='object'||Array.isArray(value))throw Error('A business record is required');
  const v=value as DirectoryInput;
  for(const key of ['id','name','category','city','state','url','source'] as const){if(typeof v[key]!=='string'||!v[key].trim()||v[key].length>1000)throw Error('Invalid '+key);}
  if(!Object.hasOwn(categoryLabels,v.category))throw Error('Unknown category');
  if(v.country&&v.country!=='US')throw Error('Only US records are enabled');
  for(const key of ['url','source'] as const){const url=new URL(v[key]);if(url.protocol!=='https:'&&url.protocol!=='http:')throw Error('Invalid URL protocol');if(url.username||url.password||!url.hostname.includes('.')||/^(localhost|127\.|10\.|192\.168\.|169\.254\.)/.test(url.hostname))throw Error('Invalid public URL');}
  if(!Array.isArray(v.coords)||v.coords.length!==2||!v.coords.every(Number.isFinite)||Math.abs(v.coords[0])>90||Math.abs(v.coords[1])>180)throw Error('Invalid coordinates');
  if(typeof v.description!=='string'||v.description.length>1500)throw Error('Invalid description');
  if(!Array.isArray(v.keywords)||v.keywords.length>40||!v.keywords.every(k=>typeof k==='string'&&k.length<=100))throw Error('Invalid keywords');
  if(v.tags&&(!Array.isArray(v.tags)||v.tags.length>30||!v.tags.every(t=>typeof t==='string'&&t.length<=100)))throw Error('Invalid tags');
  if(v.address&&(typeof v.address!=='string'||v.address.length>500))throw Error('Invalid address');
  if(v.publishUnverified!==undefined&&typeof v.publishUnverified!=='boolean')throw Error('Invalid publication flag');
  if(v.verification){
    if(!['manual','website-fetched'].includes(v.verification))throw Error('Invalid verification');
    if(!/^\d{4}-\d{2}-\d{2}$/.test(v.checkedAt)||Number.isNaN(Date.parse(v.checkedAt))||Date.parse(v.checkedAt)>Date.now()+86400000)throw Error('Valid review date required');
    if(v.verification==='website-fetched'&&(!v.verificationUrl||new URL(v.verificationUrl).hostname.replace(/^www\./,'')!==new URL(v.url).hostname.replace(/^www\./,'')))throw Error('Website verification must match the business domain');
  }
  return {...v,id:v.id.trim(),name:v.name.trim(),city:v.city.trim(),state:v.state.toUpperCase(),country:'US'};
}
export function businessKey(v:DirectoryInput){
  const url=new URL(v.url);const path=url.pathname.replace(/\/+$/,'');
  return [url.hostname.toLowerCase().replace(/^www\./,''),path,normalize(v.name),normalize(v.city),v.state.toUpperCase(),normalize(v.address||'')].join('|');
}
type Metadata={indexed_count:number;category_counts:Record<string,number>;cities:string[];categories:string[];category_labels:Record<string,string>;category_groups:typeof weddingCategories};
let metaCache:{expires:number;value:Metadata}|undefined;
export function invalidateDirectoryMetadata(){metaCache=undefined;}
export async function directoryMetadata(db:D1Database){
 if(metaCache&&metaCache.expires>Date.now())return metaCache.value;
 const {results}=await db.prepare("SELECT category,count(*) AS n FROM directory_records WHERE status IN ('approved','listed') GROUP BY category").all<{category:string;n:number}>();
 const counts=Object.fromEntries(weddingCategories.map(c=>[c.id,0]));let total=0;
 for(const row of results){counts[row.category]=row.n;total+=row.n;}
 const cityRows=await db.prepare("SELECT DISTINCT city FROM directory_records WHERE status IN ('approved','listed') ORDER BY city LIMIT 2000").all<{city:string}>();
 const value={indexed_count:total,category_counts:counts,cities:cityRows.results.map(r=>r.city),categories:weddingCategories.map(c=>c.id),category_labels:categoryLabels,category_groups:weddingCategories};
 metaCache={expires:Date.now()+30000,value};return value;
}
export async function searchDirectory(db:D1Database,query='',category='',city='',page=1,radius=0,suggest=false,metadataOnly=false){
 const meta=await directoryMetadata(db);
 if(!meta.indexed_count){const seed=searchVendors(query,category,city,page,radius,suggest);return metadataOnly?{...seed,results:[]}:seed;}
 if(metadataOnly)return {...searchVendors(),...meta,results:[]};
 const tokens=normalize(query).split(' ').filter(Boolean).slice(0,35);const phrases=new Set<string>();
 for(let i=0;i<tokens.length;i++)for(let j=1;j<=4&&i+j<=tokens.length;j++)phrases.add(tokens.slice(i,i+j).join(' '));
 let extra:Array<{name:string;state:string;coords:number[]}>=[];
 const chunks=[...phrases].slice(0,95);
 if(chunks.length){
  const rows=await db.prepare(`SELECT name,state,latitude,longitude FROM directory_cities WHERE key IN (${chunks.map(()=>'?').join(',')})`).bind(...chunks).all<{name:string;state:string;latitude:string;longitude:string}>();
  extra=rows.results.map(r=>({name:r.name,state:r.state,coords:[Number(r.latitude),Number(r.longitude)]}));
 }
 const p=parseSearch(query,category,city,radius,extra);
 const where=["d.status IN ('approved','listed')"];const args:Array<string|number>=[];
 if(p.needsLocation)where.push('0=1');
 if(p.selectedCategory){where.push('d.category=?');args.push(p.selectedCategory);}
 if(p.queryCategories.length){where.push(`d.category IN (${p.queryCategories.map(()=>'?').join(',')})`);args.push(...p.queryCategories);}
 if(p.filterCity){where.push('(d.city_key=? OR d.city_key||\' \'||lower(d.state)=?)');args.push(p.filterCity,p.filterCity);}
 if(p.selectedState){where.push('d.state=?');args.push(p.selectedState);}
 let distanceSql='NULL';const distanceArgs:number[]=[];
 if(p.location&&!p.filterCity){
  if(p.nearby){
   const [lat,lon]=p.location.coords;const lonFactor=69.172*Math.max(0.01,Math.cos(lat*Math.PI/180));
   distanceSql='((CAST(d.latitude AS REAL)-?)*(CAST(d.latitude AS REAL)-?)*4761+(CAST(d.longitude AS REAL)-?)*(CAST(d.longitude AS REAL)-?)*?)';
   distanceArgs.push(lat,lat,lon,lon,lonFactor*lonFactor);
   where.push(distanceSql+'<=?');args.push(...distanceArgs,p.radiusMiles*p.radiusMiles);
  }else {where.push('d.city_key=? AND d.state=?');args.push(normalize(p.location.name),p.location.state);}
 }
 const words=p.terms.filter(t=>!Object.hasOwn(categoryLabels,t));
 let join='';if(words.length){join=' JOIN directory_fts ON directory_fts.rowid=d.rowid';where.push('directory_fts MATCH ?');args.push(words.map(w=>'"'+w.replace(/[^a-z0-9 ]/g,'')+'"'+(suggest?'*':'')).join(' AND '));}
 const from=' FROM directory_records d'+join+' WHERE '+where.join(' AND ');
 const count=await db.prepare('SELECT count(*) AS n'+from).bind(...args).first<{n:number}>();
 const total=count?.n||0;const pages=Math.max(1,Math.ceil(total/10));const currentPage=Math.min(pages,Math.max(1,Number.isFinite(page)?Math.floor(page):1));
 const rows=await db.prepare('SELECT d.payload'+from+' ORDER BY '+(words.length?'bm25(directory_fts),':'')+' d.name,d.id LIMIT 10 OFFSET ?').bind(...args,(currentPage-1)*10).all<{payload:string}>();
 const result=rows.results.map(r=>JSON.parse(r.payload) as Vendor & {distanceMiles?:number});
 if(p.nearby&&p.location){const [lat,lon]=p.location.coords;for(const v of result)v.distanceMiles=Math.round(Math.hypot((v.coords[0]-lat)*69,(v.coords[1]-lon)*69.172*Math.cos(lat*Math.PI/180)));}
 return {...meta,query,total,page:currentPage,pages,limit:10,results:result,corrected_query:p.correctedQuery,location:p.location?.name||null,nearby:p.nearby&&!!p.location,radius_miles:p.radiusMiles,needs_location:p.needsLocation,unsupported_constraints:p.unsupported,suggestions:[],coverage:'Listed US businesses. Unverified websites are labeled on each listing. Confirm wedding services, prices and availability directly with each business.',currency:'USD',country:'US'};
}

export async function importDirectoryRecords(db:D1Database,records:DirectoryInput[]){
 const now=new Date().toISOString();const statements=[];
 for(const v of records){
  const status=v.verification?'approved':v.publishUnverified?'listed':'pending';
  const text=normalize([v.name,v.city,v.state,v.category,v.description,...v.keywords,...(v.tags||[])].join(' '));
  statements.push(db.prepare(`INSERT INTO directory_records(id,dedupe_key,name,category,city,city_key,state,country,url,source,status,latitude,longitude,search_text,payload,site_checked_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(dedupe_key) DO UPDATE SET name=excluded.name,category=excluded.category,city=excluded.city,city_key=excluded.city_key,state=excluded.state,url=excluded.url,source=excluded.source,status=excluded.status,latitude=excluded.latitude,longitude=excluded.longitude,search_text=excluded.search_text,payload=excluded.payload,site_checked_at=excluded.site_checked_at,updated_at=excluded.updated_at WHERE excluded.status='approved' OR (directory_records.status<>'approved' AND (excluded.status='listed' OR directory_records.status<>'listed'))`).bind(v.id,businessKey(v),v.name,v.category,v.city,normalize(v.city),v.state,'US',v.url,v.source,status,String(v.coords[0]),String(v.coords[1]),text,JSON.stringify(v),v.verification?v.checkedAt:null,now));
  if(status!=='pending')statements.push(db.prepare('INSERT INTO directory_cities(key,name,state,latitude,longitude) VALUES(?,?,?,?,?) ON CONFLICT(key) DO NOTHING').bind(normalize(v.city),v.city,v.state,String(v.coords[0]),String(v.coords[1])));
 }
 await db.batch(statements);invalidateDirectoryMetadata();
 return {accepted:records.length,reviewed:records.filter(v=>v.verification).length,listed_unverified:records.filter(v=>!v.verification&&v.publishUnverified).length,staged:records.filter(v=>!v.verification&&!v.publishUnverified).length};
}
