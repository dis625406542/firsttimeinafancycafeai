const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

test('Tiny Desk Stripe catalog accepts only this website schema and product', async () => {
  const target = await import('../scripts/stripe-catalog-target.mjs');
  assert.equal(target.TEMPLATE_ID, 'tiny-desk-ai');
  assert.deepEqual(target.PRICES, [['480p', 599], ['720p', 899]]);
  const env = { DATABASE_PRO_NAME: 'tinydeskaivideo_pro', DIRECT_PRO_URL: 'postgresql://user:pass@localhost:5432/postgres?sslmode=require&schema=tinydeskaivideo_pro' };
  assert.equal(target.catalogDbUrl(env, 'tiny-desk-ai'), env.DIRECT_PRO_URL);
  assert.throws(() => target.catalogDbUrl(env, 'zombie-couple'), /Tiny Desk/i);
  // Any valid schema is accepted, but the URL schema must match DATABASE_PRO_NAME.
  const testEnv = { DATABASE_PRO_NAME: 'tinydeskaivideo_test', DIRECT_PRO_URL: 'postgresql://user:pass@localhost:5432/postgres?sslmode=require&schema=tinydeskaivideo_test' };
  assert.equal(target.catalogDbUrl(testEnv, 'tiny-desk-ai'), testEnv.DIRECT_PRO_URL);
  assert.throws(() => target.catalogDbUrl({...env, DATABASE_PRO_NAME: 'zombievideolab_pro'}, 'tiny-desk-ai'), /zombievideolab_pro/);
  assert.throws(() => target.catalogDbUrl({...env, DIRECT_PRO_URL: 'postgresql://user:pass@localhost:5432/postgres?sslmode=require&schema=zombievideolab_pro'}, 'tiny-desk-ai'), /tinydeskaivideo_pro/);
  assert.throws(() => target.catalogDbUrl({...env, DATABASE_PRO_NAME: 'bad-name;drop'}, 'tiny-desk-ai'), /schema identifier/i);
  assert.throws(() => target.catalogDbUrl({...env, DIRECT_PRO_URL: undefined, DATABASE_PRO_URL: undefined}, 'tiny-desk-ai'), /database/i);
  for (const sql of [target.UPDATE_PRICE_SQL, target.UPSERT_MAPPING_SQL]) {
    assert.match(sql, /\{schema\}\./);
    assert.doesNotMatch(sql, /tinydeskaivideo_pro|zombievideolab_pro/);
  }
  assert.equal(target.resolveSql(target.UPDATE_PRICE_SQL, env).includes('tinydeskaivideo_pro.product_prices'), true);
  assert.equal(target.resolveSql(target.UPDATE_PRICE_SQL, testEnv).includes('tinydeskaivideo_test.product_prices'), true);
});

test('operator script uses validated target and remains a manual operation', () => {
  const source = readFileSync(join(__dirname, '../scripts/configure-stripe-products.mjs'), 'utf8');
  assert.match(source, /catalogDbUrl\(/);
  assert.match(source, /UPDATE_PRICE_SQL/);
  assert.match(source, /UPSERT_MAPPING_SQL/);
  assert.doesNotMatch(source, /zombievideolab_pro|zombie-couple|tiptoeing-in-my-jordans/i);
  const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));
  assert.match(pkg.scripts['stripe:configure'], /configure-stripe-products/);
  assert.doesNotMatch(pkg.scripts.build, /stripe:configure|db:migrate/);
});
