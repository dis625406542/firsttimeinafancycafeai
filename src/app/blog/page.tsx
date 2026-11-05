import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { TinyGuides } from "@/components/tiny-guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Tiny Desk AI Guides | " + SITE_NAME;
const description = "Find the Outstanding song and original concert, compare video workflows, and learn how to create, personalize and download a Tiny Desk AI video.";
const image = { url: "/tiny-band/guides/guide-01.webp", alt: "Tiny Desk AI reference video frames" };
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: SITE_URL + "/blog", siteName: SITE_NAME, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export default function BlogPage() {
  return <div className="tiny-site"><SiteHeader /><main className="tiny-blog-main"><TinyGuides includeLanding /></main><SiteFooter /></div>;
}
