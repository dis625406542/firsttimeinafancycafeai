const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const Module=require('node:module');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,f);
let calls=[],outputs=[],busy=false,encodeError,healthError;
const r2={
 checkTinyAssets:async(version)=>{calls.push(`assets:${version}`)},
 compositionOutput:async(id,signal)=>{calls.push('head');if(signal)assert.ok(signal instanceof AbortSignal);return outputs.shift()??null},
 stageComposition:async(id,body,signal)=>{assert.ok(signal instanceof AbortSignal);calls.push('stage');await body()},
 compositionUrls:async()=>({videoUrl:'private-video',audioUrl:'private-audio',outputUrl:'private-output'}),
};
const local={
 assertLocalCompositionReady:async()=>{calls.push('health');if(healthError)throw healthError},
 withLocalComposition:async(action)=>busy?null:action(),
 composeFromUrls:async(job,options)=>{calls.push('encode');assert.equal(job.resolution,'480p');assert.equal(job.aspect,'9:16');assert.ok(options.signal instanceof AbortSignal);if(encodeError)throw encodeError},
};
const old=Module._load;
Module._load=function(request,parent,...rest){
 if(parent?.filename.endsWith('tiny-composition.ts')){
  if(request==='server-only')return {};
  if(request==='./db')return {pool:()=>({query:async()=>({rows:[{base_prompt:'full database prompt'}]})})};
  if(request==='./r2')return r2;
  if(request==='./provider-video')return {fetchProviderVideo:async(url,signal)=>{assert.ok(signal instanceof AbortSignal);calls.push('download');return Buffer.from('video')}};
  if(request.includes('video-composer/local.mjs'))return local;
 }
 return old.call(this,request,parent,...rest);
};
const {composeTiny,assertTinyReady}=require('../src/lib/tiny-composition.ts');
const row={code:'A'.repeat(32),task_id:'paid-task',video_url:'https://provider.test/raw.mp4',resolution:'480p',aspect_ratio:'9:16'};
function reset(){calls=[];outputs=[];busy=false;encodeError=healthError=undefined}
test('existing verified output is reused before downloads or FFmpeg',async()=>{
 reset();outputs=['generated/done.mp4'];assert.equal(await composeTiny(row),'generated/done.mp4');assert.deepEqual(calls,['head']);
});
test('composition emits bounded stage and success logs without source URLs',async()=>{
 reset();outputs=[null,'generated/final.mp4'];const oldLog=console.info;const messages=[];
 console.info=(...parts)=>messages.push(parts);
 try{await composeTiny(row)}finally{console.info=oldLog}
 assert.ok(messages.some(([name])=>name==='media.compose.start'));
 assert.ok(messages.some(([name])=>name==='media.compose.staged'));
 assert.ok(messages.some(([name])=>name==='media.compose.finished'));
 assert.equal(JSON.stringify(messages).includes('provider.test'),false);
});
test('busy local composer defers without staging or duplicating work',async()=>{
 reset();busy=true;assert.equal(await composeTiny(row),null);assert.deepEqual(calls,['head']);
});
test('native pipeline stages paid footage, adds audio, and verifies private R2 output',async()=>{
 reset();outputs=[null,'generated/final.mp4'];assert.equal(await composeTiny(row),'generated/final.mp4');assert.deepEqual(calls,['head','stage','download','encode','head']);
});
test('encode failure keeps paid footage pending without returning a finished key',async()=>{
 reset();encodeError=Error('encode failed');await assert.rejects(composeTiny(row),/encode failed/);assert.deepEqual(calls,['head','stage','download','encode']);
});
test('upload without verified composition metadata cannot finish delivery',async()=>{
 reset();await assert.rejects(composeTiny(row),/verif|output|upload/i);assert.deepEqual(calls,['head','stage','download','encode','head']);
});
test('readiness requires local FFmpeg, not a remote composer URL',async()=>{
 reset();const previous=process.env.VIDEO_PROVIDER;process.env.VIDEO_PROVIDER='yir';
 try{await assertTinyReady({templateId:'tiny-desk-ai',promptVersion:'tiny-desk-v2'});assert.ok(calls.includes('health'));assert.ok(calls.includes('assets:tiny-desk-v2'));healthError=Error('FFmpeg missing');await assert.rejects(assertTinyReady({templateId:'tiny-desk-ai',promptVersion:'tiny-desk-v2'}),/FFmpeg missing/)}
 finally{if(previous===undefined)delete process.env.VIDEO_PROVIDER;else process.env.VIDEO_PROVIDER=previous;}
});

test('v3 readiness checks its own reference while retaining legacy v2 readiness',async()=>{
 reset();const old=process.env.VIDEO_PROVIDER;process.env.VIDEO_PROVIDER='yir';
 try {for(const version of ['tiny-desk-v2','tiny-desk-v3','tiny-desk-v4'])await assertTinyReady({templateId:'tiny-desk-ai',promptVersion:version});assert.ok(calls.includes('assets:tiny-desk-v2'));assert.ok(calls.includes('assets:tiny-desk-v3'));}finally{if(old===undefined)delete process.env.VIDEO_PROVIDER;else process.env.VIDEO_PROVIDER=old;}
});
