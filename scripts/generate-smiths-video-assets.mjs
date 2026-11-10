import { mkdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const root = process.cwd();
const outDir = path.join(root, 'public/love-the-smiths');
const tmpDir = path.join(os.tmpdir(), 'lovethesmiths-frames');
const videos = {
  d1: path.join(root, 'public/love-the-smiths/demo-1.mp4'),
  d2: path.join(root, 'public/love-the-smiths/demo-2.mp4'),
};
const times = { d1: [0.5, 15, 21], d2: [0.5, 5, 9, 11, 21] };

await mkdir(outDir, { recursive: true });
await rm(tmpDir, { recursive: true, force: true });
await mkdir(tmpDir, { recursive: true });

function extract(key, seconds) {
  const out = path.join(tmpDir, `${key}-${String(seconds).replace('.', '_')}.jpg`);
  const result = spawnSync(ffmpegPath, ['-y', '-ss', String(seconds), '-i', videos[key], '-frames:v', '1', '-q:v', '2', out], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${key} ${seconds}: ${result.stderr.slice(-400)}`);
  return out;
}

const frames = {};
for (const key of Object.keys(videos)) {
  frames[key] = {};
  for (const seconds of times[key]) frames[key][seconds] = extract(key, seconds);
}

const cover = (input, width, height) => sharp(input).resize(width, height, { fit: 'cover' });
const save = async (pipeline, name) => {
  await pipeline.webp({ quality: 84 }).toFile(path.join(outDir, name));
  console.log('wrote', name);
};

// Four beat stills from the higher-resolution demo video.
await save(cover(frames.d2[0.5], 1200, 675), 'beat-1.webp');
await save(cover(frames.d2[5], 1200, 675), 'beat-2.webp');
await save(cover(frames.d2[9], 1200, 675), 'beat-3.webp');
await save(cover(frames.d2[11], 1200, 675), 'beat-4.webp');

// Video posters and the two role crops.
await save(cover(frames.d1[0.5], 854, 480), 'demo-1-poster.webp');
await save(cover(frames.d2[0.5], 1280, 720), 'demo-2-poster.webp');
await save(sharp(frames.d2[0.5]).extract({ left: 60, top: 0, width: 540, height: 720 }).resize(600, 800, { fit: 'cover' }), 'listener.webp');
await save(sharp(frames.d2[11]).extract({ left: 700, top: 0, width: 540, height: 720 }).resize(600, 800, { fit: 'cover' }), 'fan.webp');

// Before: two reference frames stacked in the tall comparison card.
const beforeTop = await cover(frames.d2[0.5], 900, 547).toBuffer();
const beforeBottom = await cover(frames.d2[11], 900, 547).toBuffer();
await save(sharp({ create: { width: 900, height: 1100, channels: 4, background: '#ffe7e9' } })
  .composite([{ input: beforeTop, left: 0, top: 0 }, { input: beforeBottom, left: 0, top: 553 }]), 'comparison-before.webp');

// After: four stacked beats in the same tall card format as the before image.
const afterTiles = await Promise.all([frames.d2[0.5], frames.d2[5], frames.d2[9], frames.d2[11]]
  .map(async input => {
    const scaled = await sharp(input).resize(900, 506, { fit: 'cover' }).toBuffer();
    return sharp(scaled).extract({ left: 0, top: 90, width: 900, height: 275 }).toBuffer();
  }));
await save(sharp({ create: { width: 900, height: 1100, channels: 4, background: '#ffe7e9' } })
  .composite([
    { input: afterTiles[0], left: 0, top: 0 },
    { input: afterTiles[1], left: 0, top: 275 },
    { input: afterTiles[2], left: 0, top: 550 },
    { input: afterTiles[3], left: 0, top: 825 },
  ]), 'comparison-after.webp');

// Blog cards: two frames side by side, matching the reference-card style.
async function twoUp(leftInput, rightInput, leftCrop, rightCrop, name) {
  const left = await sharp(leftInput).extract(leftCrop).resize(600, 675, { fit: 'cover' }).toBuffer();
  const right = await sharp(rightInput).extract(rightCrop).resize(600, 675, { fit: 'cover' }).toBuffer();
  await save(sharp({ create: { width: 1200, height: 675, channels: 4, background: '#ffe7e9' } })
    .composite([{ input: left, left: 0, top: 0 }, { input: right, left: 600, top: 0 }]), name);
}

await twoUp(frames.d2[0.5], frames.d2[11], { left: 60, top: 22, width: 600, height: 675 }, { left: 680, top: 22, width: 600, height: 675 }, 'guide-cover-1.webp');
await twoUp(frames.d2[5], frames.d2[9], { left: 60, top: 22, width: 600, height: 675 }, { left: 680, top: 22, width: 600, height: 675 }, 'guide-cover-2.webp');
await twoUp(frames.d1[0.5], frames.d1[15], { left: 20, top: 0, width: 426, height: 480 }, { left: 408, top: 0, width: 426, height: 480 }, 'guide-cover-3.webp');

console.log('Generated demo posters, beat stills, role crops, comparison images and guide covers.');
