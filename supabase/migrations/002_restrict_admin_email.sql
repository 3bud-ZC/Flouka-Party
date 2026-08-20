-- Restrict organizer/admin access to the designated Supabase Auth account.

DROP POLICY IF EXISTS "Allow authenticated admin full access" ON public.reservations;
DROP POLICY IF EXISTS "Allow designated admin full access" ON public.reservations;

CREATE POLICY "Allow designated admin full access"
ON public.reservations
FOR ALL
TO authenticated
USING (lower(coalesce(auth.jwt() ->> 'email', '')) = 'abud@admin.fun')
WITH CHECK (lower(coalesce(auth.jwt() ->> 'email', '')) = 'abud@admin.fun');

DROP POLICY IF EXISTS "Allow authenticated read for payment-screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete for payment-screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Allow designated admin read for payment-screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Allow designated admin delete for payment-screenshots" ON storage.objects;

CREATE POLICY "Allow designated admin read for payment-screenshots"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'payment-screenshots'
  AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'abud@admin.fun'
);

CREATE POLICY "Allow designated admin delete for payment-screenshots"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'payment-screenshots'
  AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'abud@admin.fun'
);

-- This event-trigger helper must never be callable from exposed API roles.
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

-- Database-level guard: only the two production payment methods are valid.
ALTER TABLE public.reservations
  DROP CONSTRAINT IF EXISTS reservations_payment_method_check;

ALTER TABLE public.reservations
  ADD CONSTRAINT reservations_payment_method_check
  CHECK (payment_method IN ('instapay', 'vodafone_cash'));
