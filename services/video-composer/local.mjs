// Native Node-only composition. No HTTP composer service and no paid model calls.
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { compose, dimensions, run } from './media.mjs';
import { resolveMediaBinaries } from './binaries.mjs';

const stateKey=Symbol.for('tinydeskaivideos.local-composition');
const state=globalThis[stateKey]??= {busy:false,healthKey:'',healthyAt:0};
const MAX_VIDEO=80*1024*1024,MAX_AUDIO=20*1024*1024;

// The DB lease protects an order across instances; this slot bounds CPU per process.
export async function withLocalComposition(action) {
  if(state.busy)return null;
  state.busy=true;
  try{return await action();}finally{state.busy=false;}
}

export async function mediaHealth() {
  let binaries;
  try {
    binaries=resolveMediaBinaries();
    const [version, probeVersion, encoders]=await Promise.all([
      run(binaries.ffmpeg,['-version'],{signal:AbortSignal.timeout(10000)}),
      run(binaries.ffprobe,['-version'],{signal:AbortSignal.timeout(10000)}),
      run(binaries.ffmpeg,['-hide_banner','-encoders'],{signal:AbortSignal.timeout(10000)}),
    ]);
    const status={ok:true,source:binaries.source,platform:process.platform,arch:process.arch,
      ffmpegVersion:version.split(/\r?\n/)[0],ffprobeVersion:probeVersion.split(/\r?\n/)[0],
      encoders:{libx264:/\blibx264\b/.test(encoders),aac:/\baac\b/.test(encoders)},tempDir:tmpdir()};
    if(!status.encoders.libx264 || !status.encoders.aac)throw new Error('FFmpeg must include libx264 and AAC encoders');
    const dir=await mkdtemp(join(tmpdir(),'tiny-health-'));
    await rm(dir,{recursive:true,force:true});
    console.info('media.health',status);
    return status;
  } catch(error) {
    console.error('media.health',{ok:false,source:binaries?.source??'unresolved',platform:process.platform,arch:process.arch,
      error:error instanceof Error ? error.message : 'Media binary resolution failed'});
    throw error;
  }
}

export async function assertLocalCompositionReady() {
  const binaries=resolveMediaBinaries();
  const key=JSON.stringify([binaries.ffmpeg,binaries.ffprobe,tmpdir()]);
  if(state.healthKey===key && Date.now()-state.healthyAt<60000)return;
  await mediaHealth();
  state.healthKey=key;state.healthyAt=Date.now();
}
function checkUrls(urls) {
  let host;
  for(const value of urls){
    const u=new URL(value);
    if(u.protocol!=='https:'||u.port||u.username||u.password||! /^[a-f0-9]{32}\.(?:(?:us|eu|fedramp)\.)?r2\.cloudflarestorage\.com$/.test(u.hostname))throw new Error('Composition requires private R2 URLs');
    if(host && host!==u.hostname)throw new Error('Composition R2 hosts must match');
    host=u.hostname;
  }
}

async function download(url,path,limit,signal) {
  signal.throwIfAborted();
  const response=await fetch(url,{redirect:'error',cache:'no-store',signal});
  if(response.status!==200||!response.body){await response.body?.cancel();throw new Error('Composition asset download failed');}
  if(Number(response.headers.get('content-length'))>limit){await response.body.cancel();throw new Error('Composition asset exceeds byte limit');}
  let size=0;
  const bound=new Transform({transform(chunk,encoding,done){size+=chunk.length;size>limit?done(new Error('Composition asset exceeds byte limit')):done(null,chunk);}});
  await pipeline(Readable.fromWeb(response.body),bound,createWriteStream(path,{flags:'wx',mode:0o600}),{signal});
  if(!size)throw new Error('Composition asset is empty');
}

/**
 * URLs must be generated server-side by compositionUrls(), never supplied by the browser.
 * @param {{id:string, videoUrl:string, audioUrl:string, outputUrl:string, resolution:string, aspect:string, duration:number}} job
 * @param {{signal?:AbortSignal, tempRoot?:string, processMedia?:typeof compose}} options
 */
export async function composeFromUrls(job,options={}) {
  if(!/^[A-F0-9]{32}-[a-f0-9]{16}$/.test(job.id))throw new Error('Invalid composition id');
  dimensions(job.resolution,job.aspect);
  const duration=job.duration??15; // Compatibility with existing v1 compositions.
  if(![15,20].includes(duration))throw new Error("Unsupported composition duration");
  checkUrls([job.videoUrl,job.audioUrl,job.outputUrl]);
  const signal=options.signal??AbortSignal.timeout(220000);
  signal.throwIfAborted();
  const dir=await mkdtemp(join(options.tempRoot??tmpdir(),'tiny-composition-'));
  try{
    const video=join(dir,'video.mp4'),audio=join(dir,'soundtrack.mp3'),output=join(dir,'output.mp4');
    await download(job.videoUrl,video,MAX_VIDEO,signal);
    await download(job.audioUrl,audio,MAX_AUDIO,signal);
    const result=await (options.processMedia??compose)(video,audio,output,job.resolution,job.aspect,duration,{signal,...resolveMediaBinaries()});
    signal.throwIfAborted();
    const size=(await stat(output)).size;
    if(!result.audio||!size||size>MAX_VIDEO)throw new Error('Invalid composed video');
    const body=createReadStream(output);
    try{
      const response=await fetch(job.outputUrl,{
        method:'PUT',headers:{'Content-Type':'video/mp4','Content-Length':String(size),'x-amz-meta-composition':job.id},
        body,duplex:'half',redirect:'error',signal,
      });
      await response.body?.cancel();
      if(!response.ok)throw new Error('Composed video upload failed');
    }finally{body.destroy();}
    return result;
  }finally{await rm(dir,{recursive:true,force:true});}
}
