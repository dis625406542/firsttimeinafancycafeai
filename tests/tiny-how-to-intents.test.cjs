const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.join(__dirname, '..');
function load(file) {
 const js = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
 const mod = { exports: {} };
 new Function('module', 'exports', js)(mod, mod.exports);
 return mod.exports;
}
const slugs = [
 'how-to-make-tiny-desk-ai-video-with-music',
 'how-to-create-tiny-desk-ai-concert-from-one-photo',
 'how-to-make-outstanding-meme-with-template',
 'how-to-make-tiny-desk-ai-video-for-instagram-and-youtube'
];
test('four distinct, illustrated how-to pages address real autocomplete intents and lead into the studio', () => {
 const { allTinyGuides } = load('src/lib/tiny-guides.ts');
 const { guideCtaEvent } = load('src/lib/guide-analytics.ts');
 for (const slug of slugs) {
  const guide = allTinyGuides.find(g => g.slug === slug);
  assert.ok(guide, slug);
  assert.match(guide.title, /how to/i, slug);
  assert.ok(guide.answer.length >= 90, slug + ' answers upfront');
  assert.ok(guide.sections.length >= 4, slug + ' has substantive sections');
  assert.ok(guide.sections.some(s => s.steps?.length >= 4), slug + ' gives actionable steps');
  assert.ok(guide.sections.some(s => s.image?.src.includes('/steps/')), slug + ' illustrates the actual workflow');
  assert.ok(guide.sections.some(s => s.links?.some(link => link.href === '/#studio')), slug + ' has in-body tool entry');
  assert.ok(guide.related.every(id => id !== slug && allTinyGuides.some(g => g.slug === id)));
  assert.equal(guideCtaEvent('/blog/' + slug, '/#studio')?.guide_slug, slug);
  assert.equal(guide.publishedAt, '2026-11-04');
  assert.equal(guide.updatedAt, '2026-11-05');
 }
 const music = allTinyGuides.find(g => g.slug === slugs[0]);
 assert.match(JSON.stringify(music), /fixed soundtrack/i);
 assert.match(JSON.stringify(music), /silent footage/i);
 assert.match(JSON.stringify(music), /not.*(?:lyrics|song selector)|(?:lyrics|song selector).*not/i);
 const onePhoto = allTinyGuides.find(g => g.slug === slugs[1]);
 assert.match(JSON.stringify(onePhoto), /Lead.*(?:at the top|displayed first)/i);
 assert.match(JSON.stringify(onePhoto), /not a free|not free|no free/i);
 const template = allTinyGuides.find(g => g.slug === slugs[2]);
 assert.match(JSON.stringify(template), /no downloadable|not a downloadable/i);
 assert.match(JSON.stringify(template), /not affiliated|unofficial/i);
 const social = allTinyGuides.find(g => g.slug === slugs[3]);
 assert.match(JSON.stringify(social), /9:16/);
 assert.match(JSON.stringify(social), /16:9/);
 assert.match(JSON.stringify(social), /rights|permission/i);
 for (const existing of ['tiny-desk-ai-music-lip-sync', 'tiny-desk-ai-photo-tips', 'how-to-make-the-outstanding-meme', 'tiny-desk-ai-video-formats']) {
  const guide = allTinyGuides.find(g => g.slug === existing);
  assert.ok(guide.related.some(slug => slugs.includes(slug)), existing + ' links back to new intent');
 }
});
