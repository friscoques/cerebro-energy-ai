import test from 'node:test';
import assert from 'node:assert/strict';
import {chat} from './agent.mjs';
test('El ahorro en kWh inventado por IA se sustituye por evidencia económica',async()=>{
 const r=await chat({question:'¿Cuánto ahorro?',config:{}},{model:'test',fetcher:async()=>({ok:true,json:async()=>({message:{content:'El plan ahorra aproximadamente 5.15 kWh.'}})})});
 assert.equal(r.mode,'rules-fallback');
 assert.doesNotMatch(r.text,/ahorra aproximadamente 5.15 kWh/);
 assert.match(r.text,/€/);
 assert.equal(r.safety.realExecutionAllowed,false);
});
