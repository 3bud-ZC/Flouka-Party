# Flukah Party — Final Production Status & Deployment Handoff

**Project Name:** Flukah Party Event Website & Organizer Deck  
**Authoritative Repository:** https://github.com/3bud-ZC/Flouka-Party.git  
**Target Branch:** `main`  
**Ticket Price:** `550 EGP / guest`  
**Status:** Production code ready • Supabase connected • Admin created and restricted • Cloudflare repository configuration hardened • Final live deploy pending server secret / deployment verification  
**Last Updated:** August 20, 2026  

---

## 1. Production Payment Configuration

The project exposes exactly two payment channels:

- **InstaPay:** `abyio99@instapay`
- **Vodafone Cash:** display `011 05317095`, copy value `01105317095`
- Bank Transfer / IBAN support has been removed from UI, validation, types, admin display, and documentation.
- Ticket price remains `550 EGP / guest`.

---

## 2. Supabase Production State

- Production project URL: `https://ylhhvkbdfytmitkcfoac.supabase.co`
- `public.reservations` exists with RLS enabled.
- `payment-screenshots` exists as a **PRIVATE** Storage bucket.
- Payment screenshots are exposed to the organizer only through short-lived signed URLs.
- Admin email: `abud@admin.fun`.
- The Supabase Auth user for `abud@admin.fun` exists and is email-confirmed.
- Reservation reads / updates / deletes are restricted to the designated admin email.
- Private screenshot reads / deletes are restricted to the designated admin email.
- Database payment-method constraint accepts only `instapay` and `vodafone_cash`.
- Supabase Security Advisor was clean after the hardening migration.

---

## 3. Supabase Key Handling

`src/lib/supabase.ts` supports:

- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` as the preferred browser/public key.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` as a legacy public-key fallback.
- `SUPABASE_SECRET_KEY` as the preferred server-only privileged key.
- `SUPABASE_SERVICE_ROLE_KEY` as a legacy server-only fallback.

The server/admin client **never falls back to the public publishable key**.

A real Supabase server secret is mandatory for reservation screenshot upload and organizer APIs.

---

## 4. Cloudflare / Build Configuration

The repository is configured for Cloudflare Workers through OpenNext.

### Build commands

```bash
npm run build:worker
npm run deploy:worker
```

### Repository configuration

- `package.json` pins the Cloudflare adapter command to `@opennextjs/cloudflare@0.6.6`, matching the current Next.js 14 project line.
- `open-next.config.ts` contains the required Cloudflare overrides.
- `wrangler.jsonc` points to `.open-next/worker.js` and `.open-next/assets`.
- `wrangler.jsonc` now includes all **non-secret** Supabase/runtime values directly.
- `.env.production` now includes the safe public Supabase values so Next.js has them during the Cloudflare build even when the Cloudflare UI reports no build variables.
- `.nvmrc` pins Node.js `20.18.0` for a stable Next.js 14 / OpenNext build environment.

No Supabase privileged secret is committed to the repository.

---

## 5. Production Environment

Safe public values are already committed through `.env.production` / `wrangler.jsonc`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ylhhvkbdfytmitkcfoac.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<configured publishable key>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<same public compatibility key>
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=payment-screenshots
ADMIN_EMAIL=abud@admin.fun
```

The deployment platform still needs exactly one privileged Supabase server secret configured securely:

```bash
SUPABASE_SECRET_KEY=<real Supabase secret key>
```

Do **not** use the `sb_publishable_...` value as `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY`.

After the first successful deployment, set:

```bash
NEXT_PUBLIC_SITE_URL=https://<final-workers-or-custom-domain>
```

and redeploy so OpenGraph metadata uses the final public URL.

---

## 6. Last Verified Quality Gates

| Gate | Status |
| --- | --- |
| TypeScript | PASS in previous production pass |
| ESLint | PASS in previous production pass |
| Next.js production build | PASS in previous production pass |
| Supabase schema / RLS | PASS |
| Supabase Security Advisor | PASS |
| Mobile QA | PASS in previous production pass |
| Cloudflare live deployment | PENDING re-run after latest repo fixes |

---

## 7. Remaining Production Actions

1. Configure the real `SUPABASE_SECRET_KEY` as a Cloudflare Worker secret if it is not already present.
2. Trigger a fresh Cloudflare deployment from the latest `main` commit — do not retry an old failed commit.
3. Record the final public Workers/custom-domain URL in `NEXT_PUBLIC_SITE_URL` and redeploy once.
4. Run one end-to-end test reservation: submit -> private screenshot upload -> admin login -> signed screenshot view -> confirm/reject.
5. Delete the test reservation and test screenshot after verification.

No additional feature development is required for launch.
