const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),ts=require('typescript'),Module=require('node:module');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);
let calls=[],active=[],archiveReady=true;
const old=Module._load;
Module._load=function(request,parent,...rest){
 if(parent?.filename.endsWith('video-worker\\route.ts')||parent?.filename.endsWith('video-worker/route.ts')){
  if(request==='@/lib/r2')return {deleteGeneratedVideo:async()=>{}};
  if(request==='@/lib/video-email')return {sendReadyVideoEmail:async()=>{}};
  if(request==='@/lib/db')return {pool:()=>({query:async(sql)=>{
   if(sql.includes('video_jobs'))return {rows:sql.includes("SELECT code,r2_key")?[]:active};
   if(sql.includes("generation_status='ready'")){calls.push('select-ready');return {rows:[{id:'paid-ready'}]}};
   return {rows:[]};
  }})};
  if(request==='@/lib/video-jobs')return {findJob:async()=>({}),needsArchival:()=>archiveReady};
  if(request==='@/lib/paid-generation')return {recoverStaleOrders:async()=>{},startPaidOrder:async()=>calls.push('submit'),purgeOrderInputs:async()=>{}};
  if(request==='@/lib/video-delivery')return {refreshVideo:async()=>calls.push('refresh'),archiveVideo:async()=>calls.push('archive')};
 }
 return old.call(this,request,parent,...rest);
};
const {GET}=require('../src/app/api/internal/video-worker/route.ts');
const secret='test-'.repeat(10);
function request(auth=true){return new Request('https://example.test/api/internal/video-worker',{headers:auth?{authorization:`Bearer ${secret}`}:{}})}
test('worker prioritizes active composition and never stacks a new submission in the same invocation',async()=>{
 const previous=process.env.CRON_SECRET;process.env.CRON_SECRET=secret;calls=[];active=[{visitor_hash:'v',code:'c'}];
 try{const response=await GET(request());assert.equal(response.status,200);assert.deepEqual(calls,['refresh','archive']);assert.deepEqual(await response.json(),{started:0,polled:1,cleaned:0})}
 finally{if(previous===undefined)delete process.env.CRON_SECRET;else process.env.CRON_SECRET=previous}
});
test('idle worker starts a queued paid purchase',async()=>{
 const previous=process.env.CRON_SECRET;process.env.CRON_SECRET=secret;calls=[];active=[];
 try{const response=await GET(request());assert.equal(response.status,200);assert.deepEqual(calls,['select-ready','submit']);assert.equal((await response.json()).started,1)}
 finally{if(previous===undefined)delete process.env.CRON_SECRET;else process.env.CRON_SECRET=previous}
});
test('worker rejects unauthenticated requests without IO',async()=>{
 calls=[];assert.equal((await GET(request(false))).status,401);assert.deepEqual(calls,[]);
});

test('a light provider poll does not starve another paid order',async()=>{
 const previous=process.env.CRON_SECRET;process.env.CRON_SECRET=secret;calls=[];active=[{visitor_hash:'v',code:'c'}];archiveReady=false;
 try{const response=await GET(request());assert.equal(response.status,200);assert.deepEqual(calls,['refresh','select-ready','submit']);assert.deepEqual(await response.json(),{started:1,polled:1,cleaned:0})}
 finally{archiveReady=true;if(previous===undefined)delete process.env.CRON_SECRET;else process.env.CRON_SECRET=previous}
});
