import catalog from "./vendors.json";

export type Vendor = {
  id: string; name: string; category: string; city: string; state: string;
  url: string; description: string; keywords: string[]; coords: number[];
  source: string; checkedAt: string; tags?: string[]; locationKind?: string;
};
export const vendors = catalog as Vendor[];
export const categoryLabels: Record<string, string> = {
  bridal: "Bridal wear", venue: "Venues", photography: "Photography", catering: "Catering",
  florist: "Florists", dj: "DJs & music", cake: "Wedding cakes", beauty: "Hair & makeup",
  planner: "Wedding planners", officiant: "Officiants", stationery: "Invitations & stationery",
  rental: "Rentals & decor", photobooth: "Photo booths", videography: "Videography", transportation: "Transportation",
};
export function normalize(value: string) {
  return value.toLowerCase().replace(/ı/g, "i").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}
const aliases: Record<string,string> = {
  gelinlik:"bridal",gelinligi:"bridal",dress:"bridal",dresses:"bridal",gown:"bridal",gowns:"bridal",boutiques:"bridal",
  mekan:"venue",mekani:"venue",salon:"venue",venues:"venue",reception:"venue",
  fotograf:"photography",fotografci:"photography",photographer:"photography",photographers:"photography",photos:"photography",photo:"photography",
  cicek:"florist",cicekci:"florist",flowers:"florist",flower:"florist",florists:"florist",
  caterer:"catering",caterers:"catering",food:"catering",djs:"dj",music:"dj",entertainment:"dj",
  cake:"cake",cakes:"cake",bakery:"cake",pasta:"cake",pastasi:"cake",desserts:"cake",
  hair:"beauty",makeup:"beauty",makyaj:"beauty",kuafor:"beauty",hairstylist:"beauty",
  planner:"planner",planners:"planner",coordinator:"planner",organizer:"planner",organizator:"planner",organizasyon:"planner",
  officiants:"officiant",celebrant:"officiant",nikah:"officiant",invitations:"stationery",invitation:"stationery",davetiye:"stationery",
  rentals:"rental",tents:"rental",tent:"rental",decor:"rental",kiralama:"rental",
  photobooths:"photobooth",videographer:"videography",videographers:"videography",video:"videography",film:"videography",
  limo:"transportation",limousine:"transportation",shuttle:"transportation",transport:"transportation",ulasim:"transportation",
  outdoors:"outdoor",bahce:"garden",bahcede:"garden",dugun:"wedding",dugunu:"wedding",weddings:"wedding",
};
const stop = new Set("a an the and or in at of for to with my our us me i m we am are is want need find looking look search please by best top good professional local show some would like can you help wedding vendor vendors services service near nearby around within miles mile mi km yakin yakininda yakinlarinda cevresinde dugun icin bir bana bul istiyorum ariyorum en yer mekanlari".split(" "));
const cities = [...new Map(vendors.map(v=>[normalize(v.city),{name:v.city,state:v.state,coords:v.coords}])).entries()];
const cityAliases: Record<string,string> = {nyc:"new york","new york city":"new york",saratoga:"saratoga springs",dc:"washington dc","washington d c":"washington dc"};
const stateNames: Record<string,string> = {"new york state":"NY",california:"CA",massachusetts:"MA",texas:"TX",florida:"FL",illinois:"IL",georgia:"GA","north carolina":"NC","south carolina":"SC",ohio:"OH",pennsylvania:"PA",arizona:"AZ","rhode island":"RI","washington state":"WA"};
const records = vendors.map(v=>({v,name:normalize(v.name),words:normalize([v.name,v.description,...v.keywords,v.category,...(v.tags||[])].join(" ")).split(" ")}));
const vocabulary = [...new Set([...Object.keys(aliases),...Object.keys(categoryLabels),...cities.flatMap(([city])=>city.split(" ")),...records.flatMap(r=>r.name.split(" "))])].filter(x=>x.length>=4 && !stop.has(x));

