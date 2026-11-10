const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

function load(file) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function('exports', 'module', output)(module.exports, module);
  return module.exports;
}

const good = () => Response.json({ enabled: true, prices: [{ resolution: '480p', purchasable: true }] });

test('catalog recovers from a reset and 503 without user intervention', async () => {
  const { fetchCheckoutCatalog } = load('src/lib/billing-catalog-client.ts');
  let attempts = 0; const waits = [];
  const data = await fetchCheckoutCatalog('/api/billing', {
    fetcher: async () => { attempts++; if (attempts === 1) throw new TypeError('Failed to fetch'); if (attempts === 2) return Response.json({ error: 'temporarily unavailable' }, { status: 503 }); return good(); },
    wait: async ms => { waits.push(ms); },
  });
  assert.equal(data.enabled, true);
  assert.equal(attempts, 3);
  assert.deepEqual(waits, [400, 800]);
});

test('explicitly disabled checkout is not silently retried or enabled', async () => {
  const { fetchCheckoutCatalog } = load('src/lib/billing-catalog-client.ts');
  let attempts = 0;
  const data = await fetchCheckoutCatalog('/api/billing', { fetcher: async () => { attempts++; return Response.json({ enabled: false, prices: [] }); } });
  assert.equal(data.enabled, false);
  assert.equal(attempts, 1);
});

test('permanent 4xx errors fail without retry; temporary failure is bounded', async () => {
  const { fetchCheckoutCatalog } = load('src/lib/billing-catalog-client.ts');
  let attempts = 0;
  await assert.rejects(fetchCheckoutCatalog('/api/billing', { fetcher: async () => { attempts++; return Response.json({ error: 'Invalid template' }, { status: 400 }); }, wait: async () => {} }), /Invalid template/);
  assert.equal(attempts, 1);
  attempts = 0;
  await assert.rejects(fetchCheckoutCatalog('/api/billing', { fetcher: async () => { attempts++; throw new TypeError('Failed to fetch'); }, wait: async () => {} }), /Failed to fetch/);
  assert.equal(attempts, 3);
});

test('first paint shows truthful priced offer but cannot charge until backend confirms', () => {
  const studio = fs.readFileSync('src/components/tiny-studio.tsx', 'utf8');
  assert.doesNotMatch(studio, /Checkout unavailable/);
  assert.doesNotMatch(studio, /Checking payment options/);
  assert.match(studio, /fetchCheckoutCatalog/);
  assert.match(studio, /if \(!data.enabled \|\| !price\?\.purchasable\)/);
  assert.doesNotMatch(studio, /Retry checkout check/);
  assert.match(studio, /prepareCheckout\(\)/);
});

test('public gallery plays the two muted demo videos while generated playback remains available', () => {
  const reels = fs.readFileSync('src/components/sample-reels.tsx', 'utf8');
  const studio = fs.readFileSync('src/components/tiny-studio.tsx', 'utf8');
  assert.match(reels, /demo-1\.mp4/);
  assert.match(reels, /demo-2\.mp4/);
  assert.match(reels, /autoPlay muted loop playsInline/);
  assert.match(studio, /\/love-the-smiths\/demo-1\.mp4/);
  assert.doesNotMatch(studio, /sampleReady|example\.mp4/);
  assert.match(studio, /<video ref=\{previewVideo\} controls autoPlay muted playsInline|\{videoUrl/);
});
