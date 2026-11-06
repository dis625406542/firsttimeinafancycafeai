const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.join(__dirname, '..');
function load(file) {
 const compiled = ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const mod={exports:{}};
 const localRequire=(name)=>{
  if(!name.startsWith('@/')) return require(name);
  const base='src/'+name.slice(2);
  return load(fs.existsSync(path.join(root,base+'.ts'))?base+'.ts':base+'.tsx');
 };
 new Function('exports','module','require',compiled)(mod.exports,mod,localRequire);return mod.exports;
}
test('thirteen distinct cafe guides use new URLs and have truthful dated content',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 assert.equal(allTinyGuides.length,13);
 assert.equal(new Set(allTinyGuides.map(g=>g.slug)).size,13);
 for(const g of allTinyGuides){
  assert.ok(g.answer.length>60,g.slug+' has a direct answer');
  assert.match(g.publishedAt,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(g.updatedAt>=g.publishedAt,g.slug+' dates');
  assert.ok(g.updatedAt<='2026-11-06');
  assert.ok(g.sections.length>=3);
  assert.ok(fs.existsSync(path.join(root,'public',g.image)),g.image);
  assert.ok(g.related.length>=2);
  for(const slug of g.related) assert.ok(allTinyGuides.some(x=>x.slug===slug)&&slug!==g.slug,slug);
  for(const s of g.sections){
   for(const link of s.links??[]) if(link.href.startsWith('/blog/')) assert.ok(allTinyGuides.some(x=>'/blog/'+x.slug===link.href),link.href);
   if(s.image){ assert.ok(fs.existsSync(path.join(root,'public',s.image.src)));assert.match(s.image.caption,/reference|illustration|studio/i); }
  }
 }
 const tutorial=allTinyGuides.find(g=>g.slug==='how-to-make-first-time-in-a-fancy-cafe-ai-video');
 assert.ok(tutorial.sections.some(s=>s.steps?.length>=3));
 assert.equal(allTinyGuides.find(g=>g.slug==='how-to-create-fancy-cafe-ai-video-on-phone').updatedAt,'2026-11-06');
 assert.equal(allTinyGuides.find(g=>g.slug==='download-fancy-cafe-ai-video').updatedAt,'2026-11-06');
 assert.doesNotMatch(JSON.stringify(allTinyGuides),/upload circle|prepared workflow|prepared studio/);
 assert.doesNotMatch(JSON.stringify(tutorial),/Decide on a small-room concert mood/);
});
test('JSON-LD cannot close a script and round-trips strings',()=>{
 const {JsonLd}=load('src/components/json-ld.tsx');
 const data={text:'</script><img src=x onerror=alert(1)>'};
 const html=JsonLd({data}).props.dangerouslySetInnerHTML.__html;
 assert.ok(!html.includes('<'));
 assert.deepEqual(JSON.parse(html),data);
});
test('sitemap uses content dates, includes all articles, and has unique canonical URLs',()=>{
 // Check both generated URL data and absence of build-time timestamps.
 const source=fs.readFileSync(path.join(root,'src/app/sitemap.ts'),'utf8');
 assert.doesNotMatch(source,/new Date\(\)/);
 assert.match(source,/allTinyGuides/);assert.match(source,/updatedAt/);
 // The homepage displays guide cards, so guide updates should refresh its sitemap revision too.
 assert.match(source,/url:\s*SITE_URL,\s*lastModified:\s*latestArticle/);
 const urls=load('src/app/sitemap.ts').default();
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 assert.equal(urls.length,22);
 assert.equal(urls.find(u=>u.url==='https://firsttimeinafancycafeai.org')?.lastModified,'2026-11-06');
 assert.equal(urls.find(u=>u.url==='https://firsttimeinafancycafeai.org/blog')?.lastModified,'2026-11-06');
 assert.equal(new Set(urls.map(u=>u.url)).size,urls.length);
 for(const g of allTinyGuides) {
  const entry=urls.find(u=>u.url==='https://firsttimeinafancycafeai.org/blog/'+g.slug);
  assert.equal(entry?.lastModified,g.updatedAt);
 }
});
test('analytics only describes known guide-to-studio links, never query strings or private codes',()=>{
 const {guideCtaEvent}=load('src/lib/guide-analytics.ts');
 assert.deepEqual(guideCtaEvent('/blog/how-to-make-first-time-in-a-fancy-cafe-ai-video','/#studio'),{guide_slug:'how-to-make-first-time-in-a-fancy-cafe-ai-video',cta_target:'studio'});
 assert.equal(guideCtaEvent('/blog/not-a-guide','/#studio'),null);
 assert.equal(guideCtaEvent('/blog/how-to-make-first-time-in-a-fancy-cafe-ai-video','/api/video?code=secret'),null);
 assert.equal(guideCtaEvent('/','/#studio'),null);
 const source=fs.readFileSync(path.join(root,'src/components/google-analytics.tsx'),'utf8');
 assert.match(source,/consent !== "granted"/);
});

