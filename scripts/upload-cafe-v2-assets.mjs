import nextEnv from '@next/env';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

nextEnv.loadEnvConfig(process.cwd());
const verifyOnly = process.argv.slice(2).includes('--verify-only');
if (process.argv.slice(2).some(arg => arg !== '--verify-only')) throw new Error('Only --verify-only is supported.');
// Immutable, approved v2 media: don't silently replace the reference that a paid order uses.
const assets = [
  { variable: 'FANCY_CAFE_REFERENCE_KEY', file: 'docs/assets/reference-first20-silent.mp4', type: 'video/mp4', bytes: 1866227, sha256: '47118e2829809b46ce0b4b0429f600fa08f450eff91525c5580e387306a430fe' },
  { variable: 'FANCY_CAFE_AUDIO_KEY', file: 'docs/assets/soundtrack-first20.mp3', type: 'audio/mpeg', bytes: 481692, sha256: 'dba9abd72e6429958487f442de7758b451e3c59eca22b141661bcc881171feef' },
];
const account = process.env.R2_ACCOUNT_ID;
const jurisdiction = process.env.R2_JURISDICTION || 'global';
const bucket = process.env.R2_BUCKET_NAME;
if (!/^[a-f0-9]{32}$/i.test(account || '') || !['global', 'us', 'eu', 'fedramp'].includes(jurisdiction) || !bucket || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
  throw new Error('Private R2 credentials are missing');
}
const client = new S3Client({
  region: 'auto', forcePathStyle: true, requestChecksumCalculation: 'WHEN_REQUIRED',
  endpoint: `https://${account}.${jurisdiction === 'global' ? '' : jurisdiction + '.'}r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
});
try {
  for (const asset of assets) {
    const key = process.env[asset.variable];
    if (key !== `fancy-cafe-ai/v2/${asset.file.split('/').at(-1)}`) throw new Error(`Unexpected ${asset.variable}; refusing to access another key`);
    if (!verifyOnly) {
      const body = readFileSync(asset.file);
      if (body.length !== asset.bytes || createHash('sha256').update(body).digest('hex') !== asset.sha256) {
        throw new Error(`${asset.variable}: local asset differs from approved 20-second media; refusing upload`);
      }
      await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: asset.type, CacheControl: 'private, no-store' }));
    }
    const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const digest = createHash('sha256');
    let bytes = 0;
    for await (const chunk of response.Body) { bytes += chunk.length; digest.update(chunk); }
    if (bytes !== asset.bytes || digest.digest('hex') !== asset.sha256) throw new Error(`${asset.variable}: R2 content differs from approved asset`);
    console.log(`${asset.variable}: verified private R2 object (${bytes} bytes)`);
  }
} finally {
  client.destroy();
}
