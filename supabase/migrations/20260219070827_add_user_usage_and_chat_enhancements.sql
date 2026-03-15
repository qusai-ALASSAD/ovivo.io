/*
  # Add user usage tracking for chat limits

  ## New Tables
  - `user_usage`
    - `id` (uuid, primary key)
    - `user_key` (text, unique) - anonymous identifier stored in browser localStorage
    - `plan` (text) - free | starter | pro | agency
    - `message_count` (int) - number of messages used this period
    - `reset_at` (timestamptz) - when the next monthly reset occurs
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ## Changes to existing tables
  - Ensure chat_sessions and chat_messages exist with proper structure

  ## Security
  - RLS enabled on user_usage
  - Public insert/select/update allowed (anonymous app, keyed by user_key)

  ## Notes
  1. user_key is a UUID generated in the browser and stored in localStorage
  2. This allows per-browser usage tracking without requiring auth
  3. Reset logic: when message is sent after reset_at, count resets to 0
*/

CREATE TABLE IF NOT EXISTS user_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key text UNIQUE NOT NULL,
  plan text NOT NULL DEFAULT 'free',
  message_count integer NOT NULL DEFAULT 0,
  reset_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert own usage by user_key"
  ON user_usage FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can select own usage by user_key"
  ON user_usage FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update own usage by user_key"
  ON user_usage FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'New Chat',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert chat sessions"
  ON chat_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can select chat sessions"
  ON chat_sessions FOR SELECT
  USING (true);

CREATE POLICY "Public can update chat sessions"
  ON chat_sessions FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete chat sessions"
  ON chat_sessions FOR DELETE
  USING (true);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert chat messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can select chat messages"
  ON chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Public can delete chat messages"
  ON chat_messages FOR DELETE
  USING (true);
