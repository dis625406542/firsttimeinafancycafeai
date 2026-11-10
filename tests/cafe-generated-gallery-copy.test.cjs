const { test } = require('node:test');
const assert = require('node:assert/strict');
const { read } = require('./site-test-helpers.cjs');

test('the public gallery uses the two demo videos, muted by default', () => {
  const reels = read('src/components/sample-reels.tsx');
  for (const number of ['01', '02']) assert.ok(reels.includes(`DEMO VIDEO · ${number}`));
  assert.match(reels, /demo-1\.mp4/);
  assert.match(reels, /demo-2\.mp4/);
  assert.match(reels, /autoPlay muted loop playsInline/);
  assert.match(reels, /play muted by default/i);
  assert.doesNotMatch(reels, /\.svg|ORIGINAL ILLUSTRATION|CAFE EXAMPLE/);
  for (const file of ['src/app/page.tsx', 'src/lib/legal-content.tsx', 'src/app/llms.txt/route.ts', 'src/lib/tiny-guides.ts', 'src/app/blog/[slug]/page.tsx']) {
    assert.doesNotMatch(read(file), /one generated example and two reference videos|actual customer result|cafe example footage/i, file);
  }
});

test('homepage and checkout explain duration, music, refunds and photo handling clearly', () => {
  const home = read('src/app/page.tsx');
  const studio = read('src/components/tiny-studio.tsx');
  const legal = read('src/lib/legal-content.tsx');
  assert.match(home, /24-second/);
  assert.match(home, /24-second/);
  assert.match(home, /Paid but your video wasn't delivered\?/);
  assert.match(home, /Your photos are used to create your video/);
  assert.match(studio, /Paid but your video wasn't delivered\?/);
  assert.match(studio, /24 seconds/);
  assert.match(legal, /24 seconds/);
  assert.doesNotMatch(legal, /original reference soundtrack is included/i);
});
