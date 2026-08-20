# Flukah Party — Production Status

**Repository:** https://github.com/3bud-ZC/Flouka-Party.git  
**Branch:** `main`  
**Ticket Price:** `550 EGP / guest`  
**Current Live URL:** `https://flouka-party.3bdullhrgb.workers.dev`  
**Target Custom Domain:** `https://flukah-party.abud.fun`  
**Status:** Live on Cloudflare Workers • Supabase connected • Admin secured • Performance refinement in progress  
**Last Updated:** August 21, 2026

## Payments

- InstaPay: `abyio99@instapay`
- Vodafone Cash: display `011 05317095`, copy `01105317095`
- Bank transfer removed.
- Allowed backend payment methods: `instapay`, `vodafone_cash` only.

## Supabase

- Project connected and healthy.
- `public.reservations` exists with RLS enabled.
- `payment-screenshots` is PRIVATE.
- Admin email: `abud@admin.fun`.
- Admin Auth user exists and is confirmed.
- Reservation read/update/delete and screenshot read/delete are restricted to the designated admin.
- Server APIs require `SUPABASE_SECRET_KEY` / legacy service-role fallback and never fall back to the public key.

## Cloudflare

- OpenNext / Workers deployment is working.
- Build command: `npm run build:worker`
- Deploy command: `npm run deploy:worker`
- Node: `20.18.0`
- `workers.dev` and preview URLs enabled.
- `wrangler.jsonc` already declares `flukah-party.abud.fun` as a Custom Domain route.
- `.env.production` and Wrangler runtime vars already use `https://flukah-party.abud.fun` as `NEXT_PUBLIC_SITE_URL`.
- The real privileged Supabase secret is configured only in Cloudflare, not GitHub.

## Performance Pass

Completed:

- Removed an unnecessary duplicate root-level `poster.png` from the repository/build context; the served asset remains `public/poster.png`.
- Removed unnecessary client hydration from `GrainOverlay`.
- Tuned Next.js responsive image device sizes for common mobile widths (`320`, `360`, `375`, `390`, `414`, `430`) and enabled a longer optimized-image cache TTL.

Primary remaining performance item:

- `public/poster.png` is still approximately 3.4 MB. It should be compressed/re-encoded to a production WebP/AVIF asset while preserving the poster appearance, because social traffic is expected to be predominantly mobile.

## Remaining Launch / Polish Work

1. Deploy the latest `main` commit so the performance changes are live.
2. Verify `flukah-party.abud.fun` is created/active in Cloudflare and resolve any conflicting DNS record if Cloudflare reports one.
3. Compress the poster asset and update the hero/OG image references.
4. Run a real mobile performance check on 375px / 390px and refine LCP, image payload, hydration and below-the-fold rendering.
5. Run one real end-to-end booking: submit -> screenshot upload -> `/admin` -> signed screenshot -> confirm/reject -> cleanup test data.
6. Continue UI polish after mobile screenshots are reviewed.
