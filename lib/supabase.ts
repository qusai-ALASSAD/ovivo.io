import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

let _supabase: SupabaseClient;

function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase] Missing env vars — using placeholder client');
    _supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
  } else {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

export const supabase = getSupabaseClient();

export type ChatSession = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type ChatMessage = {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
};

export type GeneratedPlan = {
  id: string;
  type: 'business' | 'marketing';
  title: string;
  input_data: Record<string, any>;
  output_content: string;
  created_at: string;
};

export type LeadMagnet = {
  id: string;
  email: string;
  source: string;
  created_at: string;
};

export type VoiceGeneration = {
  id: string;
  text: string;
  voice: string;
  language: string;
  speed: number;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string;
  plan: 'free' | 'starter' | 'pro' | 'agency';
  message_count: number;
  reset_at: string;
  created_at: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  source: 'popup' | 'contact' | 'other';
  contacted: boolean;
  created_at: string;
};

export type AuditLog = {
  id: string;
  admin_id?: string;
  admin_email: string;
  action: string;
  meta: Record<string, unknown>;
  created_at: string;
};
