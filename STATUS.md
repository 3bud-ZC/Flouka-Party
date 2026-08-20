# Flukah Party — Final Production Status & Deployment Handoff

**Project Name:** Flukah Party Event Website & Organizer Deck  
**Authoritative Repository:** [https://github.com/3bud-ZC/Flouka-Party.git](https://github.com/3bud-ZC/Flouka-Party.git)  
**Target Branch:** `main`  
**Ticket Price:** `550 EGP / guest`  
**Status:** Production Ready • Real Payment Credentials Configured • Bank Transfer Removed • Security Hardened • Cloudflare Workers Ready  
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

### Bank Transfer Removal:
* Bank Transfer and all legacy placeholder IBANs/banks have been **completely removed** from types, centralized configuration, payment cards, reservation form, backend validation, uploader hints, admin displays, and documentation.

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
  - **Desktop:** Balanced, intentional 2-column editorial layout without awkward empty slots.
* **Form & Typography:**
  - Form inputs use `text-base` (>=16px) to eliminate iOS auto-zoom behavior.
  - Sticky mobile CTA respects iPhone safe-area padding (`env(safe-area-inset-bottom)`) and auto-hides when the reservation form is in view.

---

## 4. Security & Supabase Architecture

* **Storage:** Bucket `payment-screenshots` is **PRIVATE** (`public = false`) with 10MB limit and image MIME filters.
* **Signed URLs:** Organizer deck generates temporary 60-second signed URLs on demand via protected `/api/admin/signed-url` endpoint.
* **Row Level Security (RLS):**
  - Public anonymous users: `INSERT` only (no reading or enumeration of other reservations).
  - Authenticated organizers: Full `SELECT`, `UPDATE`, `DELETE` access.
* **Service Role Key:** `SUPABASE_SERVICE_ROLE_KEY` is strictly server-side and never exposed to the client.

---

## 5. Required Production Environment Variables

Set these in Cloudflare Dashboard Secrets or `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Supabase Storage Bucket Name (Private)
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=payment-screenshots

# Site URL for OpenGraph metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 6. Build & Test Verification Results

| Gate / Command | Status | Result |
| :--- | :--- | :--- |
| `npx tsc --noEmit` | **PASS** | 0 TypeScript errors |
| `npm run lint` | **PASS** | 0 ESLint warnings or errors |
| `npm run build` | **PASS** | Next.js production build generated successfully |
| `OpenNext / Wrangler` | **PASS** | `wrangler.jsonc` & `open-next.config.ts` configured |

---

## 7. Cloudflare Deployment Instructions

1. **Via Cloudflare Dashboard (Recommended)**:
   - Navigate to **Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git**.
   - Select repository: `3bud-ZC/Flouka-Party`.
   - Preset: **Next.js**.
   - Add environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
   - Click **Save and Deploy**.

2. **Via Wrangler CLI**:
   - Run `npx wrangler login`
   - Run `npm run deploy`
