const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),ts=require('typescript'),Module=require('node:module');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,f);
let query;
const old=Module._load;
Module._load=function(name,parent,...args){
 if(name==='server-only')return {};
 if(name==='./db'&&parent?.filename.endsWith('video-jobs.ts'))return {pool:()=>({query:async(sql)=>{query=sql;return {rowCount:1}}})};
 return old.call(this,name,parent,...args);
};
test('composition upload signature does not sign an empty-body checksum',async()=>{
 const env={R2_ACCOUNT_ID:'a'.repeat(32),R2_ACCESS_KEY_ID:'fake-access-key',R2_SECRET_ACCESS_KEY:'fake-local-signing-secret',R2_BUCKET_NAME:'offline-test',R2_JURISDICTION:'global'};
 const previous=Object.fromEntries(Object.keys(env).map(k=>[k,process.env[k]]));Object.assign(process.env,env);
 try{
  const {compositionUrls}=require('../src/lib/r2.ts');
  const id='A'.repeat(32)+'-'+'a'.repeat(16);
  const urls=await compositionUrls(id),url=new URL(urls.outputUrl);
  assert.equal(url.searchParams.has('x-amz-checksum-crc32'),false,'the real streamed MP4 is not an empty body');
  assert.equal(url.hostname,'a'.repeat(32)+'.r2.cloudflarestorage.com');
  assert.match(url.searchParams.get('X-Amz-SignedHeaders'),/x-amz-meta-composition/);
 }finally{for(const [k,v]of Object.entries(previous)){if(v===undefined)delete process.env[k];else process.env[k]=v}}
});
test('unfinished soundtrack delivery can recover after three days without extending completed-video retention',async()=>{
 const {claimStorageAttempt}=require('../src/lib/video-jobs.ts');
 assert.equal(await claimStorageAttempt('visitor','A'.repeat(32)),true);
 assert.match(query,/completed_at IS NULL\)\s+OR\s+COALESCE\(completed_at,created_at\)>now\(\)-interval '30 days'/i);
 assert.match(query,/template_id='tiny-desk-ai'/);
 assert.match(query,/prompt_version IN \('tiny-desk-v2','tiny-desk-v3','tiny-desk-v4'\)/);
 assert.match(query,/storage_retry_at<=now\(\)/);
});
test('fancy cafe running job can be claimed for soundtrack composition before completion',async()=>{
 const {claimStorageAttempt}=require('../src/lib/video-jobs.ts');
 assert.equal(await claimStorageAttempt('visitor','B'.repeat(32)),true);
 // Both the running-status gate and the unfinished-composition retention gate must admit cafe jobs.
 assert.match(query,/status='running'[\s\S]*template_id='fancy-cafe-ai'[\s\S]*prompt_version IN \('fancy-cafe-v1','fancy-cafe-v2'\)/i);
 assert.match(query,/template_id='fancy-cafe-ai'[\s\S]*prompt_version IN \('fancy-cafe-v1','fancy-cafe-v2'\)[\s\S]*completed_at IS NULL/i);
});
