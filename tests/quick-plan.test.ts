import {test} from 'node:test';
import assert from 'node:assert/strict';
import {quickPlan} from '../public/assets/quick-plan-data.js';
test('quick planner budgets always allocate 100 percent and reflect selected priorities',()=>{
 for(const type of ['full','ceremony','weekend'])for(const priority of ['venue','photography','style','budget']){const p=quickPlan({city:'Albany, NY',budget:'30000',guests:'150',type,priority});assert.equal(p.rows.reduce((n:number,r:{percent:number})=>n+r.percent,0),100);assert.ok(p.rows.every((r:{percent:number})=>r.percent>0));assert.equal(p.steps.length,3);}
 const photo=quickPlan({city:'Boston, MA',budget:'60000',guests:'75',type:'full',priority:'photography'}),venue=quickPlan({city:'Boston, MA',budget:'60000',guests:'75',type:'full',priority:'venue'});assert.ok(photo.rows[1].percent>venue.rows[1].percent);assert.throws(()=>quickPlan({city:'',budget:'30000',guests:'150',type:'full',priority:'venue'}));assert.throws(()=>quickPlan({city:'Albany, NY',budget:'-500',guests:'150',type:'full',priority:'venue'}));
});
