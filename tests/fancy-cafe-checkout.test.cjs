const {test}=require('node:test');
const assert=require('node:assert/strict');
const {load}=require('./site-test-helpers.cjs');
function harness(ready=true){
 const saved=[];let calls=0;
 const order={id:'order-test',code:'A'.repeat(32),status:'pending',template_id:'fancy-cafe-ai',prompt_version:'fancy-cafe-v1',input_photos:[],resolution:'480p',aspect_ratio:'9:16'};
 const route=load('src/app/api/billing/checkout/route.ts',{
  '@/lib/cafe-launch':{cafeLaunchReady:()=>ready},
  '@/lib/db':{pool:()=>{throw Error('Unexpected DB access');}},
  '@/lib/portrait-normalization':{normalizeTinyPortrait:async f=>f},
  '@/lib/tiny-composition':{assertTinyReady:async()=>{}},
  '@/lib/local-mock-payments':{localMockPayments:()=>false},
  '@/lib/video-access':{enabled:()=>true,sameOrigin:()=>true},
  'next/server':{NextResponse:{json:(v,o)=>Response.json(v,o)}},
  '@/lib/video-visitor':{visitorFrom:()=> 'test-visitor'},
  '@/lib/billing-ready':{checkoutReady:()=>true},
  '@/lib/billing-orders':{orderFor:async()=>null,createOrder:async()=>{calls++;return {created:true,order};},saveOrderPhotos:async(o,photos,scenario)=>{saved.push({photos,scenario});return o;},checkoutFor:async()=> 'https://checkout.example.test/session'},
  '@/lib/billing-catalog':{consumeLimit:async()=>true},
  '@/lib/image-moderation':{ImageModerationError:class extends Error{},moderatePortraits:async()=>[]},
  '@/lib/photo-validation':{validatePhotos:(files,range)=>{assert.ok(files.length>=range.min&&files.length<=range.max);assert.ok(files.every(f=>f instanceof File));},validatePhotoBytes:async()=>{}},
  '@/lib/video-prompt':{selectPromptScenario:()=>{throw Error('Cafe must not select concert/zombie scenario');}},
  '@/lib/checkout-origin':{checkoutReturnOrigin:()=> 'https://firsttimeinafancycafeai.org'}
 });
 function request(slots,count=slots.length){const form=new FormData();for(const [k,v] of Object.entries({template:'fancy-cafe-ai',code:order.code,resolution:'480p',aspectRatio:'9:16',consent:'yes'}))form.set(k,v);for(const s of slots)form.append('slots',s);for(let i=0;i<count;i++)form.append('photos',new File(['fake image'],`portrait-${i}.jpg`,{type:'image/jpeg'}));return new Request('https://firsttimeinafancycafeai.org/api/billing/checkout',{method:'POST',body:form});}
 return {route,saved,request,calls:()=>calls};
}
for(const slots of [['protagonist'],['protagonist','regular']])test(`checkout accepts cafe photos form for ${slots.length} portraits without legacy fields`,async()=>{const h=harness();const res=await h.route.POST(h.request(slots));assert.equal(res.status,200);assert.equal((await res.json()).checkoutUrl,'https://checkout.example.test/session');assert.deepEqual(h.saved[0].photos.map(x=>x.slot),slots);assert.equal(h.saved[0].scenario,'gender_neutral');});
test('checkout refuses mismatched and unsupported role lists before order creation',async()=>{for(const [slots,count] of [[['protagonist'],2],[['regular'],1],[['protagonist','regular','lead'],3]]){const h=harness();const res=await h.route.POST(h.request(slots,count));assert.ok(res.status>=400);assert.equal(h.calls(),0);assert.equal(h.saved.length,0);}});
test('preview gate prevents checkout before any order or upload',async()=>{const h=harness(false);const res=await h.route.POST(h.request(['protagonist']));assert.equal(res.status,503);assert.equal(h.calls(),0);assert.equal(h.saved.length,0);});
