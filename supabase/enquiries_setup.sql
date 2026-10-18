-- ==============================================================================
-- Munnar Hiking Tours: Enquiries Table Setup & Complete Connection
-- 
-- HOW TO RUN IN SUPABASE:
-- 1. Open Supabase Dashboard: https://supabase.com/dashboard/project/yvdludgqpqhzxivfygsi
-- 2. Click "SQL Editor" in the left navigation menu
-- 3. Click "New query", paste this entire script, and click "Run" (Ctrl+Enter)
-- ==============================================================================

-- 1. Enable UUID / cryptographic extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the enquiries table (if not already existing)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    tour_name TEXT,
    tour_date DATE,
    group_size INTEGER DEFAULT 1,
    budget TEXT,
    message TEXT,
    status TEXT DEFAULT 'new'
);

-- 3. Ensure all necessary columns exist (idempotent / safe upgrade)
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS tour_name TEXT;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS tour_date DATE;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS group_size INTEGER DEFAULT 1;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS budget TEXT;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- 4. Set status constraint to allow all Admin & Website statuses
ALTER TABLE public.enquiries DROP CONSTRAINT IF EXISTS enquiries_status_check;
ALTER TABLE public.enquiries ADD CONSTRAINT enquiries_status_check 
    CHECK (status IN ('new', 'contacted', 'confirmed', 'cancelled'));

-- 5. Auto-update updated_at timestamp on row modification
CREATE OR REPLACE FUNCTION public.set_enquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_enquiries_updated_at ON public.enquiries;
CREATE TRIGGER trigger_enquiries_updated_at
    BEFORE UPDATE ON public.enquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.set_enquiries_updated_at();

-- 6. High-performance indexes for admin dashboard sorting & search
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON public.enquiries (status);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 8. Clean up any existing blocking policies
DROP POLICY IF EXISTS "Public can insert enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Authenticated admins can view enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Authenticated admins can update enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "enquiries_public_insert" ON public.enquiries;
DROP POLICY IF EXISTS "enquiries_admin_all" ON public.enquiries;
DROP POLICY IF EXISTS "allow_all_enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "anon_select_enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "anon_insert_enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "anon_update_enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "anon_delete_enquiries" ON public.enquiries;

-- 9. Create complete policies for Website forms & Admin Dashboard:
-- A) INSERT: Anyone (website visitors / booking forms / admin) can add enquiries
CREATE POLICY "anon_insert_enquiries"
    ON public.enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- B) SELECT: Allow Admin Dashboard to read and display all enquiries
CREATE POLICY "anon_select_enquiries"
    ON public.enquiries
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- C) UPDATE: Allow Admin Dashboard to change status (new, contacted, confirmed, cancelled)
CREATE POLICY "anon_update_enquiries"
    ON public.enquiries
    FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- D) DELETE: Allow Admin Dashboard to delete enquiries
CREATE POLICY "anon_delete_enquiries"
    ON public.enquiries
    FOR DELETE
    TO anon, authenticated
    USING (true);

-- 10. Grant table permissions to anon, authenticated, and service_role
GRANT ALL ON TABLE public.enquiries TO anon;
GRANT ALL ON TABLE public.enquiries TO authenticated;
GRANT ALL ON TABLE public.enquiries TO service_role;

-- 11. Enable Supabase Realtime replication (safe idempotent do block)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
      AND schemaname = 'public' 
      AND tablename = 'enquiries'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.enquiries;
  END IF;
END $$;
