import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { legalLinks } from "@/lib/legal-content";
import { allTinyGuides } from "@/lib/tiny-guides";

export default function sitemap(): MetadataRoute.Sitemap {
 const latestArticle = allTinyGuides.map(guide => guide.updatedAt).sort().at(-1);
 return [
  // Homepage includes guide cards: a guide revision also updates visible homepage content.
  { url: SITE_URL, lastModified: latestArticle, changeFrequency: "weekly", priority: 1 },
  { url: SITE_URL + "/blog", lastModified: latestArticle, changeFrequency: "weekly", priority: 0.7 },
  // Omit lastModified where a reliable per-policy revision date is not tracked.
  ...legalLinks.map(({ slug }) => ({ url: SITE_URL + "/" + slug, changeFrequency: "monthly" as const, priority: 0.4 })),
  ...allTinyGuides.map(({ slug, updatedAt }) => ({ url: SITE_URL + "/blog/" + slug, lastModified: updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
 ];
}
