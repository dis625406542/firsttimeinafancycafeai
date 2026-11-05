const test=require('node:test'),assert=require('node:assert/strict');
const {read}=require('./site-test-helpers.cjs');
test('the entire character portrait is a native file-picker target, not only the small plus icon',()=>{
 const studio=read('src/components/tiny-studio.tsx');
 const css=read('src/app/globals.css');
 assert.match(studio,/<\/div>\s*<input type="file" className="tiny-band-slot-input"/,
   'the file input must be a sibling of the small circle, directly under the portrait tile');
 assert.match(css,/\.tiny-band-tile\s*>\s*\.tiny-band-slot-input\s*\{[^}]*inset:0;[^}]*width:100%;[^}]*height:100%;/,
   'the native input must cover the portrait image');
 assert.match(css,/\.tiny-band-slot-x\s*\{[^}]*pointer-events:auto;/,
   'remove control must stay clickable above the upload area');
});
