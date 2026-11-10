import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export { CONTACT_EMAIL } from "@/lib/site";
export const UPDATED = "November 10, 2026";

export function infoMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url: `${SITE_URL}${path}`, type: "website", siteName: SITE_NAME },
    robots: { index: true, follow: true },
  };
}
