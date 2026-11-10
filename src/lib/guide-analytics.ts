// Lightweight allow-list: never send a private order URL or the article bodies to analytics.
const guideSlugs = new Set(["what-is-the-i-love-the-smiths-meme", "is-i-love-the-smiths-from-500-days-of-summer", "i-love-the-smiths-ai-music-and-lyrics", "i-love-the-smiths-ai-video-generator-explained", "how-to-make-i-love-the-smiths-ai-video", "i-love-the-smiths-ai-two-photo-roles", "i-love-the-smiths-ai-photo-tips", "i-love-the-smiths-ai-video-length-and-format", "how-to-make-i-love-the-smiths-ai-video-for-tiktok-reels", "download-and-share-i-love-the-smiths-ai-video", "i-love-the-smiths-ai-vs-capcut-template", "i-love-the-smiths-ai-price-and-free-options", "i-love-the-smiths-ai-photo-privacy-and-consent"]);
export function guideCtaEvent(pathname: string, href: string) {
 const slug = pathname.startsWith('/blog/') ? pathname.slice(6) : '';
 if (!guideSlugs.has(slug) || !['/#studio', '#studio'].includes(href)) return null;
 return { guide_slug: slug, cta_target: 'studio' };
}
