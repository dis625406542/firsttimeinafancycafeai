const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {read}=require('./site-test-helpers.cjs');

test('studio example plays the first demo video, muted and looping by default',()=>{
 const studio=read('src/components/tiny-studio.tsx');
 assert.match(studio,/src="\/love-the-smiths\/demo-1\.mp4"/);
 assert.match(studio,/poster="\/love-the-smiths\/demo-1-poster\.webp"/);
 assert.match(studio,/autoPlay muted loop playsInline/);
 assert.match(studio,/DEMO VIDEO · MUTED BY DEFAULT/);
 assert.doesNotMatch(studio,/sampleReady|example\.mp4|example-poster\.webp/);
 assert.ok(fs.statSync('public/love-the-smiths/demo-1.mp4').size>100000);
 assert.ok(fs.statSync('public/love-the-smiths/demo-1-poster.webp').size>5000);
});

test('real generation preserves silent YIR submission and private audio composition',()=>{
 const spec=read('src/lib/video-templates.ts');
 const generation=read('src/lib/video-access.ts');
 const composer=read('src/lib/tiny-composition.ts');
 const provider=read('src/lib/video-provider.ts');
 assert.match(spec,/"fancy-cafe-ai"[^\n]*generateAudio: false/);
 assert.match(generation,/VIDEO_GENERATION_ENABLED !== "true"/);
 assert.match(composer,/checkTinyAssets\(context\.promptVersion\)/);
 assert.match(composer,/composeFromUrls\(/);
 assert.match(provider,/readTinyReference\(context!\.promptVersion\)/);
});

test('older simulated checkouts keep a local fallback without changing real delivery',()=>{
 const playback=read('src/app/api/video/file/route.ts');
 assert.match(playback,/job\.video_url === "simulated"[^\n]*Location: "\/fancy-cafe-ai\/example\.mp4"/);
 assert.match(playback,/i-love-the-smiths-ai-video\.mp4/);
});
