(function () {
  'use strict';
  let labels = {};
  let requestId = 0;
  let categoryGroups=[];let categoryCounts={};
  document.addEventListener('DOMContentLoaded', function () {
    const intro = document.querySelector('.wk-search-home');
    const layout = document.querySelector('.wk-search-results');
    const column = document.querySelector('.wk-search-results');
    if (!intro || !layout || !column) return;
    const results = document.createElement('section');
    results.className = 'gc-results'; results.setAttribute('aria-label', 'Vendor search results');
    column.appendChild(results);
    const forms = Array.from(document.querySelectorAll('form.tx-solr-search-form, form[id="tx-solr-search-form-pi-results"]')).filter(f => f.querySelector('[name="q"]'));
    // Keep only application search parameters. External attribution such as
    // utm_source must never leak into an in-site search URL or API request.
    const allowedParams = ['q', 'category', 'city', 'page', 'radius', 'suggest'];
    function cleanSearchParams(search) {
      const incoming = new URLSearchParams(search);
      const cleaned = new URLSearchParams();
      allowedParams.forEach(key => {
        if (incoming.has(key)) cleaned.set(key, incoming.get(key));
      });
      return cleaned;
    }
    let state = cleanSearchParams(location.search);
    function canonicalizeSearchUrl() {
      const query = state.toString();
      const destination = '/search' + (query ? '?' + query : '') + location.hash;
      if (location.pathname + location.search + location.hash !== destination) {
        history.replaceState(null, '', destination);
      }
    }
    canonicalizeSearchUrl();
    let controller;
    function el(tag, className, content) { const node = document.createElement(tag); if (className) node.className = className; if (content != null) node.textContent = content; return node; }
    function url() { return '/api/search?' + state.toString(); }
    function navigate(changes) {
      Object.keys(changes).forEach(key => changes[key] ? state.set(key, changes[key]) : state.delete(key));
      const next = '/search' + (state.toString() ? '?' + state.toString() : '');
      history.pushState(null, '', next); run();
    }
    function addSelect(parent, label, key, values) {
      const wrap = el('label','gc-filter'); wrap.append(el('span','',label));
      const select = el('select'); select.setAttribute('aria-label',label);
      const all = el('option','',key==='radius'?'From search (default)':'All'); all.value = ''; select.append(all);
      const groups=new Map();
      values.forEach(value => { const option = el('option','',labels[value] || value); option.value = value; option.selected = state.get(key) === value;
        if(key==='category'){
          option.textContent=(labels[value]||value)+' ('+(categoryCounts[value]||0)+')';
          const name=categoryGroups.find(c=>c.id===value)?.group||'Other services';
          if(!groups.has(name)){const group=el('optgroup');group.label=name;groups.set(name,group);select.append(group);}
          groups.get(name).append(option);
        }else select.append(option); });
      select.addEventListener('change',()=>navigate({[key]:select.value,page:''}));
      wrap.append(select); parent.append(wrap);
    }
    async function run() {
      const q = state.get('q') || '';
      forms.forEach(form => { form.querySelector('[name="q"]').value=q; });
      const activeRequest=++requestId;
      document.dispatchEvent(new Event('wk:search-start'));
      document.body.classList.add('wk-has-results'); layout.hidden=false;
      document.querySelectorAll('.gc-suggestions').forEach(node=>{node.hidden=true;});
      results.replaceChildren(el('p','gc-search-status','Searching vendors…'));
      results.setAttribute('aria-busy','true');
      if (controller) controller.abort(); controller = new AbortController();
      try {
        const response = await fetch(url(),{signal:controller.signal});
        if (!response.ok) throw new Error('Search is unavailable. Please try again.');
        const data = await response.json();
        if(activeRequest!==requestId)return;
        labels=data.category_labels||labels;categoryGroups=data.category_groups||categoryGroups;categoryCounts=data.category_counts||categoryCounts;
        results.replaceChildren();
        const title = el('h2','gc-results-title', q ? 'Results for “'+q+'”' : 'US wedding vendors');
        const count = el('p','gc-search-status',data.total+' results · '+data.indexed_count+' listed vendors'); count.setAttribute('role','status');
        results.append(title,count);
        if(data.corrected_query){
          const correction=el('p','gc-search-explanation','Spelling adjusted to: '+data.corrected_query);
          results.append(correction);
        }
        if(data.nearby)results.append(el('p','gc-search-explanation','Within '+Math.round(data.radius_miles)+' miles of '+data.location+' · approximate straight-line distance between city or service-area centers. Confirm travel coverage with each business.'));
        if(data.needs_location)results.append(el('p','gc-search-explanation','Add a city to search nearby, for example “DJ near Albany”. Your device location is not used.'));
        if(data.unsupported_constraints)results.append(el('p','gc-search-explanation','Prices, dates and availability are not indexed. Contact vendors directly to check those requirements.'));

        const filters = el('div','gc-filters'); addSelect(filters,'Category','category',data.categories); addSelect(filters,'City','city',data.cities); if(data.nearby)addSelect(filters,'Radius (miles)','radius',['25','50','100']); results.append(filters);
        if (!data.results.length) {
          if(state.get('category')&&!(categoryCounts[state.get('category')]||0))results.append(el('p','gc-search-explanation','This category is available, but no businesses have been added to it yet.'));
          results.append(el('p','gc-empty','No listed vendors match every part of this search. Try a suggestion below or change your filters.'));
          (data.suggestions||[]).forEach(suggestion=>{
            const choice=el('button','gc-query-chip',suggestion.label);choice.type='button';
            choice.onclick=()=>navigate({q:suggestion.q,city:'',category:'',page:'',radius:''});results.append(choice);
          });
          const browse = el('button','gc-action','Browse all vendors'); browse.type='button'; browse.onclick=()=>navigate({q:'',city:'',category:'',page:''}); results.append(browse);
        }
        data.results.forEach(vendor=>{
          const card=el('article','gc-result');
          const meta=el('p','gc-result-meta',(labels[vendor.category]||vendor.category)+' · '+vendor.city+', '+vendor.state+(vendor.locationKind==='service-area'?' · service area':'')+(vendor.distanceMiles!==undefined?' · approx. '+vendor.distanceMiles+' mi':''));
          const heading=el('h3');const link=el('a','',vendor.name); link.href=vendor.url;link.target='_blank';link.rel='noopener noreferrer';heading.append(link);
          const address=el('a','gc-result-url',new URL(vendor.url).hostname);address.href=vendor.url;address.target='_blank';address.rel='noopener noreferrer';
          const desc=el('p','',vendor.description);
          const actions=el('div','gc-result-actions');
          const visit=el('a','gc-action','Visit website');visit.href=vendor.url;visit.target='_blank';visit.rel='noopener noreferrer';
          const map=el('a','gc-action gc-action-secondary','View on map');map.href='harita.html?vendor='+encodeURIComponent(vendor.id);
          const source=el('p','gc-source-note');
          const sourceLink=el('a','','Source');sourceLink.href=vendor.source;sourceLink.target='_blank';sourceLink.rel='noopener noreferrer';
          source.append(sourceLink,document.createTextNode((vendor.checkedAt?' · Reviewed '+vendor.checkedAt:' · Website not yet verified')+' · Confirm current details with the business.'));
          actions.append(visit,map);card.append(meta,heading,address,desc,actions,source);results.append(card);
        });
        if (data.pages>1) {
          const paging=el('nav','gc-pagination');paging.setAttribute('aria-label','Search result pages');
          const previous=el('button','gc-action','Previous');previous.disabled=data.page<=1;previous.onclick=()=>navigate({page:String(data.page-1)});
          const next=el('button','gc-action','Next');next.disabled=data.page>=data.pages;next.onclick=()=>navigate({page:String(data.page+1)});
          paging.append(previous,el('span','',data.page+' / '+data.pages),next);results.append(paging);
        }
        results.append(el('p','gc-catalog-note',data.coverage));
        const beyond=el('p','gc-catalog-note','Looking beyond this directory? ');
        const external=el('a','','Search Google Maps ↗');external.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent([q||'wedding vendors',state.get('city'),labels[state.get('category')]].filter(Boolean).join(' '));external.target='_blank';external.rel='noopener noreferrer';
        beyond.append(external,document.createTextNode(' (opens an external search)'));results.append(beyond);
      } catch (error) {
        if (error.name==='AbortError'||activeRequest!==requestId) return;
        results.replaceChildren(el('p','gc-error',error.message));
        const retry=el('button','gc-action','Try again');retry.onclick=run;results.append(retry);
      } finally { if(activeRequest===requestId)results.setAttribute('aria-busy','false'); }
    }
    forms.forEach(form=>{
      const input=form.querySelector('[name="q"]');
      // Animated placeholder: examples type and erase, without altering actual user input.
      const examples = [
        'Wedding venues in Saratoga Springs',
        'Photographers near Albany',
        'Florists in Troy',
        'Wedding planners in New York',
        'Wedding rings near Schenectady',
        'Caterers in Capital Region'
      ];
      input.placeholder = '';
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        input.placeholder = 'Search wedding vendors';
      } else {
        let exampleIndex = 0, letters = 0, deleting = false, tick;
        let paused = false;
        const animatePlaceholder = () => {
          if (paused || document.activeElement === input || input.value) return;
          const phrase = examples[exampleIndex];
          letters += deleting ? -1 : 1;
          input.placeholder = phrase.slice(0, Math.max(0, letters));
          let delay = deleting ? 38 : 80;
          if (!deleting && letters >= phrase.length) { deleting = true; delay = 1650; }
          if (deleting && letters <= 0) {
            deleting = false;
            exampleIndex = (exampleIndex + 1) % examples.length;
            delay = 350;
          }
          tick = window.setTimeout(animatePlaceholder, delay);
        };
        const pause = () => {
          paused = true;
          window.clearTimeout(tick);
          input.placeholder = '';
        };
        const resume = () => {
          if (input.value || document.activeElement === input) return;
          paused = false;
          window.clearTimeout(tick);
          tick = window.setTimeout(animatePlaceholder, 450);
        };
        input.addEventListener('focus', pause);
        input.addEventListener('input', () => input.value ? pause() : resume());
        input.addEventListener('blur', resume);
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) pause(); else resume();
        });
        resume();
      }
      input.setAttribute('aria-label', 'Search by vendor, category or city');
      form.append(el('p','gc-catalog-note','Search listed US wedding vendors by service, city or business name. Try a nearby search with a city.'));
      const button=form.querySelector('[type="submit"]');if(button){button.disabled=false;button.removeAttribute('aria-disabled');}
      form.addEventListener('submit',event=>{event.preventDefault();navigate({q:input.value.trim(),page:'',city:'',category:'',radius:''});});
      const suggestions=el('div','gc-suggestions');suggestions.hidden=true;suggestions.setAttribute('role','listbox');input.parentElement.append(suggestions);
      let timer;let suggestionController;let suggestionVersion=0;
      let choices=[];let focused=-1;
      input.setAttribute('aria-expanded','false');
      input.setAttribute('aria-controls','wk-suggestions');
      suggestions.id='wk-suggestions';
      suggestions.setAttribute('role','group');
      suggestions.setAttribute('aria-label','Suggested businesses');
      function closeSuggestions(){suggestions.hidden=true;input.setAttribute('aria-expanded','false');focused=-1;}
      function cancelSuggestions(){++suggestionVersion;clearTimeout(timer);if(suggestionController)suggestionController.abort();closeSuggestions();}
      form.addEventListener('submit',cancelSuggestions);
      document.addEventListener('wk:search-start',cancelSuggestions);
      input.addEventListener('input',()=>{
        cancelSuggestions();const version=suggestionVersion;const typed=input.value.trim();
        if(input.value.trim().length<2){suggestions.hidden=true;return;}
        timer=setTimeout(async()=>{
          suggestionController=new AbortController();
          try {
            const r=await fetch('/api/search?suggest=1&q='+encodeURIComponent(typed),{signal:suggestionController.signal});if(!r.ok)return;const data=await r.json();if(version!==suggestionVersion||input.value.trim()!==typed)return;suggestions.replaceChildren();choices=[];focused=-1;
            data.results.slice(0,5).forEach(v=>{const choice=el('button','',v.name+' · '+v.city);choice.type='button';choice.onclick=()=>{input.value=v.name;cancelSuggestions();navigate({q:v.name,page:'',city:'',category:'',radius:''});};suggestions.append(choice);choices.push(choice);});
            suggestions.hidden=!data.results.length;input.setAttribute('aria-expanded',String(!!data.results.length));
          } catch { if(version===suggestionVersion)closeSuggestions(); }
        },250);
      });
      form.addEventListener('keydown',e=>{
        if(e.key==='Escape'){cancelSuggestions();input.focus();}
        if(!suggestions.hidden&&choices.length&&(e.key==='ArrowDown'||e.key==='ArrowUp')){
          e.preventDefault();focused=(focused+(e.key==='ArrowDown'?1:-1)+choices.length)%choices.length;choices[focused].focus();
        }
      });
      form.addEventListener('focusout',()=>setTimeout(()=>{if(!form.contains(document.activeElement))cancelSuggestions();},150));
    });
    const browser=document.querySelector('.wk-category-browser');
    if(browser){
      fetch('/api/search?metadata=1').then(r=>{if(!r.ok)throw new Error();return r.json();}).then(data=>{
        labels=data.category_labels;categoryGroups=data.category_groups||[];categoryCounts=data.category_counts||{};
        const select=browser.querySelector('select');select.replaceChildren();
        const initial=el('option','','Choose a wedding service');initial.value='';select.append(initial);
        const groups=new Map();
        categoryGroups.forEach(category=>{
          if(!groups.has(category.group)){const group=el('optgroup');group.label=category.group;groups.set(category.group,group);select.append(group);}
          const count=categoryCounts[category.id]||0;
          const option=el('option','',category.label+' · '+(count?count+' listed':'listings coming soon'));option.value=category.id;groups.get(category.group).append(option);
        });
        browser.hidden=false;
        browser.querySelector('button').addEventListener('click',()=>{if(select.value)navigate({q:'',category:select.value,city:'',page:'',radius:''});else select.focus();});
      }).catch(()=>{browser.hidden=true;});
    }
    window.addEventListener('popstate',()=>{
      state=cleanSearchParams(location.search);
      canonicalizeSearchUrl();
      if(state.has('q')||state.has('city')||state.has('category'))run();
      else {
        ++requestId;if(controller)controller.abort();
        document.body.classList.remove('wk-has-results');layout.hidden=true;results.replaceChildren();
        forms.forEach(form=>{form.querySelector('[name="q"]').value='';});
      }
    });
    if(state.has('q')||state.has('city')||state.has('category'))run();
  });
})();