// Bounded Damerau-Levenshtein: adjacent letter swaps count as one typo.
function edits(a:string,b:string) {
  if(Math.abs(a.length-b.length)>2)return 99;
  const d=Array.from({length:a.length+1},(_,i)=>Array.from({length:b.length+1},(_,j)=>i===0?j:j===0?i:0));
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){
    d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+Number(a[i-1]!==b[j-1]));
    if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);
  }
  return d[a.length][b.length];
}
function correctedWord(word:string) {
  if(word.length<4||stop.has(word)||vocabulary.includes(word)||records.some(r=>r.words.includes(word)))return word;
  const candidates=vocabulary.map(value=>({value,d:edits(word,value)})).filter(x=>x.d<=(word.length>=8?2:1)).sort((a,b)=>a.d-b.d);
  if(!candidates.length)return word;
  const best=candidates.filter(x=>x.d===candidates[0].d);
  // Do not silently choose between different equally likely meanings.
  return new Set(best.map(x=>aliases[x.value]||x.value)).size===1?best[0].value:word;
}
function distanceMiles(a:number[],b:number[]){
  const rad=(v:number)=>v*Math.PI/180;const lat=rad(b[0]-a[0]),lon=rad(b[1]-a[1]);
  const h=Math.sin(lat/2)**2+Math.cos(rad(a[0]))*Math.cos(rad(b[0]))*Math.sin(lon/2)**2;
  return 3958.8*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));
}
const phraseRules: Array<[RegExp,string]> = [
  [/\bphoto booths?\b/g,"photobooth"],[/\bopen air\b/g,"outdoor"],[/\bacik hava\b/g,"outdoor"],
  [/\bhair and makeup\b/g,"beauty"],[/\bnew york city\b/g,"new york"],
];
export function searchVendors(query="",category="",city="",page=1,radius=0,suggest=false){
  const original=normalize(query).slice(0,200);
  let text=original;
  for(const [pattern,replacement] of phraseRules)text=text.replace(pattern,replacement);
  const beforeCorrection=text;
  text=text.split(" ").map(correctedWord).join(" ");
  const correctedQuery=text!==beforeCorrection?text:null;
  const nearby=/\b(near|nearby|around|within|yakininda|yakinlarinda|cevresinde)\b/.test(original);
  const requestedRadius=original.match(/\b(?:within )?(\d{1,3})\s*(miles?|mi|km)\b/);
  const radiusMiles=Math.max(1,Math.min(100,Number.isFinite(radius)&&radius>0?radius:requestedRadius?Number(requestedRadius[1])*(requestedRadius[2]==="km"?0.621371:1):50));
  text=text.replace(/\b\d+\s*(miles?|mi|km)\b/g," ");
  let location: {name:string;state:string;coords:number[]}|undefined;
  let selectedState="";
  // Long phrases first, so Los Angeles and New York are not separate keywords.
  const locationPhrases=[...cities.map(([key,value])=>({key,value})),...Object.entries(cityAliases).map(([key,target])=>({key,value:cities.find(([c])=>c===target)?.[1]}))].filter(x=>x.value).sort((a,b)=>b.key.length-a.key.length);
  const padded=(s:string)=>` ${s} `;
  const filterCity=normalize(city);
  const statePhrase=Object.entries(stateNames).sort((a,b)=>b[0].length-a[0].length).find(([name])=>padded(text).includes(` ${name} `));
  if(statePhrase){selectedState=statePhrase[1];text=padded(text).replace(` ${statePhrase[0]} `," ").trim();}
  for(const entry of locationPhrases){
    if(padded(text).includes(` ${entry.key} `)){
      location=entry.value;text=padded(text).replace(` ${entry.key} `," ").trim();break;
    }
  }
  const states=new Set(vendors.map(v=>v.state.toLowerCase()));
  text=text.split(" ").filter(word=>{if(states.has(word)){selectedState=word.toUpperCase();return false;}return true;}).join(" ");
  const terms=[...new Set(text.split(" ").map(word=>aliases[word]||word).filter(word=>word&&!stop.has(word)))];
  const selectedCategory=aliases[normalize(category)]||normalize(category);
  const queryCategories=terms.filter(word=>Object.hasOwn(categoryLabels,word));
  const needsLocation=nearby&&!location&&!filterCity;
  const unsupported=terms.some(t=>/^(cheap|affordable|budget|available|availability|today|tomorrow|ucuz)$/.test(t))||/[$€]|\b\d{4}-\d{2}-\d{2}\b/.test(query);
  const matched=records.flatMap(({v,name,words})=>{
    if(needsLocation)return [];
    if(selectedCategory&&v.category!==selectedCategory)return [];
    if(queryCategories.length&&!queryCategories.includes(v.category))return [];
    if(filterCity&&!normalize(`${v.city} ${v.state}`).includes(filterCity))return [];
    if(selectedState&&v.state!==selectedState)return [];
    let distance:number|undefined;
    if(location&&!filterCity){
      if(nearby){distance=distanceMiles(location.coords,v.coords);if(distance>radiusMiles)return [];}
      else if(normalize(v.city)!==normalize(location.name)||v.state!==location.state)return [];
    }
    let score=0;
    for(const term of terms){
      if(Object.hasOwn(categoryLabels,term)){score+=12;continue;}
      const exact=words.includes(term);
      const prefix=suggest&&term.length>=2&&words.some(w=>w.startsWith(term));
      if(!exact&&!prefix&&!name.includes(term))return [];
      score+=name.split(" ").includes(term)?8:exact?3:1;
    }
    if(name===normalize(query))score+=100;
    return [{vendor:v,score,distance}];
  }).sort((a,b)=>b.score-a.score||(a.distance??0)-(b.distance??0)||a.vendor.name.localeCompare(b.vendor.name));
  const pages=Math.max(1,Math.ceil(matched.length/10));
  const currentPage=Math.min(pages,Math.max(1,Number.isFinite(page)?Math.floor(page):1));
  const availableCategories=[...new Set(vendors.map(v=>v.category))].sort((a,b)=>categoryLabels[a].localeCompare(categoryLabels[b]));
  const alternatives=matched.length?[]:[
    ...(location?[{label:`All vendors in ${location.name}`,q:location.name},...(!nearby?[{label:`${location.name} area · within 50 miles`,q:`${queryCategories[0]||"wedding vendors"} near ${location.name}`}]:[])]:[]),
    ...(queryCategories[0]?[{label:`Browse ${categoryLabels[queryCategories[0]]}`,q:queryCategories[0]}]:[]),
  ];
  return {
    query,total:matched.length,page:currentPage,pages,limit:10,indexed_count:vendors.length,
    results:matched.slice((currentPage-1)*10,currentPage*10).map(({vendor,distance})=>({...vendor,...(distance!==undefined?{distanceMiles:Math.round(distance)}:{})})),
    categories:availableCategories,category_labels:categoryLabels,cities:[...new Set(vendors.map(v=>v.city))].sort(),
    corrected_query:correctedQuery,location:location?.name||null,nearby:nearby&&!!location,radius_miles:radiusMiles,
    needs_location:needsLocation,unsupported_constraints:unsupported,
    suggestions:alternatives,coverage:"Listed US vendors only; expanded coverage is concentrated in New York’s Capital Region. No live prices or availability.",
    currency:"USD",country:"US",
  };
}
