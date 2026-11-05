-- Tiny Desk AI Videos schema only. No legacy product, payment or customer data is copied.
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
