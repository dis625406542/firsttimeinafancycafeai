const { test } = require('node:test');
const assert = require('node:assert/strict');
const { read } = require('./site-test-helpers.cjs');

test('all three cafe reels are clearly labeled as studio-generated results', () => {
  const reels = read('src/components/sample-reels.tsx');
  for (const number of ['01', '02', '03']) assert.ok(reels.includes(`AI-GENERATED EXAMPLE · ${number}`));
  assert.match(reels, /These examples were created with First Time in a Fancy Cafe AI/);
  assert.doesNotMatch(reels, /CAFE EXAMPLE|two reference examples|two Fancy Cafe reference videos/);
  for (const file of ['src/app/page.tsx', 'src/lib/legal-content.tsx', 'src/app/llms.txt/route.ts', 'src/lib/tiny-guides.ts', 'src/app/blog/[slug]/page.tsx']) {
    assert.doesNotMatch(read(file), /one generated example and two reference videos|one AI-generated result and two reference clips|one labeled AI-generated result and two reference clips|plus separately labeled reference videos|reference clips|reference videos show the intended story|generated example separately from reference videos/i, file);
  }
});

test('homepage and checkout explain music, refunds, photo handling clearly without false promises', () => {
  const home = read('src/app/page.tsx');
  const studio = read('src/components/tiny-studio.tsx');
  const legal = read('src/lib/legal-content.tsx');
  assert.match(home, /Your finished 20-second MP4 includes the original music from the Fancy Cafe reference video/);
  assert.match(home, /Paid but your video wasn't delivered\?/);
  assert.match(home, /Your photos are used to create your video/);
  assert.match(studio, /Paid but your video wasn't delivered\?/);
  assert.match(legal, /The original reference soundtrack is included in the delivered MP4/);
  assert.doesNotMatch(legal, /We do not promise that a future result will match the sample, reproduce any song/);
});
