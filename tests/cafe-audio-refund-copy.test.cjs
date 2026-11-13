const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = p => fs.readFileSync(p, 'utf8');
test('cafe audio copy describes the delivered soundtrack rather than silent intermediate footage', () => {
 for (const file of ['src/app/page.tsx', 'src/lib/tiny-guides.ts', 'src/app/llms.txt/route.ts', 'src/components/tiny-studio.tsx', 'src/lib/legal-content.tsx']) {
  const text = read(file);
  assert.match(text, /original music from the Fancy Cafe reference video/, file);
  assert.doesNotMatch(text, /No promise of the original song|Audio depends on approved assets|A separate authorized audio asset can then|Audio availability is described before checkout/, file);
 }
});
test('refund conditions are visible before checkout and distinguish failure from subjective preference', () => {
 for (const file of ['src/app/page.tsx', 'src/components/tiny-studio.tsx', 'src/lib/legal-content.tsx']) {
  const text = read(file);
  assert.match(text, /redelivery or a discretionary refund/, file);
  assert.match(text, /subjective dissatisfaction alone does not guarantee a refund/, file);
 }
 assert.match(read('src/lib/legal-content.tsx'), /statutory consumer rights are not limited/);
 assert.match(read('src/components/tiny-studio.tsx'), /href="\/refund-policy"/);
});

test('personal entertainment and non-commercial sharing are explicit before purchase and in disclosures', () => {
 for (const file of ['src/app/page.tsx', 'src/components/tiny-studio.tsx', 'src/lib/legal-content.tsx', 'src/lib/tiny-guides.ts', 'src/app/llms.txt/route.ts']) {
  const text = read(file);
  assert.match(text, /personal entertainment/i, file);
  assert.match(text, /non-commercial social sharing/i, file);
  assert.match(text, /No commercial-use license is included/i, file);
 }
 const studio = read('src/components/tiny-studio.tsx');
 const notes = studio.slice(studio.indexOf('tiny-preview-notes'), studio.indexOf('{showConfirm &&'));
 assert.match(notes, /personal entertainment/);
 assert.match(notes, /No commercial-use license is included/);
 assert.match(notes, /3 days after order creation/);
 assert.match(notes, /cleanup worker/);
 assert.match(notes, /30 days from completion/);
 assert.match(studio, /href="\/privacy"/);
 // The confirmation dialog stays short; long disclosures live beside the example video.
 const confirmation = studio.slice(studio.indexOf('{showConfirm &&'));
 assert.doesNotMatch(confirmation, /personal entertainment|cleanup worker/);
 assert.match(confirmation, /Email your video \(optional\)/);
 assert.match(confirmation, /will not be lost/);
 assert.match(read('src/lib/tiny-guides.ts'), /Can I use my Fancy Cafe AI video commercially\?/);
});
