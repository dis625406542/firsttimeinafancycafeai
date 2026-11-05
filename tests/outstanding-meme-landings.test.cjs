const test=require('node:test'),assert=require('node:assert/strict');
const {load,read}=require('./site-test-helpers.cjs');
test('meme explanation and creation guide address separate intents',()=>{
 const g=load('src/lib/tiny-guides.ts').allTinyGuides;
 const explanation=g.find(x=>x.slug==='your-first-time-in-a-fancy-cafe-meme-explained');
 const how=g.find(x=>x.slug==='how-to-make-first-time-in-a-fancy-cafe-ai-video');
 assert.match(explanation.answer,/table.*bench/);assert.match(how.answer,/portrait/);assert.notEqual(explanation.answer,how.answer);
 assert.ok(explanation.sources.some(s=>s.href.startsWith('https://www.media.io/')&&s.note));
 assert.match(read('src/app/blog/[slug]/page.tsx'),/href="\/#studio"/);
});
