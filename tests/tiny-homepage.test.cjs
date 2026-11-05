const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {load,read}=require('./site-test-helpers.cjs');
test('new site homepage retains the studio theme, preview, pricing and navigation',()=>{
 const h=read('src/app/page.tsx'),studio=read('src/components/tiny-studio.tsx'),css=read('src/app/globals.css');
 for(const id of ['studio','how-it-works','pricing','faq'])assert.ok(h.includes(`id="${id}"`));
 for(const text of ['TinyStudio','SampleReels','TinyGuides','5.99','8.99','15-second','preview'])assert.ok(h.includes(text),text);
 assert.match(studio,/TINY_TEMPLATE = "fancy-cafe-ai"/);assert.match(studio,/!billingReady \|\| !enabled/);
 assert.match(css,/--tiny-bg:#110a19/);assert.match(css,/--tiny-pink:#fa35a3/);
});
test('public legal pages, canonical domain and footer belong to the cafe site',()=>{
 const {legalLinks,legalContent}=load('src/lib/legal-content.tsx');assert.equal(legalLinks.length,7);
 for(const {slug} of legalLinks){assert.ok(fs.existsSync(`src/app/${slug}/page.tsx`));assert.ok(legalContent[slug].sections.length>=3);}
 assert.doesNotMatch(JSON.stringify(legalContent),/tinydeskaivideos\.com|NPR|one to five|concert-inspired/);
 assert.match(read('src/components/legal-page.tsx'),/studio is in preview/);
 assert.match(read('src/components/site-chrome.tsx'),/tiny-footer-columns/);
 assert.equal(load('src/lib/site.ts').SITE_URL,'https://firsttimeinafancycafeai.org');
 assert.equal(fs.existsSync('src/app/video/[slug]/page.tsx'),false);
});
test('legacy media remains lazy and clearly labeled, never claimed as a cafe result',()=>{
 const studio=read('src/components/tiny-studio.tsx'),reels=read('src/components/sample-reels.tsx');
 assert.match(studio,/temporary role placeholders/);assert.match(studio,/not a Fancy Cafe result/);
 assert.match(reels,/LEGACY DEMO/);assert.match(reels,/IntersectionObserver/);
 assert.match(studio,/controls autoPlay muted/);
});
test('cafe content uses original reference-style section classes and structured answers',()=>{
 const h=read('src/app/page.tsx');
 for(const cls of ['tiny-story','tiny-how-layout','tiny-how-steps','tiny-sound-grid','tiny-price-grid','tiny-faq'])assert.ok(h.includes(cls),cls);
 assert.match(h,/FAQPage/);assert.match(h,/faqs.map/);assert.doesNotMatch(h,/tiny-step-grid/);
});
