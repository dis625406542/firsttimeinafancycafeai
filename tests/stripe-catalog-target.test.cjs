const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

test('Smiths Stripe catalog accepts only this website schema and product', async () => {
  const target = await import('../scripts/stripe-catalog-target.mjs');
  assert.equal(target.TEMPLATE_ID, 'fancy-cafe-ai');
  assert.deepEqual(target.PRICES, [['480p', 699], ['720p', 999]]);
  const env = { DATABASE_PRO_NAME: 'firsttimeinafancycafeai_pro', DIRECT_PRO_URL: 'postgresql://user:pass@localhost:5432/postgres?sslmode=require&schema=firsttimeinafancycafeai_pro' };
  assert.equal(target.catalogDbUrl(env, 'fancy-cafe-ai'), env.DIRECT_PRO_URL);
  const cafeTestEnv = { ...env, DATABASE_PRO_NAME: 'firsttimeinafancycafeai_test', DIRECT_PRO_URL: env.DIRECT_PRO_URL.replaceAll('firsttimeinafancycafeai_pro', 'firsttimeinafancycafeai_test') };
  assert.equal(target.catalogDbUrl(cafeTestEnv, 'fancy-cafe-ai'), cafeTestEnv.DIRECT_PRO_URL);
  assert.equal(target.resolveSql(target.UPDATE_PRICE_SQL, cafeTestEnv).includes('firsttimeinafancycafeai_test.product_prices'), true);
  assert.throws(() => target.catalogDbUrl(env, 'zombie-couple'), /configured template product/i);
  // Copied old schema names fail closed before Stripe or SQL writes.
  const testEnv = { DATABASE_PRO_NAME: 'tinydeskaivideo_test', DIRECT_PRO_URL: 'postgresql://user:pass@localhost:5432/postgres?sslmode=require&schema=tinydeskaivideo_test' };
  assert.throws(() => target.catalogDbUrl(testEnv, 'fancy-cafe-ai'), /Wrong site schema/);
  assert.throws(() => target.catalogDbUrl({...env, DATABASE_PRO_NAME: 'zombievideolab_pro'}, 'fancy-cafe-ai'), /Wrong site schema/);
  assert.throws(() => target.catalogDbUrl({...env, DIRECT_PRO_URL: 'postgresql://user:pass@localhost:5432/postgres?sslmode=require&schema=zombievideolab_pro'}, 'fancy-cafe-ai'), /firsttimeinafancycafeai_pro/);
  assert.throws(() => target.catalogDbUrl({...env, DATABASE_PRO_NAME: 'bad-name;drop'}, 'fancy-cafe-ai'), /schema identifier/i);
  assert.throws(() => target.catalogDbUrl({...env, DIRECT_PRO_URL: undefined, DATABASE_PRO_URL: undefined}, 'fancy-cafe-ai'), /database/i);
  for (const sql of [target.UPDATE_PRICE_SQL, target.UPSERT_MAPPING_SQL]) {
    assert.match(sql, /\{schema\}\./);
    assert.doesNotMatch(sql, /firsttimeinafancycafeai_pro|zombievideolab_pro/);
  }
  assert.equal(target.resolveSql(target.UPDATE_PRICE_SQL, env).includes('firsttimeinafancycafeai_pro.product_prices'), true);
  assert.throws(() => target.resolveSql(target.UPDATE_PRICE_SQL, testEnv), /Wrong site schema/);
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
