const {test}=require('node:test');
const assert=require('node:assert/strict');
const {load}=require('./site-test-helpers.cjs');

const keys=['FANCY_CAFE_GENERATION_PAUSED','FANCY_CAFE_STRIPE_TEST_MODE','VIDEO_GENERATION_ENABLED','STRIPE_ENABLED','STRIPE_SECRET_KEY','NODE_ENV','VERCEL'];
async function withEnv(values,fn){
 const saved=Object.fromEntries(keys.map(k=>[k,process.env[k]]));
 try {for(const k of keys)delete process.env[k];Object.assign(process.env,values);return await fn();}
 finally {for(const [k,v] of Object.entries(saved))v===undefined?delete process.env[k]:process.env[k]=v;}
}
function access(){return load('src/lib/video-access.ts',{
 './r2':{storageConfigured:()=>true},'./video-provider':{configured:()=>true,selectedProvider:()=> 'yir'},
 './cafe-launch':{localCafeStripeTestMode:()=>false},
});}
const testEnv={NODE_ENV:'production',VERCEL:'1',VIDEO_GENERATION_ENABLED:'true',STRIPE_ENABLED:'true',STRIPE_SECRET_KEY:'rk_test_'+ 'a'.repeat(32)};
test('deployed Stripe test checkout mocks generation by default even when real video flag is true',()=>withEnv(testEnv,()=>{
 const video=access();
 assert.equal(video.enabled(),false);
 assert.equal(video.generationSimulated(),true);
 assert.equal(load('src/lib/billing-ready.ts',{'./video-access':video,'./stripe':{stripeConfigured:()=>true}}).checkoutReady(),true);
}));
test('paused live checkout cannot take real money or mock fulfillment',()=>withEnv({...testEnv,STRIPE_SECRET_KEY:'rk_live_'+ 'a'.repeat(32)},()=>{
 const video=access();assert.equal(video.enabled(),false);assert.equal(video.generationSimulated(),false);
 assert.equal(load('src/lib/billing-ready.ts',{'./video-access':video,'./stripe':{stripeConfigured:()=>true}}).checkoutReady(),false);
}));
test('resuming requires explicit opt-out from the pause gate',()=>withEnv({...testEnv,FANCY_CAFE_GENERATION_PAUSED:'false',ANTHROPIC_AUTH_TOKEN:'key',ANTHROPIC_BASE_URL:'https://example.com',ANTHROPIC_MODEL:'model',DATABASE_PRO_URL:'postgresql://test',VIDEO_HANDLE_SECRET:'a'.repeat(32)},()=>{
 const video=access();assert.equal(video.enabled(),true);assert.equal(video.generationSimulated(),false);
}));

test('paid test order finishes with bundled sample without any YIR calls; paid live order remains untouched',async()=>{
 const env={...testEnv};
 await withEnv(env,async()=>{
  const video=access();let providerCalls=0;
  const makeOrder=environment=>({id:'order-id',code:'A'.repeat(32),status:'paid',environment,provider:'stripe',generation_status:'ready',attempts:0,input_expires_at:new Date(Date.now()+60000),input_photos:[{slot:'protagonist'}],template_id:'fancy-cafe-ai',prompt_version:'fancy-cafe-v1',resolution:'480p',aspect_ratio:'9:16',video_provider:'yir',visitor_hash:'visitor'});
  const statements=[];let current;
  const query=async(sql)=>{
   statements.push(sql);
   if(sql.includes('FOR UPDATE'))return {rows:[current]};
   if(sql.includes("generation_status='finished'"))return {rows:[{...current,attempts:1}]};
   return {rows:[],rowCount:1};
  };
  const generation=load('src/lib/paid-generation.ts',{
   './db':{pool:()=>({connect:async()=>({query,release(){}}),query})},
   './r2':{readInputPhotos:async()=>{throw Error('Provider must not read photos');}},
   './image-moderation':{ImageModerationError:class extends Error{},moderatePortraits:async()=>{throw Error('Provider must not moderate');}},
   './video-prompt':{selectPromptScenario:()=> 'gender_neutral'},
   './tiny-composition':{assertTinyReady:async()=>{throw Error('Provider must not check composition');}},
   './billing-orders':{randomId:()=> 'attempt'},
   './video-access':video,
   './video-provider':{configured:()=>true,submitForProvider:async()=>{providerCalls++;return 'task';}},
   './local-mock-payments':{localMockRuntimeEnabled:()=>false},
   './video-templates':{templatePhotoCount:()=>({min:1,max:2}),needsComposition:()=>true},
  });
  current=makeOrder('test');await generation.startPaidOrder(current.id);
  assert.equal(providerCalls,0);assert.ok(statements.some(sql=>sql.includes("video_url='simulated'")));
  statements.length=0;current=makeOrder('live');
  await assert.rejects(generation.startPaidOrder(current.id),/unavailable|paused|test payments/i);
  assert.equal(providerCalls,0);assert.ok(!statements.some(sql=>sql.includes("video_url='simulated'")));
 });
});
