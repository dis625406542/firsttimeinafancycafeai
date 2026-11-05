import { ArrowRight } from "lucide-react";
import { allTinyGuides, tinyGuides, featuredTinyGuides, type TinyGuide } from "@/lib/tiny-guides";
function GuideCards({ guides }: { guides: TinyGuide[] }) {
 return <div className="tiny-guide-grid">{guides.map(guide => <article className="tiny-guide-card" key={guide.slug}><a href={"/blog/" + guide.slug} aria-label={"Read " + guide.title}><div className={"tiny-guide-image " + guide.imageClass}><img src={guide.image} alt={guide.imageAlt} width={600} height={338} loading="lazy" decoding="async" /><span>{guide.imageBadge}</span></div><div className="tiny-guide-body"><p className="tiny-guide-meta">Updated <time dateTime={guide.updatedAt}>{guide.updatedAt}</time> · {guide.minutes}</p><h3>{guide.title}</h3><p>{guide.description}</p><span className="tiny-guide-read">Read the guide <ArrowRight size={18} /></span></div></a></article>)}</div>;
}
export function TinyGuides({ compact = false, includeLanding = false }: { compact?: boolean; includeLanding?: boolean }) {
 const groups = ["The meme & music", "Getting started", "Making & saving", "Questions & answers"];
 return <section id="guides" className={"tiny-section tiny-guides " + (compact ? "tiny-guides-home" : "")} aria-labelledby="guides-title">
  <div className="tiny-guides-head"><div><span className="tiny-kicker">THE JOURNAL</span>{compact ? <h2 id="guides-title">Fancy Cafe AI <em>guides.</em></h2> : <h1 id="guides-title">Fancy Cafe AI <em>guides.</em></h1>}<p>Understand the wrong-seat meme, choose your two roles, prepare photos and learn how the video workflow works.</p></div>{compact && <a href="/blog" className="tiny-guides-all">All guides <ArrowRight size={18} /></a>}</div>
  {includeLanding ? <><nav className="tiny-guide-categories" aria-label="Guide topics">{groups.map((group, index) => <a key={group} href={"#guide-topic-" + index}>{group}</a>)}</nav>{groups.map((group, index) => <section className="tiny-guide-group" id={"guide-topic-" + index} key={group}><h2>{group}</h2><GuideCards guides={allTinyGuides.filter(guide => guide.category === group)} /></section>)}</> : <GuideCards guides={compact ? featuredTinyGuides : tinyGuides} />}
 </section>;
}
