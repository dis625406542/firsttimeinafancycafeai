const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {read}=require('./site-test-helpers.cjs');

test('cafe studio plays the real supplied cafe example, never the old band demo',()=>{
 const studio=read('src/components/tiny-studio.tsx');
 assert.match(studio,/poster="\/fancy-cafe-ai\/example-poster\.webp"/);
 assert.match(studio,/src=\{sampleReady \? "\/fancy-cafe-ai\/example\.mp4" : undefined\}/);
 assert.match(studio,/aria-label="Fancy Cafe example video"/);
 assert.doesNotMatch(studio,/Temporary legacy band demo/);
 assert.ok(fs.statSync('public/fancy-cafe-ai/example.mp4').size>100000);
 assert.ok(fs.statSync('public/fancy-cafe-ai/example-poster.webp').size>1000);
});

test('real cafe generation preserves silent YIR submission and private audio composition',()=>{
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

test('older simulated checkouts display cafe example instead of dog video',()=>{
 const playback=read('src/app/api/video/file/route.ts');
 assert.match(playback,/job\.video_url === "simulated"[^\n]*Location: "\/fancy-cafe-ai\/example\.mp4"/);
});
