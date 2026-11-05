const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

test('Hobby deployment registers only the authenticated Tiny Desk recovery worker as a daily cron', () => {
  const root = join(__dirname, '..');
  const config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
  assert.deepEqual(config.crons, [{ path: '/api/internal/video-worker', schedule: '0 3 * * *' }]);
  const worker = readFileSync(join(root, 'src/app/api/internal/video-worker/route.ts'), 'utf8');
  assert.match(worker, /export async function GET\(/);
  assert.match(worker, /process\.env\.CRON_SECRET/);
  assert.match(worker, /Bearer \$\{secret\}/);
  assert.match(worker, /secret\.length<32/);
});
