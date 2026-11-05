import { SITE_URL, SITE_NAME } from "@/lib/site";
import { allTinyGuides } from "@/lib/tiny-guides";
export const dynamic = "force-static";
// Discovery summary only; not an indexing requirement or a ranking guarantee.
export async function GET() {
 const lines = [
  `# ${SITE_NAME}`, "", "> Your First Time in a Fancy Cafe AI: an independent wrong-seat meme video studio. Currently in preview.", "",
  "## Facts", "- The protagonist mistakes a round table for a seat. A cafe regular demonstrates the bench; the protagonist quietly corrects the mistake.",
  "- Required: one consenting adult portrait for the protagonist. Optional: a second adult portrait for the regular.",
  "- Planned output: 15 seconds, 480p or 720p, 9:16 or 16:9. Exact likeness and motion are not guaranteed.",
  "- Planned one-time prices: USD 5.99 / 8.99. No free personalized render, credit pack or subscription.",
  "- Checkout is closed until cafe reference assets are approved. Current images and video demos are labeled legacy placeholders, not cafe results.",
  "- Silent model generation; separately authorized audio only. No promise of the original song.",
  "- Completed-video access is intended for up to 30 days. Keep the same browser and download your own copy.",
  "- Independent of TikTok, CapCut, Media.io and the original creators.", "", "## Pages", `- [Studio](${SITE_URL}): Preview the upload roles and formats.`,
  ...allTinyGuides.map(g=>`- [${g.title}](${SITE_URL}/blog/${g.slug}): ${g.description}`), "",
 ];
 return new Response(lines.join("\n"),{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=86400"}});
}
