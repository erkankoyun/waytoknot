(function(){
'use strict';
function init(){
 const host=document.querySelector('.gelincicegi-map-app');if(!host)return;
 // Do not let third-party fonts, tiles or data keep the page behind a loader.
 document.getElementById('loader')?.remove();document.getElementById('app')?.classList.remove('paper-loading');
 const $=id=>document.getElementById(id),list=$('gelincicegi-placesList'),status=$('map-status'),count=$('map-count'),query=$('map-query'),chips=$('map-categories'),detail=$('gelincicegi-detailOverlay');
 let vendors=[],clusters=[],labels={},category=new URLSearchParams(location.search).get('category')||'',map=null,loaded=false,loading=false,failed=false,cursor='',selected=null,controller=null,markerGroup=null,total=0,sequence=0,currentParams='',timer;
 const cache=new Map();
 query.value=new URLSearchParams(location.search).get('q')||'';
 const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const valid=v=>Array.isArray(v.coords)&&v.coords.length===2&&v.coords.every(Number.isFinite)&&Math.abs(v.coords[0])<=90&&Math.abs(v.coords[1])<=180;
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const safeUrl=u=>{try{const x=new URL(u);return ['http:','https:'].includes(x.protocol)?x.href:null;}catch{return null;}};
 function actionLink(id,url){const a=$(id);if(url)a.href=url;else a.removeAttribute('href');a.setAttribute('aria-disabled',String(!url));a.tabIndex=url?0:-1;}
 function contacts(v){actionLink('gelincicegi-btnWebsite',safeUrl(v.url));const phone=phoneLink(v.phone);actionLink('gelincicegi-btnCall',phone?'tel:'+phone:null);}
 function open(v,focus=true){
  selected=v;$('gelincicegi-detailName').textContent=v.name;$('gelincicegi-detailType').textContent=labels[v.category]||v.category;
  $('gelincicegi-detailRating').textContent='';detail.querySelector('.star').hidden=true;
  $('gelincicegi-detailAddress').textContent=v.address||v.city+', '+v.state+' · Approximate city location';
  $('gelincicegi-detailPhone').textContent=v.phone||'Phone not provided';$('gelincicegi-detailDescription').textContent=v.description||'';
  const hours=$('gelincicegi-detailHours');hours.replaceChildren();
  const lines=Array.isArray(v.openingHours)?v.openingHours.filter(x=>typeof x==='string').slice(0,14):[];
  $('gelincicegi-detailStatus').textContent=v.operatingStatus==='permanently_closed'?'Listed as permanently closed by the data source':lines.length?'Published business hours':'Hours not provided by this business';
  for(const line of lines)hours.append(el('div','wk-hours-line',line));
  if(lines.length){hours.append(el('p','wk-details-note','Local business time. Holiday hours and appointments may differ.'));}
  const source=safeUrl(v.detailsSource);if(source){const a=el('a','wk-details-source','Official website · photos and business details');a.href=source;a.target='_blank';a.rel='noopener noreferrer';hours.append(a);if(v.detailsCheckedAt)hours.append(el('p','wk-details-note','Last checked: '+v.detailsCheckedAt));}
  $('gelincicegi-detailOffer').textContent=v.locationAccuracy==='source-point'?'Location provided by the business data source. Confirm the address before travelling.':'This location has not been verified against the business address. Confirm the exact address before travelling.';
  renderGallery(v);
  actionLink('gelincicegi-btnDirections','https://www.google.com/maps/search/?api=1&query='+encodeURIComponent([v.name,v.address,v.city,v.state].filter(Boolean).join(', ')));contacts(v);
  detail.classList.remove('hidden');detail.setAttribute('aria-hidden','false');detail.removeAttribute('inert');
  const u=new URL(location.href);u.searchParams.set('vendor',v.id);history.replaceState(null,'',u);
  if(map&&valid(v)){map.flyTo(v.coords,11);map.once('moveend',()=>map.panBy([innerWidth>768?220:0,innerWidth<=768?-host.clientHeight*.24:0],{animate:false}));}
  if(focus)$('gelincicegi-closeDetailBtn').focus();
  if(!v.detailsCheckedAt||Date.now()-Date.parse(v.detailsCheckedAt)>7*86400000){
   $('gelincicegi-detailStatus').textContent=v.operatingStatus==='permanently_closed'?'Listed as permanently closed by the data source':'Checking published business details…';
   fetch('/api/vendor-details?id='+encodeURIComponent(v.id)).then(async r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{
    Object.assign(v,data);if(selected?.id!==v.id)return;
    $('gelincicegi-detailStatus').textContent=v.operatingStatus==='permanently_closed'?'Listed as permanently closed by the data source':v.openingHours?.length?'Published business hours':'Hours not provided by this business';
    hours.replaceChildren();for(const line of v.openingHours||[])hours.append(el('div','wk-hours-line',line));
    if(v.openingHours?.length)hours.append(el('p','wk-details-note','Local business time. Holiday hours and appointments may differ.'));
    const detailsSource=safeUrl(data.detailsSource);if(detailsSource){const link=el('a','wk-details-source','Source: official business website');link.href=detailsSource;link.target='_blank';link.rel='noopener noreferrer';hours.append(link);}
    if(data.notice)hours.append(el('p','wk-details-note',data.notice));
    $('gelincicegi-detailAddress').textContent=v.address||v.city+', '+v.state;
    $('gelincicegi-detailPhone').textContent=v.phone||'Phone not published';contacts(v);
    renderGallery(v);
   }).catch(()=>{if(selected?.id===v.id)$('gelincicegi-detailStatus').textContent=v.operatingStatus==='permanently_closed'?'Listed as permanently closed by the data source':v.openingHours?.length?'Published business hours':'Hours unavailable · please check the official website';});
  }

 }
 function renderGallery(v){
  const host=$('gelincicegi-detailImage');host.replaceChildren();host.classList.remove('map-detail-icon');
  const photoRank=url=>Number(/\.(?:jpe?g|webp|avif)$/i.test(new URL(url).pathname));
  const photos=[...new Set((Array.isArray(v.images)?v.images:[]).filter(x=>{if(typeof x!=='string'||!safeUrl(x)||!/^https:/.test(x)||/[{}]|%7[bd]/i.test(x))return false;return !/(?:^|[\/_-])(?:logos?|favicon|apple-touch-icon|android-chrome|tracking|pixel)(?:[\/_\.=-]|$)|\.(?:svg|ico)$/.test(new URL(x).pathname.toLowerCase());}))].sort((a,b)=>photoRank(b)-photoRank(a)).slice(0,12);
  if(!photos.length){host.classList.add('map-detail-icon');host.append(el('span','',v.name.slice(0,1)),el('small','wk-photo-empty','No published photo available'));return;}
  let index=0;const img=el('img','wk-business-photo');img.alt=v.name+' — photo from the official business website';img.referrerPolicy='no-referrer';img.decoding='async';
  const label=el('span','wk-photo-count');label.setAttribute('aria-live','polite');
  const prev=el('button','slider-arrow slider-prev','‹'),next=el('button','slider-arrow slider-next','›');prev.type=next.type='button';prev.setAttribute('aria-label','Previous business photo');next.setAttribute('aria-label','Next business photo');
  function show(){img.hidden=false;img.src=photos[index];label.textContent=(index+1)+' / '+photos.length;}
  prev.onclick=()=>{index=(index+photos.length-1)%photos.length;show();};next.onclick=()=>{index=(index+1)%photos.length;show();};
  img.onerror=()=>{img.hidden=true;label.textContent='Photo unavailable · '+(index+1)+' / '+photos.length;};
  host.append(img,label);if(photos.length>1)host.append(prev,next);show();
 }
 function close(){delete host.dataset.opening;detail.classList.add('hidden');detail.setAttribute('aria-hidden','true');detail.setAttribute('inert','');const u=new URL(location.href);u.searchParams.delete('vendor');history.replaceState(null,'',u);query.focus();selected=null;}
 $('gelincicegi-closeDetailBtn').onclick=close;detail.setAttribute('inert','');document.addEventListener('keydown',e=>{if(e.key==='Escape'&&selected)close();});

 function phoneLink(value){const digits=String(value||'').replace(/\D/g,'');if(/^[2-9]\d{2}[2-9]\d{6}$/.test(digits))return '+1'+digits;if(/^1[2-9]\d{2}[2-9]\d{6}$/.test(digits))return '+'+digits;return '';}
 async function openById(id){
  const ticket=id;host.dataset.opening=id;
  try{const response=await fetch('/api/map?vendor='+encodeURIComponent(id));if(!response.ok)throw Error();const data=await response.json();if(host.dataset.opening===ticket&&data.vendor)open(data.vendor);}
  catch{status.textContent='Business details could not load. Please retry.';}
 }
 function drawList(){
  list.replaceChildren();list.append(el('p','map-notice','Move or zoom the map to explore vendors. Select a numbered group to zoom in.'));
  const fragment=document.createDocumentFragment();
  for(const v of vendors){
   const card=el('button','place-item');card.type='button';const icon=el('span','place-thumb',v.name.slice(0,1));icon.setAttribute('aria-hidden','true');
   const body=el('span','');body.append(el('span','place-name',v.name),el('span','place-rating',(labels[v.category]||v.category)+' · '+v.city+', '+v.state),el('span','place-status','View details & directions'));
   card.append(icon,body);card.onclick=()=>openById(v.id);fragment.append(card);
  }
  list.append(fragment);
  if(cursor){const more=el('button','map-retry',loading?'Loading…':'Show more vendors in this area');more.disabled=loading;more.onclick=()=>load({append:true});list.append(more);}
  if(!vendors.length&&!loading)list.append(el('p','map-notice',failed?'Live vendor data could not be loaded.':'No vendors match this map area. Zoom out or try another search.'));
  if(failed){const retry=el('button','map-retry','Retry');retry.onclick=()=>load();list.append(retry);}
 }
 function refreshPins(){
  if(!markerGroup)return;markerGroup.clearLayers();
  for(const c of clusters){
   if(!valid(c))continue;const grouped=c.count>1;
   const marker=L.marker(c.coords,{icon:L.divIcon(grouped?{html:'<span>'+Number(c.count).toLocaleString()+'</span>',className:'map-cluster',iconSize:[44,44]}:{className:'map-pin',iconSize:[20,20],iconAnchor:[10,10]}),title:grouped?c.count.toLocaleString()+' vendors — zoom in':'View business',keyboard:true});
   marker.on('click',()=>{if(!grouped){openById(c.id);return;}const [w,s,e,n]=c.bounds;map.fitBounds([[s,w],[n,e]],{padding:[50,50],maxZoom:Math.min(19,map.getZoom()+3)});});markerGroup.addLayer(marker);
  }
 }
 function categories(){
  chips.replaceChildren();for(const id of ['',...Object.keys(labels)].sort((a,b)=>!a?-1:!b?1:labels[a].localeCompare(labels[b]))){const chip=el('button','cat-chip'+(category===id?' active':''),id?labels[id]:'All');chip.type='button';chip.setAttribute('aria-pressed',String(category===id));chip.onclick=()=>{category=id;categories();schedule(false);};chips.append(chip);}
 }
 function bounds(){
  if(!map)return '-180,-85,180,85';const b=map.getBounds(),west=b.getWest(),east=b.getEast();const wrap=x=>((x+180)%360+360)%360-180;
  return [east-west>=360?-180:wrap(west),Math.max(-85,b.getSouth()),east-west>=360?180:wrap(east),Math.min(85,b.getNorth())].map(x=>Number(x.toFixed(5))).join(',');
 }
 function schedule(search=false){clearTimeout(timer);controller?.abort();sequence++;timer=setTimeout(()=>load({search}),250);}
 function updateUrl(){const u=new URL(location.href);if(query.value.trim())u.searchParams.set('q',query.value.trim());else u.searchParams.delete('q');if(category)u.searchParams.set('category',category);else u.searchParams.delete('category');history.replaceState(null,'',u);}
 async function load({append=false,search=false}={}){
  const ticket=++sequence;controller?.abort();controller=new AbortController();const requestController=controller;const signal=requestController.signal;loading=true;failed=false;updateUrl();
  const params=append?new URLSearchParams(currentParams):new URLSearchParams({bbox:search?'-180,-85,180,85':bounds(),zoom:String(search?4:Math.min(19,map?.getZoom()||4)),q:query.value.trim(),category});
  if(append){params.set('list','1');params.set('cursor',cursor);}else currentParams=params.toString();
  count.textContent=append?'Loading more vendors…':'Searching this map area…';drawList();
  const key=params.toString();const timeout=setTimeout(()=>requestController.abort(),20000);
  try{
   let data=cache.get(key);if(!data){const response=await fetch('/api/map?'+key,{signal});if(!response.ok)throw Error('Map request failed');data=await response.json();if(!Array.isArray(data.results))throw Error('Invalid map response');cache.set(key,data);if(cache.size>12)cache.delete(cache.keys().next().value);}
   if(ticket!==sequence)return;
   if(append){const ids=new Set(vendors.map(v=>v.id));vendors.push(...data.results.filter(v=>!ids.has(v.id)));}
   else{vendors=data.results;clusters=data.clusters||[];total=data.total||0;labels=data.category_labels||labels;categories();refreshPins();if(selected)$('gelincicegi-detailType').textContent=labels[selected.category]||selected.category;}
   cursor=data.next_cursor||'';status.textContent='';
   if(search&&map&&clusters.length){const points=clusters.flatMap(c=>[[c.bounds[1],c.bounds[0]],[c.bounds[3],c.bounds[2]]]);map.fitBounds(points,{padding:[60,60],maxZoom:14});}
  }catch(error){if(ticket!==sequence)return;failed=true;status.textContent='Vendor search could not load. Please retry.';}
  finally{clearTimeout(timeout);if(ticket===sequence){loading=false;count.textContent=total.toLocaleString()+' vendors in this map area'+(vendors.length<total?' · '+vendors.length.toLocaleString()+' listed':'');drawList();}}
 }
 $('map-search').onsubmit=e=>{e.preventDefault();clearTimeout(timer);load({search:!!query.value.trim()});};query.addEventListener('input',()=>schedule(!!query.value.trim()));
 try{
  if(typeof L==='undefined')throw Error('Map library unavailable');
  map=L.map('gelincicegi-map',{zoomControl:false}).setView([39.83,-98.58],4);L.control.zoom({position:'topright'}).addTo(map);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
  markerGroup=L.layerGroup().addTo(map);loaded=true;map.on('moveend',()=>schedule(false));
  new ResizeObserver(()=>map.invalidateSize({pan:false})).observe(host);
 }catch(error){console.error('Map initialization failed:',error);status.textContent='Interactive map is unavailable. Vendor search and directions are still available.';}
 load({search:!!query.value.trim()});const requested=new URLSearchParams(location.search).get('vendor');if(requested)openById(requested);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
