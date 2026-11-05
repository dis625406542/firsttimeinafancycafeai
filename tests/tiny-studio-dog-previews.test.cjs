const test=require('node:test'),assert=require('node:assert/strict');
const {read}=require('./site-test-helpers.cjs');
test('dog placeholders remain explicit and only two cafe roles are offered',()=>{
 const studio=read('src/components/tiny-studio.tsx');
 assert.deepEqual([...studio.matchAll(/\{ id: "([^"]+)", label:/g)].map(m=>m[1]),['protagonist','regular']);
 assert.match(studio,/band-lead.webp/);assert.match(studio,/band-left.webp/);assert.match(studio,/temporary role placeholders/);assert.match(studio,/protagonist photo first/);assert.match(studio,/Optional/);
});
