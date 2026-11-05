import { SITE_URL, SITE_NAME } from "@/lib/site";
import { allTinyGuides } from "@/lib/tiny-guides";

export const dynamic = "force-static";

// Experimental discovery summary, not an indexing requirement or a ranking signal.
export async function GET() {
  const pages = [
    { title: "Home — Tiny Desk AI Video Generator", url: SITE_URL, desc: "Turn 1 to 5 adult portraits into a 15-second Outstanding-style concert-inspired AI video." },
    ...allTinyGuides.map(guide => ({ title: guide.title, url: `${SITE_URL}/blog/${guide.slug}`, desc: guide.description })),
  ];
  const lines = [
    `# ${SITE_NAME}`,
    "",
    "> Turn one to five adult portraits into a 15-second Outstanding-style concert-inspired AI video. Independent and unofficial; not affiliated with NPR or Tiny Desk Concerts.",
    "",
    "## Facts",
    "- Start with Lead for the singer; Keys is the front performer in the opening group. Extra roles are optional.",
    "- Upload 1 to 5 adult portraits; each photo must show one consenting adult.",
    "- Output: 15 seconds, fixed soundtrack, 480p or 720p, 9:16 or 16:9.",
    "- Price: one-time $5.99 (480p) or $8.99 (720p) via Stripe; no subscription or credits.",
    "- Exact lip sync and pixel-perfect likeness are not guaranteed.",
    "- Video files are stored privately on the server, with download access for up to 30 days from completion. Keep the original browser and its cookies; browser storage is not a video backup.",
    "- The scene prompt and soundtrack are fixed; there is no custom prompt editor.",
    "",
    "## Pages",
    ...pages.map(page => `- [${page.title}](${page.url}): ${page.desc}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" } });
}
