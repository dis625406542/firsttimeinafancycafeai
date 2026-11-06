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
test('fifteen distinct cafe guides use new URLs and have truthful dated content',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 assert.equal(allTinyGuides.length,15);
 assert.equal(new Set(allTinyGuides.map(g=>g.slug)).size,15);
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
 assert.equal(urls.length,24);
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


test('tool discovery answers eight purchase-intent questions with specific product advantages',()=>{
 const {allTinyGuides,featuredTinyGuides}=load('src/lib/tiny-guides.ts');
 const guide=allTinyGuides.find(g=>g.slug==='fancy-cafe-ai-video-generator');
 assert.ok(guide,'tool discovery article exists');
 const questions=[
  'How can I make my own first time in a fancy cafe video?',
  'What AI tool can make the fancy cafe meme?',
  'Is there an AI fancy cafe video generator?',
  'How do I put my face in the fancy cafe trend?',
  'Can I turn my photo into the fancy cafe meme?',
  'Where can I make the fancy cafe AI video?',
  'Is there a website to make this meme automatically?',
  "What's the best fancy cafe AI video maker?"
 ];
 assert.deepEqual(guide.sections.slice(0,8).map(s=>s.heading),questions);
 for(const section of guide.sections.slice(0,8)) {
  assert.ok(section.paragraphs[0].length>90,section.heading);
  assert.ok(section.paragraphs.length>=2,section.heading);
 }
 const best=JSON.stringify(guide.sections[7]);
 for(const pattern of [/20-second/,/original music/,/optional/,/generated example/,/firsttimeinafancycafeai\.org/]) assert.match(best,pattern);
 assert.doesNotMatch(best,/best overall|guaranteed|perfect results|number one/i);
 assert.match(JSON.stringify(guide.sections[6]),/confirm.*payment|payment.*confirm/i);
 assert.match(JSON.stringify(guide.sections[6]),/automatically.*post|post.*automatically/i);
 assert.match(JSON.stringify(guide),/fancy cafe AI video generator/i);
 assert.match(JSON.stringify(guide),/first time in a fancy cafe AI video maker/i);
 assert.ok(guide.sections.at(-1).links.some(l=>l.href==='/#studio'));
 assert.equal(featuredTinyGuides.length,6);
 assert.ok(featuredTinyGuides.some(g=>g.slug===guide.slug));
 assert.equal(guide.updatedAt,'2026-11-06');
});

test('tutorial and comparison use the delivered cafe example and link to tool discovery',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 for(const slug of ['how-to-make-first-time-in-a-fancy-cafe-ai-video','fancy-cafe-ai-vs-capcut-template']) {
  const guide=allTinyGuides.find(g=>g.slug===slug);
  assert.equal(guide.publishedAt,'2026-11-05');
  assert.equal(guide.updatedAt,'2026-11-06');
  const copy=JSON.stringify(guide);
  assert.match(copy,/20-second/); assert.match(copy,/original music/);
  assert.match(copy,/\$6\.99/);assert.match(copy,/\$9\.99/);
  assert.ok(guide.related.includes('fancy-cafe-ai-video-generator'));
  assert.ok(guide.sections.some(s=>s.links?.some(l=>l.href==='/#tiny-cafe-comparison-title')));
  assert.doesNotMatch(copy,/older template|Wait for a validated cafe demo/);
 }
 const home=fs.readFileSync(path.join(root,'src/app/page.tsx'),'utf8');
 assert.doesNotMatch(home,/reused demos are not cafe results|The cafe examples are reference videos/);
 assert.match(home,/generated example and two reference videos/);
});


