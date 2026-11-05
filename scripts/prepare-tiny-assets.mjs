// Operator-only: prepares first 15 seconds, no retiming. --upload writes private R2 objects.
import './operator-runtime.cjs';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { run } from '../services/video-composer/media.mjs';
const source=process.argv.find(a=>a.startsWith('--source='))?.slice(9);
if(!source)throw new Error('Usage: node scripts/prepare-tiny-assets.mjs --source=ABSOLUTE_MP4 [--upload]');
const dir=resolve('docs/tiny-assets');await mkdir(dir,{recursive:true});
const video=resolve(dir,'reference-first15-silent.mp4'),audio=resolve(dir,'soundtrack-first15.mp3');
const ffmpeg=process.env.FFMPEG_PATH||'ffmpeg';
await run(ffmpeg,['-nostdin','-hide_banner','-loglevel','error','-y','-i',source,'-map','0:v:0','-t','15','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',video]);
await run(ffmpeg,['-nostdin','-hide_banner','-loglevel','error','-y','-i',resolve('docs/sample-dogs.mp3'),'-map','0:a:0','-t','15','-vn','-c:a','libmp3lame','-b:a','192k','-ar','44100','-ac','2',audio]);
const probe=async p=>JSON.parse(await run(process.env.FFPROBE_PATH||'ffprobe',['-v','error','-show_format','-show_streams','-of','json',p]));
const v=await probe(video),a=await probe(audio);
if(Math.abs(Number(v.format.duration)-15)>0.1||Math.abs(Number(a.format.duration)-15)>0.1||v.streams.some(s=>s.codec_type==='audio'))throw new Error('First-15-second validation failed');
console.log('Prepared normal-speed 15s silent reference and MP3.');
if(process.argv.includes('--upload')){
 const account=process.env.R2_ACCOUNT_ID?.trim(),jurisdiction=process.env.R2_JURISDICTION?.trim()||'global';
 if(!/^[a-f0-9]{32}$/.test(account||'')||!['global','us','eu','fedramp'].includes(jurisdiction))throw new Error('Invalid R2 configuration');
 const s3=new S3Client({region:'auto',endpoint:`https://${account}.${jurisdiction==='global'?'':jurisdiction+'.'}r2.cloudflarestorage.com`,credentials:{accessKeyId:process.env.R2_ACCESS_KEY_ID.trim(),secretAccessKey:process.env.R2_SECRET_ACCESS_KEY.trim()}});
 for(const [path,key,type]of [[video,'tiny-desk-ai/v2/reference-first15-silent.mp4','video/mp4'],[audio,'tiny-desk-ai/v2/soundtrack-first15.mp3','audio/mpeg']]){
  const body=await readFile(path);await s3.send(new PutObjectCommand({Bucket:process.env.R2_BUCKET_NAME.trim(),Key:key,Body:body,ContentType:type,CacheControl:'private, no-store'}));
  const head=await s3.send(new HeadObjectCommand({Bucket:process.env.R2_BUCKET_NAME.trim(),Key:key}));if(head.ContentLength!==body.length)throw new Error('Asset upload verification failed');console.log('Verified private asset:',key,body.length);
 }
 s3.destroy();
}
