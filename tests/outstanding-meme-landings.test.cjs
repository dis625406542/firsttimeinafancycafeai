const test=require('node:test'),assert=require('node:assert/strict');
const {load,read}=require('./site-test-helpers.cjs');
test('meme explanation and creation guide address separate Smiths intents',()=>{
 const g=load('src/lib/tiny-guides.ts').allTinyGuides;
 const explanation=g.find(x=>x.slug==='what-is-the-i-love-the-smiths-meme');
 const how=g.find(x=>x.slug==='how-to-make-i-love-the-smiths-ai-video');
 assert.match(explanation.answer,/elevator|headphones/i);assert.match(how.answer,/portrait/i);assert.notEqual(explanation.answer,how.answer);
 assert.ok(explanation.sources.some(s=>s.href.startsWith('https://www.media.io/')&&s.note));
 assert.match(read('src/app/blog/[slug]/page.tsx'),/href="\/#studio"/);
});
