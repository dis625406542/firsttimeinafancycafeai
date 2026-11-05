import { join } from 'node:path';
import { platform, arch } from 'node:os';

// Never import a native executable as a JS module: Turbopack cannot parse it.
// next.config.mjs traces the platform binary into each relevant Function.
export function resolveMediaBinaries(env=process.env) {
  const target = `${platform()}-${arch()}`;
  const suffix = platform()==='win32' ? '.exe' : '';
  const ffmpeg = env.FFMPEG_PATH || join(process.cwd(),'node_modules','@ffmpeg-installer',target,`ffmpeg${suffix}`);
  const ffprobe = env.FFPROBE_PATH || join(process.cwd(),'node_modules','@ffprobe-installer',target,`ffprobe${suffix}`);
  return {ffmpeg,ffprobe,source:env.FFMPEG_PATH||env.FFPROBE_PATH?'override':'packaged'};
}
