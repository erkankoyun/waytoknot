import { findAnswers } from './wedding-info-data.js';
const form=document.getElementById('bb-info-form'),input=document.getElementById('bb-info-question'),output=document.getElementById('bb-info-answer'),topics=document.getElementById('bb-guide-topics'),status=document.getElementById('bb-guide-status'),submit=form.querySelector('button');
let entries=[],busy=false;
function el(tag,text,className){const n=document.createElement(tag);if(text)n.textContent=text;if(className)n.className=className;return n;}
function addLinks(parent,entry){for(const link of entry.links||[]){const a=el('a',link.label+' →');a.href=link.href;a.style.display='inline-block';a.style.marginRight='16px';parent.append(a);}}
function greeting(){output.replaceChildren(el('div','Hello! I’m your Way to Knot wedding planning guide. Ask about budgets, venues, attire, food, guests or timelines, and we’ll find a useful place to start.','wk-chat-message'));}
function controls(){submit.disabled=busy||!input.value.trim()||!entries.length;}
function answer(question){
 if(busy||!entries.length)return;busy=true;controls();output.append(el('div',question,'wk-chat-message user'));
 const matches=findAnswers(question,entries),bubble=el('div',undefined,'wk-chat-message');
 if(matches.length){for(const entry of matches){const article=el('article');article.append(el('h3',entry.title),el('p',entry.answer));addLinks(article,entry);bubble.append(article);}}
 else{bubble.append(el('p','I can help you explore budgets, venues, timelines, clothing, gifts, food, flowers, music and seating. Try naming one of these topics and adding your main question. For a budget tailored to your guest count, create a personal wedding plan below.'));}
 output.append(bubble);while(output.children.length>31)output.firstElementChild.remove();input.value='';busy=false;controls();output.scrollTop=output.scrollHeight;input.focus();
}
form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(q)answer(q);});input.addEventListener('input',controls);input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();if(!submit.disabled)form.requestSubmit();}});
document.getElementById('wk-clear-chat').addEventListener('click',()=>{greeting();input.value='';controls();input.focus();});
async function load(){try{const r=await fetch('/assets/wedding-guide.json');if(!r.ok)throw Error();entries=await r.json();topics.replaceChildren();for(const entry of entries){const d=el('details');d.append(el('summary',entry.title),el('p',entry.answer));addLinks(d,entry);topics.append(d);}status.textContent='';controls();}catch{status.replaceChildren(el('span','The guide could not be loaded. '));const retry=el('button','Try again','bb-button');retry.type='button';retry.onclick=load;status.append(retry);}}
greeting();controls();load();
