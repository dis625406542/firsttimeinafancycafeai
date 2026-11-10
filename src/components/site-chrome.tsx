import { ArrowRight } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { legalLinks } from "@/lib/legal-content";

function BrandIcon() {
  return <img className="tiny-brand-icon" src="/logo.svg" width={34} height={34} alt="" aria-hidden="true" />;
}

export function SiteHeader() {
  return <header className="tiny-header"><div className="tiny-nav-wrap">
    <a className="tiny-brand" href="/" aria-label="I Love The Smiths AI home"><BrandIcon /><span>I Love The Smiths <em>AI</em></span></a>
    <nav className="tiny-nav" aria-label="Main navigation"><a href="/#how-it-works">How it works</a><a href="/#pricing">Pricing</a><a href="/blog">Blog</a><a href="/#faq">FAQ</a></nav>
    <a className="tiny-nav-cta" href="/#studio">Make my video <ArrowRight size={17} aria-hidden="true" /></a>
    <details className="tiny-mobile-menu"><summary aria-label="Open menu">☰</summary><nav aria-label="Mobile navigation"><a href="/#studio">Studio</a><a href="/#how-it-works">How it works</a><a href="/#pricing">Pricing</a><a href="/blog">Blog</a><a href="/#faq">FAQ</a></nav></details>
  </div></header>;
}

export function SiteFooter() {
  return <><div className="tiny-stripe-rule" aria-hidden="true" /><footer className="tiny-footer"><div className="tiny-footer-inner"><div className="tiny-footer-columns">
    <div className="tiny-footer-about"><a className="tiny-brand" href="/" aria-label="I Love The Smiths AI home"><BrandIcon /><span>I Love The Smiths <em>AI</em></span></a><p>Two photos. One elevator. One line. Make a romantic meet-cute video and read practical guides to the meme.</p></div>
    <nav aria-label="I Love The Smiths AI"><h3>I Love The Smiths AI</h3><a href="/#studio">The studio</a><a href="/#how-it-works">How it works</a><a href="/#pricing">Pricing</a><a href="/#faq">FAQ</a><a href="/blog">Blog</a></nav>
    <nav aria-label="Guides"><h3>Guides</h3><a href="/blog/how-to-make-i-love-the-smiths-ai-video">How to make a video</a><a href="/blog/what-is-the-i-love-the-smiths-meme">What is the meme?</a><a href="/blog/i-love-the-smiths-ai-two-photo-roles">Two-photo roles</a><a href="/blog/i-love-the-smiths-ai-photo-tips">Photo tips</a><a href="/blog/i-love-the-smiths-ai-music-and-lyrics">Music &amp; lyrics</a><a href="/blog/i-love-the-smiths-ai-video-length-and-format">Length &amp; format</a><a href="/blog">All guides</a></nav>
    <nav className="tiny-footer-legal" aria-label="Legal and information"><h3>Legal &amp; info</h3>{legalLinks.map(({ slug, label }) => <a key={slug} href={`/${slug}`}>{label}</a>)}<CookieSettingsButton /><p>Independent, unofficial tool. Not affiliated with (500) Days of Summer, its actors or rights holders, The Smiths, TikTok, CapCut, Media.io or the original meme creators.</p></nav>
  </div><p className="tiny-footer-bottom">© {new Date().getFullYear()} I Love The Smiths AI. Independent, unofficial concept. Two-photo AI meet-cute studio. Confirm terms and the 24-second delivery details before ordering.</p></div></footer></>;
}
