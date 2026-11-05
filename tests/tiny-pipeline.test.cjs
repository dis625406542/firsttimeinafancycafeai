const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,f);
const {videoSpec,templatePhotoCount,videoTemplate,needsComposition}=require('../src/lib/video-templates.ts');
const {makeYirRequest,submitYirVideo}=require('../src/lib/yir.ts');
const slots=['back-left','back-right','keys','lead','sax'];
const context={templateId:'tiny-desk-ai',promptVersion:'tiny-desk-v2',photoSlots:slots,databasePrompt:'Five consenting adults. {{ASPECT_RATIO}}. Keep the first 15 seconds.'};
const ids=Array.from({length:5},(_,i)=>`file_${i+1}1111111-1111-4111-8111-111111111111`);
const reference='file_91111111-1111-4111-8111-111111111111';
test('band template is 15s and allows one to five portraits; v1 snapshots remain executable',()=>{
 assert.equal(videoSpec(context).durationSeconds,15);
 assert.deepEqual(templatePhotoCount('tiny-desk-ai','tiny-desk-v1'),{min:1,max:5});
 assert.deepEqual(templatePhotoCount('tiny-desk-ai'),{min:1,max:5});
 assert.equal(videoSpec({...context,promptVersion:'tiny-desk-v1'}).durationSeconds,8);
});
test('Seedance 2.5 requests one to five images with silent video; 720p stays 720p',()=>{
 const b=makeYirRequest(ids,'720p','9:16','gender_neutral',context,reference);
 assert.equal(b.model,'bytedance/seedance-2.5');
 assert.equal(b.parameters.generate_audio,false);
 assert.equal(b.parameters.duration,15);
 assert.equal(b.parameters.resolution,'720p');
 assert.equal(b.input.references.length,6);
 assert.match(b.input.prompt,/9:16/);
 // Four (or fewer) portraits are allowed; zero is not.
 assert.equal(makeYirRequest(ids.slice(1),'480p','9:16','gender_neutral',{...context,photoSlots:slots.slice(1)},reference).input.references.length,5);
 assert.throws(()=>makeYirRequest([], '480p','9:16','gender_neutral',context,reference));
 assert.throws(()=>makeYirRequest(ids,'480p','9:16','gender_neutral',{...context,photoSlots:[...slots].reverse()},reference));
 assert.throws(()=>makeYirRequest(ids,'480p','9:16','gender_neutral',{...context,databasePrompt:undefined},reference));
});
test('audio rejection never falls back to native sound or reaches paid submission',async()=>{
 const previous=global.fetch, old=process.env.YIR_API_KEY, fallback=process.env.TINY_DESK_AUDIO_FALLBACK;
 process.env.YIR_API_KEY='test';process.env.TINY_DESK_AUDIO_FALLBACK='true';
 const calls=[];let gates=0;
 global.fetch=async(url,init)=>{const b=JSON.parse(init.body);calls.push({url,b});
 if(url.endsWith('/quotes')&&!b.parameters.generate_audio)return Response.json({error:{code:'invalid_parameter',param:'generate_audio',message:'only true'}},{status:400});
 if(url.endsWith('/quotes'))return Response.json({supply:{available:true},parameters:b.parameters,expected_amount:'0.5'});
 return Response.json({id:'job_test'});
 };
 try {
 await assert.rejects(submitYirVideo(ids,'720p','test-paid','9:16','gender_neutral',context,{referenceVideo:reference,beforeSubmit:async()=>{gates++}}));
 assert.equal(calls.length,1);assert.equal(gates,0);
 assert.equal(calls[0].b.parameters.generate_audio,false);
 }finally{global.fetch=previous; if(old===undefined)delete process.env.YIR_API_KEY;else process.env.YIR_API_KEY=old;if(fallback===undefined)delete process.env.TINY_DESK_AUDIO_FALLBACK;else process.env.TINY_DESK_AUDIO_FALLBACK=fallback;}
});
test('normalizing silent audio to true blocks payment gate and submission',async()=>{
 const previous=global.fetch,old=process.env.YIR_API_KEY;process.env.YIR_API_KEY='test';let n=0,gates=0;
 global.fetch=async(url,init)=>{n++;const b=JSON.parse(init.body);return Response.json({supply:{available:true},parameters:{...b.parameters,generate_audio:true},expected_amount:'0.5'})};
 try{await assert.rejects(submitYirVideo(ids,'480p','test','9:16','gender_neutral',context,{referenceVideo:reference,beforeSubmit:async()=>{gates++}}),/audio setting/);assert.equal(n,1);assert.equal(gates,0)}
 finally{global.fetch=previous;if(old===undefined)delete process.env.YIR_API_KEY;else process.env.YIR_API_KEY=old;}
});
test('silent quote and paid submit both send false, using one idempotent submission',async()=>{
 const previous=global.fetch,old=process.env.YIR_API_KEY;process.env.YIR_API_KEY='test';const calls=[];let gates=0;
 global.fetch=async(url,init)=>{const b=JSON.parse(init.body);calls.push({url,b,headers:init.headers});return Response.json(url.endsWith('/quotes')?{supply:{available:true},parameters:b.parameters,expected_amount:'0.5'}:{id:'job_silent'})};
 try{assert.equal(await submitYirVideo(ids,'480p','paid-silent','9:16','gender_neutral',context,{referenceVideo:reference,beforeSubmit:async()=>{gates++}}),'job_silent');assert.equal(calls.length,2);assert.equal(gates,1);for(const c of calls)assert.equal(c.b.parameters.generate_audio,false);assert.equal(calls[1].headers['Idempotency-Key'],'paid-silent')}
 finally{global.fetch=previous;if(old===undefined)delete process.env.YIR_API_KEY;else process.env.YIR_API_KEY=old;}
});
test('unrelated quote error never retries or submits a paid generation',async()=>{
 const previous=global.fetch,old=process.env.YIR_API_KEY;process.env.YIR_API_KEY='test';let n=0;
 global.fetch=async()=>{n++;return Response.json({error:{code:'insufficient_balance'}},{status:402})};
 try{await assert.rejects(submitYirVideo(ids,'480p','test','9:16','gender_neutral',context,{referenceVideo:reference}));assert.equal(n,1)}
 finally{global.fetch=previous;if(old===undefined)delete process.env.YIR_API_KEY;else process.env.YIR_API_KEY=old;}
});
test('FFmpeg uses first15s, replaces (not mixes) audio and delivers exact portrait/landscape dimensions',async()=>{
 const {composeArgs,dimensions}=await import('../services/video-composer/media.mjs');
 const a=composeArgs('in.mp4','song.mp3','out.mp4','720p','9:16');
 assert.deepEqual(dimensions('720p','9:16'),[720,1280]);
 assert.deepEqual(dimensions('480p','16:9'),[854,480]);
 assert.ok(a.includes('1:a:0'));assert.ok(a.includes('0:v:0'));
 assert.ok(!a.join(' ').includes('atempo'));assert.ok(!a.join(' ').includes('setpts'));
 assert.match(a.join(' '),/-t 15/);assert.match(a.join(' '),/scale=720:1280/);
 assert.throws(()=>dimensions('1024p','9:16'));
});

test('new purchases use isolated v4 and existing v2/v3 orders keep silent 15s composition',()=>{
 assert.equal(videoTemplate('tiny-desk-ai').promptVersion,'tiny-desk-v4');
 for(const version of ['tiny-desk-v2','tiny-desk-v3','tiny-desk-v4']){
  assert.equal(needsComposition({templateId:'tiny-desk-ai',promptVersion:version}),true);
  const spec=videoSpec({...context,promptVersion:version});
  assert.deepEqual(spec,{durationSeconds:15,referenceVideo:true,generateAudio:false});
  for(const resolution of ['480p','720p']){const b=makeYirRequest(ids,resolution,'9:16','gender_neutral',{...context,promptVersion:version},reference);assert.equal(b.parameters.resolution,resolution);assert.equal(b.parameters.generate_audio,false);}
 }
});
