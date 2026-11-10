const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('shared logo SVG is also the app icon', () => {
  const svg = read('public/logo.svg');
  assert.match(svg, /#ff7a93/);
  assert.match(svg, /#f23a5c/);
  assert.match(svg, /#c51d3f/);
  assert.match(svg, /#ffc23c/);
  assert.equal(read('src/app/icon.svg'), svg);
  assert.match(read('src/components/site-chrome.tsx'), /src="\/logo.svg"/);
  assert.doesNotMatch(read('src/components/site-chrome.tsx'), /Mic2/);
});

test('brand raster assets have the intended dimensions', async () => {
  for (const [file, width, height] of [
    ['public/logo.png', 512, 512], ['public/logo-192.png', 192, 192],
    ['public/logo-512.png', 512, 512], ['public/logo-1024.png', 1024, 1024],
    ['src/app/apple-icon.png', 180, 180], ['public/social-preview.png', 1200, 630],
  ]) {
    const meta = await sharp(path.join(root, file)).metadata();
    assert.equal(meta.width, width, file);
    assert.equal(meta.height, height, file);
    if (file.startsWith('public/logo')) assert.equal(meta.hasAlpha, true, file);
  }
});

test('sharing metadata points to the new brand preview', () => {
  assert.match(read('src/app/layout.tsx'), /images:.*social-preview.png/);
});
