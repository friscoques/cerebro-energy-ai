# Entrega CEREBRO · estado verificado

Revisión: 14/10/2026. Candidatura del segundo hackathon BIG School, separada de FARO doméstico.

| Requisito | Estado y evidencia |
|---|---|
| Desarrollo con Codex dentro de 9–19 octubre | Desarrollo original desde 11/10; registros conservados. Continuidad conceptual aceptada según comunicación de Frisco sobre Discord; ticket no leído independientemente |
| Mínimo tres funciones | Dashboard, simulación solar/batería/red, planificación BMW/piscina, asistente y exportación |
| Datos sintéticos; sin control real | Declaración visible; safety.js y campo realExecutionAllowed=false |
| Pruebas automatizadas | 16 PASS verificados el 14/10: motor, seguridad, adaptador IA, cantidades e informe |
| App desplegada | https://friscoques.github.io/cerebro-energy-ai/ · Pages run 38590929815 Success |
| Código GitHub | https://github.com/friscoques/cerebro-energy-ai · commit 9d1498a530ab5b4b6fe2086f2eaaadf5215fe5f0 |
| Documento técnico | Actualizado al producto vigente, enlaces y limitaciones; preserva historial. Solo propietario: acceso de evaluación pendiente |
| Historial de prompts | Google Doc separado, extractos reales y resúmenes identificados. Sigue siendo parcial, no exhaustivo |
| Revisión de interfaz móvil | Navegador a 390 × 844: recorrido 4 pasos, plan, consulta BMW y cambio a cubierto. Sin desbordamiento global en vista revisada. No equivale a iPhone físico |
| Informe | JSON v0.2.1, 24 filas, metodología, seguridad y motivos de bloqueo |
| Vídeo <=5 minutos | Guion detallado y recorrido preparados. Grabación, duración final y enlace pendientes |
| Inscripción | Responsabilidad de Frisco. Envío no confirmado en esta sesión; plazo 13/10/2026 23:59 |
| Envío final | Pendiente. Límite 19/10/2026 23:59, hora peninsular |

## Enlaces de evaluación

- Técnico: https://docs.google.com/document/d/1eQEaF58v87g5gEMaTCeJKE2Ei20L7zC55qfNLW5nsdw
- Prompts: https://docs.google.com/document/d/1Ggqu6nzccZlMfYm80ut4tMJvtkvrXsxTE5Nl0bD8d3s

Ambos Docs son privados al comprobar sus permisos el 14/10. No afirmar que el jurado puede abrirlos. Disponer el acceso concreto de evaluación antes del envío. Conservar los proyectos domésticos fuera de esa entrega.

## Reproducir la demostración pública

1. Abrir la demo y pulsar Ver demostración; restablece el escenario sintético.
2. Seguir Vista general → Plan → Asistente. Consultar «¿Puedo cargar los BMW sin red?».
3. Cambiar a Cubierto: producción visible 19,6 kWh frente a 61,2 kWh soleados con valores de ejemplo.
4. Exportar informe y comprobar escenario, 24 filas y seguridad. El ahorro pertenece a un día sintético, no es una promesa anual.
5. Probar una orden: CEREBRO debe rechazar actuar sobre dispositivos.

## Reproducir código y pruebas

Repositorio público: módulos y pruebas en raíz. Con Node.js 20 o superior, ejecutar npm test y npm start; abrir http://127.0.0.1:8766/.
La copia canónica local conserva los recursos en dist/ y las pruebas en tests/; se usa el mismo comando de pruebas.
La demo pública usa reglas. Ollama es opcional y local; GitHub Pages no publica el modelo del ordenador del autor. No contratar servicios para demostrar la versión de reglas.

## Pendientes concretos

Grabar y cronometrar vídeo; completar el historial con evidencia original pertinente disponible; disponer permisos para evaluación; confirmar inscripción y realizar el envío. No marcar la entrega completa antes de estos pasos.
