import test from 'node:test';
import assert from 'node:assert/strict';
import {optimize} from './engine.js';
import {buildReport} from './report.js';
test('Informe bloqueado conserva causas y prohíbe ejecución',()=>{
 const report=JSON.parse(JSON.stringify(buildReport(optimize({solar:0,battery:0,gridLimit:1}),'2026-10-14T06:00:00Z')));
 assert.equal(report.safety.status,'blocked');
 assert.ok(report.safety.reasons.length>0);
 assert.equal(report.safety.realExecutionAllowed,false);
 assert.equal(report.optimized.rows.length,24);
});
test('Informe viable también declara que es solo simulación',()=>{
 const report=buildReport(optimize({}));
 assert.equal(report.safety.status,'simulation-only');
 assert.equal(report.safety.realExecutionAllowed,false);
});
