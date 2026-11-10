import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { TinyGuides } from "@/components/tiny-guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "I Love The Smiths AI Guides";
const description = "Understand the I Love The Smiths AI meme. Find direct answers on the two photo roles, elevator meet-cute details, video format, pricing and private MP4 downloads.";
const image = { url: "/social-preview.png", alt: "I Love The Smiths AI — two photos, one elevator meet-cute" };
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
