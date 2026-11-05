import sharp from "sharp";
import { validatePhotos, validatePhotoBytes } from "./photo-validation";

/** Decode before payment. A padded provider-ready portrait preserves the entire source face.
 * Upscaling small demos improves API compatibility, not source image detail.
 */
export async function normalizeTinyPortrait(file: File): Promise<File> {
  validatePhotos([file], { min: 1, max: 1 });
  await validatePhotoBytes(file);
  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const options = { limitInputPixels: 20_000_000, failOn: "error" as const, animated: false };
    const metadata = await sharp(bytes, options).metadata();
    const w = metadata.width ?? 0, h = metadata.height ?? 0;
    if (Math.min(w, h) < 128 || Math.max(w, h) / Math.min(w, h) > 4 || (metadata.pages ?? 1) > 1) {
      throw new Error("Photo must be a single portrait, at least 128 pixels on each side, with aspect ratio between 1:4 and 4:1.");
    }
    const out = await sharp(bytes, options).rotate().flatten({ background: "#ffffff" })
      .resize(768, 768, { fit: "contain", background: "#ffffff" })
      .jpeg({ quality: 90, mozjpeg: true }).toBuffer();
    if (out.length > 1_800_000) throw new Error("Photo could not be optimized. Please choose another image.");
    return new File([new Uint8Array(out)], "portrait.jpg", { type: "image/jpeg" });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Photo ")) throw error;
    throw new Error("Photo could not be decoded safely. Use a valid JPG, PNG or WebP portrait.");
  }
}
