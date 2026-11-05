const {test}=require('node:test');
const assert=require('node:assert/strict');
const {stat}=require('node:fs/promises');

test('resolves deployable FFmpeg and ffprobe binaries with explicit override support',async()=>{
 const {resolveMediaBinaries}=await import('../services/video-composer/binaries.mjs');
 const binaries=resolveMediaBinaries({});
 assert.equal(binaries.source,'packaged');
 assert.ok((await stat(binaries.ffmpeg)).isFile());
 assert.ok((await stat(binaries.ffprobe)).isFile());
 const overridden=resolveMediaBinaries({FFMPEG_PATH:'/custom/ffmpeg',FFPROBE_PATH:'/custom/ffprobe'});
 assert.deepEqual(overridden,{ffmpeg:'/custom/ffmpeg',ffprobe:'/custom/ffprobe',source:'override'});
});

test('runtime check confirms encoder capabilities and logs safe diagnostics',async()=>{
 const {mediaHealth}=await import('../services/video-composer/local.mjs');
 const logs=[],prior=process.env.FFMPEG_PATH;
 const original=console.info;console.info=(...args)=>logs.push(args);
 try{
  const status=await mediaHealth();
  assert.equal(status.ok,true);assert.equal(status.encoders.libx264,true);assert.equal(status.encoders.aac,true);
  assert.equal(status.source,'packaged');assert.match(status.ffmpegVersion,/ffmpeg version/i);
  assert.match(status.ffprobeVersion,/ffprobe version/i);
  assert.equal(logs.some(([label,details])=>label==='media.health'&&details.ok===true),true);
  assert.equal(JSON.stringify(logs).includes('R2_SECRET'),false);
 }finally{console.info=original}
 process.env.FFMPEG_PATH='/nonexistent/ffmpeg';
 try{await assert.rejects(mediaHealth(),/Cannot start media binary/)}
 finally{if(prior===undefined)delete process.env.FFMPEG_PATH;else process.env.FFMPEG_PATH=prior}
});
