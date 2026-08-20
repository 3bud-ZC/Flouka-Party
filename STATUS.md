# Flukah Party — Project Status & Production Handoff

**Project Name:** Flukah Party Event Website  
**Identity Source:** Official Egyptian Psychedelic Nile River Party Poster  
**Status:** Ready for Supabase Configuration & Production Launch  
**Last Updated:** August 20, 2026  

---

## 1. Executive Summary & Completed Work

A custom, single-page interactive experience designed from the ground up to bring the **Flukah Party** poster to life. The website integrates vintage Egyptian tourism poster aesthetics, 1960s–70s psychedelic typography, Nile/Felucca culture, screen-print halftone textures, distressed ink treatments, and a complete reservation & payment transfer verification workflow.

### Key Sections Implemented:
1. **01 — Hero / Opening Scene**: Editorial asymmetrical layout integrating the high-resolution event poster, custom oversized typography, animated Eye of Horus, radiant sun disc, floating palm fronds, Nile water ripples, and dual primary/secondary CTAs with scroll indicator.
2. **02 — The Night (Storytelling)**: Four illustrated vintage poster fragments/stamps detailing *Mixed Music*, *On The Nile*, *11 PM – 5 AM*, and *Limited Guests*.
3. **03 — Event Details**: High-impact editorial section with oversized `01 / 09` monument graphic, tabular specification tickets, boarding times, DJ Virus billing, and BYOB policy.
4. **04 — Atmosphere & Visual Transition**: Nile graphic scene featuring the Felucca sailboat silhouette, Giza sunset backdrop, and soundscape narrative.
5. **05 — Payment Instructions**: 4-step visual flow (*Transfer → Screenshot → Register → Confirmation*) with verified payment account cards for InstaPay, Vodafone Cash, and Bank Transfer with one-click clipboard copying.
6. **06 — Reservation System**: Production-ready registration ticket form with guest count counter (1–10 guests), reactive price calculation, payment method selector, notes, confirmation checkbox, and custom drag-and-drop screenshot uploader.
7. **07 — Payment Screenshot Uploader**: Validated file upload supporting JPG, PNG, WEBP up to 10MB with drag-and-drop on desktop, tap-to-upload on mobile, thumbnail preview, and removal/replacement controls.
8. **08 — Dynamic Confirmation Ticket View**: Live post-submission view displaying the unique booking reference (`FLK-XXXX`), celebration confetti animation, copy reference trigger, WhatsApp direct confirmation CTA, and clear pending verification notice.
9. **09 — Direct Contact Channels**: Dedicated mobile-optimized cards for WhatsApp chat, Instagram updates, and direct phone inquiries.
10. **10 — Final Poster Statement & Footer**: Oversized "THE NILE. THE MUSIC. THE NIGHT." statement and vintage tourism poster footer with legal notices and timestamps.
11. **11 — Sticky Mobile CTA**: Responsive floating bottom bar on mobile screens that automatically detects and hides when the user enters the reservation form to avoid obstructing form inputs.

---

## 2. Technical Stack

* **Framework**: Next.js 14 (App Router, Server Actions & Route Handlers)
* **Language**: TypeScript 5 (Strict Mode)
* **Styling**: Tailwind CSS 3.4 with custom vintage Egyptian color palette & screen-print grain utilities
* **Icons**: Lucide React
* **Animation & Polish**: Canvas Confetti, Tailwind keyframe wave/float animations
* **Database & Storage Backend**: Supabase PostgreSQL + Supabase Storage

---

## 3. Database & Storage Architecture

### PostgreSQL Table: `public.reservations`
Defined in `supabase/migrations/001_create_reservations.sql`:
* `id` (UUID, Primary Key, auto-generated)
* `booking_reference` (TEXT, Unique, e.g., `FLK-89XA`)
* `full_name` (TEXT, Not Null)
* `phone` (TEXT, Not Null)
* `whatsapp` (TEXT, Not Null)
* `instagram` (TEXT, Nullable)
* `guest_count` (INTEGER, Default: 1, Check: 1–10)
* `payment_method` (TEXT, Not Null)
* `transaction_reference` (TEXT, Nullable)
* `payment_screenshot_url` (TEXT, Not Null)
* `notes` (TEXT, Nullable)
* `status` (TEXT, Default: `'pending'`, Check: `'pending' | 'confirmed' | 'rejected'`)
* `created_at` (TIMESTAMPTZ, Default: `NOW()`)
* `updated_at` (TIMESTAMPTZ, Default: `NOW()`)

### Storage Bucket: `payment-screenshots`
* **Bucket ID**: `payment-screenshots` (Public read or Authenticated)
* **Path Pattern**: `${bookingReference}/${timestamp}.${ext}`
* **Allowed Types**: `image/jpeg`, `image/png`, `image/webp`
* **Max Size**: 10 MB

---

## 4. Required Environment Variables

Configure these in `.env.local` (see `.env.example`):

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Supabase Storage Bucket Name
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=payment-screenshots

# Site URL for OpenGraph metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 5. Centralized Event Configuration (`src/lib/config.ts`)

All business information, pricing, contact numbers, and payment details are centralized in `src/lib/config.ts`.

### Checklist of Unresolved Business Parameters to Update Before Live Launch:
1. `ticketPrice.amount`: Set final ticket price per person (currently defaulting to 500 EGP placeholder).
2. `paymentMethods[0].accountIdentifier`: Set official InstaPay IPA handle / mobile address.
3. `paymentMethods[1].accountIdentifier`: Set official Vodafone Cash wallet phone number.
4. `paymentMethods[2].accountIdentifier`: Set official Bank IBAN / account details.
5. `contact.whatsappNumber`: Set official WhatsApp number in international E.164 format (e.g., `+2010XXXXXXXX`).
6. `contact.instagramUrl`: Set official Instagram profile URL.

---

## 6. Testing & Build Verification Results

| Check | Result | Details |
| :--- | :--- | :--- |
| **TypeScript Compilation** | **PASS** | `npx tsc --noEmit` completed with 0 errors |
| **ESLint** | **PASS** | `npm run lint` completed with 0 warnings & 0 errors |
| **Production Build** | **PASS** | `npm run build` generated optimized static and dynamic routes |
| **Form Validation** | **PASS** | Validates required fields, phone numbers, guest count, file MIME & 10MB limit |
| **Accessibility (a11y)** | **PASS** | Visible focus rings, keyboard accessible triggers, semantic HTML |
| **Mobile Responsiveness** | **PASS** | Tested 320px, 375px, 768px, 1024px, 1440px with responsive typography & sticky CTA |

---

## 7. How to Run Locally

1. **Install dependencies** (already completed):
   ```bash
   npm install
   ```

2. **Set up Supabase environment**:
   Copy `.env.example` to `.env.local` and enter your Supabase project URL and keys.
   Execute `supabase/migrations/001_create_reservations.sql` in your Supabase SQL Editor.

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Create a production build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 8. Exact Next Action for Production Launch

1. Apply the SQL migration script located at `supabase/migrations/001_create_reservations.sql` in your Supabase database dashboard.
2. Provide real credentials in `.env.local` for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Open `src/lib/config.ts` and fill in the final organizer WhatsApp phone number and InstaPay/Vodafone Cash accounts.
4. Deploy to Vercel, Netlify, or any Node.js hosting platform with your environment variables.
