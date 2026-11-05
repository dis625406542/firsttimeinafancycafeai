const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
const original = Module._load;
const order = { id: 'order-1', code: 'A'.repeat(32), visitor_hash: 'visitor-1', notification_email: 'user@example.com' };
let queries = [], available = true;
Module._load = function (request, parent, ...args) {
 if (parent?.filename.endsWith('video-email.ts')) {
  if (request === 'server-only') return {};
  if (request === './db') return { pool: () => ({ query: async (sql) => {
   queries.push(sql);
   if (sql.includes('UPDATE {schema}.billing_orders o')) return { rows: [order] };
   if (sql.includes('SELECT id,code,visitor_hash,notification_email')) return { rows: [order] };
   return { rows: [] };
  } }) };
  if (request === './video-jobs') return { findJob: async () => ({ r2_key: 'generated/' + order.code + '.mp4' }), videoAvailable: () => available };
  if (request === './r2') return { getGeneratedVideoUrl: async (_key, download) => { assert.equal(download, true); return 'https://private-r2.test/file'; } };
 }
 return original.call(this, request, parent, ...args);
};
const { sendReadyVideoEmail, videoForEmailLink } = require('../src/lib/video-email.ts');
Module._load = original;
const environment = Object.fromEntries(['RESEND_API_KEY', 'VIDEO_EMAIL_FROM', 'VIDEO_HANDLE_SECRET'].map(k => [k, process.env[k]]));
function setup() {
 process.env.RESEND_API_KEY = 'test-key';
 process.env.VIDEO_EMAIL_FROM = 'Tiny Desk <delivery@example.com>';
 process.env.VIDEO_HANDLE_SECRET = 'test-secret-longer-than-thirty-two-characters';
 queries = []; available = true;
}
function restore() { for (const [k, v] of Object.entries(environment)) if (v === undefined) delete process.env[k]; else process.env[k] = v; }

test('ready email uses a private 30-day-gated token, never just a guessable order code', async () => {
 setup(); const previousFetch = global.fetch; let message;
 global.fetch = async (_url, init) => { message = JSON.parse(init.body); return { ok: true }; };
 try {
  await sendReadyVideoEmail();
  assert.match(message.text, /https:\/\/firsttimeinafancycafeai\.org\/api\/video\/email\?/);
  assert.equal(message.to[0], order.notification_email);
  assert.ok(queries.some(sql => sql.includes('notification_sent_at=now()')));
  const link = new URL(message.text.match(/https:\/\/\S+/)[0]);
  assert.equal(await videoForEmailLink(order.code, link.searchParams.get('token')), 'https://private-r2.test/file');
  assert.equal(await videoForEmailLink(order.code, '0'.repeat(64)), null);
  assert.equal(await videoForEmailLink(order.code, 'bad'), null);
  available = false;
  assert.equal(await videoForEmailLink(order.code, link.searchParams.get('token')), null);
 } finally { global.fetch = previousFetch; restore(); }
});

test('email failure never marks sent; missing provider config never claims an order', async () => {
 setup(); const previousFetch = global.fetch, previousError = console.error;
 global.fetch = async () => ({ ok: false, status: 503 }); console.error = () => {};
 try {
  await sendReadyVideoEmail();
  assert.ok(!queries.some(sql => sql.includes('notification_sent_at=now()')));
  queries = [];
  delete process.env.RESEND_API_KEY;
  await sendReadyVideoEmail();
  assert.equal(queries.length, 0);
 } finally { global.fetch = previousFetch; console.error = previousError; restore(); }
});
