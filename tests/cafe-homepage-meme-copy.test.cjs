const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const page = fs.readFileSync(path.join(__dirname, '..', 'src/app/page.tsx'), 'utf8');
const site = fs.readFileSync(path.join(__dirname, '..', 'src/lib/site.ts'), 'utf8');

test('homepage names the exact meme and clearly explains how to start its AI video', () => {
 assert.match(page, /Upload one clear adult portrait to make a 20-second Your First Time in a Fancy Cafe AI video/);
 assert.match(page, /without writing a prompt/);
 assert.match(page, /A second portrait is optional/);
 assert.match(page, /not an edit of the original clip/);
 assert.match(page, /How can I quickly make a Your First Time in a Fancy Cafe AI video/);
 assert.match(page, /Does this generator replace faces in the original Your First Time in a Fancy Cafe video/);
});

test('search description describes the actual one-photo meme generator', () => {
 assert.match(site, /Upload one adult portrait/);
 assert.match(site, /20-second/);
 assert.match(site, /wrong-seat/);
 assert.doesNotMatch(site, /Explore the Your First Time/);
});
