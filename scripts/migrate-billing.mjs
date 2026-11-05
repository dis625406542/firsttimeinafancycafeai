import nextEnv from '@next/env';
import pg from 'pg';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const schema = process.env.DATABASE_PRO_NAME?.trim();
if (!schema || !/^[a-z_][a-z0-9_]{0,62}$/i.test(schema)) throw new Error('DATABASE_PRO_NAME must be a plain PostgreSQL schema identifier; migration stopped.');
if (schema !== 'firsttimeinafancycafeai_pro' && schema !== 'firsttimeinafancycafeai_test') throw new Error('Wrong site schema; migration stopped.');
const raw = process.env.DIRECT_PRO_URL;
if (!raw) throw new Error('DIRECT_PRO_URL is required; never migrate with the pooled URL.');
const url = new URL(raw);
if (url.searchParams.get('schema') !== schema || url.port !== '5432' || !['require','verify-ca','verify-full'].includes(url.searchParams.get('sslmode'))) {
  throw new Error(`DIRECT_PRO_URL must use the ${schema} schema, session port 5432 and TLS.`);
}
const tls = url.searchParams.get('sslmode') === 'require';
if (tls) { url.searchParams.delete('sslmode'); url.searchParams.delete('uselibpqcompat'); }
const client = new pg.Client({ connectionString: url.toString(), ...(tls ? {ssl:{rejectUnauthorized:false}} : {}), connectionTimeoutMillis:15000 });
const root = new URL('../', import.meta.url);
try {
  await client.connect();
  await client.query('BEGIN');
  for (const file of ['src/lib/fancy-cafe.sql', 'src/lib/fancy-cafe-v2.sql']) {
    // SQL files use the {schema} marker; bind it to the configured schema before executing.
    await client.query(readFileSync(fileURLToPath(new URL(file, root)), 'utf8').replaceAll('{schema}', schema));
  }
  await client.query('COMMIT');
  const tables = await client.query('SELECT table_name FROM information_schema.tables WHERE table_schema=$1 ORDER BY table_name', [schema]);
  console.log(`Applied additive schema-only Fancy Cafe migration: ${tables.rowCount} tables in ${schema}. No legacy products or orders copied.`);
} catch (error) {
  await client.query('ROLLBACK').catch(() => {});
  console.error(`Migration stopped: ${error.message}`);
  process.exitCode = 1;
} finally { await client.end(); }
