const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { join } = require('node:path');
const root = join(__dirname, '..');
const read = path => fs.readFileSync(join(root, path), 'utf8');

test('the first reel shows the captioned generated result and distinguishes reference reels', () => {
  const reels = read('src/components/sample-reels.tsx');
  assert.match(reels, /generated-with-caption\.mp4/);
  assert.match(reels, /GENERATED RESULT/);
  assert.match(reels, /two reference examples/);
  assert.ok(fs.statSync(join(root, 'public/fancy-cafe-ai/generated-with-caption.mp4')).size > 100_000);
});

test('how-it-works shows the uploaded screenshot alongside a silent, looping, non-scrubbable result', () => {
  const page = read('src/app/page.tsx');
  const comparison = read('src/components/cafe-result-comparison.tsx');
  const css = read('src/app/globals.css');
  assert.match(page, /CafeResultComparison/);
  assert.match(comparison, /before-upload.webp/);
  assert.match(comparison, /generated-with-caption\.mp4/);
  assert.match(comparison, /autoPlay muted loop playsInline/);
  assert.doesNotMatch(comparison, /\bcontrols\b/);
  assert.match(comparison, /aria-pressed/);
  assert.match(css, /tiny-cafe-comparison-grid/);
  assert.ok(fs.statSync(join(root, 'public/fancy-cafe-ai/before-upload.webp')).size > 1_000);
});
