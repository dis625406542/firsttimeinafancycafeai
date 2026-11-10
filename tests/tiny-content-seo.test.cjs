const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { load, read, root } = require('./site-test-helpers.cjs');

test('thirteen distinct Smiths guides use new URLs and have truthful dated content',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 assert.equal(allTinyGuides.length,13);
 assert.equal(new Set(allTinyGuides.map(g=>g.slug)).size,13);
 for(const g of allTinyGuides){
  assert.ok(g.answer.length>60,g.slug+' has a direct answer');
  assert.ok(g.description.length<180,g.slug+' description');
  assert.match(g.description,/[.!?]$/);
  assert.match(g.publishedAt,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(g.updatedAt>=g.publishedAt,g.slug+' dates');
  assert.ok(g.updatedAt<='2026-11-10');
  assert.ok(g.sections.length>=3);
  assert.ok(fs.existsSync(path.join(root,'public',g.image)),g.image);
  assert.ok(g.related.length>=2);
  for(const slug of g.related) assert.ok(allTinyGuides.some(x=>x.slug===slug)&&slug!==g.slug,slug);
  for(const s of g.sections){
   for(const link of s.links??[]) if(link.href.startsWith('/blog/')) assert.ok(allTinyGuides.some(x=>'/blog/'+x.slug===link.href),link.href);
   if(s.image){ assert.ok(fs.existsSync(path.join(root,'public',s.image.src)));assert.match(s.image.caption,/reference|illustration|studio/i); }
  }
 }
 const tutorial=allTinyGuides.find(g=>g.slug==='how-to-make-i-love-the-smiths-ai-video');
 assert.ok(tutorial.sections.some(s=>s.steps?.length>=3));
 assert.ok(allTinyGuides.every(g=>g.updatedAt==='2026-11-10'));
 assert.doesNotMatch(JSON.stringify(allTinyGuides),/Fancy Cafe|wrong-seat|table.*bench|To die by your side/i);
});
test('JSON-LD cannot close a script and round-trips strings',()=>{
 const {JsonLd}=load('src/components/json-ld.tsx');
 const data={text:'</script><img src=x onerror=alert(1)>'};
 const html=JsonLd({data}).props.dangerouslySetInnerHTML.__html;
 assert.ok(!html.includes('<'));
 assert.deepEqual(JSON.parse(html),data);
});
test('sitemap uses content dates, includes all articles, and has unique canonical URLs',()=>{
 const source=fs.readFileSync(path.join(root,'src/app/sitemap.ts'),'utf8');
 assert.doesNotMatch(source,/new Date\(\)/);
 assert.match(source,/allTinyGuides/);assert.match(source,/updatedAt/);
 assert.match(source,/url:\s*SITE_URL,\s*lastModified:\s*latestArticle/);
 const urls=load('src/app/sitemap.ts').default();
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const {legalLinks}=load('src/lib/legal-content.tsx');
 const {SITE_URL}=load('src/lib/site.ts');
 const latest=allTinyGuides.map(g=>g.updatedAt).sort().at(-1);
 assert.equal(urls.length,2+legalLinks.length+allTinyGuides.length);
 assert.equal(urls.find(u=>u.url===SITE_URL)?.lastModified,latest);
 assert.equal(urls.find(u=>u.url===SITE_URL+'/blog')?.lastModified,latest);
 assert.equal(new Set(urls.map(u=>u.url)).size,urls.length);
 assert.ok(urls.every(u=>u.url.startsWith('https://lovethesmithsai.com')));
 for(const g of allTinyGuides) {
  const entry=urls.find(u=>u.url===SITE_URL+'/blog/'+g.slug);
  assert.equal(entry?.lastModified,g.updatedAt);
 }
});
test('analytics only describes known guide-to-studio links, never query strings or private codes',()=>{
 const {guideCtaEvent}=load('src/lib/guide-analytics.ts');
 assert.deepEqual(guideCtaEvent('/blog/how-to-make-i-love-the-smiths-ai-video','/#studio'),{guide_slug:'how-to-make-i-love-the-smiths-ai-video',cta_target:'studio'});
 assert.equal(guideCtaEvent('/blog/not-a-guide','/#studio'),null);
 assert.equal(guideCtaEvent('/blog/how-to-make-i-love-the-smiths-ai-video','/api/video?code=secret'),null);
 assert.equal(guideCtaEvent('/','/#studio'),null);
 const source=fs.readFileSync(path.join(root,'src/components/google-analytics.tsx'),'utf8');
 assert.match(source,/consent !== "granted"/);
});
test('TikTok and mobile instructions explain the two roles and avoid legacy delivery claims',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const phone=allTinyGuides.find(g=>g.slug==='how-to-make-i-love-the-smiths-ai-video-for-tiktok-reels');
 const copy=JSON.stringify(phone);
 assert.match(copy,/9:16/i); assert.match(copy,/MP4/i); assert.match(copy,/download/i); assert.match(copy,/photo|portrait/i);
 assert.match(copy,/consent/i); assert.match(copy,/personal/i); assert.match(copy,/non-commercial/i); assert.match(copy,/30 days/i);
 assert.ok(phone.sections.some(s=>s.steps?.length>=4));
 assert.doesNotMatch(copy,/results stay in your browser|all band spots in one row/);
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
 for(const g of load('src/lib/tiny-guides.ts').allTinyGuides) assert.ok(body.includes('https://lovethesmithsai.com/blog/'+g.slug));
 assert.match(body,/30 days/);
 assert.match(body,/24-second/);
});
test('paid order recovery never opens a fresh checkout and transport errors are human-readable',()=>{
 const source=fs.readFileSync(path.join(root,'src/components/tiny-studio.tsx'),'utf8');
 assert.match(source,/submitted && stage === "failed" \? checkCurrentOrder\(\) : prepareCheckout\(\)/);
 assert.match(source,/await resume\(code\)/);
 assert.match(source,/Could not check your saved order right now/);
 assert.match(source,/Could not check your video's progress/);
});
test('TikTok publishing guide answers the creator question without claiming in-site posting',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const guide=allTinyGuides.find(g=>g.slug==='how-to-make-i-love-the-smiths-ai-video-for-tiktok-reels');
 assert.ok(guide,'distinct TikTok guide exists');
 assert.match(guide.answer,/9:16/);
 assert.match(guide.answer,/download.*MP4/i);
 assert.ok(guide.sections.every(s=>s.paragraphs[0].length>45),'each section opens with a standalone answer');
 assert.doesNotMatch(JSON.stringify(guide),/post directly|guaranteed viral|instant generation/i);
 assert.match(JSON.stringify(guide),/does not post|site does not|you download/i);
 const homepage=fs.readFileSync(path.join(root,'src/app/page.tsx'),'utf8');
 assert.match(homepage,/How do I share the video to TikTok or Reels\?/);
 assert.match(homepage,/how-to-make-i-love-the-smiths-ai-video-for-tiktok-reels/);
});
test('meme explainer answers the discovery questions with verified sources',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const guide=allTinyGuides.find(g=>g.slug==='what-is-the-i-love-the-smiths-meme');
 const headings=guide.sections.map(s=>s.heading);
 for(const q of ['What is the I Love the Smiths meme?','Where does the scene come from?','What are the two roles in the AI version?','Why does the line work as a meet-cute?','How is the AI video different from the film?']) assert.ok(headings.includes(q),q);
 assert.match(guide.title,/^What is the I Love the Smiths meme\?/i);
 assert.equal(guide.updatedAt,'2026-11-10');
 for(const href of ['https://www.imdb.com/title/tt1022603/quotes/','https://www.vice.com/','https://www.bustle.com/','https://www.media.io/']) assert.ok(guide.sources.some(s=>s.href.startsWith(href)),href);
 assert.doesNotMatch(JSON.stringify(guide),/guaranteed viral|millions of views|official partnership/i);
});
test('origin and comparison guides have distinct answers, source limits, and studio links',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 for(const slug of ['is-i-love-the-smiths-from-500-days-of-summer','i-love-the-smiths-ai-vs-capcut-template']) {
  const guide=allTinyGuides.find(g=>g.slug===slug);
  assert.ok(guide,slug);
  assert.ok(guide.sections.length>=4);
  assert.ok(guide.related.includes('what-is-the-i-love-the-smiths-meme'));
  assert.ok(guide.sections.at(-1).links.some(l=>l.href==='/#studio'));
 }
 const origin=allTinyGuides.find(g=>g.slug==='is-i-love-the-smiths-from-500-days-of-summer');
 assert.ok(origin.sources.some(s=>s.href==='https://www.imdb.com/title/tt1022603/quotes/'));
 assert.match(JSON.stringify(origin),/not affiliated|independent/i);
 const comparison=allTinyGuides.find(g=>g.slug==='i-love-the-smiths-ai-vs-capcut-template');
 assert.match(JSON.stringify(comparison),/not a face swap|new scene/i);
 const music=allTinyGuides.find(g=>g.slug==='i-love-the-smiths-ai-music-and-lyrics');
 assert.ok(music.sections.some(s=>s.heading==='What song is in the scene?'));
});
test('generator explainer answers purchase-intent questions with specific product advantages',()=>{
 const {allTinyGuides,featuredTinyGuides}=load('src/lib/tiny-guides.ts');
 const guide=allTinyGuides.find(g=>g.slug==='i-love-the-smiths-ai-video-generator-explained');
 assert.ok(guide,'generator explainer exists');
 assert.ok(guide.sections.length>=4);
 assert.match(guide.answer,/two adult portraits/i);
 const copy=JSON.stringify(guide);
 assert.doesNotMatch(copy,/best overall|guaranteed|perfect results|number one/i);
 assert.match(copy,/photo 1/i);assert.match(copy,/photo 2/i);
 assert.ok(guide.sections.at(-1).links.some(l=>l.href==='/#studio'));
 assert.equal(featuredTinyGuides.length,6);
 assert.ok(featuredTinyGuides.every(Boolean));
});
test('tutorial and comparison describe the 24-second delivery',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 for(const slug of ['how-to-make-i-love-the-smiths-ai-video','i-love-the-smiths-ai-vs-capcut-template']) {
  const guide=allTinyGuides.find(g=>g.slug===slug);
  const copy=JSON.stringify(guide);
  assert.match(copy,/24.second/);
  assert.match(copy,/\$6\.99/);assert.match(copy,/\$9\.99/);
  assert.ok(guide.related.includes('i-love-the-smiths-ai-video-generator-explained'));
  assert.doesNotMatch(copy,/older template|Fancy Cafe|wrong seat/i);
 }
 const home=fs.readFileSync(path.join(root,'src/app/page.tsx'),'utf8');
 assert.match(home,/demo videos/i);
});
test('how-to guides preserve role and workflow questions as answer-first headings',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const tutorial=allTinyGuides.find(g=>g.slug==='how-to-make-i-love-the-smiths-ai-video');
 assert.ok(tutorial.sections.some(s=>s.steps?.length>=3));
 assert.match(JSON.stringify(tutorial),/queue/i);
 assert.match(JSON.stringify(tutorial),/Do not pay again|do not pay again/i);
 const two=allTinyGuides.find(g=>g.slug==='i-love-the-smiths-ai-two-photo-roles');
 assert.match(two.title,/Who Goes First/i);
 assert.match(JSON.stringify(two),/two roles, not a group/i);
 assert.match(JSON.stringify(two),/consenting adults/i);
 const phone=allTinyGuides.find(g=>g.slug==='how-to-make-i-love-the-smiths-ai-video-for-tiktok-reels');
 assert.ok(phone.sections.some(s=>s.steps?.length>=5));
 assert.match(JSON.stringify(phone),/30 days/);
 const home=fs.readFileSync(path.join(root,'src/app/page.tsx'),'utf8');
 for(const q of ['Which photo goes first?','Can I make the video with one photo?','Can I use photos of my partner and me?']) assert.ok(home.includes(q),q);
});
test('purchase, portrait, sharing and privacy questions keep clear headings',()=>{
 const {allTinyGuides}=load('src/lib/tiny-guides.ts');
 const text=slug=>JSON.stringify(allTinyGuides.find(g=>g.slug===slug));
 const price=text('i-love-the-smiths-ai-price-and-free-options');
 for(const p of [/6\.99/,/9\.99/,/480p/,/720p/,/24.second/,/does not add its own branding watermark/,/upstream/i])assert.match(price,p);
 assert.ok(allTinyGuides.find(g=>g.slug==='i-love-the-smiths-ai-price-and-free-options').sections.some(s=>s.table?.rows.length>=5));
 assert.match(text('i-love-the-smiths-ai-photo-tips'),/one consenting adult/i);
 assert.match(text('i-love-the-smiths-ai-two-photo-roles'),/two roles, not a group/i);
 const privacy=text('i-love-the-smiths-ai-photo-privacy-and-consent');
 for(const p of [/three days/,/30 days/,/worker/i,/eligible/i,/third.party/i,/browser/i,/\/privacy/,/\/contact/])assert.match(privacy,p);
 assert.doesNotMatch(privacy,/never stored|never used for training|deleted immediately everywhere/i);
 const home=fs.readFileSync(path.join(root,'src/app/page.tsx'),'utf8');
 for(const q of ['How much does an I Love The Smiths AI video cost?','Does it add a watermark?','Can I download the video in HD?','Is my uploaded photo stored or deleted?'])assert.ok(home.includes(q),q);
 const {guideCtaEvent}=load('src/lib/guide-analytics.ts');assert.ok(guideCtaEvent('/blog/i-love-the-smiths-ai-photo-privacy-and-consent','/#studio'));
});
