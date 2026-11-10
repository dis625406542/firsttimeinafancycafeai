import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const root = process.cwd();
const env = {};
for (const line of (await readFile(path.join(root, '.env.local'), 'utf8')).split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
  if (!match) continue;
  env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
}
for (const key of ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME']) {
  if (!env[key]) throw new Error(`${key} is not configured in .env.local`);
}
const jurisdiction = (env.R2_JURISDICTION || 'global').toLowerCase();
if (!['global', 'us', 'eu', 'fedramp'].includes(jurisdiction)) throw new Error('Invalid R2_JURISDICTION');
const client = new S3Client({
  region: 'auto',
  forcePathStyle: true,
  requestChecksumCalculation: 'WHEN_REQUIRED',
  endpoint: `https://${env.R2_ACCOUNT_ID}.${jurisdiction === 'global' ? '' : `${jurisdiction}.`}r2.cloudflarestorage.com`,
  credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
});

const assetDir = path.join(root, 'public/love-the-smiths');
const videos = ['demo-1.mp4', 'demo-2.mp4'];
const images = (await readdir(assetDir)).filter(name => name.endsWith('.webp')).sort();
const only = process.argv[2];
const uploads = [
  ...videos.map(name => ({ name, key: `love-the-smiths-ai/demo/${name}` })),
  ...images.map(name => ({ name, key: `love-the-smiths-ai/assets/${name}` })),
].filter(item => !only || item.name === only);

for (const { name, key } of uploads) {
  const body = await readFile(path.join(assetDir, name));
  const contentType = name.endsWith('.mp4') ? 'video/mp4' : 'image/webp';
  console.log(`uploading ${key} (${body.length} bytes)`);
  await client.send(new PutObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentLength: body.length,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }), { abortSignal: AbortSignal.timeout(180000) });
  console.log(`uploaded ${key} (${body.length} bytes)`);
}
console.log(`Uploaded ${uploads.length} demo assets to R2.`);
