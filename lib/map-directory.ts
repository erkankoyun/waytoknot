import { categoryLabels, normalize, parseSearch, type Vendor } from './catalog';

export const MAP_PAGE_SIZE = 80;
export type MapBounds = [number, number, number, number];
export type MapOptions = { bounds: MapBounds; zoom: number; query: string; category: string; cursor: number };
export function mapOptions(params: URLSearchParams): MapOptions {
  const raw = params.get('bbox');
  const bounds = (raw === null ? [-180,-85,180,85] : raw.split(',').map(Number)) as MapBounds;
  if (bounds.length !== 4 || bounds.some(x=>!Number.isFinite(x)) || raw?.split(',').some(x=>!x.trim()) || bounds[0]<-180 || bounds[0]>180 || bounds[2]<-180 || bounds[2]>180 || bounds[1]<-90 || bounds[3]>90 || bounds[1]>=bounds[3] || bounds[0]===bounds[2]) throw Error('Invalid map bounds');
  const zoom=Number(params.get('zoom')??4), cursor=Number(params.get('cursor')??0);
  if (!Number.isFinite(zoom) || zoom<0 || zoom>22 || !Number.isSafeInteger(cursor) || cursor<0) throw Error('Invalid map position');
  const category=params.get('category')||'';
  if(category && !Object.hasOwn(categoryLabels,category))throw Error('Unknown category');
  return {bounds,zoom:Math.min(19,Math.floor(zoom)),query:(params.get('q')||'').slice(0,200),category,cursor};
}
export async function mapDirectoryView(db:D1Database, options:MapOptions, listOnly=false) {
  const {bounds,zoom,query,category,cursor}=options;
  const [west,south,east,north]=bounds;
  const width=east>west?east-west:360-west+east;
  // Adaptive cells bound the response even if a caller requests the whole world at zoom 19.
  const step=Math.max(360/2**(zoom+3),width/28,(north-south)/20,0.00001);
  const p=parseSearch(query,category);
  const where=["d.status IN ('approved','listed')",'CAST(d.latitude AS REAL) BETWEEN ? AND ?'];
  const args:Array<string|number>=[south,north];
  where.push(east>west?'CAST(d.longitude AS REAL) BETWEEN ? AND ?':'(CAST(d.longitude AS REAL)>=? OR CAST(d.longitude AS REAL)<=?)');args.push(west,east);
  if(p.selectedCategory){where.push('d.category=?');args.push(p.selectedCategory);}
  if(p.queryCategories.length){where.push(`d.category IN (${p.queryCategories.map(()=>'?').join(',')})`);args.push(...p.queryCategories);}
  if(p.selectedState){where.push('d.state=?');args.push(p.selectedState);}
  if(p.location){where.push('d.city_key=?');args.push(normalize(p.location.name));if(!p.selectedState){where.push('d.state=?');args.push(p.location.state);}}
  const words=p.terms.filter(t=>!Object.hasOwn(categoryLabels,t));
  const join=words.length?' JOIN directory_fts ON directory_fts.rowid=d.rowid':'';
  if(words.length){where.push('directory_fts MATCH ?');args.push(words.map(w=>'"'+w.replace(/[^a-z0-9 ]/g,'')+'"*').join(' AND '));}
  const from=' FROM directory_records d'+(words.length?'':' INDEXED BY directory_map_geo')+join+' WHERE '+where.join(' AND ');
  // Select only 81 IDs before reading payloads. Cluster queries never read business payloads.
  const rows=await db.prepare('SELECT rowid AS cursor_id,payload FROM directory_records WHERE rowid IN (SELECT d.rowid'+from+' AND d.rowid>? ORDER BY d.rowid LIMIT ?) ORDER BY rowid').bind(...args,cursor,MAP_PAGE_SIZE+1).all<{cursor_id:number;payload:string}>();
  const page=rows.results.slice(0,MAP_PAGE_SIZE);
  const results=page.map(row=>{const v=JSON.parse(row.payload) as Vendor;return {id:v.id,name:v.name,category:v.category,city:v.city,state:v.state,coords:v.coords};});
  const next_cursor=rows.results.length>MAP_PAGE_SIZE?String(page[page.length-1].cursor_id):null;
  if(listOnly)return {mode:'list',results,next_cursor};
  const clusters=await db.prepare('SELECT CAST((CAST(d.longitude AS REAL)+180)/? AS INTEGER) x,CAST((CAST(d.latitude AS REAL)+90)/? AS INTEGER) y,COUNT(*) n,MIN(d.id) id,AVG(CAST(d.latitude AS REAL)) latitude,AVG(CAST(d.longitude AS REAL)) longitude,MIN(CAST(d.longitude AS REAL)) west,MIN(CAST(d.latitude AS REAL)) south,MAX(CAST(d.longitude AS REAL)) east,MAX(CAST(d.latitude AS REAL)) north'+from+' GROUP BY x,y').bind(step,step,...args).all<{x:number;y:number;n:number;id:string;latitude:number;longitude:number;west:number;south:number;east:number;north:number}>();
  return {mode:'viewport',results,next_cursor,total:clusters.results.reduce((n,c)=>n+c.n,0),clusters:clusters.results.map(c=>({key:c.x+':'+c.y,count:c.n,id:c.n===1?c.id:undefined,coords:[c.latitude,c.longitude],bounds:[c.west,c.south,c.east,c.north]})),category_labels:categoryLabels,bounds,corrected_query:p.correctedQuery};
}
export async function mapVendor(db:D1Database,id:string){
  if(!id || id.length>200)throw Error('Invalid business');
  const row=await db.prepare("SELECT payload FROM directory_records WHERE id=? AND status IN ('approved','listed')").bind(id).first<{payload:string}>();
  return row?JSON.parse(row.payload) as Vendor:null;
}
