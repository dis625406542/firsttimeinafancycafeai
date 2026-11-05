import nextEnv from '@next/env';
import pg from 'pg';
import Stripe from 'stripe';
import { matchesStripePrice } from '../src/lib/billing-validation.ts';
import { stripeKeyEnvironment } from '../src/lib/stripe-key.ts';
import { TEMPLATE_ID, PRICES, UPDATE_PRICE_SQL, UPSERT_MAPPING_SQL, catalogDbUrl, resolveSql } from './stripe-catalog-target.mjs';

// Operator-only: routine builds and migrations do not create/update Stripe prices or mappings.
// Example: npm run stripe:configure -- --480p-price=price_... --480p-product=prod_... --720p-price=price_... --720p-product=prod_...
nextEnv.loadEnvConfig(process.cwd());
const args = Object.fromEntries(process.argv.slice(2).map(arg => {
  const at = arg.indexOf('=');
  if (!arg.startsWith('--') || at < 0) throw new Error('Use --name=value arguments');
  return [arg.slice(2, at), arg.slice(at + 1)];
}));
const templateId = args.template ?? TEMPLATE_ID;
let client;
try {
  const raw = catalogDbUrl(process.env, templateId);
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  const environment = stripeKeyEnvironment(secret);
  if (!environment) throw new Error('A valid Stripe standard or restricted secret key is required');
  const stripe = new Stripe(secret, { timeout: 20000, maxNetworkRetries: 2 });
  const entries = [];
  for (const [resolution, defaultAmount] of PRICES) {
    const priceId = args[`${resolution}-price`];
    const productId = args[`${resolution}-product`];
    const amount = Number(args[`${resolution}-amount`] ?? defaultAmount);
    if (!/^price_\w+$/.test(priceId ?? '') || !/^prod_\w+$/.test(productId ?? '')) {
      throw new Error(`Supply --${resolution}-price=price_... and --${resolution}-product=prod_...`);
    }
    if (!Number.isSafeInteger(amount) || amount <= 0 || amount > 100000) throw new Error('Amount must be cents between 1 and 100000');
    const price = await stripe.prices.retrieve(priceId, { expand: ['product'] });
    const expected = { stripe_price_id: priceId, stripe_product_id: productId, amount_minor: amount, currency: 'USD', environment };
    if (!matchesStripePrice(expected, price)) throw new Error(`${resolution}: Stripe product/price, amount, currency or environment mismatch; database unchanged`);
    entries.push({ resolution, ...expected });
  }
  const url = new URL(raw);
  const tls = url.searchParams.get('sslmode') === 'require';
  if (tls) { url.searchParams.delete('sslmode'); url.searchParams.delete('uselibpqcompat'); }
  client = new pg.Client({ connectionString: url.toString(), ...(tls ? { ssl: { rejectUnauthorized: false } } : {}), connectionTimeoutMillis: 15000 });
  await client.connect();
  await client.query('BEGIN');
  for (const entry of entries) {
    const result = await client.query(resolveSql(UPDATE_PRICE_SQL, process.env), [entry.resolution, entry.amount_minor, templateId]);
    if (result.rowCount !== 1) throw new Error(`Expected exactly one active ${templateId} / ${entry.resolution} price; run db:migrate first`);
    await client.query(resolveSql(UPSERT_MAPPING_SQL, process.env), [result.rows[0].id, environment, entry.stripe_product_id, entry.stripe_price_id]);
  }
  await client.query('COMMIT');
  console.log(`Configured ${templateId} / ${environment} Stripe products. Existing orders were not changed.`);
  console.table(entries);
} catch (error) {
  await client?.query('ROLLBACK').catch(() => {});
  console.error(error instanceof Error ? error.message : 'Stripe configuration failed');
  process.exitCode = 1;
} finally { await client?.end(); }
