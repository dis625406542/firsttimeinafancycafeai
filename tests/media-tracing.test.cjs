const {test}=require('node:test');
const assert=require('node:assert/strict');
test('every paid or recovery route traces native media executables',async()=>{
 const {default:config}=await import('../next.config.mjs');
 for(const route of ['/api/billing/checkout','/api/internal/video-worker','/api/internal/media-health','/api/webhooks/stripe','/api/video','/api/video/file']){
  const included=config.outputFileTracingIncludes[route]||[];
  assert.ok(included.some(item=>item.includes('@ffmpeg-installer')&&item.includes('ffmpeg')),`${route} missing ffmpeg`);
  assert.ok(included.some(item=>item.includes('@ffprobe-installer')&&item.includes('ffprobe')),`${route} missing ffprobe`);
 }
});
