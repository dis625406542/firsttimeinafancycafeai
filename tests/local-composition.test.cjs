const {test}=require('node:test');
const assert=require('node:assert/strict');
const {mkdtemp,readdir,readFile,writeFile,rm}=require('node:fs/promises');
const {tmpdir}=require('node:os');
const {join}=require('node:path');
const local=()=>import('../services/video-composer/local.mjs');
const id='A'.repeat(32)+'-'+'b'.repeat(16);
const host='https://'+'a'.repeat(32)+'.r2.cloudflarestorage.com';
const urls={videoUrl:host+'/in',audioUrl:host+'/audio',outputUrl:host+'/out'};

test('one local composition per process; busy returns null and failures release the slot',async()=>{
 const {withLocalComposition}=await local();
 let release;const first=withLocalComposition(()=>new Promise(r=>{release=r}));
 assert.equal(await withLocalComposition(()=>assert.fail('must not run')),null);
 release('done');assert.equal(await first,'done');
 await assert.rejects(withLocalComposition(async()=>{throw Error('failed')}),/failed/);
 assert.equal(await withLocalComposition(async()=>42),42);
});

test('local composition streams private assets and uploads only validated audio output; cleans temp files',async()=>{
 const {composeFromUrls}=await local();const root=await mkdtemp(join(tmpdir(),'tiny-local-test-'));
 const old=global.fetch;const calls=[];
 global.fetch=async(url,options)=>{
  calls.push({url,options});assert.equal(options.redirect,'error');
  if(options.method==='PUT'){
   const chunks=[];for await(const b of options.body)chunks.push(b);
   assert.equal(Buffer.concat(chunks).toString(),'composed-video');
   assert.equal(options.headers['x-amz-meta-composition'],id);
   assert.equal(options.headers['Content-Type'],'video/mp4');return new Response(null,{status:200});
  }
  return new Response(url.endsWith('/audio')?'song':'silent-video');
 };
 try{
  const result=await composeFromUrls({id,...urls,resolution:'480p',aspect:'9:16'}, {
   tempRoot:root,processMedia:async(video,audio,output,resolution,aspect,duration,options)=>{
    assert.equal((await readFile(video)).toString(),'silent-video');assert.equal((await readFile(audio)).toString(),'song');
    assert.deepEqual([resolution,aspect,duration],['480p','9:16',15]);assert.ok(options.signal);
    await writeFile(output,'composed-video');return {audio:true,duration:15,width:480,height:854};
   }
  });
  assert.equal(result.audio,true);assert.equal(calls.filter(c=>c.options.method==='PUT').length,1);
  assert.deepEqual(await readdir(root),[]);
 }finally{global.fetch=old;await rm(root,{recursive:true,force:true})}
});

test('composition failures never upload and always remove private temp files',async()=>{
 const {composeFromUrls}=await local();const root=await mkdtemp(join(tmpdir(),'tiny-local-test-'));const old=global.fetch;let puts=0;
 global.fetch=async(url,options)=>{if(options.method==='PUT')puts++;return new Response('fixture')};
 try{
  await assert.rejects(composeFromUrls({id,...urls,resolution:'720p',aspect:'9:16'}, {tempRoot:root,processMedia:async()=>{throw Error('encode failed')}}),/encode failed/);
  assert.equal(puts,0);assert.deepEqual(await readdir(root),[]);
 }finally{global.fetch=old;await rm(root,{recursive:true,force:true})}
});

test('oversize assets and untrusted composition URLs fail closed before encoding/upload',async()=>{
 const {composeFromUrls}=await local();const old=global.fetch;let calls=0;
 global.fetch=async()=>{calls++;return new Response('fixture',{headers:{'content-length':String(100*1024*1024)}})};
 try{
  await assert.rejects(composeFromUrls({id,...urls,videoUrl:'https://evil.example/in',resolution:'480p',aspect:'9:16'}),/R2/);assert.equal(calls,0);
  await assert.rejects(composeFromUrls({id,...urls,resolution:'480p',aspect:'9:16'},{processMedia:()=>assert.fail('must not encode')}),/limit/);
 }finally{global.fetch=old}
});

test('aborted composition does not download or encode',async()=>{
 const {composeFromUrls}=await local();const old=global.fetch;let calls=0;
 global.fetch=async()=>{calls++;return new Response('fixture')};
 try{await assert.rejects(composeFromUrls({id,...urls,resolution:'480p',aspect:'9:16'}, {signal:AbortSignal.abort()}));assert.equal(calls,0)}finally{global.fetch=old}
});

test('media subprocess cancellation kills the child and rejects promptly',async()=>{
 const {run}=await import('../services/video-composer/media.mjs');const started=Date.now();
 await assert.rejects(run(process.execPath,['-e','setTimeout(()=>{},10000)'],{signal:AbortSignal.timeout(80)}),/abort|timeout|cancel/i);
 assert.ok(Date.now()-started<3000);
});
