import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { JsonLd } from "@/components/json-ld";
import { allTinyGuides } from "@/lib/tiny-guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() { return allTinyGuides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
 const { slug } = await params;
 const guide = allTinyGuides.find(guide => guide.slug === slug);
 if (!guide) return {};
 const url = SITE_URL + "/blog/" + slug;
 return {
  title: guide.title + " | " + SITE_NAME, description: guide.description,
  alternates: { canonical: url },
  openGraph: { type: "article", url, siteName: SITE_NAME, title: guide.title, description: guide.description, publishedTime: guide.publishedAt, modifiedTime: guide.updatedAt, images: [{ url: guide.image, alt: guide.imageAlt }] },
  twitter: { card: "summary_large_image", title: guide.title, description: guide.description, images: [{ url: guide.image, alt: guide.imageAlt }] },
 };
}
const displayDate = (date: string) => new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(date + "T00:00:00Z"));
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;
 const guide = allTinyGuides.find(guide => guide.slug === slug);
 if (!guide) notFound();
 const canonical = SITE_URL + "/blog/" + slug;
 const related = guide.related.map(slug => allTinyGuides.find(item => item.slug === slug)).filter(item => item !== undefined);
 return <div className="tiny-site">
  <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", "@id": canonical + "#article", headline: guide.title, description: guide.description, image: SITE_URL + guide.image, mainEntityOfPage: canonical, datePublished: guide.publishedAt, dateModified: guide.updatedAt, inLanguage: "en", author: { "@type": "Organization", "@id": SITE_URL + "#organization", name: SITE_NAME, url: SITE_URL + "/about" }, publisher: { "@type": "Organization", "@id": SITE_URL + "#organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: SITE_URL + "/logo.png" } } }} />
  <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Guides", item: SITE_URL + "/blog" }, { "@type": "ListItem", position: 3, name: guide.title, item: canonical }] }} />
  {guide.faqs?.length ? <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faqs.map(({question, answer}) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }} /> : null}
  <SiteHeader /><main className="tiny-article">
   <nav className="tiny-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog">Guides</a><span aria-hidden="true">/</span><span aria-current="page">{guide.title}</span></nav>
   <article>
    <p className="tiny-kicker">{guide.category}</p><h1>{guide.title}</h1><p className="tiny-article-lead">{guide.description}</p>
    <p className="tiny-guide-meta">By <a href="/about">{SITE_NAME}</a> · Published <time dateTime={guide.publishedAt}>{displayDate(guide.publishedAt)}</time> · Updated <time dateTime={guide.updatedAt}>{displayDate(guide.updatedAt)}</time> · {guide.minutes}</p>
    <aside className="tiny-answer" aria-label="Quick answer"><span className="tiny-kicker">THE SHORT ANSWER</span><p>{guide.answer}</p><a href="/#studio">Open the studio →</a></aside>
    <nav className="tiny-contents" aria-label="On this page"><strong>In this guide</strong><ol>{guide.sections.map((section, index) => <li key={section.heading}><a href={"#section-" + (index + 1)}>{section.heading}</a></li>)}</ol></nav>
    <figure className="tiny-article-cover"><div className={"tiny-article-image tiny-guide-image " + guide.imageClass}><img src={guide.image} alt={guide.imageAlt} width={1200} height={675} /><span>{guide.imageBadge}</span></div><figcaption>Temporary legacy band imagery, not a Fancy Cafe result or a guarantee of output.</figcaption></figure>
    <div className="tiny-article-content">{guide.sections.map((section, index) => <section id={"section-" + (index + 1)} key={section.heading}>
     <h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
     {section.steps && <ol className="tiny-guide-steps">{section.steps.map(step => <li key={step}>{step}</li>)}</ol>}
     {section.bullets && <ul className="tiny-guide-bullets">{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
     {section.table && <div className="tiny-table-scroll" role="region" aria-label={section.table.caption} tabIndex={0}><table><caption>{section.table.caption}</caption><thead><tr>{section.table.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}
     {section.image && <figure className="tiny-guide-figure"><img src={section.image.src} alt={section.image.alt} width={section.image.width} height={section.image.height} loading="lazy" decoding="async" /><figcaption>{section.image.caption}</figcaption></figure>}
     {section.links && <ul className="tiny-guide-links" aria-label="Further reading">{section.links.map(link => <li key={link.href}><a href={link.href}>{link.label} →</a></li>)}</ul>}
    </section>)}
    {guide.faqs?.length ? <section className="tiny-article-faq" aria-labelledby="article-faq-title"><h2 id="article-faq-title">Common questions</h2>{guide.faqs.map(({question, answer}) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section> : null}
    {guide.sources?.length ? <section className="tiny-article-sources" aria-labelledby="article-sources-title"><h2 id="article-sources-title">Sources and further reading</h2><ul>{guide.sources.map(source => <li key={source.href}><a href={source.href} rel="noopener noreferrer">{source.label}</a>{source.note && <p>{source.note}</p>}</li>)}</ul></section> : null}
    <aside className="tiny-editorial-note"><strong>About this guide</strong><p>Written by the team behind this studio. Product instructions describe our upload, checkout and delivery flow; external references are listed where used. This is product guidance, not an independent tool ranking. Reference examples are illustrative. Prices and availability are confirmed at checkout.</p><a href="/contact">Report an unclear or outdated instruction →</a></aside>
    <div className="tiny-article-cta"><strong>Ready to choose your cafe characters?</strong><p>Explore the protagonist and optional cafe regular roles. This studio is in preview; cafe assets must be verified before paid generation opens.</p><a href="/#studio">Preview the studio →</a></div>
    <nav className="tiny-related" aria-label="Related guides"><h2>Keep exploring</h2>{related.map(item => <a key={item.slug} href={"/blog/" + item.slug}><strong>{item.title}</strong><span>{item.description}</span></a>)}</nav>
    </div>
   </article>
  </main><SiteFooter />
 </div>;
}
