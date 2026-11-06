import { SITE_URL, SITE_NAME } from "@/lib/site";
import { allTinyGuides } from "@/lib/tiny-guides";
export const dynamic = "force-static";
// Discovery summary only; not an indexing requirement or a ranking guarantee.
export async function GET() {
 const lines = [
  `# ${SITE_NAME}`, "", "> Your First Time in a Fancy Cafe AI: an independent wrong-seat meme video studio. Create a personalized 20-second cafe video with your own portraits.", "",
  "## Facts", "- The protagonist mistakes a round table for a seat. A cafe regular demonstrates the bench; the protagonist quietly corrects the mistake.",
  "- Required: one consenting adult portrait for the protagonist. Optional: a second adult portrait for the regular.",
  "- Output format: 20 seconds, 480p or 720p, 9:16 or 16:9. Exact likeness and motion are not guaranteed.",
  "- Listed one-time prices: USD 6.99 / 9.99. No free personalized render, credit pack or subscription.",
  "- Checkout availability depends on live studio status. The example gallery labels one AI-generated result and two reference clips; results can vary.",
  "- The completed 20-second MP4 includes the original music from the Fancy Cafe reference video, merged after silent visual generation. No separate commercial music license is granted.",
  "- Completed-video access is intended for up to 30 days. Keep the same browser and download your own copy.",
  "- Verified technical failures may qualify for redelivery or a discretionary refund. After successful delivery, subjective dissatisfaction alone does not guarantee a refund. Statutory rights remain unaffected.",
  "- Independent of TikTok, CapCut, Media.io and the original creators.", "", "## Pages", `- [Studio](${SITE_URL}): Choose portraits and formats; check checkout availability and final price.`,
  ...allTinyGuides.map(g=>`- [${g.title}](${SITE_URL}/blog/${g.slug}): ${g.description}`), "",
 ];
 return new Response(lines.join("\n"),{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=86400"}});
}
