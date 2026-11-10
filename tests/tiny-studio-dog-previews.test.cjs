const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs');
const {read}=require('./site-test-helpers.cjs');
test('only the two Smiths roles are offered with labeled original illustrations',()=>{
 const studio=read('src/components/tiny-studio.tsx');
 assert.deepEqual([...studio.matchAll(/\{ id: "([^"]+)", label:/g)].map(m=>m[1]),['protagonist','regular']);
 assert.match(studio,/label: "Photo 1 · Headphone listener"/);
 assert.match(studio,/label: "Photo 2 · The Smiths fan"/);
 assert.match(studio,/\/love-the-smiths\/listener\.webp/);
 assert.match(studio,/\/love-the-smiths\/fan\.webp/);
 assert.match(studio,/Photo 1 \. The listener|PHOTO 1 · THE LISTENER/);
 assert.match(studio,/Optional Photo 2/);
 assert.doesNotMatch(studio,/band-lead\.webp|band-left\.webp|temporary role placeholders|Optional female customer/);
 for(const file of ['listener.webp','fan.webp']) assert.ok(fs.statSync(`public/love-the-smiths/${file}`).size>5000);
});
