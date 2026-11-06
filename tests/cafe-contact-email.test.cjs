const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { load, read, root } = require('./site-test-helpers.cjs');
const email = 'hello@firsttimeinafancycafeai.org';

test('all public contact exports use the cafe mailbox from the site configuration', () => {
 assert.equal(load('src/lib/site.ts').CONTACT_EMAIL, email);
 assert.equal(load('src/lib/info.ts').CONTACT_EMAIL, email);
 assert.equal(load('src/lib/legal-content.tsx').CONTACT_EMAIL, email);
 for (const file of ['src/lib/info.ts', 'src/lib/legal-content.tsx']) {
  assert.match(read(file), /CONTACT_EMAIL.*from ["']@\/lib\/site["']/);
 }
});

test('support, privacy, rights, refunds and security copy use the site-specific mailbox', () => {
 const { legalContent } = load('src/lib/legal-content.tsx');
 for (const slug of ['contact', 'privacy', 'acceptable-use', 'refund-policy', 'security']) {
  assert.ok(JSON.stringify(legalContent[slug]).includes(email), slug);
 }
 assert.doesNotMatch(JSON.stringify(legalContent), /zombievideolab\.com|mailbox is shared|shared across/i);
 assert.doesNotMatch(read('README.md'), /shared support mailbox/i);
});

test('no public source or text asset retains a legacy support email', () => {
 function check(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
   const file = path.join(dir, item.name);
   if (item.isDirectory()) check(file);
   else if (/\.(?:tsx?|jsx?|json|html|txt|xml|svg|md)$/.test(file)) {
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /[\w.+-]+@(?:zombievideolab\.com|tinydeskaivideos\.com)/i, file);
   }
  }
 }
 check(path.join(root, 'src'));
 check(path.join(root, 'public'));
});
