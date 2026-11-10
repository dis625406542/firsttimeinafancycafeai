const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { load, read } = require('./site-test-helpers.cjs');

test('two Smiths roles use demo-video crops and Photo 2 is visible by default', () => {
  const studio = read('src/components/tiny-studio.tsx');
  assert.match(studio, /protagonist: "\/love-the-smiths\/listener\.webp"/);
  assert.match(studio, /regular: "\/love-the-smiths\/fan\.webp"/);
  assert.match(studio, /<details className="tiny-optional-band" open>/);
  assert.match(studio, /Optional Photo 2 · The Smiths fan/);
  assert.doesNotMatch(studio, /fancy-cafe-ai\/protagonist|fancy-cafe-ai\/regular|Optional female customer/);
  for (const name of ['listener.webp', 'fan.webp']) assert.ok(fs.statSync(`public/love-the-smiths/${name}`).size > 5000);
});

test('two demo videos and their posters are served from public assets', () => {
  const reels = read('src/components/sample-reels.tsx');
  for (const [video, poster] of [['demo-1.mp4', 'demo-1-poster.webp'], ['demo-2.mp4', 'demo-2-poster.webp']]) {
    assert.ok(reels.includes(`/love-the-smiths/${video}`));
    assert.ok(reels.includes(`/love-the-smiths/${poster}`));
    assert.ok(fs.statSync(`public/love-the-smiths/${video}`).size > 100000);
    assert.ok(fs.statSync(`public/love-the-smiths/${poster}`).size > 5000);
  }
  assert.match(reels, /autoPlay muted loop playsInline/);
  assert.doesNotMatch(reels, /fancy-cafe-ai\/|tiny-band\/reels/);
});

test('four beat frames and guide covers use demo-video stills', () => {
  const home = read('src/app/page.tsx');
  const guides = load('src/lib/tiny-guides.ts').allTinyGuides;
  assert.match(home, /\/love-the-smiths\/beat-\$\{index\+1\}\.webp/);
  for (let index = 1; index <= 4; index++) assert.ok(fs.statSync(`public/love-the-smiths/beat-${index}.webp`).size > 5000);
  for (const guide of guides) {
    assert.match(guide.image, /^\/love-the-smiths\//, guide.slug);
    assert.ok(fs.statSync(`public${guide.image}`).size > 5000, guide.image);
  }
  assert.ok(fs.statSync('public/love-the-smiths/guide-cover-1.webp').size > 5000);
  assert.ok(fs.statSync('public/love-the-smiths/guide-cover-2.webp').size > 5000);
  assert.ok(fs.statSync('public/love-the-smiths/guide-cover-3.webp').size > 5000);
});
