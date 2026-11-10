const test=require('node:test'),assert=require('node:assert/strict');
const {load,read}=require('./site-test-helpers.cjs');
test('how-to pages answer distinct photo, mobile, music and download questions',()=>{
 const guides=load('src/lib/tiny-guides.ts').allTinyGuides;
 for(const slug of ['how-to-make-i-love-the-smiths-ai-video','how-to-make-i-love-the-smiths-ai-video-for-tiktok-reels','i-love-the-smiths-ai-music-and-lyrics','download-and-share-i-love-the-smiths-ai-video']){
  const g=guides.find(x=>x.slug===slug);assert.ok(g,slug);assert.ok(g.sections.length>=3);assert.ok(g.related.length>=2);assert.doesNotMatch(JSON.stringify(g),/proven search volume|guaranteed ranking/i);
 }
 assert.equal(new Set(guides.map(g=>g.answer)).size,guides.length);
 assert.match(read('src/app/blog/[slug]/page.tsx'),/Try the video studio/);
});
