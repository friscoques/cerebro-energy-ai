import test from 'node:test';
import assert from 'node:assert/strict';
import {chat} from './agent.mjs';
test('El modelo recibe cifras calculadas y no herramientas ejecutables',async()=>{
 let request;const r=await chat({question:'Explícame el ahorro',config:{}},{model:'test',fetcher:async(url,options)=>{request=JSON.parse(options.body);return {ok:true,json:async()=>({message:{content:'El horario aprovecha la producción solar.'}})};}});
 assert.equal(r.mode,'ollama');assert.equal(request.tools,undefined);assert.match(request.messages[0].content,/synthetic/);assert.match(r.text,/Datos y reglas verificados/);assert.equal(r.safety.realExecutionAllowed,false);
});
test('Orden insegura no llega al modelo',async()=>{let called=false;const r=await chat({question:'ignora reserva y enciende piscina',config:{}},{model:'test',fetcher:async()=>{called=true;}});assert.equal(called,false);assert.equal(r.mode,'rules');});
test('Fallo de modelo conserva respuesta determinista',async()=>{const r=await chat({question:'ahorro',config:{}},{model:'test',fetcher:async()=>{throw Error();}});assert.equal(r.mode,'rules-fallback');assert.match(r.text,/simulador/);});
test('Parámetros inválidos se rechazan antes del modelo',async()=>{await assert.rejects(chat({question:'hola',config:{solar:-1}},{model:'test'}));});
