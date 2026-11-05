const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),ts=require('typescript'),Module=require('node:module');
Module._extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,f);
const original=Module._load;Module._load=function(n,...a){return n==='server-only'?{}:original.call(this,n,...a)};
test('cafe template accepts only protagonist followed by optional regular',()=>{
 const t=require('../src/lib/video-templates.ts');
 assert.equal(t.DEFAULT_TEMPLATE,'fancy-cafe-ai');
 assert.deepEqual(t.templatePhotoCount('fancy-cafe-ai'),{min:1,max:2});
 t.validateCafeSlots(['protagonist']);t.validateCafeSlots(['protagonist','regular']);
 for(const slots of [[],['regular'],['regular','protagonist'],['protagonist','protagonist'],['lead']])assert.throws(()=>t.validateCafeSlots(slots));
});
test('cafe requests silent 15s Seedance with versioned prompt and correct role binding',()=>{
 const {makeYirRequest}=require('../src/lib/yir.ts');
 const ids=['file_12345678-1234-4123-8123-123456789abc','file_87654321-4321-4321-8321-cba987654321'];
 for(const count of [1,2]) {
  const context={templateId:'fancy-cafe-ai',promptVersion:'fancy-cafe-v1',photoSlots:['protagonist','regular'].slice(0,count),databasePrompt:'Create {{ASPECT_RATIO}} cafe video. {{IDENTITY_MAP}}'};
  const r=makeYirRequest(ids.slice(0,count),'480p','9:16','gender_neutral',context,ids[0]);
  assert.equal(r.model,'bytedance/seedance-2.5');assert.equal(r.parameters.duration,15);assert.equal(r.parameters.generate_audio,false);
  assert.match(r.input.prompt,/Image 1.*protagonist/);assert.equal(r.input.prompt.includes('Image 2'),count===2);assert.doesNotMatch(r.input.prompt,/\{\{/);
  assert.throws(()=>makeYirRequest(ids,'480p','9:16','gender_neutral',{...context,photoSlots:['regular']},ids[0]));
 }
});
test('cafe checkout requires explicit reviewed assets and launch opt-in, not legacy flag',()=>{
 const {cafeLaunchReady}=require('../src/lib/cafe-launch.ts');
 assert.equal(cafeLaunchReady({TINY_DESK_CHECKOUT_ENABLED:'true'}),false);
 assert.equal(cafeLaunchReady({FANCY_CAFE_CHECKOUT_ENABLED:'true'}),false);
 const env={FANCY_CAFE_CHECKOUT_ENABLED:'true',FANCY_CAFE_ASSETS_APPROVED:'true',FANCY_CAFE_REFERENCE_KEY:'fancy-cafe-ai/v1/reference-first15-silent.mp4',FANCY_CAFE_AUDIO_KEY:'fancy-cafe-ai/v1/soundtrack-first15.mp3'};
 assert.equal(cafeLaunchReady(env),true);
 assert.equal(cafeLaunchReady({...env,FANCY_CAFE_REFERENCE_KEY:'tiny-desk-ai/v2/reference-first15-silent.mp4'}),false);
});
test('public site identity and distinct question guides use only the new domain',()=>{
 const site=require('../src/lib/site.ts'), {allTinyGuides:g}=require('../src/lib/tiny-guides.ts');
 assert.equal(site.SITE_URL,'https://firsttimeinafancycafeai.org');assert.ok(g.length>=8);
 assert.equal(new Set(g.map(x=>x.slug)).size,g.length);
 for(const x of g){assert.match(x.slug,/fancy-cafe/);assert.ok(x.answer.length>80);assert.ok(x.sections.length>=3);for(const r of x.related)assert.ok(g.some(y=>y.slug===r));}
});
