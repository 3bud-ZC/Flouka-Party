-- ==============================================================================
-- Schema for Flukah Party Reservations & Secure Storage (Hardened Production)
-- ==============================================================================

-- 1. Create reservations table
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    instagram TEXT,
    guest_count INTEGER NOT NULL DEFAULT 1 CHECK (guest_count >= 1 AND guest_count <= 10),
    payment_method TEXT NOT NULL,
    transaction_reference TEXT,
    payment_screenshot_url TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reservations_booking_ref ON public.reservations(booking_reference);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON public.reservations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Drop existing legacy policies if any
DROP POLICY IF EXISTS "Allow public insert for reservations" ON public.reservations;
DROP POLICY IF EXISTS "Allow public read by booking reference" ON public.reservations;
DROP POLICY IF EXISTS "Allow authenticated admin full access" ON public.reservations;
DROP POLICY IF EXISTS "Allow anon insert only" ON public.reservations;

-- PUBLIC POLICY: Allow anyone (anon) to submit a new reservation only
CREATE POLICY "Allow anon insert only" 
ON public.reservations 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- ADMIN POLICY: Only authenticated organizers can view and update reservations
CREATE POLICY "Allow authenticated admin full access" 
ON public.reservations 
FOR ALL 
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- 2. Setup Secure PRIVATE Supabase Storage for Payment Screenshots
-- Bucket is explicitly PRIVATE (public = false) to protect sensitive payment proof
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'payment-screenshots', 
  'payment-screenshots', 
  false, 
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET 
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

-- Storage Policies: Drop old public policies
DROP POLICY IF EXISTS "Allow public uploads to payment-screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read for payment-screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated read for payment-screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon insert for payment-screenshots" ON storage.objects;

-- Allow anon to upload screenshots to payment-screenshots
CREATE POLICY "Allow anon insert for payment-screenshots" 
ON storage.objects 
FOR INSERT 
TO anon, authenticated
WITH CHECK (bucket_id = 'payment-screenshots');

-- ONLY authenticated admin users can read / generate signed URLs for screenshots
CREATE POLICY "Allow authenticated read for payment-screenshots" 
ON storage.objects 
FOR SELECT 
TO authenticated
USING (bucket_id = 'payment-screenshots');

-- ONLY authenticated admin users can delete screenshots
CREATE POLICY "Allow authenticated delete for payment-screenshots" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'payment-screenshots');
