const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {load,read}=require('./site-test-helpers.cjs');
test('Smiths homepage retains the studio theme, preview, pricing and navigation',()=>{
 const h=read('src/app/page.tsx'),studio=read('src/components/tiny-studio.tsx'),css=read('src/app/globals.css');
 for(const id of ['studio','how-it-works','pricing','faq'])assert.ok(h.includes(`id="${id}"`));
 for(const text of ['TinyStudio','SampleReels','TinyGuides','6.99','9.99','24-second'])assert.ok(h.includes(text),text);
 assert.match(studio,/TINY_TEMPLATE = "fancy-cafe-ai"/);assert.match(studio,/async function prepareCheckout/);assert.doesNotMatch(studio,/!billingReady \|\| !enabled/);
 assert.match(css,/--tiny-bg:#fbfaf9/);assert.match(css,/--tiny-pink:#f23a5c/);
});
test('public legal pages, canonical domain and footer belong to the Smiths site',()=>{
 const {legalLinks,legalContent}=load('src/lib/legal-content.tsx');assert.equal(legalLinks.length,7);
 for(const {slug} of legalLinks){assert.ok(fs.existsSync(`src/app/${slug}/page.tsx`));assert.ok(legalContent[slug].sections.length>=3);}
 assert.doesNotMatch(JSON.stringify(legalContent),/tinydeskaivideos\.com|NPR|one to five|concert-inspired/);
 assert.match(read('src/components/legal-page.tsx'),/Orders proceed only when checkout is available/);
 assert.match(read('src/components/site-chrome.tsx'),/tiny-footer-columns/);
 assert.equal(load('src/lib/site.ts').SITE_URL,'https://lovethesmithsai.com');
 assert.equal(fs.existsSync('src/app/video/[slug]/page.tsx'),false);
});
test('public galleries use demo videos, never claimed as customer results',()=>{
 const studio=read('src/components/tiny-studio.tsx'),reels=read('src/components/sample-reels.tsx');
 assert.match(studio,/\/love-the-smiths\/demo-1\.mp4/);assert.match(studio,/DEMO VIDEO · MUTED BY DEFAULT/);
 assert.match(reels,/demo-1\.mp4/);assert.match(reels,/demo-2\.mp4/);
 assert.match(reels,/autoPlay muted loop playsInline/);
 assert.doesNotMatch(reels,/CAFE EXAMPLE|ORIGINAL ILLUSTRATION/);
 assert.match(studio,/controls autoPlay muted/);
});
test('Smiths content uses original reference-style section classes and structured answers',()=>{
 const h=read('src/app/page.tsx');
 for(const cls of ['tiny-story','tiny-how-layout','tiny-how-steps','tiny-sound-grid','tiny-price-grid','tiny-faq'])assert.ok(h.includes(cls),cls);
 assert.match(h,/FAQPage/);assert.match(h,/faqs.map/);assert.doesNotMatch(h,/tiny-step-grid/);
});

test('landing page does not advertise disabled checkout or leak fetch errors',()=>{const h=read('src/app/page.tsx'),s=read('src/components/tiny-studio.tsx');assert.doesNotMatch(h,/PLANNED ONE-TIME PRICING|Checkout stays closed|No payment is taken while/);assert.match(s,/async function prepareCheckout/);assert.doesNotMatch(s,/Checkout unavailable|Studio preview · generation coming soon/);});
