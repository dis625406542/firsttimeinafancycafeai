// Real, paid operator smoke. Durable journal prevents duplicate paid submission.
// --quote uploads dog demo assets and quotes only; --submit pays ONCE; --resume polls/composes only.
require('./operator-runtime.cjs');
const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto');
const {makeYirRequest,uploadYirPortrait,parseYirJobId,getYirStatus}=require('../src/lib/yir.ts');
const {normalizeTinyPortrait}=require('../src/lib/portrait-normalization.ts');
const slots=['back-left','back-right','keys','lead','sax'];
const dir=path.resolve('docs/tiny-smoke-5s'),journal=path.join(dir,'state.json');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function api(endpoint,body,headers={}){
 const r=await fetch('https://gateway.yir.ai'+endpoint,{method:'POST',headers:{Authorization:`Bearer ${process.env.YIR_API_KEY}`,'Content-Type':'application/json',...headers},body:JSON.stringify(body),signal:AbortSignal.timeout(60000),redirect:'error'});
 const d=await r.json();if(!r.ok){const e=new Error('YIR HTTP '+r.status);e.status=r.status;e.detail=d.error;throw e}return d;
}
(async()=>{
 await fs.mkdir(dir,{recursive:true});
 // A second operator process must not quote/submit the same journal concurrently.
 const lock=await fs.open(path.join(dir,'operator.lock'),'wx').catch(()=>{throw new Error('Smoke already running; inspect journal before removing a stale lock')});
 try{
 let s=await fs.readFile(journal,'utf8').then(JSON.parse).catch(()=>({idempotencyKey:'tiny-smoke5-'+crypto.randomUUID(),ids:[]}));
 const save=async()=>{await fs.writeFile(journal+'.tmp',JSON.stringify(s,null,2));await fs.rename(journal+'.tmp',journal)};
 await save();
 if(!s.jobId){
  if(s.submissionAttempted)throw new Error('Submission outcome unknown. Do not resubmit. Reconcile using saved idempotency key with provider.');
  if(process.argv.includes('--resume'))throw new Error('No paid job to resume');
  const {run}=await import('../services/video-composer/media.mjs');
  const ref=path.join(dir,'reference-5s-silent.mp4');
  await run(process.env.FFMPEG_PATH||'ffmpeg',['-nostdin','-hide_banner','-loglevel','error','-y','-i',path.resolve('docs/tiny-assets/reference-first15-silent.mp4'),'-map','0:v:0','-an','-t','5','-c:v','libx264','-preset','fast','-crf','20','-movflags','+faststart',ref]);
  for(let i=s.ids.length;i<5;i++){const p=path.resolve('public/tiny-band/'+slots[i]+'.webp');s.ids.push(await uploadYirPortrait(await normalizeTinyPortrait(new File([await fs.readFile(p)],slots[i]+'.webp',{type:'image/webp'}))));await save();console.log('Uploaded demo portrait',slots[i])}
  if(!s.referenceId){s.referenceId=await uploadYirPortrait(new File([await fs.readFile(ref)],'reference-5s.mp4',{type:'video/mp4'}));await save();}
  const context={templateId:'tiny-desk-ai',promptVersion:'tiny-desk-v2',photoSlots:slots,databasePrompt:'Create exactly 5 seconds in {{ASPECT_RATIO}}. Recreate the supplied first 5-second office concert ensemble wide shot at original speed. The five demo dog portraits map permanently in order: Image1 back-left backing performer, Image2 back-right backing performer, Image3 front-left keyboardist, Image4 center lead singer, Image5 front-right saxophonist. Keep exactly five distinct recognizable dogs, same instruments and role costumes as reference, warm office bookshelves. Keyboardist plays, lead visibly sings with expressive mouth movements and nods, saxophonist plays, backing pair gently sway. Match reference blocking and performance rhythm. No face swaps, cloning, added cuts or text. Generate a silent video only. No audio, music, speech or soundtrack.'};
  const input=makeYirRequest(s.ids,'480p','9:16','gender_neutral',context,s.referenceId);input.parameters.duration=5;
  // Match production: silent only, never retry with native sound.
  const q=await api('/v1/videos/quotes',input);
  if(q.parameters?.generate_audio!==false)throw new Error('Silent generation unavailable; not submitted');
  s.quote=q;s.request=input;await save();console.log('Quote (no charge):',JSON.stringify(q));
  if(!process.argv.includes('--submit'))return;
  if(q.supply?.available!==true||!Number.isFinite(Number(q.expected_amount))||Number(q.expected_amount)>1)throw new Error('No available supply or smoke estimate exceeds USD1; not submitted');
  if(q.parameter_notices?.some(n=>n.disposition==='ignored'))throw new Error('Quote ignores a requested parameter; not submitted');
  for(const k of ['duration','resolution','aspect_ratio','generate_audio'])if(q.parameters?.[k]!==input.parameters[k])throw new Error('Quote changes '+k+'; not submitted');
  s.submissionAttempted=true;await save();
  const result=await api('/v1/videos/generations',input,{'Idempotency-Key':s.idempotencyKey});s.jobId=parseYirJobId(result);s.submission=result;await save();console.log('Paid job submitted ONCE:',s.jobId);
 }
 for(let i=0;i<180;i++){
  const status=await getYirStatus(s.jobId);s.lastStatus=status.status;await save();console.log('Job:',s.jobId,status.status,status.progress);
  if(status.status==='failed')throw new Error(status.error);
  if(status.status==='finished'){
   const u=new URL(status.videoUrl),hosts=(process.env.PROVIDER_VIDEO_HOSTS||'').split(',').map(h=>h.trim().toLowerCase()).filter(Boolean);
   if(!hosts.includes(u.hostname.toLowerCase())){console.log('Result host requires explicit review/allowlist:',u.hostname);throw new Error('Untrusted provider output host')}
   const r=await fetch(u,{redirect:'error',signal:AbortSignal.timeout(90000)});if(!r.ok)throw new Error('Result download failed');
   if(Number(r.headers.get('content-length'))>100*1024*1024)throw new Error('Smoke result too large');
   const raw=path.join(dir,'generated-raw.mp4');await fs.writeFile(raw,Buffer.from(await r.arrayBuffer()));
   const {compose}=await import('../services/video-composer/media.mjs');const output=path.join(dir,'tiny-desk-5s-with-audio.mp4');
   s.media=await compose(raw,path.resolve('docs/tiny-assets/soundtrack-first15.mp3'),output,'480p','9:16',5);s.output=output;await save();console.log('Validated composed result:',JSON.stringify(s.media),output);return;
  }
  await sleep(10000);
 }
 console.log('Still processing; run --resume. Never resubmit.');
 }finally{await lock.close();await fs.unlink(path.join(dir,'operator.lock'))}
})().catch(e=>{console.error('Smoke stopped:',e.message);process.exitCode=1});
