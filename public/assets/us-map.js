(function(){
'use strict';
function init(){
 const host=document.querySelector('.gelincicegi-map-app');if(!host)return;
 // Do not let third-party fonts, tiles or data keep the page behind a loader.
 document.getElementById('loader')?.remove();document.getElementById('app')?.classList.remove('paper-loading');
 const $=id=>document.getElementById(id),list=$('gelincicegi-placesList'),status=$('map-status'),count=$('map-count'),query=$('map-query'),chips=$('map-categories'),detail=$('gelincicegi-detailOverlay');
 let vendors=[],visible=[],labels={},category='',map=null,loaded=false,loading=false,failed=false,cursor='',limit=80,selected=null,controller=null, markerGroup=null, markerCache=new Map();
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
  if(map&&valid(v)){map.flyTo(v.coords,11);map.once('moveend',()=>map.panBy([innerWidth>768?220:0,innerWidth<=768?-host.clientHeight*.24:0],{animate:false}));}
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
 function refreshPins(){
  const ids=new Set(visible.map(v=>v.id));const add=[];
  for(const [id,marker] of markerCache)if(!ids.has(id)){markerGroup.removeLayer(marker);markerCache.delete(id);}
  for(const v of visible){if(!valid(v)||markerCache.has(v.id))continue;const marker=L.marker(v.coords,{icon:L.divIcon({className:'map-pin',iconSize:[20,20],iconAnchor:[10,10]}),title:v.name,keyboard:true});marker.on('click',()=>open(v));markerCache.set(v.id,marker);add.push(marker);}
  markerGroup.addLayers(add);
 }
 function filter(){const q=normalize(query.value);visible=vendors.filter(v=>(!category||v.category===category)&&normalize([v.name,v.city,v.state,labels[v.category],v.category].join(' ')).includes(q));count.textContent=visible.length.toLocaleString()+' vendors'+(loading?' · loading more…':failed?' · loading interrupted':'');limit=80;drawList();if(loaded)refreshPins();}
 function categories(){chips.replaceChildren();for(const id of ['',...new Set(vendors.map(v=>v.category))].sort((a,b)=>!a?-1:!b?1:(labels[a]||a).localeCompare(labels[b]||b))){const chip=el('button','cat-chip'+(category===id?' active':''),id?(labels[id]||id):'All');chip.type='button';chip.setAttribute('aria-pressed',String(category===id));chip.onclick=()=>{category=id;categories();filter();fit();};chips.append(chip);}}
 function fit(){if(!map||!loaded)return;const points=visible.filter(valid);if(!points.length)return;map.fitBounds(L.latLngBounds(points.map(v=>v.coords)),{paddingTopLeft:[50,50],paddingBottomRight:[innerWidth>768?490:50,innerWidth<=768?host.clientHeight*.55:60],maxZoom:11});}
 $('map-search').onsubmit=e=>{e.preventDefault();filter();fit();};let debounce;query.addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(filter,180);});
 try{
  if(typeof L==='undefined')throw Error('Map library unavailable');
  map=L.map('gelincicegi-map',{zoomControl:false}).setView([39.83,-98.58],4);
  L.control.zoom({position:'topright'}).addTo(map);
  const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
  tiles.on('tileerror',()=>{status.textContent='Some map tiles could not load. Vendor search and directions are still available.';});
  markerGroup=L.markerClusterGroup({chunkedLoading:true,maxClusterRadius:40,showCoverageOnHover:false,iconCreateFunction:cluster=>L.divIcon({html:'<span>'+cluster.getChildCount().toLocaleString()+'</span>',className:'map-cluster',iconSize:[44,44]})});
  map.addLayer(markerGroup);loaded=true;refreshPins();
  new ResizeObserver(()=>map.invalidateSize({pan:false})).observe(host);
 }catch(error){console.error('Map initialization failed:',error);status.textContent='Interactive map is unavailable in this browser. Use the vendor list and Directions buttons below.';}
 async function load(){
  if(loading)return;loading=true;failed=false;filter();
  try{do{
   controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),25000);let response;
   try{response=await fetch('/api/map'+(cursor?'?cursor='+encodeURIComponent(cursor):''),{signal:controller.signal});}finally{clearTimeout(timeout);}
   const data=await response.json();if(!response.ok){if(data.reason==='database_limit')status.textContent='The live directory has reached its database limit. Please try again later.';throw Error('Directory unavailable');}if(!Array.isArray(data.results))throw Error('Invalid directory response');
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
