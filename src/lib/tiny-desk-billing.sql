-- Tiny Desk AI Videos schema only. No legacy product, payment or customer data is copied.
CREATE TABLE IF NOT EXISTS {schema}.products (
 id text PRIMARY KEY, code text NOT NULL UNIQUE, name text NOT NULL, description text NOT NULL,
 product_type text NOT NULL DEFAULT 'one_time' CHECK (product_type='one_time'),
 is_active boolean NOT NULL DEFAULT true, sort_order integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS {schema}.product_prices (
 id text PRIMARY KEY, product_id text NOT NULL REFERENCES {schema}.products(id), code text NOT NULL UNIQUE,
 resolution text NOT NULL CHECK (resolution IN ('480p','720p')), amount_minor integer NOT NULL CHECK (amount_minor>0 AND amount_minor<=100000),
 currency text NOT NULL DEFAULT 'USD' CHECK (currency='USD'), duration_seconds integer NOT NULL DEFAULT 8 CHECK(duration_seconds IN (8,15)),
 is_active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE {schema}.product_prices DROP CONSTRAINT IF EXISTS product_prices_duration_seconds_check;

ALTER TABLE {schema}.product_prices ADD CONSTRAINT product_prices_duration_seconds_check CHECK(duration_seconds IN (8,15));

CREATE UNIQUE INDEX IF NOT EXISTS product_prices_active_product_resolution_idx ON {schema}.product_prices(product_id,resolution) WHERE is_active;

DROP INDEX IF EXISTS {schema}.product_prices_active_resolution_idx;

CREATE TABLE IF NOT EXISTS {schema}.billing_orders (
 id text PRIMARY KEY, code varchar(32) NOT NULL UNIQUE CHECK(code ~ '^[A-F0-9]{32}$'), visitor_hash varchar(64) NOT NULL,
 product_id text NOT NULL REFERENCES {schema}.products(id), price_id text NOT NULL REFERENCES {schema}.product_prices(id),
 product_name text NOT NULL, amount_minor integer NOT NULL CHECK(amount_minor>0), currency text NOT NULL CHECK(currency='USD'),
 resolution text NOT NULL CHECK(resolution IN ('480p','720p')), aspect_ratio text NOT NULL CHECK(aspect_ratio IN ('9:16','16:9')),
 video_provider text NOT NULL CHECK(video_provider IN ('poyo','yir')), provider text NOT NULL DEFAULT 'stripe',
 environment text NOT NULL CHECK(environment IN ('test','live')),
 status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','paid','expired','failed','refunded','disputed')),
 generation_status text NOT NULL DEFAULT 'waiting' CHECK(generation_status IN ('waiting','ready','preparing','submitting','running','finished','failed','unknown')),
 provider_payment_id text UNIQUE, paid_at timestamptz, refunded_at timestamptz, refund_amount_minor integer NOT NULL DEFAULT 0,
 input_photos jsonb NOT NULL DEFAULT '[]', input_expires_at timestamptz NOT NULL, error text,
 attempts integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS billing_orders_visitor_idx ON {schema}.billing_orders(visitor_hash,created_at DESC);

CREATE INDEX IF NOT EXISTS billing_orders_worker_idx ON {schema}.billing_orders(status,generation_status,updated_at);

CREATE TABLE IF NOT EXISTS {schema}.billing_checkouts (
 id text PRIMARY KEY, order_id text NOT NULL UNIQUE REFERENCES {schema}.billing_orders(id), provider text NOT NULL DEFAULT 'stripe',
 environment text NOT NULL CHECK(environment IN ('test','live')), provider_checkout_id text UNIQUE, checkout_url text,
 status text NOT NULL DEFAULT 'creating' CHECK(status IN ('creating','open','complete','expired','failed')),
 expires_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS {schema}.billing_webhook_events (
 provider text NOT NULL, provider_event_id text NOT NULL, event_type text NOT NULL, environment text NOT NULL,
 status text NOT NULL DEFAULT 'processed', created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(provider,provider_event_id)
);

CREATE TABLE IF NOT EXISTS {schema}.video_generation_attempts (
 id text PRIMARY KEY, order_id text NOT NULL REFERENCES {schema}.billing_orders(id), attempt_number integer NOT NULL,
 status text NOT NULL CHECK(status IN ('preparing','submitting','running','finished','failed','unknown')),
 provider_task_id text, error text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(order_id,attempt_number)
);

CREATE TABLE IF NOT EXISTS {schema}.request_limits (
 scope text NOT NULL, subject text NOT NULL, window_start timestamptz NOT NULL, count integer NOT NULL DEFAULT 1,
 PRIMARY KEY(scope,subject,window_start)
);

CREATE TABLE IF NOT EXISTS {schema}.billing_payment_blocks (
 payment_id text NOT NULL, environment text NOT NULL, status text NOT NULL CHECK(status IN ('refunded','disputed')),
 created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(payment_id,environment)
);

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS delivery_lease text;

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS delivery_locked_until timestamptz;

CREATE TABLE IF NOT EXISTS {schema}.stripe_price_mappings (
 price_id text NOT NULL REFERENCES {schema}.product_prices(id),
 environment text NOT NULL CHECK(environment IN ('test','live')),
 stripe_product_id text NOT NULL CHECK(stripe_product_id LIKE 'prod_%'),
 stripe_price_id text NOT NULL CHECK(stripe_price_id LIKE 'price_%'),
 updated_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(price_id,environment), UNIQUE(environment,stripe_price_id)
);

ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS stripe_product_id text;

ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS stripe_price_id text;

ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS template_id text NOT NULL DEFAULT 'tiny-desk-ai';

ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS prompt_version text NOT NULL DEFAULT 'tiny-desk-v1';

-- saveOrderPhotos/paid-generation persist the moderation-derived story scenario; keep parity with billing.sql.
ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS prompt_scenario text
 CHECK(prompt_scenario IN ('female_infected','male_infected','gender_neutral'));

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS template_id text NOT NULL DEFAULT 'tiny-desk-ai';

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS prompt_version text NOT NULL DEFAULT 'tiny-desk-v1';

CREATE INDEX IF NOT EXISTS billing_orders_template_visitor_idx ON {schema}.billing_orders(visitor_hash,template_id,created_at DESC);

CREATE INDEX IF NOT EXISTS video_jobs_template_visitor_idx ON {schema}.video_jobs(visitor_hash,template_id,created_at DESC);

-- Structural parity with the existing 11th table; never import legacy prompts or product rows.
CREATE TABLE IF NOT EXISTS {schema}.video_prompt_templates (
 template_id text NOT NULL, scene_id text NOT NULL, scene_description text NOT NULL,
 base_prompt text NOT NULL CHECK(length(btrim(base_prompt)) > 0),
 prompt_version text NOT NULL DEFAULT 'tiny-desk-v1', is_active boolean NOT NULL DEFAULT true,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(template_id,scene_id)
);

-- Only the new site product is catalogued; no Stripe IDs or checkout mappings are seeded.
INSERT INTO {schema}.products(id,code,name,description,sort_order) VALUES
 ('tiny-desk-ai','tiny-desk-ai','Tiny Desk AI Video','One planned concert-inspired AI video from an approved adult portrait; checkout and video generation are not available yet.',0)
 ON CONFLICT DO NOTHING;
INSERT INTO {schema}.product_prices(id,product_id,code,resolution,amount_minor,currency) VALUES
 ('tiny-desk-ai-480p','tiny-desk-ai','tiny-desk-ai-480p','480p',599,'USD'),
 ('tiny-desk-ai-720p','tiny-desk-ai','tiny-desk-ai-720p','720p',899,'USD')
 ON CONFLICT DO NOTHING;

-- Optional delivery email is private and is never included in publicOrder responses.
ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS notification_email text;
ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS notification_sent_at timestamptz;
ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS notification_claimed_at timestamptz;