test('mobile instructions explain the current roles and avoid legacy delivery claims',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const phone=allTinyGuides.find(g=>g.slug==='how-to-create-fancy-cafe-ai-video-on-phone');
 assert.match(JSON.stringify(phone),/protagonist/i); assert.match(JSON.stringify(phone),/regular/i); assert.match(JSON.stringify(phone),/phone|mobile/i);
 assert.doesNotMatch(JSON.stringify(allTinyGuides),/results stay in your browser|all band spots in one row|does not copy the original audio/);
 const {guideCtaEvent}=load('src/lib/guide-analytics.ts');
 for(const g of allTinyGuides) assert.equal(guideCtaEvent('/blog/'+g.slug,'/#studio')?.guide_slug,g.slug);
});
test('blog index has its own share metadata',()=>{
 const source=fs.readFileSync(path.join(root,'src/app/blog/page.tsx'),'utf8');
 assert.match(source,/openGraph:/); assert.match(source,/twitter:/);
});

test('llms summary lists every canonical article without pretending to be a search requirement',async()=>{
 const response=await load('src/app/llms.txt/route.ts').GET();
 assert.match(response.headers.get('content-type'),/text\/plain/);
 const body=await response.text();
 for(const g of load('src/lib/tiny-guides.ts').allTinyGuides) assert.ok(body.includes('https://firsttimeinafancycafeai.org/blog/'+g.slug));
 assert.match(body,/30 days/);
});

test('paid order recovery never opens a fresh checkout and transport errors are human-readable',()=>{
 const source=fs.readFileSync(path.join(root,'src/components/tiny-studio.tsx'),'utf8');
 assert.match(source,/submitted && stage === "failed" \? checkCurrentOrder\(\) : prepareCheckout\(\)/);
 assert.match(source,/await resume\(code\)/);
 assert.match(source,/Could not check your saved order right now/);
 assert.match(source,/Could not check your video's progress/);
});

test('POV publishing guide answers the exact creator question without suggesting an in-site social posting tool',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const guide=allTinyGuides.find(g=>g.slug==='how-to-make-pov-first-time-in-a-fancy-cafe-ai-video-for-reels');
 assert.ok(guide,'distinct POV publishing guide exists');
 const {featuredTinyGuides}=load('src/lib/tiny-guides.ts');
 assert.ok(featuredTinyGuides.some(g=>g.slug===guide.slug),'featured on homepage');
 const indexSource=fs.readFileSync(path.join(root,'src/components/tiny-guides.tsx'),'utf8');
 assert.match(indexSource,/POV.*9:16|9:16.*POV/i); assert.match(guide.title,/POV.*Fancy Cafe.*TikTok.*Reels/i);
 assert.match(guide.answer,/9:16/);
 assert.match(guide.answer,/download.*MP4/i);
 assert.match(guide.sections[0].paragraphs[0],/^POV means/);
 assert.ok(guide.sections.every(s=>s.paragraphs[0].length>45),'each section opens with a standalone answer');
 assert.match(JSON.stringify(guide),/original clip|original footage/i);
 assert.doesNotMatch(JSON.stringify(guide),/post directly|guaranteed viral|instant generation/i);
 const homepage=fs.readFileSync(path.join(root,'src/app/page.tsx'),'utf8');
 assert.match(homepage,/What does POV: Your First Time in a Fancy Cafe mean/);
 assert.match(homepage,/How do I make a Fancy Cafe POV video for TikTok or Reels/);
 assert.match(homepage,/how-to-make-pov-first-time-in-a-fancy-cafe-ai-video-for-reels/);
});


