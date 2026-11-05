import { readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const routes=['api/billing/checkout','api/internal/video-worker','api/internal/media-health','api/webhooks/stripe','api/video','api/video/file'];
const platform=`${process.platform}-${process.arch}`;
const suffix=process.platform==='win32'?'.exe':'';
const binaries=[`@ffmpeg-installer/${platform}/ffmpeg${suffix}`,`@ffprobe-installer/${platform}/ffprobe${suffix}`];
for(const route of routes){
 const trace=resolve('.next','server','app',route,'route.js.nft.json');
 const {files}=JSON.parse(await readFile(trace,'utf8'));
 const found={};
 for(const binary of binaries){
  const match=files.find(path=>path.replaceAll('\\','/').endsWith(`node_modules/${binary}`));
  if(!match)throw new Error(`Media binary missing from Next.js function trace: ${route} / ${binary}`);
  const file=await stat(resolve(dirname(trace),match));
  if(!file.isFile() || !file.size || process.platform!=='win32' && !(file.mode&0o111))throw new Error(`Media binary unreadable or not executable: ${route} / ${binary}`);
  found[binary.startsWith('@ffmpeg')?'ffmpegMiB':'ffprobeMiB']=Math.round(file.size/1048576);
 }
 console.info('media.trace',{route,platform,...found,ok:true});
}
