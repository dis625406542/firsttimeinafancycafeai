const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('upload role previews remain the original dog illustrations, not the generation reference footage',()=>{
 const ui=fs.readFileSync('src/components/tiny-studio.tsx','utf8');
 assert.match(ui,/"back-left": "\/tiny-band\/slots\/band-left\.webp"/);
 assert.match(ui,/lead: "\/tiny-band\/slots\/band-lead\.webp"/);
 assert.match(ui,/sax: "\/tiny-band\/slots\/band-sax\.webp"/);
 assert.match(ui,/<img src="\/tiny-band\/slots\/band-left\.webp"/);
 assert.doesNotMatch(ui,/band-v3-(?:opening|lead|sax)\.webp/);
});
