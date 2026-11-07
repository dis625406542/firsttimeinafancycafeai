import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/google-analytics";
import { JsonLd } from "@/components/json-ld";
import { gaMeasurementId } from "@/lib/analytics";
import { DESCRIPTION, SITE_NAME, SITE_URL, TITLE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: SITE_URL, siteName: SITE_NAME, type: "website", images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "Fancy Cafe AI — One wrong seat. One unforgettable cafe moment." }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [{ url: "/social-preview.png", alt: "Fancy Cafe AI — One wrong seat. One unforgettable cafe moment." }] },
  robots: { index: true, follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = gaMeasurementId();
  return <html lang="en"><head>
    {/* Queue consent and configuration before the async Google library can execute. */}
    {gaId && <>
      <script id="ga4-config" dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});gtag('js',new Date());gtag('config','${gaId}',{send_page_view:false,page_location:window.location.origin+window.location.pathname});` }} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    </>}
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", "@id": SITE_URL + "#organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/logo.png` }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", "@id": SITE_URL + "#website", name: SITE_NAME, url: SITE_URL, publisher: { "@id": SITE_URL + "#organization" } }} />
  </head><body>{children}<GoogleAnalytics /></body></html>;
}
