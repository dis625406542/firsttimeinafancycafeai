const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { load, read } = require('./site-test-helpers.cjs');

test('GA4 has no inherited production property and supports explicit configuration or opt-out', () => {
  const previous = { id: process.env.NEXT_PUBLIC_GA_ID, mode: process.env.NODE_ENV };
  try {
    const { gaMeasurementId } = load('src/lib/analytics.ts');
    process.env.NODE_ENV = 'production';
    delete process.env.NEXT_PUBLIC_GA_ID;
    assert.equal(gaMeasurementId(), null);
    process.env.NEXT_PUBLIC_GA_ID = '';
    assert.equal(gaMeasurementId(), null);
    process.env.NEXT_PUBLIC_GA_ID = 'off';
    assert.equal(gaMeasurementId(), null);
    process.env.NEXT_PUBLIC_GA_ID = 'G-TEST123456';
    assert.equal(gaMeasurementId(), 'G-TEST123456');
    process.env.NEXT_PUBLIC_GA_ID = 'GTM-NL93KQMN';
    assert.equal(gaMeasurementId(), null);
    process.env.NEXT_PUBLIC_GA_ID = "G-ABCD';alert(1)";
    assert.equal(gaMeasurementId(), null);
  } finally {
    for (const [key, value] of [['NEXT_PUBLIC_GA_ID', previous.id], ['NODE_ENV', previous.mode]]) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});

test('GA4 consent/config initialization is queued before async library loads without automatic pageviews', () => {
  const layout = read('src/app/layout.tsx');
  assert.ok(layout.indexOf('id="ga4-config"') < layout.indexOf('<script async'));
  const script = layout.match(/__html: `([^`]+)`/)[1].replace('${gaId}', 'G-TEST123456');
  const context = { location: { origin: 'https://lovethesmithsai.com', pathname: '/blog', search: '?code=private' } };
  context.window = context;
  vm.runInNewContext(script, context);
  const calls = Array.from(context.dataLayer, args => Array.from(args));
  assert.deepEqual(calls.map(c => c[0]), ['consent', 'js', 'config']);
  assert.equal(calls[0][2].analytics_storage, 'denied');
  assert.equal(calls[0][2].ad_user_data, 'denied');
  assert.equal(calls[2][1], 'G-TEST123456');
  assert.equal(calls[2][2].send_page_view, false);
  assert.equal(calls[2][2].page_location, 'https://lovethesmithsai.com/blog');
  assert.doesNotMatch(layout, /gtm\.js|GTM-NL93KQMN/);
});
