import "server-only";

import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Server-only credentials. Never expose an API that signs an arbitrary visitor-supplied key.
function getR2Config() {
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
  const bucket = process.env.R2_BUCKET_NAME?.trim();
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) return null;
  if (!/^[a-f0-9]{32}$/i.test(accountId)) throw new Error("Invalid R2 account configuration");
  // Jurisdictional buckets reject requests sent to the global endpoint.
  const jurisdiction = process.env.R2_JURISDICTION?.trim().toLowerCase() || "global";
  if (!["global", "us", "eu", "fedramp"].includes(jurisdiction)) throw new Error("Invalid R2 jurisdiction configuration");
  return { accountId, accessKeyId, secretAccessKey, bucket, jurisdiction };
}

function r2Client(config: NonNullable<ReturnType<typeof getR2Config>>) {
  return new S3Client({
    region: "auto",
    forcePathStyle: true,
    // Body-less presigning must not sign the empty-body CRC32 for a later MP4 PUT.
    requestChecksumCalculation: "WHEN_REQUIRED",
    endpoint: `https://${config.accountId}.${config.jurisdiction === "global" ? "" : `${config.jurisdiction}.`}r2.cloudflarestorage.com`,
    credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
  });
}

export async function getDemoVideoObject() {
  const config = getR2Config();
  if (!config) return null;
  return r2Client(config).send(new GetObjectCommand({
    Bucket: config.bucket,
    Key: process.env.R2_DEMO_VIDEO_KEY?.trim() || "demo1.mp4",
  }));
}

export async function getDemoVideoSource() {
  const config = getR2Config();
  if (!config) return null;
  const client = r2Client(config);
  const expiresIn = 3600;
  const url = await getSignedUrl(client, new GetObjectCommand({
    Bucket: config.bucket,
    Key: process.env.R2_DEMO_VIDEO_KEY?.trim() || "demo1.mp4",
    ResponseContentType: "video/mp4",
    ResponseContentDisposition: "inline",
  }), { expiresIn });
  return { url, expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString() };
}

// Generated files are private; only a server-controlled key derived from a random video code is accepted.
export async function putGeneratedVideo(code: string, body: Buffer) {
  const config = getR2Config();
  if (!config) throw new Error("R2 credentials are missing.");
  if (!/^[A-F0-9]{32}$/.test(code)) throw new Error("Invalid video code.");
  const key = `fancy-cafe-ai/generated/${code}.mp4`;
  await r2Client(config).send(new PutObjectCommand({
    Bucket: config.bucket, Key: key, Body: body, ContentType: "video/mp4",
    CacheControl: "private, no-store",
  }), { abortSignal: AbortSignal.timeout(90000) });
  return key;
}
export async function deleteGeneratedVideo(key: string) {
  const config = getR2Config();
  if (!config || !/^fancy-cafe-ai\/generated\/[A-F0-9]{32}\.mp4$/.test(key)) throw new Error("Invalid stored video key.");
  await r2Client(config).send(new DeleteObjectCommand({ Bucket: config.bucket, Key: key }), { abortSignal: AbortSignal.timeout(10000) });
}
export async function getGeneratedVideoUrl(key: string, download = false) {
  const config = getR2Config();
  if (!config || !/^fancy-cafe-ai\/generated\/[A-F0-9]{32}\.mp4$/.test(key)) throw new Error("Private video unavailable.");
  return getSignedUrl(r2Client(config), new GetObjectCommand({
    Bucket: config.bucket, Key: key, ResponseContentType: "video/mp4",
    ResponseContentDisposition: download ? "attachment; filename=i-love-the-smiths-ai-video.mp4" : "inline",
  }), { expiresIn: 300 });
}

export function storageConfigured() { return !!getR2Config(); }
export type InputPhoto = { key: string; type: string; slot?: string };
function inputConfig(key: string) {
  const config = getR2Config();
  if (!config || !/^fancy-cafe-ai\/inputs\/[A-F0-9]{32}\/[0-1]-[0-9a-f-]{36}\.image$/.test(key)) throw new Error("Private input unavailable.");
  return config;
}
export async function putInputPhoto(order: string, index: number, file: File, slot?: string): Promise<InputPhoto> {
  const key = `fancy-cafe-ai/inputs/${order}/${index}-${crypto.randomUUID()}.image`;
  const config = inputConfig(key);
  await r2Client(config).send(new PutObjectCommand({ Bucket: config.bucket, Key: key, Body: Buffer.from(await file.arrayBuffer()), ContentType: file.type, CacheControl: "private, no-store" }));
  return slot ? { key, type: file.type, slot } : { key, type: file.type };
}
export async function readInputPhotos(photos: InputPhoto[]) {
  if (photos.length < 1 || photos.length > 2) throw new Error("One or two saved photos are required.");
  return Promise.all(photos.map(async (photo, i) => {
    const config = inputConfig(photo.key);
    const result = await r2Client(config).send(new GetObjectCommand({Bucket: config.bucket, Key: photo.key}));
    if (!result.Body || (result.ContentLength ?? 0) > 10 * 1024 * 1024) throw new Error("Saved photo unavailable.");
    return new File([Uint8Array.from(await result.Body.transformToByteArray()).buffer], `portrait-${i}.image`, {type: photo.type});
  }));
}
export async function deleteInputPhotos(photos: InputPhoto[]) {
  await Promise.all(photos.map(async ({key}) => {
    const config = inputConfig(key);
    await r2Client(config).send(new DeleteObjectCommand({Bucket:config.bucket,Key:key}));
  }));
}

