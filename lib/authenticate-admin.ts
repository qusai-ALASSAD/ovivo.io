import { createClient } from '@supabase/supabase-js';
import { isAdminEmail } from '@/lib/admin';

export async function authenticateAdmin(authorization: string | null): Promise<string | null> {
  const match = authorization?.match(/^Bearer ([A-Za-z0-9._-]+)$/);
  if (!match) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  try {
    const client = createClient(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await client.auth.getUser(match[1]);
    if (error || !data.user?.email || !data.user.email_confirmed_at) return null;
    return isAdminEmail(data.user.email) ? data.user.email.toLowerCase() : null;
  } catch {
    return null;
  }
}
