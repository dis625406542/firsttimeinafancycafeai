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
test('twenty-four distinct guides retain old URLs and have truthful dated content',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 assert.equal(allTinyGuides.length,24);
 assert.equal(new Set(allTinyGuides.map(g=>g.slug)).size,24);
 for(const g of allTinyGuides){
  assert.ok(g.answer.length>60,g.slug+' has a direct answer');
  assert.match(g.publishedAt,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(g.updatedAt>=g.publishedAt,g.slug+' dates');
  assert.ok(g.updatedAt<='2026-11-05');
  assert.ok(g.sections.length>=4);
  assert.ok(fs.existsSync(path.join(root,'public',g.image)),g.image);
  assert.ok(g.related.length>=2);
  for(const slug of g.related) assert.ok(allTinyGuides.some(x=>x.slug===slug)&&slug!==g.slug,slug);
  for(const s of g.sections){
   for(const link of s.links??[]) if(link.href.startsWith('/blog/')) assert.ok(allTinyGuides.some(x=>'/blog/'+x.slug===link.href),link.href);
   if(s.image){ assert.ok(fs.existsSync(path.join(root,'public',s.image.src)));assert.match(s.image.caption,/reference|illustration|studio/i); }
  }
 }
 const tutorial=allTinyGuides.find(g=>g.slug==='tiny-desk-ai-video-guide');
 assert.ok(tutorial.sections.some(s=>s.steps?.length>=4));
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
 const urls=load('src/app/sitemap.ts').default();
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 assert.equal(urls.length,33);
 assert.equal(new Set(urls.map(u=>u.url)).size,urls.length);
 for(const g of allTinyGuides) {
  const entry=urls.find(u=>u.url==='https://tinydeskaivideos.com/blog/'+g.slug);
  assert.equal(entry?.lastModified,g.updatedAt);
 }
});
test('analytics only describes known guide-to-studio links, never query strings or private codes',()=>{
 const {guideCtaEvent}=load('src/lib/guide-analytics.ts');
 assert.deepEqual(guideCtaEvent('/blog/tiny-desk-ai-video-guide','/#studio'),{guide_slug:'tiny-desk-ai-video-guide',cta_target:'studio'});
 assert.equal(guideCtaEvent('/blog/not-a-guide','/#studio'),null);
 assert.equal(guideCtaEvent('/blog/tiny-desk-ai-video-guide','/api/video?code=secret'),null);
 assert.equal(guideCtaEvent('/','/#studio'),null);
 const source=fs.readFileSync(path.join(root,'src/components/google-analytics.tsx'),'utf8');
 assert.match(source,/consent !== "granted"/);
});

test('mobile instructions illustrate the actual studio and avoid legacy delivery claims',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const phone=allTinyGuides.find(g=>g.slug==='how-to-make-tiny-desk-ai-video-on-phone');
 assert.ok(phone.sections.some(s=>s.image?.src.endsWith('studio-mobile.webp')));
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
 for(const g of load('src/lib/tiny-guides.ts').allTinyGuides) assert.ok(body.includes('https://tinydeskaivideos.com/blog/'+g.slug));
 assert.match(body,/stored privately on the server/);
});