test('meme explainer answers all eight discovery questions before the product invitation',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const guide=allTinyGuides.find(g=>g.slug==='your-first-time-in-a-fancy-cafe-meme-explained');
 const questions=[
  'What is the first time in a fancy cafe meme?',
  'What does POV your first time in a fancy cafe mean?',
  'Why is everyone posting the fancy cafe video?',
  'Where did the fancy cafe meme come from?',
  'Who started the first time in a fancy cafe trend?',
  'Why is the guy sitting on the table?',
  "What's the song in the fancy cafe meme?",
  'Is the fancy cafe video AI-generated?'
 ];
 assert.deepEqual(guide.sections.slice(0,8).map(s=>s.heading),questions);
 for(const section of guide.sections.slice(0,8)) {
  assert.ok(section.paragraphs[0].length>90,section.heading+' needs a standalone answer');
  assert.ok(section.paragraphs.length>=2,section.heading+' needs context');
 }
 assert.match(guide.title,/^What is the first time in a fancy cafe meme\?/i);
 assert.equal(guide.updatedAt,'2026-11-06');
 const invitation=guide.sections[8];
 assert.ok(invitation.links.some(l=>l.href==='/#studio'));
 assert.match(JSON.stringify(invitation),/20-second/);
 assert.match(JSON.stringify(invitation),/original music/);
 assert.match(JSON.stringify(guide.sections[4]),/Know Your Meme/);
 assert.match(JSON.stringify(guide.sections[6]),/Oh Yeah.*Steve Lacy/);
 assert.match(JSON.stringify(guide.sections[6]),/original sound/);
 assert.match(JSON.stringify(guide),/under review|under evaluation/);
 assert.doesNotMatch(JSON.stringify(guide),/guaranteed viral|millions of views|everyone uses the same song/i);
});

test('origin and AI guides have distinct answers, source limits, and working studio links',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 for(const slug of ['first-time-in-a-fancy-cafe-meme-origin','is-first-time-in-a-fancy-cafe-video-ai-generated']) {
  const guide=allTinyGuides.find(g=>g.slug===slug);
  assert.ok(guide,slug);
  assert.ok(guide.sections.length>=4);
  assert.ok(guide.sections.every(s=>s.paragraphs[0].length>70));
  assert.ok(guide.sources.some(s=>s.href==='https://knowyourmeme.com/memes/your-first-time-in-a-fancy-cafe'));
  assert.ok(guide.related.includes('your-first-time-in-a-fancy-cafe-meme-explained'));
  assert.ok(guide.sections.at(-1).links.some(l=>l.href==='/#studio'));
 }
 const origin=allTinyGuides.find(g=>g.slug==='first-time-in-a-fancy-cafe-meme-origin');
 assert.match(JSON.stringify(origin),/under review|under evaluation/);
 assert.match(JSON.stringify(origin),/not independently|cannot independently/i);
 const ai=allTinyGuides.find(g=>g.slug==='is-first-time-in-a-fancy-cafe-video-ai-generated');
 assert.match(JSON.stringify(ai),/not proof|not conclusive/i);
 const music=allTinyGuides.find(g=>g.slug==='fancy-cafe-ai-music-and-captions');
 assert.ok(music.sections.some(s=>s.heading==="What's the song in the fancy cafe meme?"));
});
