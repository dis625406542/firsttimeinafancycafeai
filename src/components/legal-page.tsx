import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { CONTACT_EMAIL, LEGAL_UPDATED, LegalBody, legalContent, legalLinks } from "@/lib/legal-content";

type Slug = keyof typeof legalContent;
export function LegalPage({ slug }: { slug: Slug }) {
  const policy = legalContent[slug];
  return <div className="tiny-site"><SiteHeader /><main className="tiny-legal-main" id="main-content">
    <div className="tiny-legal-container">
      <div className="tiny-legal-top"><a href="/" className="tiny-legal-back"><ArrowLeft size={16} /> Back to the studio</a><span>INDEPENDENT · UNOFFICIAL</span></div>
      <div className="tiny-legal-hero"><p className="tiny-legal-eyebrow">✦ {policy.eyebrow}</p><h1>{policy.title}</h1><p className="tiny-legal-intro">{policy.description}</p><p className="tiny-legal-date">Last updated: {LEGAL_UPDATED}</p></div>
      <div className="tiny-legal-layout"><aside className="tiny-legal-sidebar"><p>INFORMATION</p><nav aria-label="Legal and information pages">{legalLinks.map(({ slug: target, label }) => <a key={target} href={`/${target}`} aria-current={target === slug ? "page" : undefined}>{label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</nav><div className="tiny-legal-sidebar-note">Questions about this site?<br/><a href={`mailto:${CONTACT_EMAIL}`}>Email support →</a></div></aside>
      <article className="tiny-legal-article"><div className="tiny-legal-notice"><span aria-hidden="true">✧</span><p><strong>Before ordering:</strong> The studio creates a 24-second video using one required and one optional adult portrait. Orders proceed only when checkout is available and the reference assets and delivery are verified.</p></div><LegalBody sections={policy.sections} /><div className="tiny-legal-help"><Mail size={20} aria-hidden="true" /><div><strong>Need help or want to report an issue?</strong><p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and mention lovethesmithsai.com.</p></div></div></article></div>
    </div></main><SiteFooter /></div>;
}
