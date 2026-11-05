# Tiny Desk AI Videos — visual preview branch

This branch turns the former multi-template Zombie Video Lab site into a **single-topic site with a homepage and editorial guides** for `tinydeskaivideos.com`. The reference site informs the dark purple / hot pink visual language, centered hero, split studio and preview, pricing cards, and responsive layout. The studio preview plays a fixed reference sample from R2; the concert artwork is original concept art, not a generated result.

## Current state

- The homepage lets visitors preview a portrait locally, switch between planned 480p ($5.99) and 720p ($8.99) prices, and inspect the concept preview, pricing and FAQs.
- **Video generation and purchase are not wired to the new Tiny Desk product.** The button is disabled; no portrait is sent from the homepage and no Stripe checkout is offered here. Do not turn on payment until the product, prompt, provider workflow, sample output, safety and legal pages have been updated and verified.
- Former zombie/tiptoeing public pages and old legal drafts were removed from this branch. Tiny Desk-specific `/about`, `/contact`, `/privacy`, `/terms`, `/acceptable-use`, `/refund-policy`, and `/security` pages now describe the current preview, and six editorial guides live under `/blog`. Illustrations are concept artwork; the sample video is a reference, not a visitor-generated result. The existing backend/API source is retained for later adaptation; legacy checkout is disabled by default with `TINY_DESK_CHECKOUT_ENABLED=false`. Do not enable it until the product and checkout are replaced.
- This is an unofficial Tiny Desk-inspired concept, not an NPR product.

## Local checks

Run `npm run dev`, `npm run typecheck`, `npm run build`, and `node --test tests/tiny-homepage.test.cjs`. Next may retain generated route types under `.next` or `.next-dev` after deleting pages; run `npx next typegen` and start the dev server once to refresh both caches before typechecking. Compare desktop and mobile layouts in the browser.

Canonical, sitemap, and robots URLs are pinned to `https://tinydeskaivideos.com` on this branch, even if a deployment retains an old site URL environment variable. Review database and old API routes separately before enabling generation or checkout. The footer links to preview-specific legal and contact pages. Before enabling payment, replace the temporary published contact email with a verified support mailbox for this domain, verify the legal merchant name and location, and update checkout, fulfillment, privacy and refund terms to reflect the live product. Do not enable the retained legacy checkout by changing its environment flag alone.

## Stripe website/application preparation (before enabling payments)

Stripe's website checklist: https://docs.stripe.com/get-started/checklist/website. These items are **not yet satisfied by the preview**:

- Verify the business/legal merchant name, registration country and (if applicable) business address. Publish accurate business identity and a real reachable support email for this domain; add another direct contact channel if available. The temporary public email on the legal pages currently belongs to the related existing site and must be verified by the owner.
- Implement and test the actual Tiny Desk product first; clarify what one purchase includes (duration, resolution, audio rights, format), whether and how the user receives a download, delivery window, what happens after failure, and access/retention periods. Do not re-enable the zombie-product checkout by toggling `TINY_DESK_CHECKOUT_ENABLED` alone.
- Display final amounts **with USD currency** before checkout, identify whether these are one-time purchases, disclose applicable taxes and any restrictions. Do not show card brands or a live checkout claim until the real payment flow supports them.
- Replace the preview-only Refund & delivery page with an actionable paid-order policy: cancellation eligibility, refund reasons and request channel, treatment of duplicate charges/non-delivery, delivery expectations and statutory rights. Update Terms and Privacy for the real photo upload, moderation, AI provider, payment, cookies and object retention flows.
- Verify HTTPS, the hosted payment integration, webhook signatures, API access controls and safety policies in the production deployment. Confirm any required PCI obligations with Stripe rather than asserting compliance prematurely.
- Check domain, public pages, email deliverability, price/product descriptions and working checkout in the production environment before submitting the site for review. Publishing this preview alone does **not** guarantee approval.

## Brand assets

The header's original pink/purple microphone and gold sparkle mark is now stored as a real vector image. `public/logo.svg` is the canonical source; header and footer share it, including the blog and legal pages. Its microphone paths derive from Lucide; attribution is in `public/logo-license.txt`.

| Asset | Public URL (after deployment) |
| --- | --- |
| Vector logo | https://tinydeskaivideos.com/logo.svg |
| Transparent PNG, 512 x 512 | https://tinydeskaivideos.com/logo.png |
| Transparent PNG, 192 x 192 | https://tinydeskaivideos.com/logo-192.png |
| Transparent PNG, 512 x 512 | https://tinydeskaivideos.com/logo-512.png |
| Transparent PNG, 1024 x 1024 | https://tinydeskaivideos.com/logo-1024.png |
| Browser SVG icon | https://tinydeskaivideos.com/icon.svg |
| Browser ICO (16/32/48 px) | https://tinydeskaivideos.com/favicon.ico |
| Apple touch icon, 180 x 180 | https://tinydeskaivideos.com/apple-icon.png |
| Social sharing image, 1200 x 630 | https://tinydeskaivideos.com/social-preview.png |

After editing the SVG, regenerate raster assets and app icons with `node scripts/generate-brand-assets.mjs`. Next.js automatically registers the icon files in `src/app/`; the layout registers the social preview for Open Graph and Twitter. These files are served by the site itself and require no bucket upload. A deployment is required before changed URLs serve the new assets. Stripe branding is configured separately in the Stripe dashboard; the transparent 512 or 1024 PNG is available for that purpose.

## Tiny Desk database

This website uses the isolated PostgreSQL **schema** `tinydeskaivideo_pro` inside the `postgres` database (not a separate SQL database). `DATABASE_PRO_NAME`, `DATABASE_PRO_URL` (pool 6543), and `DIRECT_PRO_URL` (session 5432) in the untracked `.env.local` must all target that schema; both URLs must include `schema=tinydeskaivideo_pro` and `sslmode=require`. Never commit these URLs. The server-side pool rejects missing or mismatched schema settings. Set the same correct URL and name in the Tiny Desk deployment's environment settings; do not copy the old Zombie site database URL or Stripe keys. Keep `TINY_DESK_CHECKOUT_ENABLED=false` until the Tiny Desk payment/generation workflow is independently implemented and checked.

`npm run db:migrate` uses the *direct* URL and applies only `tiny-desk-*` SQL migrations, idempotently adding 11 tables and the planned Tiny Desk $5.99/$8.99 catalog rows. It does **not** import customer data, zombie products, video jobs, prompt rows, Stripe mappings, or enable checkout. Legacy SQL files remain in the repository for reference but are **not** run by this site's migration. The old `scripts/configure-stripe-products.mjs` and `scripts/update-720p-live-price-20261017.sql` are legacy and **must not** be run for Tiny Desk; replace them when building checkout.

For GSC, the live sitemap is `https://tinydeskaivideos.com/sitemap.xml` and robots.txt already links to it. The sitemap has the home page, blog landing page, seven info/legal pages and six blog articles; it does not include removed `/video/` landing pages. Submit the sitemap URL in Search Console for the verified `tinydeskaivideos.com` property; GSC indexing is not immediate and is not guaranteed.
