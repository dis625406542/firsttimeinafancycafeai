const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const root = join(__dirname, '..');
const read = path => readFileSync(join(root, path), 'utf8');
function policy() {
  const ts = require('typescript');
  const output = ts.transpileModule(read('src/lib/checkout-retry-policy.ts'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function('exports', 'module', output)(module.exports, module);
  return module.exports;
}
test('same options reuse canceled order, changed quality or aspect require a new order', () => {
  const { retryChoice } = policy();
  const saved = { resolution: '480p', aspectRatio: '9:16' };
  assert.equal(retryChoice(saved, '480p', '9:16'), 'reuse');
  assert.equal(retryChoice(saved, '720p', '9:16'), 'copy');
  assert.equal(retryChoice(saved, '480p', '16:9'), 'copy');
  assert.equal(retryChoice(null, '720p', '9:16'), 'fresh');
});
test('server rejects price/format changes on existing code before returning a checkout link', () => {
  const { matchesOrderFormat } = policy();
  assert.equal(matchesOrderFormat({ resolution: '480p', aspect_ratio: '9:16' }, '720p', '9:16'), false);
  assert.equal(matchesOrderFormat({ resolution: '480p', aspect_ratio: '9:16' }, '480p', '16:9'), false);
  assert.equal(matchesOrderFormat({ resolution: '480p', aspect_ratio: '9:16' }, '480p', '9:16'), true);
  const route = read('src/app/api/billing/checkout/route.ts');
  assert.match(route, /if\(order && !matchesOrderFormat\(order,resolution,aspect\)\) return json\(/);
});
test('photo transfers use a separate source code and fresh R2 keys rather than sharing originals', () => {
  const route = read('src/app/api/billing/checkout/route.ts');
  assert.match(route, /sourceCode/);
  assert.match(route, /readInputPhotos\(source\.input_photos\)/);
  assert.match(route, /saveOrderPhotos\(created\.order/);
  const studio = read('src/components/tiny-studio.tsx');
  assert.match(studio, /form\.append\("sourceCode", canceledCode/);
  assert.match(studio, /saveSubmittedFaces\(sessionStorage, code, loadSubmittedFaces\(sessionStorage, canceledCode/);
});
