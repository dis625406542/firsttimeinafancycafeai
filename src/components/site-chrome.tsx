import { ArrowRight } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { legalLinks } from "@/lib/legal-content";

function BrandIcon() {
  return <img className="tiny-brand-icon" src="/logo.svg" width={34} height={34} alt="" aria-hidden="true" />;
}

export function SiteHeader() {
  return <header className="tiny-header"><div className="tiny-nav-wrap">
    <a className="tiny-brand" href="/" aria-label="Tiny Desk AI Videos home"><BrandIcon /><span>Tiny Desk <em>AI</em> Videos</span></a>
    <nav className="tiny-nav" aria-label="Main navigation"><a href="/#how-it-works">How it works</a><a href="/#pricing">Pricing</a><a href="/blog">Blog</a><a href="/#faq">FAQ</a></nav>
    <a className="tiny-nav-cta" href="/#studio">Make my video <ArrowRight size={17} aria-hidden="true" /></a>
    <details className="tiny-mobile-menu"><summary aria-label="Open menu">☰</summary><nav aria-label="Mobile navigation"><a href="/#studio">Studio</a><a href="/#how-it-works">How it works</a><a href="/#pricing">Pricing</a><a href="/blog">Blog</a><a href="/#faq">FAQ</a></nav></details>
  </div></header>;
}

export function SiteFooter() {
  return <footer className="tiny-footer"><div className="tiny-footer-inner"><div className="tiny-footer-columns">
    <div className="tiny-footer-about"><a className="tiny-brand" href="/" aria-label="Tiny Desk AI Videos home"><BrandIcon /><span>Tiny Desk <em>AI</em> Videos</span></a><p>A cozy concert-inspired moment, with you behind the mic. Our studio turns one to five portraits into a 15-second AI video.</p></div>
    <nav aria-label="Tiny Desk AI Videos"><h3>Tiny Desk AI Videos</h3><a href="/#studio">The studio</a><a href="/#how-it-works">How it works</a><a href="/#pricing">Pricing</a><a href="/#faq">FAQ</a><a href="/blog">Blog</a></nav>
    <nav aria-label="Guides"><h3>Guides</h3><a href="/blog/tiny-desk-ai-video-guide">How to make a video</a><a href="/blog/tiny-desk-ai-trend-explained">About the trend</a><a href="/blog/tiny-desk-ai-photo-tips">Photo tips</a><a href="/blog/tiny-desk-ai-prompt-ideas">Prompt ideas</a><a href="/blog/tiny-desk-ai-music-lip-sync">Music &amp; lip sync</a><a href="/blog/tiny-desk-ai-filter-pricing">Filters &amp; pricing</a><a href="/blog/how-to-make-tiny-desk-ai-video-on-phone">Make it on your phone</a><a href="/blog/download-tiny-desk-ai-video">Download &amp; delivery</a><a href="/blog/tiny-desk-ai-video-formats">Video formats</a><a href="/blog">All guides</a></nav>
    <nav className="tiny-footer-legal" aria-label="Legal and information"><h3>Legal &amp; info</h3>{legalLinks.map(({ slug, label }) => <a key={slug} href={`/${slug}`}>{label}</a>)}<CookieSettingsButton /><p>Independent concept. Not affiliated with NPR or Tiny Desk Concerts. Paid 15-second AI videos from 1 to 5 portraits.</p></nav>
  </div><p className="tiny-footer-bottom">© {new Date().getFullYear()} Tiny Desk AI Videos. Independent, unofficial concept. Paid generation is available in the studio.</p></div></footer>;
}
