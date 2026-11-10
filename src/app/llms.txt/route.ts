import { SITE_URL, SITE_NAME } from "@/lib/site";
import { allTinyGuides } from "@/lib/tiny-guides";
export const dynamic = "force-static";
// Discovery summary only; not an indexing requirement or a ranking guarantee.
export async function GET() {
 const lines = [
  `# ${SITE_NAME}`, "", "> I Love The Smiths AI: an independent two-photo elevator meet-cute video studio. Upload portraits, choose a format and generate a short AI video inspired by the meme.", "",
  "## Facts", "- The scene is inspired by the (500) Days of Summer elevator meet-cute: one person wears headphones, the other recognizes the music and says “I love the Smiths.”",
  "- Required: one consenting adult portrait for Photo 1, the headphone listener. Optional: a second adult portrait for Photo 2, the person who says the line.",
  "- The finished video is 24 seconds, delivered as a private MP4 in 480p or 720p and 9:16 or 16:9.",
  "- Output format: 480p or 720p, 9:16 or 16:9. Exact likeness and motion are not guaranteed; this is a new AI-generated scene, not a face swap or official film clip.",
  "- Listed one-time prices: USD 6.99 / 9.99. No free personalized render, credit pack or subscription.",
  "- Checkout availability depends on live studio status. Public galleries use frames from our demo videos, not customer results.",
  "- The pipeline merges a configured reference soundtrack after silent visual generation. Made for personal entertainment and non-commercial social sharing. No commercial-use license is included, and the original commercial recording should not be assumed. Personal sharing must respect music and portrait rights and platform rules.",
  "- Completed-video access is intended for up to 30 days. Keep the same browser and download your own copy.",
  "- Verified technical failures may qualify for redelivery or a discretionary refund. After successful delivery, subjective dissatisfaction alone does not guarantee a refund. Statutory rights remain unaffected.",
  "- Independent and unofficial. Not affiliated with (500) Days of Summer, its actors or rights holders, The Smiths, TikTok, CapCut, Media.io or the original meme creators.", "", "## Pages", `- [Studio](${SITE_URL}): Choose two portraits and a format; check checkout availability and the final price.`,
  ...allTinyGuides.map(g=>`- [${g.title}](${SITE_URL}/blog/${g.slug}): ${g.description}`), "",
 ];
 return new Response(lines.join("\n"),{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=86400"}});
}
