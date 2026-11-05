const { test } = require('node:test');
const assert = require('node:assert/strict');
const { read } = require('./site-test-helpers.cjs');

test('completed order replaces disabled checkout control with prominent repeat action', () => {
  const studio = read('src/components/tiny-studio.tsx');
  const css = read('src/app/globals.css');
  assert.match(studio, /submitted && stage === "ready"\s*\?\s*<button[^>]+className="tiny-generate tiny-repeat-generate"/);
  assert.match(studio, /Make another video/);
  assert.match(css, /\.tiny-repeat-generate\s*\{[^}]*min-height:5[2-9]px;/);
  assert.doesNotMatch(css, /\.tiny-submitted-actions button\{/);
});
