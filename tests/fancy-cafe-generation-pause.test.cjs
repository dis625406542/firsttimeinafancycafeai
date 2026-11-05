const {test}=require('node:test');
const assert=require('node:assert/strict');
const {load}=require('./site-test-helpers.cjs');
const keys=['FANCY_CAFE_STRIPE_TEST_MODE','VIDEO_GENERATION_ENABLED','STRIPE_ENABLED','STRIPE_SECRET_KEY','NODE_ENV','VERCEL','ANTHROPIC_AUTH_TOKEN','ANTHROPIC_BASE_URL','ANTHROPIC_MODEL','DATABASE_PRO_URL','VIDEO_HANDLE_SECRET'];
function withEnv(values,fn){const saved=Object.fromEntries(keys.map(k=>[k,process.env[k]]));try{for(const k of keys)delete process.env[k];Object.assign(process.env,values);return fn();}finally{for(const [k,v] of Object.entries(saved))v===undefined?delete process.env[k]:process.env[k]=v;}}
function access(){return load('src/lib/video-access.ts',{'./r2':{storageConfigured:()=>true},'./video-provider':{configured:()=>true,selectedProvider:()=> 'yir'},'./cafe-launch':{localCafeStripeTestMode:()=>false}});}
const ready={NODE_ENV:'development',VIDEO_GENERATION_ENABLED:'true',STRIPE_ENABLED:'true',STRIPE_SECRET_KEY:'rk_test_'+ 'a'.repeat(32),ANTHROPIC_AUTH_TOKEN:'key',ANTHROPIC_BASE_URL:'https://example.com',ANTHROPIC_MODEL:'model',DATABASE_PRO_URL:'postgresql://test',VIDEO_HANDLE_SECRET:'a'.repeat(32)};
test('Stripe test checkout with configured real generation does not silently simulate a video',()=>withEnv(ready,()=>{const video=access();assert.equal(video.enabled(),true);assert.equal(video.generationSimulated(),false);assert.equal(load('src/lib/billing-ready.ts',{'./video-access':video,'./stripe':{stripeConfigured:()=>true}}).checkoutReady(),true);}));
test('disabled generation does not submit paid requests by default',()=>withEnv({...ready,VIDEO_GENERATION_ENABLED:'false'},()=>{const video=access();assert.equal(video.enabled(),false);assert.equal(video.generationSimulated(),true); // Existing development-only simulation remains explicit and isolated.
}));
test('production cannot silently simulate when generation is disabled',()=>withEnv({...ready,NODE_ENV:'production',VERCEL:'1',VIDEO_GENERATION_ENABLED:'false'},()=>{const video=access();assert.equal(video.enabled(),false);assert.equal(video.generationSimulated(),false);}));
