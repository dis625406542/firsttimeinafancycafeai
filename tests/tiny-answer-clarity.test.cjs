const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const path = require('node:path');
const root = path.join(__dirname, '..');
function guides() {
 const mod = { exports: {} };
 const source = fs.readFileSync(path.join(root, 'src/lib/tiny-guides.ts'), 'utf8');
 new Function('exports', 'module', ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(mod.exports, mod);
 return mod.exports.allTinyGuides;
}
test('product answers identify the tool without relying on surrounding page context', () => {
 const slugs = ['tiny-desk-ai-video-guide', 'tiny-desk-ai-prompt-ideas', 'tiny-desk-ai-music-lip-sync', 'tiny-desk-ai-filter-pricing', 'free-tiny-desk-ai-video-generator', 'how-to-make-tiny-desk-ai-video-on-phone', 'download-tiny-desk-ai-video', 'how-to-make-the-outstanding-meme', 'how-to-make-tiny-desk-ai-video-with-music', 'how-to-create-tiny-desk-ai-concert-from-one-photo', 'how-to-make-outstanding-meme-with-template'];
 for (const slug of slugs) {
  const guide = guides().find(g => g.slug === slug);
  assert.match(guide.answer, /Tiny Desk AI Videos/, slug);
  assert.doesNotMatch(guide.answer, /\bhere\b|this (?:site|website|studio)|the studio/i, slug);
 }
});
test('pricing answer leads with the actual paid offer, not the app definition', () => {
 const answer = guides().find(g => g.slug === 'tiny-desk-ai-filter-pricing').answer;
 assert.match(answer, /^Tiny Desk AI Videos costs \$5\.99 per 480p video or \$8\.99 per 720p video\./);
 assert.match(answer, /no subscription or credit bundle/i);
 assert.match(answer, /checkout/i);
});
test('photo advice answers upload requirements directly and preserves output limitations', () => {
 const guide = guides().find(g => g.slug === 'tiny-desk-ai-photo-tips');
 const section = guide.sections.find(s => s.heading === 'Which photo formats and file sizes are accepted?');
 assert.ok(section);
 assert.match(section.paragraphs[0], /^Tiny Desk AI Videos accepts JPG, PNG and WebP files up to 10 MB per photo\./);
 assert.match(JSON.stringify(guide), /not.*guarantee|cannot.*lock/i);
});
test('download answer specifies browser access and the retention start point', () => {
 const guide = guides().find(g => g.slug === 'download-tiny-desk-ai-video');
 assert.match(guide.answer, /same browser/i);
 assert.match(guide.answer, /cookies/i);
 assert.match(guide.answer, /up to 30 days from completion/i);
 assert.match(guide.answer, /not.*browser backup/i);
});
test('homepage FAQ answers remain the shared source of visible content and structured data', () => {
 const source = fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8');
 assert.match(source, /Tiny Desk AI Videos accepts JPG, PNG and WebP files up to 10 MB per photo/);
 assert.match(source, /mainEntity: faqs\.map/);
 assert.match(source, /faqs\.filter/);
 assert.match(source, /answer\.replace|text: answer/);
});

test('search and blog-card summaries answer price, upload and music questions directly', () => {
 const all = guides();
 assert.match(all.find(g => g.slug === 'tiny-desk-ai-filter-pricing').description, /\$5\.99.*480p.*\$8\.99.*720p/);
 assert.match(all.find(g => g.slug === 'tiny-desk-ai-photo-tips').description, /JPG.*PNG.*WebP.*10 MB/);
 assert.match(all.find(g => g.slug === 'tiny-desk-ai-music-lip-sync').description, /fixed soundtrack/);
 for (const slug of ['free-tiny-desk-ai-video-generator', 'easiest-tiny-desk-ai-meme-website']) {
  const description = all.find(g => g.slug === slug).description;
  assert.match(description, /Tiny Desk AI Videos/);
  assert.doesNotMatch(description, /\bhere\b|this studio/i);
 }
});
