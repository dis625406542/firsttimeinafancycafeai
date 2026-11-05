import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { TinyGuides } from "@/components/tiny-guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Fancy Cafe AI Guides | " + SITE_NAME;
const description = "Understand the Your First Time in a Fancy Cafe meme. Learn how photo roles, AI generation, music, pricing and private video downloads work.";
const image = { url: "/fancy-cafe-ai/generated-with-caption-poster.webp", alt: "Frame from a labeled AI-generated Fancy Cafe example" };
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
