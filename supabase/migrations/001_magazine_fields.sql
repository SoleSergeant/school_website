-- =============================================
-- Migration 001 — Magazine fields + write policies
-- Run in Supabase Dashboard → SQL Editor
-- =============================================

-- 1. Add new columns to articles
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS issue_number VARCHAR,
  ADD COLUMN IF NOT EXISTS pdf_url      VARCHAR,
  ADD COLUMN IF NOT EXISTS date         DATE DEFAULT CURRENT_DATE;

-- 2. Allow anon key to write articles
--    (Admin panel uses mock auth, not Supabase Auth.
--     Replace these with JWT-based policies when upgrading auth.)
CREATE POLICY "Anon can insert articles"
  ON articles FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Anon can update articles"
  ON articles FOR UPDATE USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Anon can delete articles"
  ON articles FOR DELETE USING (TRUE);
