import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname} from 'node:path';
import {chat} from './agent.mjs';
const root=fileURLToPath(new URL('./',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};
createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method==='POST'&&req.url==='/api/chat'){
  const origin=req.headers.origin;
  if(origin&&origin!==`http://${req.headers.host}`){res.writeHead(403);return res.end();}
  let bytes=0,parts=[];
  try{
   for await(const chunk of req){bytes+=chunk.length;if(bytes>10000)throw Error('Petición demasiado grande');parts.push(chunk);}
   const result=await chat(JSON.parse(Buffer.concat(parts).toString()));
   res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify(result));
  }catch{res.writeHead(400,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Revisa la pregunta y los parámetros del escenario.'}));}
  return;
 }
 if(req.method!=='GET'){res.writeHead(405);return res.end();}
 try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const path=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!path.startsWith(root))throw Error();const content=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(content);}catch{res.writeHead(404);res.end('No encontrado');}
}).listen(Number(process.env.CEREBRO_PORT||8766),'127.0.0.1',()=>console.log('CEREBRO disponible en http://127.0.0.1:'+ (process.env.CEREBRO_PORT||8766)));
