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
await sharp({ create: { width: 180, height: 180, channels: 3, background: '#fbfaf9' } })
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
  <defs>
    <radialGradient id="bg"><stop stop-color="#fffdf8"/><stop offset=".7" stop-color="#fbfaf9"/><stop offset="1" stop-color="#ffe7e9"/></radialGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1200" y2="0"><stop stop-color="#f23a5c"/><stop offset="1" stop-color="#ffc23c"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="10" fill="#f23a5c"/>
  <rect x="28" y="28" width="1144" height="574" rx="28" fill="none" stroke="#f1e4dc"/>
  <g font-family="Georgia, serif">
    <text x="80" y="330" font-size="60" font-weight="700" fill="#4a1d2b">I Love The Smiths <tspan fill="#f23a5c">AI</tspan></text>
    <text x="83" y="396" font-size="29" fill="#7a5a66">Two photos. One elevator meet-cute.</text>
  </g>
  <rect x="80" y="450" width="360" height="3" rx="1.5" fill="url(#line)"/>
  <g font-family="Arial, sans-serif">
    <text x="83" y="536" font-size="23" fill="#a32a47">lovethesmithsai.com</text>
  </g>
</svg>`);
await sharp(card).composite([{ input: await raster(140), left: 80, top: 94 }])
  .png().toFile(at('public/social-preview.png'));
console.log('Generated logo PNGs, app icons, favicon and social preview from public/logo.svg');
