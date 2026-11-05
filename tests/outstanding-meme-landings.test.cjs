const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
function read(file) {
 const js = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
 const module = { exports: {} };
 new Function('module', 'exports', js)(module, module.exports);
 return module.exports;
}
test('Outstanding how-to and AI explainer answer distinct search intents and connect to the studio', () => {
 const guides = read('src/lib/tiny-guides.ts').allTinyGuides;
 const how = guides.find(g => g.slug === 'how-to-make-the-outstanding-meme');
 const ai = guides.find(g => g.slug === 'outstanding-meme-ai');
 assert.ok(how && ai);
 assert.match(how.title, /how to make the outstanding meme/i);
 assert.match(ai.title, /outstanding meme ai/i);
 assert.ok(how.sections.some(s => s.steps?.length >= 5), 'tutorial must give concrete steps');
 assert.ok(how.sections.some(s => s.image?.src.includes('studio-mobile')));
 assert.match(JSON.stringify(how), /Lead.*(?:at the top|displayed first)/i);
 assert.match(JSON.stringify(ai), /fixed soundtrack/i);
 assert.match(JSON.stringify(ai), /not affiliated|unofficial/i);
 for (const g of [how, ai]) {
  assert.ok(g.sections.length >= 4);
  assert.ok(g.related.includes(g === how ? ai.slug : how.slug));
  assert.match(JSON.stringify(g), /30 days/);
  assert.match(JSON.stringify(g), /5\.99/);
  assert.match(JSON.stringify(g), /8\.99/);
  assert.doesNotMatch(JSON.stringify(g), /guaranteed (?:lip.?sync|likeness)|official Tiny Desk/i);
 }
 for (const old of ['outstanding-meme-with-friends', 'tiny-desk-outstanding']) {
  assert.ok(guides.find(g => g.slug === old).related.some(slug => [how.slug, ai.slug].includes(slug)));
 }
 const { guideCtaEvent } = read('src/lib/guide-analytics.ts');
 for (const g of [how, ai]) assert.equal(guideCtaEvent('/blog/' + g.slug, '/#studio')?.guide_slug, g.slug);
});
