const test=require('node:test'),assert=require('node:assert/strict');
const {load,read}=require('./site-test-helpers.cjs');
test('how-to pages answer distinct photo, mobile, music and download questions',()=>{
 const guides=load('src/lib/tiny-guides.ts').allTinyGuides;
 for(const slug of ['how-to-make-first-time-in-a-fancy-cafe-ai-video','how-to-create-fancy-cafe-ai-video-on-phone','fancy-cafe-ai-music-and-captions','download-fancy-cafe-ai-video']){
  const g=guides.find(x=>x.slug===slug);assert.ok(g,slug);assert.ok(g.sections.length>=3);assert.ok(g.related.length>=2);assert.doesNotMatch(JSON.stringify(g),/proven search volume|guaranteed ranking/i);
 }
 assert.equal(new Set(guides.map(g=>g.answer)).size,guides.length);
 assert.match(read('src/app/blog/[slug]/page.tsx'),/Try the video studio/);
});
