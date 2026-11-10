const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const page = fs.readFileSync(path.join(__dirname, '..', 'src/app/page.tsx'), 'utf8');
const site = fs.readFileSync(path.join(__dirname, '..', 'src/lib/site.ts'), 'utf8');

test('homepage names the I Love The Smiths AI meme and explains how to start', () => {
 assert.match(page, /upload two clear adult portraits/i);
 assert.match(page, /no prompt writing/);
 assert.match(page, /Photo 2 is the person who turns, smiles and says the line/);
 assert.match(page, /not an edit or face swap of the film clip/);
 assert.match(page, /How can I make an I Love The Smiths AI video\?/);
 assert.match(page, /Does the video include the original Smiths recording\?/);
});

test('search description describes the two-photo elevator meet-cute generator', () => {
 assert.match(site, /Upload two photos/);
 assert.match(site, /24-second/);
 assert.match(site, /I Love The Smiths AI/);
 assert.match(site, /elevator meet-cute/);
 assert.doesNotMatch(site, /Your First Time/);
});
