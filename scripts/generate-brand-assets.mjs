import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

// public/logo.svg is the canonical vector. Run: node scripts/generate-brand-assets.mjs
const root = fileURLToPath(new URL('../', import.meta.url));
const at = file => path.join(root, file);
const logo = await readFile(at('public/logo.svg'));
const raster = size => sharp(logo, { density: 300 }).resize(size, size).png().toBuffer();
for (const size of [192, 512, 1024]) {
  await writeFile(at(`public/logo-${size}.png`), await raster(size));
}
await copyFile(at('public/logo-512.png'), at('public/logo.png'));
await copyFile(at('public/logo.svg'), at('src/app/icon.svg'));
// Apple applies its own rounded mask; give it a solid, padded background.
await sharp({ create: { width: 180, height: 180, channels: 3, background: '#110a19' } })
  .composite([{ input: await raster(140), left: 20, top: 20 }])
  .png().toFile(at('src/app/apple-icon.png'));

// Standard ICO container with three PNG-encoded image directory entries.
const sizes = [16, 32, 48];
const icons = await Promise.all(sizes.map(raster));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
icons.forEach((image, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile(at('src/app/favicon.ico'), Buffer.concat([header, ...icons]));

const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><radialGradient id="bg"><stop stop-color="#321539"/><stop offset="1" stop-color="#110a19"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="28" y="28" width="1144" height="574" rx="28" fill="none" stroke="#493052"/>
  <g font-family="Arial, sans-serif">
    <text x="80" y="348" font-size="62" font-weight="700" fill="#fff3fb">Fancy Cafe <tspan fill="#ff79ca">AI</tspan></text>
    <text x="83" y="412" font-size="30" fill="#d0bad8">Your first time. One awkward seat.</text>
    <text x="83" y="536" font-size="23" fill="#f6cc74">firsttimeinafancycafeai.org</text>
  </g>
</svg>`);
await sharp(card).composite([{ input: await raster(140), left: 80, top: 94 }])
  .png().toFile(at('public/social-preview.png'));
console.log('Generated logo PNGs, app icons, favicon and social preview from public/logo.svg');
