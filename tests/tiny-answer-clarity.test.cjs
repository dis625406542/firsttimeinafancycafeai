const test=require('node:test'),assert=require('node:assert/strict');
const {load,read}=require('./site-test-helpers.cjs');
const guides=load('src/lib/tiny-guides.ts').allTinyGuides;
test('Smiths answers describe their subject independently and do not invent availability',()=>{
 for(const g of guides){assert.ok(g.answer.length>80);assert.ok(g.description.length<180);assert.match(g.description,/[.!?]$/);assert.doesNotMatch(g.answer,/guaranteed|NPR|Outstanding/);}
 const pricing=guides.find(g=>g.slug==='i-love-the-smiths-ai-price-and-free-options');assert.match(pricing.answer,/6\.99/);assert.match(pricing.answer,/9\.99/);assert.match(pricing.answer,/final price and availability/i);
});
test('FAQ visible copy and schema share the same answers, with truthful constraints',()=>{
 const home=read('src/app/page.tsx');assert.match(home,/FAQPage/);assert.match(home,/faqs\.map/);assert.match(home,/acceptedAnswer.*text: answer/);assert.match(home,/30 days of completion/);assert.match(home,/not an edit/);assert.match(home,/final price and availability/i);
});
