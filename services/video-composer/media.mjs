import { spawn } from 'node:child_process';
export function dimensions(resolution, aspect) {
  if (!['480p','720p'].includes(resolution) || !['9:16','16:9'].includes(aspect)) throw new Error('Unsupported delivery format');
  const h = resolution === '720p' ? 720 : 480;
  const w = resolution === '720p' ? 1280 : 854;
  return aspect === '9:16' ? [h,w] : [w,h];
}
export function composeArgs(video,audio,output,resolution,aspect,duration=15) {
  if (![5,15].includes(duration)) throw new Error('Unsupported duration');
  const [w,h]=dimensions(resolution,aspect);
  return ['-nostdin','-hide_banner','-loglevel','error','-y','-filter_threads','2',
    '-protocol_whitelist','file','-threads','2','-i',video,
    '-protocol_whitelist','file','-threads','2','-i',audio,
    '-map','0:v:0','-map','1:a:0','-t',String(duration),
    '-vf',`scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2,setsar=1`,
    '-c:v','libx264','-threads','2','-preset','fast','-crf','20','-pix_fmt','yuv420p','-r','24',
    '-c:a','aac','-b:a','192k','-ar','44100','-ac','2','-movflags','+faststart',output];
}
/** @param {string} binary @param {string[]} args @param {{signal?: AbortSignal, timeoutMs?: number}} options */
export function run(binary,args,options={}) {
  return new Promise((resolve,reject)=>{
    if(options.signal?.aborted){reject(new Error('Media processing cancelled'));return;}
    const p=spawn(binary,args,{stdio:['ignore','pipe','pipe'],windowsHide:true});
    let text='',failure;
    const cancel=()=>{failure=new Error('Media processing cancelled or timed out');p.kill('SIGKILL');};
    const timer=setTimeout(cancel,options.timeoutMs??180000);
    // Bound diagnostics and drain stderr so a full pipe cannot deadlock FFmpeg.
    p.stderr.resume();
    p.stdout.on('data',b=>{
      if(text.length+b.length>1024*1024){failure=new Error('Media diagnostic output exceeds limit');p.kill('SIGKILL');}
      else text+=b;
    });
    const cleanup=()=>{clearTimeout(timer);options.signal?.removeEventListener('abort',cancel);};
    options.signal?.addEventListener('abort',cancel,{once:true});
    p.on('error',()=>{cleanup();reject(new Error('Cannot start media binary; check FFMPEG_PATH and FFPROBE_PATH'));});
    // Wait for the child to exit before releasing the lock or removing its files.
    p.on('close',code=>{cleanup();failure?reject(failure):code===0?resolve(text):reject(new Error('Media processing failed'));});
    if(options.signal?.aborted)cancel();
  });
}
/** @param {string} video @param {string} audio @param {string} output @param {string} resolution @param {string} aspect @param {number} duration @param {{signal?: AbortSignal}} options */
export async function compose(video,audio,output,resolution,aspect,duration=15,options={}) {
  if (![5,15].includes(duration)) throw new Error('Unsupported duration');
  const probe=async(file)=>JSON.parse(await run(options.ffprobe||process.env.FFPROBE_PATH||'ffprobe',['-v','error','-protocol_whitelist','file','-show_format','-show_streams','-of','json',file],options));
  const input=await probe(video),song=await probe(audio);
  if(!Number.isFinite(Number(input.format?.duration)) || !Number.isFinite(Number(song.format?.duration)) || Number(input.format.duration)<duration-0.1 || Number(song.format.duration)<duration-0.1) throw new Error(`Inputs must contain the full first ${duration} seconds`);
  await run(options.ffmpeg||process.env.FFMPEG_PATH||'ffmpeg',composeArgs(video,audio,output,resolution,aspect,duration),options);
  const result=await probe(output),v=result.streams.find(s=>s.codec_type==='video'),a=result.streams.find(s=>s.codec_type==='audio');
  const [w,h]=dimensions(resolution,aspect),seconds=Number(result.format.duration),audioSeconds=Number(a?.duration);
  if(!v||!a||v.width!==w||v.height!==h||!Number.isFinite(seconds)||seconds<duration-0.1||seconds>duration+0.15||!Number.isFinite(audioSeconds)||audioSeconds<duration-0.1||audioSeconds>duration+0.15)throw new Error('Invalid composed output');
  return {duration:seconds,width:w,height:h,audio:true};
}
