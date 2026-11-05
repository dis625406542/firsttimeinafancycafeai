// Lightweight allow-list: never send a private order URL or the article bodies to analytics.
const guideSlugs = new Set(["your-first-time-in-a-fancy-cafe-meme-explained", "how-to-make-first-time-in-a-fancy-cafe-ai-video", "fancy-cafe-ai-two-people", "fancy-cafe-ai-photo-tips", "fancy-cafe-ai-vs-capcut-template", "fix-fancy-cafe-ai-face-and-seat-errors", "fancy-cafe-ai-music-and-captions", "fancy-cafe-ai-price-and-free-options", "how-to-create-fancy-cafe-ai-video-on-phone", "download-fancy-cafe-ai-video", "how-to-make-pov-first-time-in-a-fancy-cafe-ai-video-for-reels"]);
export function guideCtaEvent(pathname: string, href: string) {
 const slug = pathname.startsWith('/blog/') ? pathname.slice(6) : '';
 if (!guideSlugs.has(slug) || !['/#studio', '#studio'].includes(href)) return null;
 return { guide_slug: slug, cta_target: 'studio' };
}
