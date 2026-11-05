const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function load(file) {
 const mod={exports:{}};
 const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 new Function('exports','module','require',js)(mod.exports,mod,require);return mod.exports;
}
test('cafe checkout ignores the old flag and both routes apply the new gate',()=>{
 const {cafeLaunchReady}=load('src/lib/cafe-launch.ts');
 assert.equal(cafeLaunchReady({TINY_DESK_CHECKOUT_ENABLED:'true'}),false);
 for(const file of ['src/app/api/billing/route.ts','src/app/api/billing/checkout/route.ts'])assert.match(fs.readFileSync(file,'utf8'),/cafeLaunchReady\(\)/);
});
test('studio status is retryable, bounded and email capability is respected',()=>{
 const studio=fs.readFileSync('src/components/tiny-studio.tsx','utf8');
 assert.match(studio,/async function prepareCheckout/);assert.match(studio,/AbortSignal.timeout/);
 assert.match(studio,/setEmailEnabled\(data.emailEnabled === true\)/);
 assert.match(studio,/emailEnabled &&/);
});
test('funnel events strip private fields and do not pretend client observations are purchases',()=>{
 const {studioEvent}=load('src/lib/studio-analytics.ts');
 const result=studioEvent('photo_approved',{role:'protagonist',resolution:'720p',email:'a@b.com',code:'secret',url:'https://private',photo_count:1});
 assert.deepEqual(result,{name:'photo_approved',params:{role:'protagonist',resolution:'720p',photo_count:1}});
 assert.equal(studioEvent('purchase',{value:599}),null);
 assert.deepEqual(studioEvent('checkout_error',{error:'private provider url',resolution:'bad',photo_count:99}).params,{});
 const analytics=fs.readFileSync('src/components/google-analytics.tsx','utf8');
 assert.doesNotMatch(analytics,/page_location: window.location.href/);
 assert.match(analytics,/tiny-studio-event/);
});

test('billing catalog applies the checkout gate in mock and Stripe modes but preserves paid-order reads', async () => {
 const saved=process.env.FANCY_CAFE_CHECKOUT_ENABLED;
 const {tinyCheckoutEnabled}=load('src/lib/tiny-checkout-policy.ts');
 let mock=false;
 const stubs={
  '@/lib/cafe-launch':{cafeLaunchReady:()=>process.env.FANCY_CAFE_CHECKOUT_ENABLED==='true'},
  'next/server':{NextResponse:{json:(body,init)=>Response.json(body,init)}},
  '@/lib/billing-catalog':{catalog:async()=>[{purchasable:true,duration_seconds:15}],consumeLimit:async()=>false},
  '@/lib/billing-orders':{ordersFor:async()=>[],orderFor:async()=>({template_id:'fancy-cafe-ai',status:'paid'}),publicOrder:x=>x},
  '@/lib/video-visitor':{visitorFrom:()=> 'fixture',newVisitor:()=>{}},
  '@/lib/billing-ready':{checkoutReady:()=>true},
  '@/lib/local-mock-payments':{localMockPayments:()=>mock},
  '@/lib/video-access':{enabled:()=>true},
  '@/lib/video-templates':{parseTemplate:()=> 'fancy-cafe-ai'},
  '@/lib/stripe':{stripeConfigured:()=>true,stripeEnvironment:()=> 'live'},
 };
 const m={exports:{}};
 const js=ts.transpileModule(fs.readFileSync('src/app/api/billing/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 new Function('exports','module','require',js)(m.exports,m,n=>{assert.ok(n in stubs,n);return stubs[n];});
 try {
  for(const mode of [false,true]) {mock=mode;for(const gate of ['false','true']) {
   process.env.FANCY_CAFE_CHECKOUT_ENABLED=gate;
   const response=await m.exports.GET(new Request('https://example.com/api/billing?template=fancy-cafe-ai'));
   assert.equal(response.status,200);assert.equal((await response.json()).enabled,gate==='true');
  }}
  process.env.FANCY_CAFE_CHECKOUT_ENABLED='false';
  const response=await m.exports.GET(new Request('https://example.com/api/billing?template=fancy-cafe-ai&code='+'A'.repeat(32)));
  assert.equal((await response.json()).order.status,'paid');
 } finally {if(saved===undefined) delete process.env.FANCY_CAFE_CHECKOUT_ENABLED;else process.env.FANCY_CAFE_CHECKOUT_ENABLED=saved;}
});
