import {recommendations} from './engine.js';
import {assessPlan} from './safety.js';
export function buildReport(result, generatedAt=new Date().toISOString()) {
 return {project:'Cerebro Energy AI',version:'0.2.1',generatedAt,
 notice:'DATOS SINTÉTICOS. Sin control real. IA local opcional; explicaciones con respaldo de reglas.',
 methodology:'Prioridad de horarios viables antes del coste; búsqueda discreta por horas.',
 ...result,recommendations:recommendations(result),safety:assessPlan(result)};
}
