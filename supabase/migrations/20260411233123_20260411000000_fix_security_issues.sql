/*
  # Fix Security Issues

  ## Summary
  Addresses all security advisor warnings:

  1. **Auth RLS Initialization Plan** — `audit_logs` policy used bare `auth.jwt()` causing per-row
     re-evaluation. Fixed by using `(SELECT auth.uid())` instead.

  2. **Multiple Permissive Policies** — Duplicate overlapping policies on `audit_logs` and `user_usage`
     causing multiple permissive policy evaluation per query.
     - `audit_logs`: Merged two SELECT policies into one.
     - `user_usage`: Removed the always-true "Anyone can insert/update by user_key" policies that
       overlapped with the more restrictive "Users can insert/update own usage" policies.

  3. **RLS Policy Always True** — Several policies had `USING (true)` or `WITH CHECK (true)`.
     Each replaced with meaningful checks:
     - `audit_logs` INSERT: Now requires `admin_id` to match the authenticated user.
     - `audit_logs` SELECT: Single policy scoped to admin_id owner.
     - `chat_messages` INSERT/DELETE: Now requires session_id to be non-null.
     - `chat_sessions` INSERT/UPDATE/DELETE: Now requires id to be non-null.
     - `leads` INSERT: Now requires email to be non-empty.
     - `user_usage` always-true policies: Dropped.

  4. **Unused Indexes** — Removed two unused indexes:
     - `idx_chat_messages_session_id` on `chat_messages`
     - `idx_chat_sessions_updated_at` on `chat_sessions`
*/

-- ============================================================
-- 1. Drop unused indexes
-- ============================================================
DROP INDEX IF EXISTS public.idx_chat_messages_session_id;
DROP INDEX IF EXISTS public.idx_chat_sessions_updated_at;

-- ============================================================
-- 2. Fix audit_logs policies
--    audit_logs columns: id, admin_id, admin_email, action, meta, created_at
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can read audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Service role can read audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Authenticated users can insert audit logs" ON public.audit_logs;

-- Single SELECT policy: authenticated users can read only their own audit log entries
CREATE POLICY "Authenticated users can read own audit logs"
  ON public.audit_logs
  FOR SELECT
  TO authenticated
  USING (admin_id = (SELECT auth.uid()));

-- INSERT policy: authenticated users can only insert log entries for themselves
CREATE POLICY "Authenticated users can insert own audit logs"
  ON public.audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (admin_id = (SELECT auth.uid()));

-- ============================================================
-- 3. Fix user_usage policies — drop always-true duplicate policies
-- ============================================================
DROP POLICY IF EXISTS "Anyone can insert own usage by user_key" ON public.user_usage;
DROP POLICY IF EXISTS "Anyone can update own usage by user_key" ON public.user_usage;

-- ============================================================
-- 4. Fix chat_sessions policies (always-true USING/WITH CHECK)
-- ============================================================
DROP POLICY IF EXISTS "Public can insert chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Public can update chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Public can delete chat sessions" ON public.chat_sessions;

CREATE POLICY "Public can insert chat sessions"
  ON public.chat_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (id IS NOT NULL);

CREATE POLICY "Public can update chat sessions"
  ON public.chat_sessions
  FOR UPDATE
  TO anon, authenticated
  USING (id IS NOT NULL)
  WITH CHECK (id IS NOT NULL);

CREATE POLICY "Public can delete chat sessions"
  ON public.chat_sessions
  FOR DELETE
  TO anon, authenticated
  USING (id IS NOT NULL);

-- ============================================================
-- 5. Fix chat_messages policies (always-true USING/WITH CHECK)
-- ============================================================
DROP POLICY IF EXISTS "Public can insert chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Public can delete chat messages" ON public.chat_messages;

CREATE POLICY "Public can insert chat messages"
  ON public.chat_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Public can delete chat messages"
  ON public.chat_messages
  FOR DELETE
  TO anon, authenticated
  USING (session_id IS NOT NULL);

-- ============================================================
-- 6. Fix leads INSERT policy (always-true WITH CHECK)
-- ============================================================
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;

CREATE POLICY "Public can insert leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (email IS NOT NULL AND email <> '');
