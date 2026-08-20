# Flukah Party — Final Production Status & Deployment Handoff

**Project Name:** Flukah Party Event Website & Organizer Deck  
**Authoritative Repository:** [https://github.com/3bud-ZC/Flouka-Party.git](https://github.com/3bud-ZC/Flouka-Party.git)  
**Target Branch:** `main`  
**Ticket Price:** `550 EGP / guest`  
**Status:** Production Ready • Real Payment Credentials Configured • Bank Transfer Removed • Supabase Connected • Admin Access Locked to Designated Email • Cloudflare Workers Ready  
**Last Updated:** August 20, 2026  

---

## 1. Production Payment Configuration (Single Source of Truth: `src/lib/config.ts`)

The project exposes **exactly two** official payment channels:

### 1. InstaPay
* **Display Label:** `INSTAPAY`
* **Account Identifier:** `abyio99@instapay`
* **Copy Button Action:** Copies exactly `abyio99@instapay`

### 2. Vodafone Cash
* **Display Label:** `VODAFONE CASH`
* **Wallet Display:** `011 05317095`
* **Copy Button Action:** Copies normalized `01105317095`

### Bank Transfer Removal
* Bank Transfer and all legacy placeholder IBANs/banks have been removed from types, configuration, payment cards, reservation form, backend validation, uploader hints, admin displays, and documentation.

---

## 2. Dynamic Pricing Matrix (550 EGP / Guest)

* **1 Guest:** `550 EGP`
* **2 Guests:** `1,100 EGP`
* **3 Guests:** `1,650 EGP`
* **4 Guests:** `2,200 EGP`
* **5 Guests:** `2,750 EGP`
* **6 Guests:** `3,300 EGP`
* **7 Guests:** `3,850 EGP`
* **8 Guests:** `4,400 EGP`
* **9 Guests:** `4,950 EGP`
* **10 Guests:** `5,500 EGP`

---

## 3. Mobile-First & Visual QA Verification

* **Viewport Range:** Tested and verified across `320px`, `360px`, `375px`, `390px`, `393px`, `414px`, `430px`, `768px`, `1024px`, `1440px`.
* **Payment Layout:**
  - **Mobile:** Two full-width stacked printed ticket cards with clear selection highlights, min-44px tap targets, and visible copy confirmation.
  - **Desktop:** Balanced 2-column editorial layout without empty legacy slots.
* **Form & Typography:**
  - Form inputs use `text-base` (>=16px) to eliminate iOS auto-zoom behavior.
  - Sticky mobile CTA respects iPhone safe-area padding and auto-hides when the reservation form is in view.

---

## 4. Security & Supabase Architecture

* **Production Supabase Project:** Connected and healthy.
* **Table:** `public.reservations` exists with RLS enabled.
* **Storage:** Bucket `payment-screenshots` is **PRIVATE** (`public = false`) with 10MB limit and image MIME filters.
* **Signed URLs:** Organizer deck generates temporary 60-second signed URLs on demand via protected `/api/admin/signed-url`.
* **Designated Admin Email:** `abud@admin.fun`.
* **Admin API Guard:** `verifyAdminToken()` now rejects authenticated users whose email does not match the designated admin email.
* **RLS:**
  - Anonymous/public users can insert reservations only.
  - Reservation reads/updates/deletes are restricted to the designated admin email.
  - Private payment screenshot reads/deletes are restricted to the designated admin email.
* **Payment Method DB Constraint:** Only `instapay` and `vodafone_cash` are accepted.
* **Security Advisor:** No remaining security lints after production hardening.
* **Service Role Key:** Must remain server-side only and must never be committed.
* **Migration:** `supabase/migrations/002_restrict_admin_email.sql` records the production hardening changes in source control.

---

## 5. Required Production Environment Variables

Set these in Cloudflare environment variables/secrets or `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-legacy-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-or-secret-key
ADMIN_EMAIL=abud@admin.fun
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=payment-screenshots
NEXT_PUBLIC_SITE_URL=https://your-production-url.example
```

Do not commit real secret values.

---

## 6. Build & Test Verification Results

| Gate / Command | Status | Result |
| :--- | :--- | :--- |
| `npx tsc --noEmit` | **PASS** | 0 TypeScript errors (last verified build pass) |
| `npm run lint` | **PASS** | 0 ESLint warnings or errors (last verified build pass) |
| `npm run build` | **PASS** | Next.js production build generated successfully (last verified build pass) |
| `OpenNext / Wrangler` | **PASS** | `wrangler.jsonc` & `open-next.config.ts` configured |
| Supabase schema / RLS review | **PASS** | Production project inspected directly |
| Supabase Security Advisor | **PASS** | No current security lints |

---

## 7. Remaining Production Actions

1. Create the Supabase Auth organizer user with email `abud@admin.fun` and a strong password; the user does not currently exist in `auth.users`.
2. Add the real Supabase URL, publishable/anon key, and server-only service-role/secret key to the deployment environment.
3. Connect `3bud-ZC/Flouka-Party` to Cloudflare Workers and deploy.
4. Set `NEXT_PUBLIC_SITE_URL` to the final Cloudflare/custom-domain URL.
5. Run one real end-to-end test reservation, verify it in `/admin`, open its private payment screenshot, update status, then delete the test data.

---

## 8. Cloudflare Deployment

The repository is prepared for Cloudflare Workers/OpenNext deployment. Current ChatGPT integrations do not expose a Cloudflare account connector, so the initial Cloudflare account/repository connection and secret entry must be completed from the Cloudflare dashboard or Wrangler authentication. After GitHub is connected, subsequent pushes can deploy automatically.
