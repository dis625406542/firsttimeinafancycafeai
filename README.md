# First Time in a Fancy Cafe AI

Next.js site for **firsttimeinafancycafeai.org**. The existing dark purple/pink design is retained. The cafe template accepts one adult protagonist portrait and an optional adult regular portrait. Old dog media is explicitly labeled temporary illustration, not a cafe result.

## Development and verification

```sh
npm ci
npm run dev
npm run typecheck
node --test tests/*.test.cjs
npm run build
```

Copy `.env.example` to an ignored `.env.local` and supply your own secrets. Do not reuse another site's analytics ID. Existing legacy helper filenames remain for infrastructure compatibility; the public template parser only accepts `fancy-cafe-ai`.

## Database isolation

Use PostgreSQL schema `firsttimeinafancycafeai_pro`. `DATABASE_PRO_NAME` and both database URLs must target this exact schema. Runtime, migration and Stripe catalog scripts reject another site's schema. Never commit database URLs or local MCP credentials.

`npm run db:migrate` applies `src/lib/fancy-cafe.sql` idempotently. It creates 11 tables and seeds the cafe product, 480p/720p plans and `fancy-cafe-v1` prompt without copying customer orders, video jobs or Stripe mappings. Seeds do not overwrite existing rows on subsequent runs.

## Launch status: preview, no payments

Paid generation stays closed by default. Before enabling it:

1. Supply and verify a licensed **15-second silent cafe reference** and a compatible **15-second authorized audio track** in private R2. Do not use the old dog concert assets as cafe generation references.
2. Set `FANCY_CAFE_REFERENCE_KEY` and `FANCY_CAFE_AUDIO_KEY` under `fancy-cafe-ai/v1/`.
3. Verify the model/prompt/reference behavior with real cafe assets before approving them. The workflow requests silent Seedance video then merges audio; automated mocks do not prove visual quality.
4. Configure this site's Stripe product/price mappings separately for test and live keys, webhook, and delivery/retention worker. Planned prices: 480p USD 5.99; 720p USD 8.99; one-time 15-second clips.
5. Confirm the public business identity, site-specific support mailbox (`hello@firsttimeinafancycafeai.org`) and policies are accurate for your operator. No payment-provider approval is promised.
6. Only after review, set `FANCY_CAFE_ASSETS_APPROVED=true` and `FANCY_CAFE_CHECKOUT_ENABLED=true`. The legacy Tiny Desk flag does not enable this site. Provider, billing and asset checks must also pass.

See `.env.example` for provider, R2, email, webhook, cron, FFmpeg and launch settings. `npm run build` verifies media binaries in the build trace; verify the deployed Linux runtime as well before accepting payments.

## SEO and content

Ten question-led original cafe articles live in `src/lib/tiny-guides.ts`. They explain the table/stool gag, creation steps, roles, photos, CapCut differences, failure cases, audio rights, pricing, phone usage and downloads. Search suggestions were sparse/off-topic and Trends timed out: these titles are editorial intent hypotheses, not measured keyword-volume claims.

The sitemap contains 19 canonical entries under the new domain. Submit `/sitemap.xml` to the new domain's Search Console property after deployment. Analytics requires this site's own measurement ID and visitor consent. Homepage FAQ schema mirrors visible answers. `llms.txt` is supplementary documentation, not a ranking guarantee.

## Brand assets

The coffee cup logo keeps the purple/pink palette. `public/logo.svg` is canonical; `node scripts/generate-brand-assets.mjs` regenerates PNG sizes, app icons and the social card. Public routes: `/logo.svg`, `/logo.png`, `/logo-192.png`, `/logo-512.png`, `/logo-1024.png`, `/icon.svg`, `/favicon.ico`, `/apple-icon.png`, `/social-preview.png`.

Research and deployment notes are stored locally in ignored `docs/`. Local MCP tools are ignored under `.codex/`; neither is staged automatically.

## Google Analytics 4

Production defaults to the site-specific `G-RW2PLTLMLG` property when `NEXT_PUBLIC_GA_ID` is unset or empty. An explicit valid ID overrides it; set `NEXT_PUBLIC_GA_ID=off` to disable analytics (recommended for Preview). Local development is disabled unless a valid ID is supplied. Do not add a duplicate GTM installation. The app sends page views after analytics consent. In the GA4 web stream, disable Enhanced Measurement page views based on browser history changes to avoid counting the same client-side navigation twice. Review other automatic events before enabling them on checkout pages. After deployment, accept analytics and check the GA4 Realtime report; code tests alone do not verify data receipt. Rebuild after changing public environment variables.
