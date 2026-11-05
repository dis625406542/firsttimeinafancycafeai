const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function load(file) {
 const mod={exports:{}};
 const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 new Function('exports','module','require',js)(mod.exports,mod,require);return mod.exports;
}
test('checkout policy respects the product gate for live and local checkout',()=>{
 const {tinyCheckoutEnabled, checkoutReturnUrl}=load('src/lib/tiny-checkout-policy.ts');
 assert.equal(tinyCheckoutEnabled(undefined),false);
 assert.equal(tinyCheckoutEnabled('false'),false);
 assert.equal(tinyCheckoutEnabled('true'),true);
 assert.equal(checkoutReturnUrl('https://tinydeskaivideos.com','success','A'.repeat(32)), 'https://tinydeskaivideos.com/?checkout=success&code='+ 'A'.repeat(32)+'#studio');
 assert.match(checkoutReturnUrl('http://localhost:3000','cancel','B'.repeat(32)),/#studio$/);
 for(const file of ['src/app/api/billing/route.ts','src/app/api/billing/checkout/route.ts']) assert.match(fs.readFileSync(file,'utf8'),/tinyCheckoutEnabled\(process.env.TINY_DESK_CHECKOUT_ENABLED\)/);
});
test('key articles answer the question with sources, useful comparison and preserved role mapping',()=>{
 const {allTinyGuides,featuredTinyGuides}=load('src/lib/tiny-guides.ts');
 for(const slug of ['tiny-desk-ai-trend-explained','tiny-desk-outstanding','best-tiny-desk-ai-video-generator','outstanding-tiny-desk-original-video','what-song-is-in-the-tiny-desk-ai-meme']) {
  const g=allTinyGuides.find(g=>g.slug===slug);assert.ok(g,slug);
  assert.ok(g.sources?.length,slug+' sources');
  assert.ok(g.faqs?.length>=2,slug+' FAQs');
  for(const s of g.sources) {assert.match(s.href,/^https:\/\//);assert.ok(s.label);assert.ok(s.note);}
 }
 const best=allTinyGuides.find(g=>g.slug==='best-tiny-desk-ai-video-generator');
 assert.match(JSON.stringify(best.sections),/Higgsfield/);assert.match(JSON.stringify(best.sections),/CapCut/);
 assert.ok(best.sections.some(s=>s.table?.rows.length>=3));
 assert.ok(featuredTinyGuides.some(g=>g.slug==='tiny-desk-outstanding'));
 const studio=fs.readFileSync('src/components/tiny-studio.tsx','utf8');
 assert.match(studio,/tiny-lead-upload/);assert.match(studio,/Add up to four friends/);
 const slotOrder=[...studio.matchAll(/\{ id: "([^"]+)", label:/g)].map(m=>m[1]);
 assert.deepEqual(slotOrder,['back-left','back-right','keys','lead','sax']);
});
test('studio status is retryable, bounded and email capability is respected',()=>{
 const studio=fs.readFileSync('src/components/tiny-studio.tsx','utf8');
 assert.match(studio,/Retry checkout check/);assert.match(studio,/AbortSignal.timeout/);
 assert.match(studio,/setEmailEnabled\(data.emailEnabled === true\)/);
 assert.match(studio,/emailEnabled &&/);
});
test('funnel events strip private fields and do not pretend client observations are purchases',()=>{
 const {studioEvent}=load('src/lib/studio-analytics.ts');
 const result=studioEvent('photo_approved',{role:'lead',resolution:'720p',email:'a@b.com',code:'secret',url:'https://private',photo_count:1});
 assert.deepEqual(result,{name:'photo_approved',params:{role:'lead',resolution:'720p',photo_count:1}});
 assert.equal(studioEvent('purchase',{value:599}),null);
 assert.deepEqual(studioEvent('checkout_error',{error:'private provider url',resolution:'bad',photo_count:99}).params,{});
 const analytics=fs.readFileSync('src/components/google-analytics.tsx','utf8');
 assert.doesNotMatch(analytics,/page_location: window.location.href/);
 assert.match(analytics,/tiny-studio-event/);
});

test('billing catalog applies the checkout gate in mock and Stripe modes but preserves paid-order reads', async () => {
 const saved=process.env.TINY_DESK_CHECKOUT_ENABLED;
 const {tinyCheckoutEnabled}=load('src/lib/tiny-checkout-policy.ts');
 let mock=false;
 const stubs={
  '@/lib/tiny-checkout-policy':{tinyCheckoutEnabled},
  'next/server':{NextResponse:{json:(body,init)=>Response.json(body,init)}},
  '@/lib/billing-catalog':{catalog:async()=>[{purchasable:true,duration_seconds:15}],consumeLimit:async()=>false},
  '@/lib/billing-orders':{ordersFor:async()=>[],orderFor:async()=>({template_id:'tiny-desk-ai',status:'paid'}),publicOrder:x=>x},
  '@/lib/video-visitor':{visitorFrom:()=> 'fixture',newVisitor:()=>{}},
  '@/lib/billing-ready':{checkoutReady:()=>true},
  '@/lib/local-mock-payments':{localMockPayments:()=>mock},
  '@/lib/video-access':{enabled:()=>true},
  '@/lib/video-templates':{parseTemplate:()=> 'tiny-desk-ai'},
  '@/lib/stripe':{stripeConfigured:()=>true,stripeEnvironment:()=> 'live'},
 };
 const m={exports:{}};
 const js=ts.transpileModule(fs.readFileSync('src/app/api/billing/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 new Function('exports','module','require',js)(m.exports,m,n=>{assert.ok(n in stubs,n);return stubs[n];});
 try {
  for(const mode of [false,true]) {mock=mode;for(const gate of ['false','true']) {
   process.env.TINY_DESK_CHECKOUT_ENABLED=gate;
   const response=await m.exports.GET(new Request('https://example.com/api/billing?template=tiny-desk-ai'));
   assert.equal(response.status,200);assert.equal((await response.json()).enabled,gate==='true');
  }}
  process.env.TINY_DESK_CHECKOUT_ENABLED='false';
  const response=await m.exports.GET(new Request('https://example.com/api/billing?template=tiny-desk-ai&code='+'A'.repeat(32)));
  assert.equal((await response.json()).order.status,'paid');
 } finally {if(saved===undefined) delete process.env.TINY_DESK_CHECKOUT_ENABLED;else process.env.TINY_DESK_CHECKOUT_ENABLED=saved;}
});
