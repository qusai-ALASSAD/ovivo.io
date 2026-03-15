/*
  # Add profiles, leads, and audit_logs tables

  ## New Tables

  ### profiles
  - Mirrors auth.users for app-level user data
  - `id` (uuid, PK, matches auth.users id)
  - `email` (text, unique)
  - `plan` (text: free|starter|pro|agency)
  - `message_count` (int)
  - `reset_at` (timestamptz)
  - `created_at` (timestamptz)

  ### leads
  - Contact form and popup submissions
  - `id` (uuid, PK)
  - `name` (text)
  - `email` (text)
  - `company` (text, nullable)
  - `message` (text, nullable)
  - `source` (text: popup|contact|other)
  - `contacted` (boolean, default false)
  - `created_at` (timestamptz)

  ### audit_logs
  - Admin action log
  - `id` (uuid, PK)
  - `admin_id` (uuid, nullable - admin's auth user id)
  - `admin_email` (text)
  - `action` (text)
  - `meta` (jsonb)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all three tables
  - profiles: users can only read/update their own row; service role has full access
  - leads: public insert only; service role has full access (admin reads via service role)
  - audit_logs: service role insert/select only

  ## Notes
  1. Admin operations use the SUPABASE_SERVICE_ROLE_KEY server-side client
  2. Public users can submit leads (insert) but cannot read them
  3. Audit logs are append-only via service role
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  plan text NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'agency')),
  message_count integer NOT NULL DEFAULT 0,
  reset_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL,
  company text,
  message text,
  source text NOT NULL DEFAULT 'other' CHECK (source IN ('popup', 'contact', 'other')),
  contacted boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid,
  admin_email text NOT NULL DEFAULT '',
  action text NOT NULL,
  meta jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS profiles_plan_idx ON profiles(plan);
