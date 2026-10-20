(function(){
'use strict';
function init(){
 const host=document.querySelector('.gelincicegi-map-app');if(!host)return;
 // Do not let third-party fonts, tiles or data keep the page behind a loader.
 document.getElementById('loader')?.remove();document.getElementById('app')?.classList.remove('paper-loading');
 const $=id=>document.getElementById(id),list=$('gelincicegi-placesList'),status=$('map-status'),count=$('map-count'),query=$('map-query'),chips=$('map-categories'),detail=$('gelincicegi-detailOverlay');
 let vendors=[],visible=[],labels={},category='',map=null,loaded=false,loading=false,failed=false,cursor='',limit=80,selected=null,controller=null;
 const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const valid=v=>Array.isArray(v.coords)&&v.coords.length===2&&v.coords.every(Number.isFinite)&&Math.abs(v.coords[0])<=90&&Math.abs(v.coords[1])<=180;
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const safeUrl=u=>{try{const x=new URL(u);return ['http:','https:'].includes(x.protocol)?x.href:null;}catch{return null;}};
 function external(url){const u=safeUrl(url);if(u)window.open(u,'_blank','noopener,noreferrer');}
 function directions(v){external('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent([v.name,v.address,v.city,v.state].filter(Boolean).join(', ')));}
 function open(v,focus=true){
  selected=v;$('gelincicegi-detailName').textContent=v.name;$('gelincicegi-detailType').textContent=labels[v.category]||v.category;
  $('gelincicegi-detailRating').textContent='';detail.querySelector('.star').hidden=true;
  $('gelincicegi-detailAddress').textContent=v.address||v.city+', '+v.state+' · Approximate city location';
  $('gelincicegi-detailPhone').textContent=v.phone||'Phone not provided';$('gelincicegi-detailDescription').textContent=v.description||'';
  $('gelincicegi-detailStatus').textContent='Confirm hours and availability with the vendor';
  $('gelincicegi-detailOffer').textContent='Map pins use city or service-area coordinates. Confirm the exact business address before travelling.';
  const image=$('gelincicegi-detailImage');image.replaceChildren(el('span','',v.name.slice(0,1)));image.classList.add('map-detail-icon');
  $('gelincicegi-btnDirections').onclick=()=>directions(v);
  $('gelincicegi-btnWebsite').disabled=!safeUrl(v.url);$('gelincicegi-btnWebsite').onclick=()=>external(v.url);
  const phone=String(v.phone||'').replace(/[^+\d]/g,'');$('gelincicegi-btnCall').disabled=!phone;$('gelincicegi-btnCall').onclick=()=>{if(phone)location.href='tel:'+phone;};
  detail.classList.remove('hidden');detail.setAttribute('aria-hidden','false');detail.removeAttribute('inert');
  const u=new URL(location.href);u.searchParams.set('vendor',v.id);history.replaceState(null,'',u);
  if(map&&valid(v))map.flyTo({center:[v.coords[1],v.coords[0]],zoom:11,padding:{right:innerWidth>768?440:0,bottom:innerWidth<=768?host.clientHeight*.48:0}});
  if(focus)$('gelincicegi-closeDetailBtn').focus();
 }
 function close(){detail.classList.add('hidden');detail.setAttribute('aria-hidden','true');detail.setAttribute('inert','');const u=new URL(location.href);u.searchParams.delete('vendor');history.replaceState(null,'',u);query.focus();selected=null;}
 $('gelincicegi-closeDetailBtn').onclick=close;detail.setAttribute('inert','');document.addEventListener('keydown',e=>{if(e.key==='Escape'&&selected)close();});
 function drawList(){
  list.replaceChildren();const note=el('p','map-notice','Pins show approximate city locations. Confirm the exact address with each vendor.');list.append(note);
  const fragment=document.createDocumentFragment();
  for(const v of visible.slice(0,limit)){
   const card=el('button','place-item');card.type='button';const icon=el('span','place-thumb',v.name.slice(0,1));icon.setAttribute('aria-hidden','true');
   const body=el('span','');body.append(el('span','place-name',v.name),el('span','place-rating',(labels[v.category]||v.category)+' · '+v.city+', '+v.state),el('span','place-status','View details & directions'));
   card.append(icon,body);card.onclick=()=>open(v);fragment.append(card);
  }
  list.append(fragment);
  if(visible.length>limit){const more=el('button','map-retry','Show more vendors');more.onclick=()=>{limit+=80;drawList();};list.append(more);}
  if(!visible.length&&!loading)list.append(el('p','map-notice',failed?'Live vendor data could not be loaded.':'No vendors match this search. Try another city or category.'));
  if(failed){const retry=el('button','map-retry','Retry live directory');retry.onclick=()=>load();list.append(retry);}
 }
 function geojson(){return {type:'FeatureCollection',features:visible.filter(valid).map(v=>({type:'Feature',geometry:{type:'Point',coordinates:[v.coords[1],v.coords[0]]},properties:{id:v.id,name:v.name}}))};}
 function filter(){const q=normalize(query.value);visible=vendors.filter(v=>(!category||v.category===category)&&normalize([v.name,v.city,v.state,labels[v.category],v.category].join(' ')).includes(q));count.textContent=visible.length.toLocaleString()+' vendors'+(loading?' · loading more…':failed?' · loading interrupted':'');limit=80;drawList();if(loaded)map.getSource('vendors').setData(geojson());}
 function categories(){chips.replaceChildren();for(const id of ['',...new Set(vendors.map(v=>v.category))].sort((a,b)=>!a?-1:!b?1:(labels[a]||a).localeCompare(labels[b]||b))){const chip=el('button','cat-chip'+(category===id?' active':''),id?(labels[id]||id):'All');chip.type='button';chip.setAttribute('aria-pressed',String(category===id));chip.onclick=()=>{category=id;categories();filter();fit();};chips.append(chip);}}
 function fit(){if(!map||!loaded)return;const points=visible.filter(valid);if(!points.length)return;const bounds=new maplibregl.LngLatBounds();for(const v of points)bounds.extend([v.coords[1],v.coords[0]]);map.fitBounds(bounds,{padding:{top:60,left:50,right:innerWidth>768?490:50,bottom:innerWidth<=768?host.clientHeight*.55:60},maxZoom:11,duration:700});}
 $('map-search').onsubmit=e=>{e.preventDefault();filter();fit();};let debounce;query.addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(filter,180);});
 try{
  if(typeof maplibregl==='undefined')throw Error('Map library unavailable');
  map=new maplibregl.Map({container:'gelincicegi-map',center:[-98.58,39.83],zoom:3,style:{version:8,sources:{streets:{type:'raster',tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],tileSize:256,maxzoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}},layers:[{id:'streets',type:'raster',source:'streets'}]}});
  map.addControl(new maplibregl.NavigationControl(),'top-right');
  map.on('error',()=>{status.textContent='Some map tiles could not load. Vendor search and directions are still available.';});
  map.on('load',()=>{
   loaded=true;map.addSource('vendors',{type:'geojson',data:geojson(),cluster:true,clusterRadius:40,clusterMaxZoom:12});
   map.addLayer({id:'clusters',type:'circle',source:'vendors',filter:['has','point_count'],paint:{'circle-color':'#0f1a6d','circle-radius':['step',['get','point_count'],17,100,24,1000,31],'circle-stroke-width':3,'circle-stroke-color':'#fff'}});
   map.addLayer({id:'pins',type:'circle',source:'vendors',filter:['!',['has','point_count']],paint:{'circle-color':'#db0962','circle-radius':7,'circle-stroke-width':3,'circle-stroke-color':'#fff'}});
   map.on('click','clusters',async e=>{try{const f=e.features[0];const zoom=await map.getSource('vendors').getClusterExpansionZoom(f.properties.cluster_id);map.easeTo({center:f.geometry.coordinates,zoom});}catch{status.textContent='Select a vendor from the list to view details.';}});
   map.on('click','pins',e=>{const v=vendors.find(v=>v.id===e.features[0].properties.id);if(v)open(v);});
   for(const layer of ['clusters','pins']){map.on('mouseenter',layer,()=>map.getCanvas().style.cursor='pointer');map.on('mouseleave',layer,()=>map.getCanvas().style.cursor='');}
   new ResizeObserver(()=>map.resize()).observe(host);
  });
 }catch{status.textContent='Interactive map is unavailable in this browser. Use the vendor list and Directions buttons below.';}
 async function load(){
  if(loading)return;loading=true;failed=false;filter();
  try{do{
   controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),25000);let response;
   try{response=await fetch('/api/map'+(cursor?'?cursor='+encodeURIComponent(cursor):''),{signal:controller.signal});}finally{clearTimeout(timeout);}
   if(!response.ok)throw Error('Directory unavailable');const data=await response.json();if(!Array.isArray(data.results))throw Error('Invalid directory response');
   labels=data.category_labels||labels;const ids=new Set(vendors.map(v=>v.id));vendors.push(...data.results.filter(v=>v&&typeof v.id==='string'&&typeof v.name==='string'&&!ids.has(v.id)));
   const next=data.next_cursor||'';if(next&&next===cursor)throw Error('Repeated cursor');cursor=next;categories();filter();
   const requested=new URLSearchParams(location.search).get('vendor');if(requested&&!selected){const match=vendors.find(v=>v.id===requested);if(match)open(match,false);}
  }while(cursor);
  }catch{failed=true;}finally{loading=false;filter();}
 }
 load();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