// Public demo only. The key is fixed server-side; no user-supplied object keys.
export async function getTinyDeskSampleObject(range?: string) {
  const config = getR2Config();
  if (!config) return null;
  return r2Client(config).send(new GetObjectCommand({
    Bucket: config.bucket,
    Key: "tiny-desk-ai/sample-dogs.mp4",
    ...(range ? { Range: range } : {}),
  }));
}
export const TINY_REFERENCE_KEY = "tiny-desk-ai/v2/reference-first15-silent.mp4";
export const TINY_REFERENCE_V3_KEY = "tiny-desk-ai/v3/reference-first15-silent.mp4";
export function tinyReferenceKey(version: string) {
  if (version === "fancy-cafe-v1") return process.env.FANCY_CAFE_V1_REFERENCE_KEY || "fancy-cafe-ai/v1/reference-first15-silent.mp4";
  if (version === "fancy-cafe-v2") return cafeAssetKey("FANCY_CAFE_REFERENCE_KEY", "v2");
  if (version === "tiny-desk-v2" || version === "tiny-desk-v4") return TINY_REFERENCE_KEY;
  if (version === "tiny-desk-v3") return TINY_REFERENCE_V3_KEY;
  throw new Error("Unknown Tiny Desk reference version.");
}
export const TINY_AUDIO_KEY = "tiny-desk-ai/v2/soundtrack-first15.mp3";
export function cafeAssetKey(name: "FANCY_CAFE_REFERENCE_KEY" | "FANCY_CAFE_AUDIO_KEY", version = "v2") {
  const key = process.env[name]?.trim();
  if (!key || !new RegExp(`^fancy-cafe-ai/${version}/[a-zA-Z0-9._-]+$`).test(key)) throw new Error("Cafe assets are not configured.");
  return key;
}
function soundtrackKey(version: string) { return version === "fancy-cafe-v1" ? "fancy-cafe-ai/v1/soundtrack-first15.mp3" : version === "fancy-cafe-v2" ? cafeAssetKey("FANCY_CAFE_AUDIO_KEY", "v2") : TINY_AUDIO_KEY; }
function compositionConfig(id: string) {
  const config=getR2Config();
  if(!config || !/^[A-F0-9]{32}-[a-f0-9]{16}$/.test(id)) throw new Error("Invalid composition configuration.");
  return config;
}
export async function checkTinyAssets(version: string) {
  const config=getR2Config();if(!config)throw new Error("R2 unavailable.");
  for(const Key of [tinyReferenceKey(version),soundtrackKey(version)]) {
    const head=await r2Client(config).send(new HeadObjectCommand({Bucket:config.bucket,Key}),{abortSignal:AbortSignal.timeout(10000)});
    if(!head.ContentLength)throw new Error("The versioned reference or soundtrack is missing from private storage.");
  }
}
export async function readTinyReference(version: string) {
  const config=getR2Config();if(!config)throw new Error("R2 unavailable.");
  const r=await r2Client(config).send(new GetObjectCommand({Bucket:config.bucket,Key:tinyReferenceKey(version)}),{abortSignal:AbortSignal.timeout(30000)});
  if(!r.Body || !r.ContentLength || r.ContentLength>50*1024*1024)throw new Error("Tiny Desk reference unavailable.");
  return r.Body.transformToByteArray();
}
function compositionSignal(signal:AbortSignal|undefined,timeout:number) {
  return signal ? AbortSignal.any([signal,AbortSignal.timeout(timeout)]) : AbortSignal.timeout(timeout);
}
export async function compositionOutput(id: string, signal?: AbortSignal) {
  const config=compositionConfig(id),key=`fancy-cafe-ai/generated/${id.split("-")[0]}.mp4`;
  try {
    const r=await r2Client(config).send(new HeadObjectCommand({Bucket:config.bucket,Key:key}),{abortSignal:compositionSignal(signal,10000)});
    return r.Metadata?.composition===id && (r.ContentLength??0)>0 ? key : null;
  } catch(error) {if((error as { $metadata?: {httpStatusCode?:number} }).$metadata?.httpStatusCode===404)return null;throw error;}
}
export async function stageComposition(id:string,body:()=>Promise<Buffer>,signal?:AbortSignal) {
  const config=compositionConfig(id),Key=`fancy-cafe-ai/composition-inputs/${id}.mp4`,client=r2Client(config);
  try {const r=await client.send(new HeadObjectCommand({Bucket:config.bucket,Key}),{abortSignal:compositionSignal(signal,10000)});if(r.ContentLength)return;}
  catch(error){if((error as {$metadata?:{httpStatusCode?:number}}).$metadata?.httpStatusCode!==404)throw error;}
  await client.send(new PutObjectCommand({Bucket:config.bucket,Key,Body:await body(),ContentType:"video/mp4",CacheControl:"private, no-store"}),{abortSignal:compositionSignal(signal,90000)});
}
export async function compositionUrls(id:string, version = "tiny-desk-v4") {
  const config=compositionConfig(id),client=r2Client(config),Bucket=config.bucket,expiresIn=3600;
  const get=(Key:string)=>getSignedUrl(client,new GetObjectCommand({Bucket,Key}),{expiresIn});
  const outputUrl=await getSignedUrl(client,new PutObjectCommand({Bucket,Key:`fancy-cafe-ai/generated/${id.split("-")[0]}.mp4`,ContentType:"video/mp4",Metadata:{composition:id}}),{expiresIn,unhoistableHeaders:new Set(["x-amz-meta-composition"])});
  return {videoUrl:await get(`fancy-cafe-ai/composition-inputs/${id}.mp4`),audioUrl:await get(soundtrackKey(version)),outputUrl};
}
export async function deleteCompositionInput(id:string) {
  const config=compositionConfig(id);
  await r2Client(config).send(new DeleteObjectCommand({Bucket:config.bucket,Key:`fancy-cafe-ai/composition-inputs/${id}.mp4`}),{abortSignal:AbortSignal.timeout(10000)});
}
