const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const Module=require('node:module');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,f);
const old=Module._load;
Module._load=function(id,parent,...rest){if(parent?.filename.endsWith('r2.ts') && id==='server-only')return {};return old.call(this,id,parent,...rest)};
const {tinyReferenceKey,TINY_AUDIO_KEY}=require('../src/lib/r2.ts');
test('v3 uses a separate NFL reference; v2 soundtrack and reference remain immutable',()=>{
 assert.equal(tinyReferenceKey('tiny-desk-v2'),'tiny-desk-ai/v2/reference-first15-silent.mp4');
 assert.equal(tinyReferenceKey('tiny-desk-v3'),'tiny-desk-ai/v3/reference-first15-silent.mp4');
 assert.equal(tinyReferenceKey('tiny-desk-v4'),'tiny-desk-ai/v2/reference-first15-silent.mp4');
 assert.equal(TINY_AUDIO_KEY,'tiny-desk-ai/v2/soundtrack-first15.mp3');
 assert.throws(()=>tinyReferenceKey('garbage'));
});
