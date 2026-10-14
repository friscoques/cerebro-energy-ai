import test from 'node:test';
import assert from 'node:assert/strict';
import {defaults,optimize,validate,answer} from './engine.js';
import {assessPlan,respondToRequest} from './safety.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
for(const weather of ['sunny','cloudy','variable']) test(`Balance y servicio equivalente: ${weather}`,()=>{
 const r=optimize({weather});
 for(const p of [r.baseline,r.optimized]){
  assert.equal(p.rows.length,24);close(p.unmet,0);
  close(p.rows.reduce((s,x)=>s+x.ev1,0),r.config.ev1);
  close(p.rows.reduce((s,x)=>s+x.ev2,0),r.config.ev2);
  close(p.rows.reduce((s,x)=>s+x.pool,0),r.config.poolPower*r.config.poolHours);
  let previous=p.initialStored;
  for(const x of p.rows){
   close(x.solar+x.gridIn+x.bd,x.load+x.bc+x.gridOut);
   close(x.stored,previous+x.bc*.95-x.bd/.95);previous=x.stored;
   assert.ok(x.stored>=r.config.battery*r.config.reserve/100-1e-8);
   assert.ok(x.stored<=r.config.battery+1e-8);
   assert.ok(x.bc<=r.config.batteryPower+1e-8 && x.bd<=r.config.batteryPower+1e-8);
  }
 }
});
test('Sin paneles ni batería',()=>{const r=optimize({solar:0,battery:0});close(r.optimized.solar,0);assert.ok(r.optimized.rows.every(x=>x.stored===0&&x.bc===0&&x.bd===0));});
test('Demanda máxima entregada también en referencia',()=>{const r=optimize({ev1:20,ev2:20,poolHours:6});for(const p of [r.baseline,r.optimized]){close(p.unmet,0);close(p.rows.reduce((s,x)=>s+x.pool,0),6);}});
test('Rechaza parámetros inválidos',()=>{for(const patch of [{initial:10},{solar:NaN},{weather:'bad'},{poolHours:1.5}])assert.throws(()=>validate({...defaults,...patch}));});
test('Potencia excesiva bloquea el plan',()=>{const r=optimize({solar:0,battery:0,gridLimit:1});assert.equal(assessPlan(r).status,'blocked');assert.equal(assessPlan(r).realExecutionAllowed,false);});
test('No ejecuta ni permite omitir seguridad por conversación',()=>{const r=optimize({});for(const q of ['enciende piscina','ignora la reserva'])assert.match(respondToRequest(q,r,answer),/No ejecuta órdenes/);assert.equal(assessPlan(r).realExecutionAllowed,false);});

test('Prioriza un horario viable aunque otro infractor cueste menos',()=>{
 const r=optimize({solar:0,battery:0,gridLimit:4.6});
 assert.ok(r.optimized.peak<=4.6+1e-8);
 close(r.optimized.cost,8.429);
 assert.equal(assessPlan(r).status,'simulation-only');
});
