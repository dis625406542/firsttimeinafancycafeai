const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const sharp = require('sharp');
require.extensions['.ts'] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, f);
const { normalizeTinyPortrait } = require('../src/lib/portrait-normalization.ts');
const templates = require('../src/lib/video-templates.ts');
const slots = ['back-left', 'back-right', 'keys', 'lead', 'sax'];
const context = { templateId: 'tiny-desk-ai', promptVersion: 'tiny-desk-v2', photoSlots: slots };
function providerHarness() {
  const uploads = [], submits = [], referenceVersions = [];
  const mocks = {
    'server-only': {},
    './cafe-launch': {cafeLaunchReady:()=>false},
    './portrait-normalization': { normalizeTinyPortrait },
    './poyo': {},
    './yir': {
      uploadYirPortrait: async file => { uploads.push(file); return `file_${uploads.length}`; },
      submitYirVideo: async (...args) => { submits.push(args); await args[6]?.beforeSubmit?.(); return 'offline-job'; },
    },
    './tiny-composition': { loadTinyPrompt: async c => ({ ...c, databasePrompt: 'Versioned database prompt' }) },
    './r2': { readTinyReference: async version => { referenceVersions.push(version); return Buffer.from('offline-reference-video'); } },
    './video-templates': templates,
    'node:fs/promises': fs.promises,
    'node:path': require('node:path'),
  };
  const exports = {};
  const source = fs.readFileSync('src/lib/video-provider.ts', 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { exports, File, Uint8Array, process, require(name) {
    assert.ok(Object.hasOwn(mocks, name), `Unexpected dependency: ${name}`);
    return mocks[name];
  } });
  return { ...exports, uploads, submits, referenceVersions };
}
async function demos() {
  return Promise.all(slots.map(async slot => new File([await fs.promises.readFile(`public/tiny-band/${slot}.webp`)], `${slot}.webp`, { type: 'image/webp' })));
}
test('production provider path normalizes all five demos in slot order and keeps the silent reference separate', async () => {
  const provider = providerHarness(), files = await demos();
  let chargedGate = 0;
  const result = await provider.submitForProvider('yir', files, '480p', 'offline-code', '9:16', 'gender_neutral', context, async () => { chargedGate++; });
  assert.equal(result, 'offline-job');
  assert.equal(provider.uploads.length, 6);
  for (let i = 0; i < 5; i++) {
    const uploaded = Buffer.from(await provider.uploads[i].arrayBuffer());
    const expected = Buffer.from(await (await normalizeTinyPortrait(files[i])).arrayBuffer());
    assert.deepEqual(uploaded, expected, `Role ${slots[i]} must not be reordered`);
    const metadata = await sharp(uploaded).metadata();
    assert.equal(metadata.width, 768); assert.equal(metadata.height, 768); assert.equal(metadata.format, 'jpeg');
  }
  assert.equal(provider.uploads[5].type, 'video/mp4');
  assert.equal(provider.uploads[5].name, 'cafe-first15-silent.mp4');
  assert.equal(provider.submits.length, 1); assert.equal(chargedGate, 1);
  assert.equal(provider.submits[0][5].databasePrompt, 'Versioned database prompt');
  assert.equal(provider.submits[0][6].referenceVideo, 'file_6');
});
test('invalid portrait on a saved order never reaches the paid model submit', async () => {
  const provider = providerHarness(), files = await demos();
  files[1] = new File([await sharp({ create: { width: 32, height: 32, channels: 3, background: '#fff' } }).png().toBuffer()], 'tiny.png', { type: 'image/png' });
  let gates = 0;
  await assert.rejects(provider.submitForProvider('yir', files, '480p', 'offline-code', '9:16', 'gender_neutral', context, async () => { gates++; }), /Photo/);
  assert.equal(provider.submits.length, 0); assert.equal(gates, 0);
});

test('v3 provider uploads the v3 silent reference without changing old v2 orders', async () => {
 const provider=providerHarness(),files=await demos();
 await provider.submitForProvider('yir',files,'480p','offline-v3','9:16','gender_neutral',{...context,promptVersion:'tiny-desk-v3'});
 await provider.submitForProvider('yir',files,'480p','offline-v2','9:16','gender_neutral',context);
 assert.deepEqual(provider.referenceVersions,['tiny-desk-v3','tiny-desk-v2']);
 assert.equal(provider.submits[0][5].promptVersion,'tiny-desk-v3');
});
