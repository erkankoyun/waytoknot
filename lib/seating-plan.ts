const layouts=new Set(['round-4','round-5','round-6','round-8','row-5','row-8','row-10']);
const objectTypes=new Set(['sahne','dans','muzik','hediye','orkestra','bar','foto','giris','kokteyl','ozel']);
function text(value:unknown,max:number){return typeof value==='string'?value.slice(0,max):'';}
function list(value:unknown,max:number){return Array.isArray(value)?value.slice(0,max):[];}
function number(value:unknown,max=20000){return Math.max(0,Math.min(max,Number(value)||0));}
function position(value:unknown){const v=value&&typeof value==='object'?value as Record<string,unknown>:{};return {x:number(v.x),y:number(v.y)};}
export function validateSeatingPlan(value:unknown){
 if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Invalid seating plan');const p=value as Record<string,unknown>;
 if(p.version!==1||!Array.isArray(p.configs)||typeof p.guestsText!=='string')throw new Error('This is not a Way to Knot seating plan.');
 const configs=list(p.configs,20).map(v=>{if(!v||!layouts.has(v.layout))throw new Error('Invalid table layout');return {layout:v.layout,count:Math.max(1,Math.min(30,Math.floor(Number(v.count)||1)))};});
 if(!configs.length||configs.reduce((n,c)=>n+c.count,0)>200)throw new Error('A seating plan may contain up to 200 tables.');
 if(p.guestsText.split('\n').length>2000)throw new Error('A seating plan may contain up to 2,000 guests.');
 const plan={version:1,configs,guestsText:text(p.guestsText,200000),pairsText:text(p.pairsText,30000),conflictsText:text(p.conflictsText,30000),stageCount:number(p.stageCount,40),aisleCount:number(p.aisleCount,40),tables:list(p.tables,200).map(t=>({id:text(t?.id,80),position:position(t?.position),area:t?.area==='annex'?'annex':'main',collapsed:t?.collapsed===true})),assignments:list(p.assignments,2000).map(a=>({guestId:text(a?.guestId,300),seatId:text(a?.seatId,100)})),objects:list(p.objects,100).map(o=>({type:objectTypes.has(o?.type)?o.type:'ozel',label:text(o?.label,100),position:position(o?.position),area:o?.area==='annex'?'annex':'main'}))};
 if(JSON.stringify(plan).length>280000)throw new Error('This plan is too large. Please use fewer guests or shorter notes.');return plan;
}
