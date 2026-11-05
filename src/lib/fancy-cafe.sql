-- Fancy Cafe AI Videos schema only. No legacy product, payment or customer data is copied.
CREATE SCHEMA IF NOT EXISTS {schema};

CREATE TABLE IF NOT EXISTS {schema}.video_jobs (
 code varchar(32) PRIMARY KEY,
 visitor_hash varchar(64) NOT NULL,
 provider varchar(8) NOT NULL CHECK (provider IN ('poyo','yir')),
 task_id varchar(128),
 status varchar(16) NOT NULL CHECK (status IN ('submitting','running','finished','failed','unknown')),
 resolution varchar(4) NOT NULL CHECK (resolution IN ('480p','720p')),
 aspect_ratio varchar(4) NOT NULL DEFAULT '9:16' CHECK (aspect_ratio IN ('9:16','16:9')),
 progress integer NOT NULL DEFAULT 0,
 video_url text,
 r2_key text,
 stored_at timestamptz,
 error text,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS video_jobs_visitor_created_idx ON {schema}.video_jobs(visitor_hash, created_at DESC);

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS aspect_ratio varchar(4) NOT NULL DEFAULT '9:16' CHECK (aspect_ratio IN ('9:16','16:9'));

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS r2_key text;

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS stored_at timestamptz;

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS completed_at timestamptz;

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS storage_attempts integer NOT NULL DEFAULT 0;

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS storage_retry_at timestamptz;

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS storage_error text;

CREATE INDEX IF NOT EXISTS video_jobs_archive_pending_idx ON {schema}.video_jobs(storage_retry_at)
 WHERE r2_key IS NULL AND video_url IS NOT NULL;

-- Fancy Cafe AI Videos schema only. No legacy product, payment or customer data is copied.
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





CREATE UNIQUE INDEX IF NOT EXISTS product_prices_active_product_resolution_idx ON {schema}.product_prices(product_id,resolution) WHERE is_active;



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

ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS template_id text NOT NULL DEFAULT 'fancy-cafe-ai';

ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS prompt_version text NOT NULL DEFAULT 'fancy-cafe-v1';

-- saveOrderPhotos/paid-generation persist the moderation-derived story scenario; keep parity with billing.sql.
ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS prompt_scenario text
 CHECK(prompt_scenario IN ('female_infected','male_infected','gender_neutral'));

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS template_id text NOT NULL DEFAULT 'fancy-cafe-ai';

ALTER TABLE {schema}.video_jobs ADD COLUMN IF NOT EXISTS prompt_version text NOT NULL DEFAULT 'fancy-cafe-v1';

CREATE INDEX IF NOT EXISTS billing_orders_template_visitor_idx ON {schema}.billing_orders(visitor_hash,template_id,created_at DESC);

CREATE INDEX IF NOT EXISTS video_jobs_template_visitor_idx ON {schema}.video_jobs(visitor_hash,template_id,created_at DESC);

-- Structural parity with the existing 11th table; never import legacy prompts or product rows.
CREATE TABLE IF NOT EXISTS {schema}.video_prompt_templates (
 template_id text NOT NULL, scene_id text NOT NULL, scene_description text NOT NULL,
 base_prompt text NOT NULL CHECK(length(btrim(base_prompt)) > 0),
 prompt_version text NOT NULL DEFAULT 'fancy-cafe-v1', is_active boolean NOT NULL DEFAULT true,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(template_id,scene_id)
);

-- Only the new site product is catalogued; no Stripe IDs or checkout mappings are seeded.
INSERT INTO {schema}.products(id,code,name,description,sort_order) VALUES
 ('fancy-cafe-ai','fancy-cafe-ai','Fancy Cafe AI Video','One planned 15-second cafe comedy video from one or two adult portraits; preview only until reference assets are approved.',0)
 ON CONFLICT DO NOTHING;
INSERT INTO {schema}.product_prices(id,product_id,code,resolution,amount_minor,currency) VALUES
 ('fancy-cafe-ai-480p','fancy-cafe-ai','fancy-cafe-ai-480p','480p',599,'USD'),
 ('fancy-cafe-ai-720p','fancy-cafe-ai','fancy-cafe-ai-720p','720p',899,'USD')
 ON CONFLICT DO NOTHING;

-- Optional delivery email is private and is never included in publicOrder responses.
ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS notification_email text;
ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS notification_sent_at timestamptz;
ALTER TABLE {schema}.billing_orders ADD COLUMN IF NOT EXISTS notification_claimed_at timestamptz;

UPDATE {schema}.product_prices SET duration_seconds=15 WHERE product_id='fancy-cafe-ai' AND id IN ('fancy-cafe-ai-480p','fancy-cafe-ai-720p') AND duration_seconds<>15;
INSERT INTO {schema}.video_prompt_templates(template_id,scene_id,scene_description,base_prompt,prompt_version,is_active) VALUES
('fancy-cafe-ai','fancy-cafe-v1','Two-person wrong-seat cafe comedy, silent 15s reference-guided footage.',$prompt$
Create a coherent 15-second photorealistic cafe comedy video in {{ASPECT_RATIO}}. The supplied silent video guides spatial layout and action timing only, never facial identity. Keep normal-speed movement and a readable pause of realization. Do not request or reproduce reference audio.
IDENTITY MAP: {{IDENTITY_MAP}} Keep both adults distinct and recognizable. Preserve each supplied portrait's face, hair, skin tone and visible clothing. Never swap identities or genders, copy the reference actors, duplicate people or turn people into animals. Natural blinking, open attentive eyes, subtle smiles and believable hands.
SETTING: a minimal modern cafe with small wall-side round pedestal tables and a separate low continuous bench. Tables stay tables; the bench stays the intended seating. Keep the same room, cup locations and furniture geometry throughout. Exactly two fully clothed adults.
0-3 seconds: fixed medium-wide view. The protagonist is already perched on a small round tabletop, sipping from a cup with relaxed confidence. Show the tabletop under the protagonist and the bench lower down clearly. This mistaken seat is essential to the joke.
3-6 seconds: the cafe regular enters naturally, sits on the actual bench beside a separate small table, and places their cup on that table. Both characters remain visible; the regular does not push, ridicule or speak to the protagonist.
6-9 seconds: protagonist glances from the regular to the tabletop and then the bench. Hold a brief, readable realization: raised eyebrows, restrained embarrassed smile, cup steady. Do not jump straight to the corrected seat.
9-12 seconds: protagonist carefully steps off the table, keeps the same cup, places it on the tabletop and sits on the adjacent bench. Natural continuous leg and hand movement. Do not pass through furniture or teleport.
12-15 seconds: protagonist sits correctly, takes a small composed sip and looks casually away as if nothing happened. Regular remains relaxed. Finish on the completed visual joke without a new scene or fade.
CAMERA: one stable continuous shot, no singer close-ups or montage. Frame both people, both table tops and the bench clearly in the selected aspect ratio. No extra faces, mirror duplicates, morphing furniture, instruments, singing, captions, subtitles, logos or watermarks.
AUDIO: silent video only; generate_audio=false. No music, speech, lyrics, vocals or sound effects. A separately authorized audio asset may be merged after generation. Exact motion matching and identity fidelity are not guaranteed.
$prompt$,'fancy-cafe-v1',true) ON CONFLICT(template_id,scene_id) DO NOTHING;
