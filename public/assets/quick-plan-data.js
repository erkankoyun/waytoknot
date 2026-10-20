export function quickPlan({city,budget,guests,type,priority}) {
 const amount=Number(budget),count=Number(guests);
 if(!String(city||'').trim()||!Number.isFinite(amount)||amount<100||amount>10000000||!Number.isInteger(count)||count<1||count>10000)throw Error('Please choose your city, budget and guest count.');
 const weights=[45,12,10,8,8,7,10];
 if(type==='ceremony'){weights[0]=30;weights[2]=15;weights[6]=15;}
 if(type==='weekend'){weights[0]+=8;weights[6]+=3;}
 const index={venue:0,photography:1,style:2,budget:6}[priority];if(index!==undefined)weights[index]+=8;
 const sum=weights.reduce((n,v)=>n+v,0),percent=weights.map(w=>Math.floor(w/sum*100));let remaining=100-percent.reduce((n,v)=>n+v,0);
 const ranked=weights.map((w,i)=>({i,remainder:w/sum*100-percent[i]})).sort((a,b)=>b.remainder-a.remainder);for(let i=0;i<remaining;i++)percent[ranked[i].i]++;
 const labels=['Venue & catering','Photography & video','Attire & alterations','Flowers & decor','Music & entertainment','Other details','Contingency'];
 const rows=labels.map((label,i)=>({label,percent:percent[i],amount:Math.round(amount*percent[i]/100)}));
 const steps=priority==='photography'?['Shortlist photographers and compare complete galleries, coverage and delivery terms.','Check light and photo locations when you visit venues.']:priority==='style'?['Choose a small collection of style references for your venue, clothing and flowers.','Include fittings, accessories and setup costs when comparing options.']:priority==='budget'?['List essential services first and ask for itemized written quotes.','Keep taxes, service charges and a contingency fund inside your total budget.']:['Shortlist venues in '+city+' with enough seated capacity for '+count+' guests.','Ask each venue for a written quote covering the same date, guest count and services.'];
 steps.push(type==='weekend'?'Create one schedule covering travel, welcome events and the wedding day.':type==='ceremony'?'Confirm ceremony timing before coordinating your meal, outfits and photography.':'Confirm the venue and date before arranging the other vendors and your seating plan.');
 return {city:String(city).slice(0,100),budget:amount,guests:count,rows,steps};
}
