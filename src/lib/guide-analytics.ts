// Lightweight allow-list: never send a private order URL or the article bodies to analytics.
const guideSlugs = new Set(["outstanding-tiny-desk-original-video","what-song-is-in-the-tiny-desk-ai-meme","tiny-desk-ai-video-guide","tiny-desk-ai-trend-explained","tiny-desk-ai-photo-tips","tiny-desk-ai-prompt-ideas","tiny-desk-ai-music-lip-sync","tiny-desk-ai-filter-pricing","best-tiny-desk-ai-video-generator","put-yourself-in-the-tiny-desk-meme","outstanding-meme-with-friends","multiple-photos-tiny-desk-concert-video","free-tiny-desk-ai-video-generator","easiest-tiny-desk-ai-meme-website","tiny-desk-outstanding","how-to-make-tiny-desk-ai-video-on-phone","download-tiny-desk-ai-video","tiny-desk-ai-video-formats","how-to-make-the-outstanding-meme","outstanding-meme-ai","how-to-make-tiny-desk-ai-video-with-music","how-to-create-tiny-desk-ai-concert-from-one-photo","how-to-make-outstanding-meme-with-template","how-to-make-tiny-desk-ai-video-for-instagram-and-youtube"]);
export function guideCtaEvent(pathname: string, href: string) {
 const slug = pathname.startsWith('/blog/') ? pathname.slice(6) : '';
 if (!guideSlugs.has(slug) || !['/#studio', '#studio'].includes(href)) return null;
 return { guide_slug: slug, cta_target: 'studio' };
}
