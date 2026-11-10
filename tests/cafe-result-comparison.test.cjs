const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { join } = require('node:path');
const root = join(__dirname, '..');
const read = path => fs.readFileSync(join(root, path), 'utf8');

test('the comparison uses demo-video frames for the two roles and the four beats', () => {
  const comparison = read('src/components/cafe-result-comparison.tsx');
  assert.match(comparison, /comparison-before\.webp/);
  assert.match(comparison, /comparison-after\.webp/);
  assert.match(comparison, /Reference frames from the demo videos/i);
  assert.doesNotMatch(comparison, /\.svg|\.mp4|<video|autoPlay|aria-pressed/);
  assert.ok(fs.statSync(join(root, 'public/love-the-smiths/comparison-before.webp')).size > 5_000);
  assert.ok(fs.statSync(join(root, 'public/love-the-smiths/comparison-after.webp')).size > 5_000);
});

test('how-it-works shows the role comparison without autoplaying customer media', () => {
  const page = read('src/app/page.tsx');
  const css = read('src/app/globals.css');
  assert.match(page, /CafeResultComparison/);
  assert.match(css, /tiny-cafe-comparison-grid/);
  assert.match(read('src/components/cafe-result-comparison.tsx'), /not customer photos or generated results/);
});
