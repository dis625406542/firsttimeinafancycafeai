// This is an operator-only Stripe synchronization target, not a runtime video dependency.
export const TEMPLATE_ID = 'fancy-cafe-ai';
export const PRICES = [['480p', 599], ['720p', 899]];

const schemaPattern = /^[a-z_][a-z0-9_]{0,62}$/i;

// The schema comes from DATABASE_PRO_NAME; never hardcode a deployment-specific name here.
export function targetSchema(env) {
  const schema = env.DATABASE_PRO_NAME?.trim();
  if (!schema || !schemaPattern.test(schema)) throw new Error('DATABASE_PRO_NAME must be a plain PostgreSQL schema identifier.');
  if (schema !== 'firsttimeinafancycafeai_pro' && schema !== 'firsttimeinafancycafeai_test') throw new Error('Wrong site schema');
  return schema;
}

export function resolveSql(sql, env) {
  return sql.replaceAll('{schema}', targetSchema(env));
}

// Guard both the database name and selected URL before any Stripe or SQL writes.
export function catalogDbUrl(env, templateId = TEMPLATE_ID) {
  if (templateId !== TEMPLATE_ID) throw new Error('Only the Fancy Cafe product may be configured on this website.');
  const schema = targetSchema(env);
  const raw = env.DIRECT_PRO_URL || env.DATABASE_PRO_URL;
  if (!raw) throw new Error('Database configuration is required.');
  const url = new URL(raw);
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || url.searchParams.get('schema') !== schema) {
    throw new Error(`Database URL must use the ${schema} schema.`);
  }
  return raw;
}

export const UPDATE_PRICE_SQL = `UPDATE {schema}.product_prices
  SET amount_minor=$2, currency='USD', updated_at=now()
  WHERE resolution=$1 AND product_id=$3 AND is_active RETURNING id`;
export const UPSERT_MAPPING_SQL = `INSERT INTO {schema}.stripe_price_mappings
  (price_id,environment,stripe_product_id,stripe_price_id) VALUES($1,$2,$3,$4)
  ON CONFLICT(price_id,environment) DO UPDATE SET stripe_product_id=EXCLUDED.stripe_product_id,
  stripe_price_id=EXCLUDED.stripe_price_id,updated_at=now()`;
