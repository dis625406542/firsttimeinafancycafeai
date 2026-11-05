// Operator-only. Source footage is supplied locally and never committed or exposed in a public bucket.
import './operator-runtime.cjs';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { run } from '../services/video-composer/media.mjs';
const source=process.argv.find(a=>a.startsWith('--source='))?.slice(9);
if(!source)throw new Error('Usage: node scripts/prepare-tiny-v3.mjs --source=ABSOLUTE_MP4 [--upload]');
const dir=resolve('docs/tiny-assets');await mkdir(dir,{recursive:true});
const video=resolve(dir,'reference-v3-first15-silent.mp4');
const probe=async path=>JSON.parse(await run(ffprobeInstaller.path,['-v','error','-show_format','-show_streams','-of','json',path]));
const original=await probe(source),duration=Number(original.format.duration);
if(!Number.isFinite(duration)||duration<10||duration>16||!original.streams.some(s=>s.codec_type==='video'))throw new Error('Unexpected source footage.');
// Only the picture is stretched. The old v2 15-second MP3 is intentionally untouched.
await run(ffmpegInstaller.path,['-nostdin','-hide_banner','-loglevel','error','-y','-i',source,'-map','0:v:0','-vf',`setpts=${(15/duration).toPrecision(14)}*(PTS-STARTPTS),fps=30,tpad=stop_mode=clone:stop_duration=0.1`,'-frames:v','450','-t','15','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',video]);
const output=await probe(video);
if(Math.abs(Number(output.format.duration)-15)>0.04||output.streams.some(s=>s.codec_type==='audio')||Number(output.streams.find(s=>s.codec_type==='video')?.nb_frames)!==450)throw new Error('Silent v3 15s reference validation failed.');
const body=await readFile(video),sha=createHash('sha256').update(body).digest('hex');
console.log('Prepared v3 silent 15s reference:',video,'bytes:',body.length,'sha256:',sha);
if(process.argv.includes('--upload')){
 const account=process.env.R2_ACCOUNT_ID?.trim(),jurisdiction=process.env.R2_JURISDICTION?.trim()||'global',bucket=process.env.R2_BUCKET_NAME?.trim(),key='tiny-desk-ai/v3/reference-first15-silent.mp4';
 if(!/^[a-f0-9]{32}$/.test(account||'')||!['global','us','eu','fedramp'].includes(jurisdiction)||!bucket||!process.env.R2_ACCESS_KEY_ID||!process.env.R2_SECRET_ACCESS_KEY)throw new Error('Invalid R2 configuration');
 const client=new S3Client({region:'auto',forcePathStyle:true,endpoint:`https://${account}.${jurisdiction==='global'?'':jurisdiction+'.'}r2.cloudflarestorage.com`,credentials:{accessKeyId:process.env.R2_ACCESS_KEY_ID,secretAccessKey:process.env.R2_SECRET_ACCESS_KEY}});
 try {
  let existing;try {existing=await client.send(new HeadObjectCommand({Bucket:bucket,Key:key}));}catch(e){if(e.$metadata?.httpStatusCode!==404)throw e;}
  if(existing && (existing.Metadata?.sha256!==sha||existing.ContentLength!==body.length))throw new Error('Different v3 asset already exists; refusing to overwrite an immutable reference.');
  if(!existing)await client.send(new PutObjectCommand({Bucket:bucket,Key:key,Body:body,ContentType:'video/mp4',CacheControl:'private, no-store',Metadata:{sha256:sha}}));
  const head=await client.send(new HeadObjectCommand({Bucket:bucket,Key:key}));
  if(head.ContentLength!==body.length||head.Metadata?.sha256!==sha)throw new Error('Uploaded v3 asset checksum verification failed.');
  console.log('Verified private R2 v3 asset:',key,'sha256:',sha);
 }finally{client.destroy();}
}
