const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const Module=require('node:module');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,f);
const old=Module._load;
let calls=0,broken=false;
Module._load=function(request,parent,...rest){
 if(parent?.filename.endsWith('api\\internal\\media-health\\route.ts') || parent?.filename.endsWith('api/internal/media-health/route.ts')){
  if(request.includes('video-composer/local.mjs'))return {mediaHealth:async()=>{calls++;if(broken)throw Error('bad binary path');return {ok:true,source:'packaged',encoders:{libx264:true,aac:true}}}};
 }
 return old.call(this,request,parent,...rest);
};
const {GET}=require('../src/app/api/internal/media-health/route.ts');
Module._load=old;
test('media health is private and returns non-secret readiness diagnostics',async()=>{
 const prior=process.env.CRON_SECRET;process.env.CRON_SECRET='x'.repeat(40);
 try{
  let response=await GET(new Request('https://example.test/api/internal/media-health'));
  assert.equal(response.status,401);assert.equal(calls,0);
  response=await GET(new Request('https://example.test/api/internal/media-health',{headers:{Authorization:`Bearer ${process.env.CRON_SECRET}`}}));
  assert.equal(response.status,200);assert.equal((await response.json()).encoders.libx264,true);assert.equal(calls,1);
  broken=true;
  response=await GET(new Request('https://example.test/api/internal/media-health',{headers:{Authorization:`Bearer ${process.env.CRON_SECRET}`}}));
  assert.equal(response.status,503);assert.equal((await response.json()).ok,false);
 }finally{if(prior===undefined)delete process.env.CRON_SECRET;else process.env.CRON_SECRET=prior;broken=false}
});
