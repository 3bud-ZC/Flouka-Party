# Flukah Party — Project Status & Production Handoff

**Project Name:** Flukah Party Event Website & Organizer Deck  
**Authoritative Repository:** [https://github.com/3bud-ZC/Flouka-Party.git](https://github.com/3bud-ZC/Flouka-Party.git)  
**Target Branch:** `main`  
**Latest Pushed Commit SHA:** `39bfec09ddbf05c169e2274b4aaca78f1b630a49`  
**Status:** Mobile-First Redesign Complete • Security Hardened • Admin Deck Live • Pushed to GitHub • Cloudflare Workers Ready  
**Last Updated:** August 20, 2026  

---

## 1. Executive Summary of Changes

### A. Mobile-First Redesign (375px / 390px Primary Canvas)
* **Continuous Vertical Poster Flow**: Reduced empty cream margins and excess vertical padding (`py-8 sm:py-12`), creating high information density where the entire page scrolls seamlessly like one long illustrated Egyptian event poster.
* **Elimination of Dashboard-Style Cards**: Redesigned **Event Details** to be typography-led and asymmetrical, highlighting `01 / 09`, `11 PM – 5 AM`, `DJ VIRUS`, `BYOB`, and `LIMITED GUESTS` without repetitive box grids.
* **Mobile-First Selectable Payment Tickets**: Transformed horizontal desktop cards into vertical selectable printed cards (`InstaPay`, `Vodafone Cash`, `Bank Transfer`) with min-44px touch targets and instant copy triggers.
* **Mobile Single-Column Registration Form**: Streamlined order with 16px+ inputs to prevent iOS browser auto-zoom, thumb-friendly guest count stepper (`-` / `+`), real-time price calculation, and large-touch drag-and-drop screenshot uploader.
* **Thumb-Friendly Sticky Mobile CTA**: Responsive floating bottom bar on mobile screens with iPhone safe-area inset (`env(safe-area-inset-bottom)`) that automatically disappears when the registration form is visible.

### B. Secure Private Organizer Admin Deck (`/admin`)
* **Authentication**: Protected with Supabase Auth (Organizer email & password). No public registration allowed.
* **KPI Metrics**: Real-time summary of Total Bookings, Total Guests, Pending Verification, Confirmed Spots, Rejected, and Estimated Revenue.
* **Reservation Management**: Instant search (by Name, Ref `FLK-XXXX`, Phone, WhatsApp, Notes), status filter tabs (`All`, `Pending`, `Confirmed`, `Rejected`), and quick status update actions (`Confirm`, `Reject`).
* **Secure Payment Proof Viewer**: Payment screenshots are stored in a **PRIVATE** Supabase bucket. The admin deck generates temporary 60-second signed URLs on demand via `/api/admin/signed-url` to prevent public URL leakage.
* **One-Click WhatsApp Communication**: Direct clickable WhatsApp chat deep-links prefilled with guest names and booking references.
* **CSV Export**: Instant download of all reservation records as a structured `.csv` file.

### C. Security & Supabase Hardening
* **Storage Privacy**: Storage bucket `payment-screenshots` is configured as **PRIVATE** (`public = false`) with strict 10MB limit and image MIME filters.
* **Row Level Security (RLS)**: Public anonymous users are restricted to `INSERT` only (no reading or enumeration of other reservations). Authenticated organizers have full `SELECT`, `UPDATE`, `DELETE` access.
* **Server-Side Protection**: `SUPABASE_SERVICE_ROLE_KEY` is kept server-side only and never exposed to the client.

### D. Cloudflare Workers / OpenNext Readiness
* **Configuration**: `wrangler.jsonc` created with `nodejs_compat` and static asset bindings.
* **OpenNext Adapter**: `open-next.config.ts` configured with `cloudflare-node` wrapper.
* **Deployment Workflow**: Supports standard Next.js and Cloudflare scripts: `npm run dev`, `npm run build`, `npm run preview`, `npm run deploy`.

---

## 2. Technical Stack

* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript 5 (Strict Mode)
* **Styling**: Tailwind CSS 3.4 with custom Egyptian color palette & screen-print grain utilities
* **Icons**: Lucide React
* **Deployment Target**: Cloudflare Workers / Pages & Node.js
* **Backend**: Supabase PostgreSQL + Private Supabase Storage + Supabase Auth

---

## 3. Required Environment Variables

Set these in `.env.local` or in Cloudflare Dashboard Secrets:

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

## 4. Centralized Event Configuration (`src/lib/config.ts`)

All editable event details are maintained in `src/lib/config.ts`:
1. `ticketPrice.amount`: Ticket price per person (defaults to 500 EGP placeholder).
2. `paymentMethods[0].accountIdentifier`: InstaPay address/handle.
3. `paymentMethods[1].accountIdentifier`: Vodafone Cash wallet phone number.
4. `paymentMethods[2].accountIdentifier`: Bank IBAN.
5. `contact.whatsappNumber`: Organizer WhatsApp number (e.g. `+2010XXXXXXXX`).
6. `contact.instagramUrl`: Official Instagram link.

---

## 5. Verification & Test Results

| Test / Gate | Result | Details |
| :--- | :--- | :--- |
| **TypeScript Type Check** | **PASS** | `npx tsc --noEmit` exited with 0 errors |
| **ESLint Check** | **PASS** | `npm run lint` exited with 0 warnings & 0 errors |
| **Production Build** | **PASS** | `npm run build` generated static & dynamic routes (`/`, `/admin`, `/api/*`) |
| **Mobile QA** | **PASS** | Verified on 320px, 375px, 390px, 430px, 768px, 1024px, 1440px |
| **Admin Security** | **PASS** | Private bucket + short-lived signed URLs + Supabase Auth protection |
| **Git Push** | **PASS** | Pushed to `https://github.com/3bud-ZC/Flouka-Party.git` on `main` |

---

## 6. How to Deploy to Cloudflare Workers

### Option A: Via Cloudflare Dashboard (Recommended)
1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select repository: `3bud-ZC/Flouka-Party`.
3. Set Framework preset: **Next.js**.
4. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
5. Click **Save and Deploy**.

### Option B: Via Wrangler CLI
1. Log in to Cloudflare: `npx wrangler login`
2. Deploy: `npm run deploy`
