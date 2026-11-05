/**
 * Extract editorial stills from the existing public dog-band demo.
 * No uploads, provider calls, audio changes or payment operations.
 * Usage: node scripts/extract-guide-frames.mjs
 * Optional UI screenshot: node scripts/extract-guide-frames.mjs --studio-screenshot <path.png>
 * Capture .tiny-studio-form at 390px viewport, with no personal photos, cookies declined,
 * no development overlay. Review the screenshot before publishing it.
 */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const { path: ffmpeg } = require('@ffmpeg-installer/ffmpeg');
const sharp = require('sharp');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'public/tiny-band/reels/reel-3-dogs.mp4');
const destination = join(root, 'public/tiny-band/guides/steps');
await mkdir(destination, { recursive: true });
for (const [name, seconds] of [['band', 0.8], ['lead', 6.5], ['sax', 12]]) {
  const output = join(destination, `reference-${name}.webp`);
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-ss', String(seconds), '-i', source,
    '-frames:v', '1', '-vf', 'scale=960:-2', '-q:v', '80', '-y', output], { stdio: 'inherit', windowsHide: true });
  console.log(`Extracted ${name} at ${seconds}s to ${output}`);
}
const screenshotFlag = process.argv.indexOf('--studio-screenshot');
if (screenshotFlag !== -1) {
  const screenshot = process.argv[screenshotFlag + 1];
  if (!screenshot) throw new Error('Provide the screenshot path after --studio-screenshot.');
  const output = join(destination, 'studio-mobile.webp');
  const result = await sharp(resolve(screenshot)).webp({ quality: 88 }).toFile(output);
  console.log(`Studio screenshot: ${result.width} x ${result.height}. Update its content dimensions and capture date if changed.`);
}
