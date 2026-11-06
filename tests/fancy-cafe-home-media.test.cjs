const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { read } = require('./site-test-helpers.cjs');

test('two cafe roles use real portraits and the optional woman is visible by default', () => {
  const studio = read('src/components/tiny-studio.tsx');
  assert.match(studio, /protagonist: "\/fancy-cafe-ai\/protagonist\.webp"/);
  assert.match(studio, /regular: "\/fancy-cafe-ai\/regular\.webp"/);
  assert.match(studio, /<details className="tiny-optional-band" open>/);
  assert.match(studio, /Optional female customer/);
  assert.doesNotMatch(studio, /Add a friend|dog portraits are temporary|Temporary dog portrait/);
  for (const name of ['protagonist.webp', 'regular.webp']) assert.ok(fs.statSync(`public/fancy-cafe-ai/${name}`).size > 1000);
});

test('three cafe samples have actual local videos and posters and default mute', () => {
  const reels = read('src/components/sample-reels.tsx');
  for (const [video, poster] of [['generated-with-caption.mp4', 'generated-with-caption-poster.webp'], ['demo-2.mp4', 'demo-2-poster.webp'], ['demo-3.mp4', 'demo-3-poster.webp']]) {
    assert.ok(reels.includes(`/fancy-cafe-ai/${video}`));
    assert.ok(reels.includes(`/fancy-cafe-ai/${poster}`));
    assert.ok(fs.statSync(`public/fancy-cafe-ai/${video}`).size > 100000);
    assert.ok(fs.statSync(`public/fancy-cafe-ai/${poster}`).size > 1000);
  }
  assert.match(reels, /autoPlay muted loop playsInline/);
  assert.doesNotMatch(reels, /tiny-band\/reels|Temporary demo gallery/);
});

test('four scene frames and blog covers use cafe demo captures', () => {
  const home = read('src/app/page.tsx');
  const guides = read('src/lib/tiny-guides.ts');
  assert.match(home, /\/fancy-cafe-ai\/scenes\/beat-0\$\{index\+1\}\.webp/);
  for (let index = 1; index <= 4; index++) assert.ok(fs.statSync(`public/fancy-cafe-ai/scenes/beat-0${index}.webp`).size > 1000);
  for (let index = 1; index <= 3; index++) assert.ok(fs.statSync(`public/fancy-cafe-ai/guides/demo-${index}.webp`).size > 1000);
  assert.match(guides, /\/fancy-cafe-ai\/guides\/demo-1\.webp/);
  assert.match(guides, /\/fancy-cafe-ai\/guides\/demo-2\.webp/);
  assert.match(guides, /\/fancy-cafe-ai\/guides\/demo-3\.webp/);
  assert.doesNotMatch(guides, /\/tiny-band\/guides\//);
  assert.doesNotMatch(home, /\/tiny-band\/scenes\//);
});
