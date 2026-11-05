import { ArrowRight } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { legalLinks } from "@/lib/legal-content";

function BrandIcon() {
  return <img className="tiny-brand-icon" src="/logo.svg" width={34} height={34} alt="" aria-hidden="true" />;
}

export function SiteHeader() {
  return <header className="tiny-header"><div className="tiny-nav-wrap">
    <a className="tiny-brand" href="/" aria-label="Fancy Cafe AI home"><BrandIcon /><span>Fancy Cafe <em>AI</em></span></a>
    <nav className="tiny-nav" aria-label="Main navigation"><a href="/#how-it-works">How it works</a><a href="/#pricing">Pricing</a><a href="/blog">Blog</a><a href="/#faq">FAQ</a></nav>
    <a className="tiny-nav-cta" href="/#studio">Make my video <ArrowRight size={17} aria-hidden="true" /></a>
    <details className="tiny-mobile-menu"><summary aria-label="Open menu">☰</summary><nav aria-label="Mobile navigation"><a href="/#studio">Studio</a><a href="/#how-it-works">How it works</a><a href="/#pricing">Pricing</a><a href="/blog">Blog</a><a href="/#faq">FAQ</a></nav></details>
  </div></header>;
}

export function SiteFooter() {
  return <footer className="tiny-footer"><div className="tiny-footer-inner"><div className="tiny-footer-columns">
    <div className="tiny-footer-about"><a className="tiny-brand" href="/" aria-label="Fancy Cafe AI home"><BrandIcon /><span>Fancy Cafe <em>AI</em></span></a><p>Your photo. The wrong seat. Explore a two-character AI cafe comedy template and practical guides to the meme.</p></div>
    <nav aria-label="Fancy Cafe AI"><h3>Fancy Cafe AI</h3><a href="/#studio">The studio</a><a href="/#how-it-works">How it works</a><a href="/#pricing">Pricing</a><a href="/#faq">FAQ</a><a href="/blog">Blog</a></nav>
    <nav aria-label="Guides"><h3>Guides</h3><a href="/blog/how-to-make-first-time-in-a-fancy-cafe-ai-video">How to make a video</a><a href="/blog/your-first-time-in-a-fancy-cafe-meme-explained">What is the meme?</a><a href="/blog/fancy-cafe-ai-two-people">Two-person roles</a><a href="/blog/fancy-cafe-ai-photo-tips">Photo tips</a><a href="/blog/fancy-cafe-ai-music-and-captions">Music &amp; captions</a><a href="/blog/fancy-cafe-ai-price-and-free-options">Pricing &amp; free options</a><a href="/blog">All guides</a></nav>
    <nav className="tiny-footer-legal" aria-label="Legal and information"><h3>Legal &amp; info</h3>{legalLinks.map(({ slug, label }) => <a key={slug} href={`/${slug}`}>{label}</a>)}<CookieSettingsButton /><p>Independent, unofficial tool. Not affiliated with TikTok, CapCut, Media.io or the original video creators.</p></nav>
  </div><p className="tiny-footer-bottom">© {new Date().getFullYear()} Fancy Cafe AI. Independent, unofficial concept. Studio preview; check availability before ordering.</p></div></footer>;
}
