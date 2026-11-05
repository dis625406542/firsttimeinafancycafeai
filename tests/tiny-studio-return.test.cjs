const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const root = join(__dirname, '..');
const read = (path) => readFileSync(join(root, path), 'utf8');

function previewModule() {
  const ts = require('typescript');
  const compiled = ts.transpileModule(read('src/lib/tiny-studio-previews.ts'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function('exports', 'module', compiled)(module.exports, module);
  return module.exports;
}

test('Stripe redirect restores only the current order\'s lightweight session thumbnails', () => {
  const { saveSubmittedFaces, loadSubmittedFaces } = previewModule();
  const data = new Map();
  const storage = { setItem: (key, value) => data.set(key, value), getItem: key => data.get(key) ?? null };
  const code = 'A'.repeat(32);
  const faces = Object.fromEntries(['back-left', 'back-right', 'keys', 'lead', 'sax'].map(slot => [slot, 'data:image/jpeg;base64,AAA']));
  assert.equal(saveSubmittedFaces(storage, code, faces, 1000), true);
  assert.deepEqual(loadSubmittedFaces(storage, code, 2000), faces);
  assert.deepEqual(loadSubmittedFaces(storage, 'B'.repeat(32), 2000), {});
  assert.deepEqual(loadSubmittedFaces(storage, code, 1000 + 3 * 86400000 + 1), {});
  // Orders may use one to five portraits, so a single thumbnail is valid.
  assert.equal(saveSubmittedFaces(storage, code, { 'back-left': 'data:image/jpeg;base64,AAA' }, 1000), true);
  assert.equal(saveSubmittedFaces(storage, code, {}, 1000), false);
  assert.equal(saveSubmittedFaces(storage, code, { ...faces, lead: 'data:text/html;base64,AAA' }, 1000), false);
});

test('Stripe return shows saved faces read-only and visible real/indeterminate status instead of a blank upload form', () => {
  const studio = read('src/components/tiny-studio.tsx');
  const css = read('src/app/globals.css');
  assert.match(studio, /saveSubmittedFaces\(/);
  assert.match(studio, /loadSubmittedFaces\(/);
  assert.match(studio, /submittedFaces\[id\]/);
  assert.doesNotMatch(studio, /URL\.revokeObjectURL\(photo\.url\); \}\); \}, \[band\]\)/);
  assert.match(studio, /disabled=\{submitted\}/);
  assert.match(studio, /setProgress\(current => Math\.max\(current \?\? 0,/);
  assert.match(studio, /role="progressbar"/);
  assert.match(studio, /tiny-generation-status/);
  assert.match(css, /\.tiny-generation-status/);
});
