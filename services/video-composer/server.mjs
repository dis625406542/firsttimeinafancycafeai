import http from 'node:http';
import { timingSafeEqual } from 'node:crypto';
import { mkdir,readFile,writeFile,rename,readdir,stat,rm } from 'node:fs/promises';
import { createReadStream,createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable,Transform } from 'node:stream';
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { join,resolve } from 'node:path';
import { compose,dimensions,run } from './media.mjs';
const root=resolve(process.env.JOB_DIR||'/data/jobs'),token=process.env.COMPOSER_TOKEN||'';
const host=process.env.COMPOSER_R2_HOST||'';
if(token.length<32 || !/^[a-f0-9]{32}\.(?:(?:us|eu|fedramp)\.)?r2\.cloudflarestorage\.com$/.test(host))throw new Error('Configure a strong COMPOSER_TOKEN and exact COMPOSER_R2_HOST');
await run(process.env.FFMPEG_PATH||'ffmpeg',['-version']);
await run(process.env.FFPROBE_PATH||'ffprobe',['-version']);
await mkdir(root,{recursive:true,mode:0o700});
const jobs=new Map();let busy=false;let mutation=Promise.resolve();
async function exclusive(action){const previous=mutation;let release;mutation=new Promise(r=>{release=r});await previous;try{return await action()}finally{release()}}
const idOK=id=>typeof id==='string'&&/^[A-F0-9]{32}-[a-f0-9]{16}$/.test(id);
async function persist(j){const path=join(root,j.id,'job.json');await writeFile(path+'.tmp',JSON.stringify(j),{mode:0o600});await rename(path+'.tmp',path)}
async function checked(value){
  const u=new URL(value);
  if(u.protocol!=='https:'||u.hostname!==host||u.port&&u.port!=='443'||u.username||u.password||isIP(u.hostname))throw new Error('Invalid asset host');
  const addresses=await lookup(host,{all:true});
  if(!addresses.length||addresses.some(({address:a})=>/^(127\.|10\.|192\.168\.|169\.254\.|0\.|172\.(1[6-9]|2[0-9]|3[01])\.|::1$|f[cd]|fe80)/i.test(a)))throw new Error('Unsafe asset address');
  return u.href;
}
async function download(url,path){
 const r=await fetch(await checked(url),{redirect:'error',signal:AbortSignal.timeout(90000)});
 if(!r.ok||!r.body||Number(r.headers.get('content-length'))>300*1024*1024)throw new Error('Asset download failed');
 let size=0;const limit=new Transform({transform(chunk,enc,cb){size+=chunk.length;cb(size>300*1024*1024?new Error('Asset too large'):null,chunk)}});
 await pipeline(Readable.fromWeb(r.body),limit,createWriteStream(path,{mode:0o600}));
}
async function pump(){
 if(busy)return;const j=[...jobs.values()].find(x=>x.status==='queued');if(!j)return;busy=true;j.status='running';j.updated=Date.now();
 try{
  await persist(j);const dir=join(root,j.id),v=join(dir,'input.mp4'),a=join(dir,'audio.mp3'),out=join(dir,'output.mp4');
  await download(j.videoUrl,v);await download(j.audioUrl,a);
  j.media=await compose(v,a,out,j.resolution,j.aspect);
  const size=(await stat(out)).size;
  const r=await fetch(await checked(j.outputUrl),{method:'PUT',headers:{'Content-Type':'video/mp4','Content-Length':String(size),'x-amz-meta-composition':j.id},body:createReadStream(out),duplex:'half',redirect:'error',signal:AbortSignal.timeout(90000)});
  if(!r.ok)throw new Error('Output upload failed');
  j.status='finished';j.updated=Date.now();delete j.videoUrl;delete j.audioUrl;delete j.outputUrl;await persist(j);
  await Promise.all([v,a,out].map(f=>rm(f,{force:true})));
 }catch{j.status='failed';j.updated=Date.now();await persist(j).catch(()=>{});console.error('Composition pending retry',{id:j.id})}
 finally{busy=false;setImmediate(pump)}
}
// Recover durable work after a process/container restart. A volume MUST be mounted.
for(const name of await readdir(root)){
 if(!idOK(name))continue;
 try{const j=JSON.parse(await readFile(join(root,name,'job.json'),'utf8'));if(j.id!==name)continue;
 if(Date.now()-j.updated>3*86400000){await rm(join(root,name),{recursive:true,force:true});continue}
 if(j.status==='running')j.status='queued';jobs.set(name,j)}catch{/* ignore incomplete atomic writes */}
}
const server=http.createServer(async(req,res)=>{
 const supplied=Buffer.from(req.headers.authorization||''),expected=Buffer.from(`Bearer ${token}`);
 const reply=(code,data)=>{res.writeHead(code,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data))};
 if(supplied.length!==expected.length||!timingSafeEqual(supplied,expected))return reply(401,{error:'Unauthorized'});
 if(req.method==='GET'&&req.url==='/health')return reply(200,{ok:true,ffmpeg:true});
 if(req.method!=='POST'||req.url!=='/jobs')return reply(404,{});
 try{
  let text='';for await(const b of req){text+=b;if(text.length>32768)return reply(413,{error:'Too large'})}
  const input=JSON.parse(text);if(!idOK(input.id))throw new Error();dimensions(input.resolution,input.aspect);
  for(const key of ['videoUrl','audioUrl','outputUrl'])await checked(input[key]);
  await exclusive(async()=>{
  let j=jobs.get(input.id);
  if(j&&(j.resolution!==input.resolution||j.aspect!==input.aspect))return reply(409,{error:'Immutable job mismatch'});
  if(!j||j.status==='failed'){
   if([...jobs.values()].filter(x=>['queued','running'].includes(x.status)).length>=100)return reply(503,{error:'Queue full'});
   j={...input,status:'queued',updated:Date.now()};await mkdir(join(root,j.id),{recursive:true,mode:0o700});await persist(j);jobs.set(j.id,j);
  } // Existing queued/running jobs retain their immutable signed URL snapshot. Failed jobs can be refreshed.

  reply(200,{id:j.id,status:j.status,media:j.media});setImmediate(pump);
  });
 }catch{return reply(400,{error:'Invalid composition request'})}
});
server.requestTimeout=30000;server.headersTimeout=15000;
server.listen(Number(process.env.PORT||8787),'0.0.0.0',()=>{console.log('Composer listening');pump()});
setInterval(async()=>{for(const [id,j]of jobs){if(!['running','queued'].includes(j.status)&&Date.now()-j.updated>3*86400000){await rm(join(root,id),{recursive:true,force:true});jobs.delete(id)}}},3600000).unref();
