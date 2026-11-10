# I Love The Smiths AI

Next.js photo-to-video site for **lovethesmithsai.com**. The public theme is a warm, romantic elevator meet-cute inspired by the "I Love The Smiths" meme: users add two adult portraits and choose a format. The production generator, billing, database and prompts are reused from the original studio; internal identifiers such as `fancy-cafe-ai`, prompt versions, R2 keys and PostgreSQL schema names intentionally remain unchanged.

## Development and verification

```sh
npm ci
npm run dev
npm run typecheck
node --test tests/*.test.cjs
npm run build
```

Copy `.env.example` to an ignored `.env.local` and supply your own secrets. Do not reuse another site's analytics ID. The public template parser only accepts `fancy-cafe-ai`; other template definitions remain for legacy order snapshots.

## Database isolation

Use PostgreSQL schema `firsttimeinafancycafeai_pro` in production and `firsttimeinafancycafeai_test` locally. `DATABASE_PRO_NAME` and both database URLs must target the exact matching schema. Runtime, migration and Stripe catalog scripts reject another site's schema. Never commit database URLs or local MCP credentials.

`npm run db:migrate` applies the existing schema-only SQL idempotently. It does not copy customer orders, video jobs or Stripe mappings. Seeds do not overwrite existing rows on subsequent runs.

## Launch status: preview, no payments

Paid generation stays closed by default. Before enabling it:

1. Supply and verify a licensed silent reference video and a compatible authorized audio track in private R2. Do not use unlicensed commercial recordings.
2. Set `FANCY_CAFE_REFERENCE_KEY` and `FANCY_CAFE_AUDIO_KEY` under the existing private prefixes.
3. Verify the model/prompt/reference behavior with the real approved assets. The workflow requests silent video then merges audio; automated mocks do not prove visual quality.
4. Configure this site's Stripe product/price mappings separately for test and live keys, webhook, and delivery/retention worker. Listed prices: 480p USD 6.99; 720p USD 9.99; one-time clips.
5. Confirm the public business identity, site-specific support mailbox (`hello@lovethesmithsai.com`) and policies are accurate for your operator. No payment-provider approval is promised.
6. Only after review, set `FANCY_CAFE_ASSETS_APPROVED=true` and `FANCY_CAFE_CHECKOUT_ENABLED=true`. Provider, billing and asset checks must also pass.

The public copy and generation request now target a 24-second MP4. The billing catalog still matches `duration_seconds=20` in the database so existing checkout rows keep working; change the DB price rows to 24 only after review. The composer accepts 24 seconds, but it requires a silent reference video and soundtrack that each contain at least 24 seconds. Existing R2 reference/audio assets and the stored prompt still target 20 seconds, so replace them before relying on live 24-second generation.

See `.env.example` for provider, R2, email, webhook, cron, FFmpeg and launch settings. `npm run build` verifies media binaries in the build trace; verify the deployed Linux runtime as well before accepting payments.

## SEO and content

Thirteen original, question-led guides live in `src/lib/tiny-guides.ts`. They explain the meme, the *(500) Days of Summer* elevator scene, the two photo roles, creation steps, photo tips, CapCut differences, video length/format, music and lyrics rights, TikTok/Reels sharing, privacy/consent and downloads. Search suggestions were sparse: titles are editorial intent hypotheses, not measured keyword-volume claims.

The sitemap derives from `allTinyGuides` and `legalLinks` under the new domain. Submit `/sitemap.xml` to the new domain's Search Console property after deployment. Analytics requires this site's own measurement ID and visitor consent. Homepage FAQ schema mirrors visible answers. `llms.txt` is supplementary documentation, not a ranking guarantee.

## Brand assets

`public/logo.svg` is the canonical warm elevator-heart mark; `node scripts/generate-brand-assets.mjs` regenerates PNG sizes, app icons and the social card. Public routes: `/logo.svg`, `/logo.png`, `/logo-192.png`, `/logo-512.png`, `/logo-1024.png`, `/icon.svg`, `/favicon.ico`, `/apple-icon.png`, `/social-preview.png`. Demo videos live under `public/love-the-smiths/` (`demo-1.mp4`, `demo-2.mp4`); `node scripts/generate-smiths-video-assets.mjs` extracts the beat stills, role crops, comparison images and guide covers. They are labeled as demo frames, not customer results or film stills. `node scripts/upload-smiths-demo-assets.mjs` mirrors the videos to the private R2 prefix `love-the-smiths-ai/demo/` and the extracted images to `love-the-smiths-ai/assets/`. The public site plays the checked-in public copies because the R2 bucket is private and has no public domain configured.

Research and deployment notes are stored locally in ignored `docs/`. Local MCP tools are ignored under `.codex/`; neither is staged automatically.

## Google Analytics 4

There is no inherited analytics default. Set this site's own `NEXT_PUBLIC_GA_ID` in production; leave it empty or set `off` to disable analytics (recommended for Preview). Local development is disabled unless a valid ID is supplied. Do not add a duplicate GTM installation. The app sends page views after analytics consent. In the GA4 web stream, disable Enhanced Measurement page views based on browser history changes to avoid counting the same client-side navigation twice. Review other automatic events before enabling them on checkout pages. After deployment, accept analytics and check the GA4 Realtime report; code tests alone do not verify data receipt. Rebuild after changing public environment variables.

## Rights and affiliation

This is an independent, unofficial tool. It is not affiliated with the film *(500) Days of Summer*, its actors or rights holders, The Smiths, TikTok, CapCut, Media.io or the original meme creators. The scene is referenced for commentary; no film stills, band logos, album art or actor likenesses are published. The pipeline does not grant a license to any commercial recording. Do not market the output as official content or as a licensed use of the original song.
