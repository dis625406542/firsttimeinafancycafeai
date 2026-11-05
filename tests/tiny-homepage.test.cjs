const test = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync, existsSync} = require('node:fs');
const {join} = require('node:path');
const root = join(__dirname, '..');
const read = (path) => readFileSync(join(root, path), 'utf8');

test('Tiny Desk homepage uses its own studio and wired checkout flow', () => {
  const page = read('src/app/page.tsx');
  const studio = read('src/components/tiny-studio.tsx');
  assert.match(page, /Tiny Desk AI Video Generator/);
  assert.match(page, /id="studio"/);
  assert.doesNotMatch(page, /Zombie|Tiptoeing|zombie/i);
  assert.match(studio, /\$5\.99/);
  assert.match(studio, /\$8\.99/);
  // The studio must go through moderation, checkout, generation and status APIs.
  assert.match(studio, /\/api\/video\/moderate/);
  assert.match(studio, /\/api\/billing\/checkout/);
  assert.match(studio, /\/api\/video\?template=/);
  assert.match(studio, /tiny-desk-ai/);
});

test('old video landing pages are removed and legal routes belong to this domain', () => {
  const sitemap = read('src/app/sitemap.ts');
  assert.doesNotMatch(sitemap, /BLOG_POSTS|tiptoeing-in-my-jordans/);
  assert.equal(existsSync(join(root, 'src/app/video/tiptoeing-in-my-jordans/page.tsx')), false);
  for (const route of ['about','contact','privacy','terms','acceptable-use','refund-policy','security']) {
    assert.equal(existsSync(join(root, 'src/app', route, 'page.tsx')), true, route + ' should be published');
  }
  const site = read('src/lib/site.ts');
  assert.match(site, /tinydeskaivideos\.com/);
});


test('legacy checkout stays shut until Tiny Desk product is implemented', () => {
  const checkout = read('src/app/api/billing/checkout/route.ts');
  assert.match(checkout, /TINY_DESK_CHECKOUT_ENABLED/);
  assert.match(checkout, /Tiny Desk checkout is not available yet/);
});

test('editorial guides are real pages with reference-style cards and four-column footer', () => {
  const page = read('src/app/page.tsx');
  const listing = read('src/app/blog/page.tsx');
  const guide = read('src/app/blog/[slug]/page.tsx');
  const chrome = read('src/components/site-chrome.tsx');
  assert.match(page, /TinyGuides/);
  assert.match(listing, /TinyGuides/);
  assert.match(guide, /notFound/);
  assert.match(chrome, /Guides/);
  assert.match(chrome, /Legal/);
  assert.match(read('src/app/globals.css'), /tiny-guide-grid/);
  assert.doesNotMatch(read('src/app/robots.ts'), /\"\/blog\/\"/);
});

test('reference-style story, explainer, steps, sound note, and expanded FAQ stay honest', () => {
 const page = read('src/app/page.tsx');
 const css = read('src/app/globals.css');
 const guides = read('src/lib/tiny-guides.ts');
 assert.match(page, /tiny-scene-grid/);
 assert.match(page, /tiny-trend-panel/);
 assert.match(page, /tiny-photo-checklist/);
 assert.match(page, /tiny-sound-section/);
 assert.match(page, /tiny-faq-layout/);
 assert.match(css, /grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
 assert.match(page, /Does the video have music/);
 assert.match(page, /Can I download/);
 assert.match(page, /How long are photos kept/);
 assert.ok((guides.match(/slug: "/g) || []).length >= 6, 'six original editorial guides');
 assert.doesNotMatch(page, /Every video recreates|original audio stay|rendering takes a few minutes/);
});

test('all six guides have substantial unique content, local artwork and footer discovery', () => {
 const ts = require('typescript');
 const compiled = ts.transpileModule(read('src/lib/tiny-guides.ts'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
 const module = { exports: {} };
 new Function('exports', 'module', compiled)(module.exports, module);
 const guides = module.exports.tinyGuides;
 assert.equal(guides.length, 6);
 assert.equal(new Set(guides.map(g => g.slug)).size, guides.length);
 for (const guide of guides) {
  assert.ok(guide.sections.length >= 4, guide.slug + ' has complete sections');
  assert.ok(guide.sections.flatMap(s => s.paragraphs).join(' ').split(/\s+/).length >= 200, guide.slug + ' has substantive content');
  assert.ok(existsSync(join(root, 'public', guide.image)), guide.slug + ' has local artwork');
  assert.match(read('src/components/site-chrome.tsx'), new RegExp('/blog/' + guide.slug));
 }
});

test('studio plays the fixed R2 reference sample without enabling generation', () => {
 const studio = read('src/components/tiny-studio.tsx');
 const route = read('src/app/api/tiny-desk/sample/route.ts');
 const storage = read('src/lib/r2.ts');
 assert.match(studio, /<video [^>]*controls autoPlay muted loop playsInline preload="auto"/);
 assert.match(studio, /\/api\/tiny-desk\/sample/);
 // The example tab is self-explanatory; the old overlay label was removed.
 assert.doesNotMatch(studio, /REFERENCE SAMPLE · NOT YOUR GENERATED VIDEO/);
 assert.match(studio, /setPreviewTab\("example"\)/);
 assert.match(storage, /tiny-desk-ai\/sample-dogs\.mp4/);
 assert.match(route, /getTinyDeskSampleObject/);
 assert.doesNotMatch(route, /request\.nextUrl|searchParams/);
});

test('legal routes disclose live delivery and independent project', () => {
 const chrome = read('src/components/site-chrome.tsx');
 const sitemap = read('src/app/sitemap.ts');
 const policies = read('src/lib/legal-content.tsx');
 for (const route of ['about','contact','privacy','terms','acceptable-use','refund-policy','security']) {
  assert.match(policies, new RegExp('"' + route + '"'), 'policy content ' + route);
 }
 assert.match(chrome, /legalLinks.map\(\(\{ slug, label \}\) => <a key=\{slug\} href=\{`\/\$\{slug\}`\}/, 'footer links generated from legalLinks');
 assert.match(sitemap, /legalLinks.map/, 'sitemap generated from legalLinks');
 assert.match(policies, /30 days/);
 assert.match(policies, /private object storage/);
 assert.match(policies, /not affiliated with NPR/);
 assert.match(policies, /refund/);
 assert.doesNotMatch(chrome, /Full legal policies will be published/);
});

test('homepage describes the actual paid studio rather than a disabled preview', () => {
 const page = read('src/app/page.tsx');
 assert.doesNotMatch(page, /checkout is not enabled yet|no payment can be taken|not generating yet|there is currently no checkout|visual preview.*no generation/i);
 assert.match(page, /one to five.*portraits/i);
 assert.match(page, /15-second/i);
 assert.match(page, /30 days/i);
});
