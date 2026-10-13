# CEREBRO Energy AI

Prototipo original desarrollado con Codex para el segundo hackathon BIG School (octubre de 2026).

## Funciones
Dashboard energético de 24 horas; simulación solar, batería y red; planificación de dos BMW ficticios y piscina; comparación del coste ajustado; asistente explicable; exportación del informe.

Todos los datos son sintéticos. No controla dispositivos reales. No requiere credenciales ni conecta Home Assistant.

## Demo pública y versión local
La demo estática utiliza reglas y cifras del simulador en el navegador. La IA generativa está disponible en ejecución local con Ollama, con respaldo de reglas ante fallo. Una página pública no accede al modelo del ordenador del autor.

Node.js 20 o superior: npm test y npm start. Abrir http://127.0.0.1:8766/.
Para IA local: instalar Ollama desde su fuente oficial, descargar qwen3:0.6b con ollama pull qwen3:0.6b y arrancar Ollama. Ejecutar CEREBRO_MODEL=qwen3:0.6b npm start. El modelo requiere almacenamiento y recursos del equipo. No se realizan consultas a una API de pago.

## Arquitectura
engine.js simula y busca horarios; safety.js evalúa límites; app.js representa resultados; agent.mjs añade explicaciones orientativas; server.mjs sirve la interfaz y /api/chat. Las pruebas reproducibles están en archivos .test.mjs.

En este repositorio los módulos están en la raíz para servir la demo estática directamente. Se conserva la misma lógica del checkpoint local, donde los recursos de interfaz estaban en dist y las pruebas en tests.

## Verificación y límites
13 pruebas PASS el 13/10/2026. VERIFICACION_20261013.json registra IA real, sustitución de cifras del modelo por evidencia económica, rechazo de órdenes y rechazo de origen externo. Las explicaciones IA pueden ser imprecisas; cifras y seguridad se calculan fuera del modelo.

La búsqueda discreta penaliza picos de red; un plan fuera del límite queda bloqueado para simulación. No garantiza un óptimo global. Ahorros por día sintético, sin impuestos, término fijo ni degradación. Costes negativos son créditos teóricos; no facturas reales.

El desarrollo doméstico FARO Energy AI es separado. No contiene datos domésticos ni realiza transferencias automáticas.