test('how-to guides preserve all eight complete user questions as answer-first headings',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const groups={
  'how-to-make-first-time-in-a-fancy-cafe-ai-video':[
   'How do I make the fancy cafe trend with my own picture?',
   'Can I make this without editing anything?',
   'How long does it take to generate the video?'
  ],
  'fancy-cafe-ai-two-people':[
   'Can I use just one photo to make the video?',
   'Can I use two photos for the fancy cafe meme?',
   'How do I replace both people in the video?',
   'Can I make this video with my boyfriend or girlfriend?'
  ],
  'how-to-create-fancy-cafe-ai-video-on-phone':[
   'How do I make the fancy cafe video on my phone?'
  ]
 };
 for(const [slug,questions] of Object.entries(groups)) {
  const guide=allTinyGuides.find(g=>g.slug===slug);
  assert.equal(guide.publishedAt,'2026-11-05');
  assert.equal(guide.updatedAt,'2026-11-06');
  for(const question of questions) {
   const section=guide.sections.find(s=>s.heading===question);
   assert.ok(section,question+' must be an exact heading, including its question mark');
   assert.ok(section.paragraphs[0].length>90,question+' needs a standalone direct answer');
   assert.ok(section.paragraphs.length>=2,question+' needs practical context');
  }
  assert.ok(guide.sections.some(s=>s.links?.some(l=>l.href==='/#studio')),slug+' studio link');
  assert.ok(guide.related.includes('fancy-cafe-ai-video-generator'));
 }
 const tutorial=allTinyGuides.find(g=>g.slug==='how-to-make-first-time-in-a-fancy-cafe-ai-video');
 const timing=JSON.stringify(tutorial.sections.find(s=>s.heading==='How long does it take to generate the video?'));
 assert.match(timing,/20 seconds.*duration/i);assert.match(timing,/queue/i);assert.match(timing,/soundtrack/i);
 assert.match(timing,/same browser/i);assert.match(timing,/not.*pay again|avoid.*paying again/i);
 assert.doesNotMatch(timing,/usually.*minutes|within.*minutes|instant generation|guaranteed.*minutes/i);
 const editing=tutorial.sections.find(s=>s.heading==='Can I make this without editing anything?');
 assert.match(editing.paragraphs[0],/^Yes/);assert.match(JSON.stringify(editing),/original music/);
 const two=allTinyGuides.find(g=>g.slug==='fancy-cafe-ai-two-people');
 assert.match(two.title,/One or Two Photos\?/);
 assert.ok(two.sections.some(s=>s.image?.src==='/fancy-cafe-ai/before-upload.webp'));
 assert.match(JSON.stringify(two),/two separate|separate portraits/i);assert.match(JSON.stringify(two),/consenting adults/);
 assert.ok(two.sections.find(s=>s.heading==='How do I replace both people in the video?').steps.length>=3);
 const phone=allTinyGuides.find(g=>g.slug==='how-to-create-fancy-cafe-ai-video-on-phone');
 const workflow=phone.sections.find(s=>s.heading==='How do I make the fancy cafe video on my phone?');
 assert.ok(workflow.steps.length>=5);assert.match(JSON.stringify(workflow),/30 days/);
 const home=fs.readFileSync(path.join(root,'src/app/page.tsx'),'utf8');
 for(const question of [groups['fancy-cafe-ai-two-people'][0],groups['fancy-cafe-ai-two-people'][1],groups['fancy-cafe-ai-two-people'][3],groups['how-to-make-first-time-in-a-fancy-cafe-ai-video'][2]]) assert.ok(home.includes(question));
});

test('purchase, portrait, sharing and privacy questions keep exact question headings',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const groups={
  'fancy-cafe-ai-price-and-free-options':['Is there a free fancy cafe AI video generator?','Can I make the fancy cafe meme for free?','How much does a fancy cafe AI video cost?','Does it add a watermark?','Can I download the video in HD?'],
  'fancy-cafe-ai-video-generator':['Which fancy cafe AI generator works best?'],
  'fancy-cafe-ai-vs-capcut-template':['Does the AI video look like the original meme?','Is there a fancy cafe CapCut template?'],
  'fancy-cafe-ai-photo-tips':['Can I use my own selfie?','Can I put my dog in the fancy cafe meme?'],
  'fancy-cafe-ai-two-people':['Can I put myself and my friend in the fancy cafe meme using two photos?','Can I make a funny version with my friends?','Can I make my girlfriend the person walking in?'],
  'how-to-make-pov-first-time-in-a-fancy-cafe-ai-video-for-reels':['How do I make this TikTok trend?','How do I post the fancy cafe AI video on TikTok?'],
  'fancy-cafe-ai-music-and-captions':['How do I add the original sound to my video?'],
  'fancy-cafe-ai-photo-privacy':['Is my uploaded photo stored or deleted?']
 };
 for(const [slug,questions] of Object.entries(groups)) {
  const g=allTinyGuides.find(g=>g.slug===slug);assert.ok(g,slug);assert.equal(g.updatedAt,'2026-11-06');
  for(const q of questions){const s=g.sections.find(s=>s.heading===q);assert.ok(s,q);assert.ok(s.paragraphs[0].length>90,q);assert.ok(s.paragraphs.length>=2,q);}
 }
 const text=slug=>JSON.stringify(allTinyGuides.find(g=>g.slug===slug));
 const price=text('fancy-cafe-ai-price-and-free-options');
 for(const p of [/6\.99/,/9\.99/,/480p/,/720p/,/20.second/,/does not add its own branding watermark/,/upstream/i])assert.match(price,p);
 assert.ok(allTinyGuides.find(g=>g.slug==='fancy-cafe-ai-price-and-free-options').sections.some(s=>s.table?.rows.length>=5));
 assert.match(text('fancy-cafe-ai-photo-tips'),/pets are not supported/i);
 assert.match(text('fancy-cafe-ai-two-people'),/two roles, not a group/i);
 const privacy=text('fancy-cafe-ai-photo-privacy');
 for(const p of [/3 days/,/30 days/,/worker/i,/eligible/i,/third.party/i,/browser/i,/\/privacy/,/\/contact/])assert.match(privacy,p);
 assert.doesNotMatch(privacy,/never stored|never used for training|deleted immediately everywhere/i);
 const home=fs.readFileSync(path.join(root,'src/app/page.tsx'),'utf8');
 for(const q of ['How much does a fancy cafe AI video cost?','Does it add a watermark?','Can I download the video in HD?','Is my uploaded photo stored or deleted?'])assert.ok(home.includes(q),q);
 const {guideCtaEvent}=load('src/lib/guide-analytics.ts');assert.ok(guideCtaEvent('/blog/fancy-cafe-ai-photo-privacy','/#studio'));
});
