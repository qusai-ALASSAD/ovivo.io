import { supabase } from './supabase';

export type Plan = 'free' | 'starter' | 'pro' | 'agency';

export const PLAN_LIMITS: Record<Plan, number> = {
  free: 30,
  starter: 500,
  pro: 2000,
  agency: 5000,
};

export interface UsageRecord {
  id: string;
  user_key: string;
  plan: Plan;
  message_count: number;
  reset_at: string;
}

function getUserKey(): string {
  if (typeof window === 'undefined') return '';
  let key = localStorage.getItem('ovivo_user_key');
  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem('ovivo_user_key', key);
  }
  return key;
}

function getNextMonthReset(): string {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
  return next.toISOString();
}

export async function getOrCreateUsage(): Promise<UsageRecord | null> {
  const userKey = getUserKey();
  if (!userKey) return null;

  const { data, error } = await supabase
    .from('user_usage')
    .select('*')
    .eq('user_key', userKey)
    .maybeSingle();

  if (error) return null;

  if (!data) {
    const resetAt = getNextMonthReset();
    const { data: newRecord, error: insertError } = await supabase
      .from('user_usage')
      .insert([{ user_key: userKey, plan: 'free', message_count: 0, reset_at: resetAt }])
      .select()
      .single();
    return insertError ? null : (newRecord as UsageRecord);
  }

  return data as UsageRecord;
}

export async function checkAndIncrementUsage(): Promise<{
  allowed: boolean;
  remaining: number;
  limit: number;
  usage: UsageRecord | null;
}> {
  let usage = await getOrCreateUsage();
  if (!usage) return { allowed: false, remaining: 0, limit: 30, usage: null };

  const now = new Date();
  const resetAt = new Date(usage.reset_at);

  if (now >= resetAt) {
    const newResetAt = getNextMonthReset();
    const { data: updated } = await supabase
      .from('user_usage')
      .update({ message_count: 0, reset_at: newResetAt, updated_at: now.toISOString() })
      .eq('user_key', usage.user_key)
      .select()
      .single();
    if (updated) usage = updated as UsageRecord;
  }

  const limit = PLAN_LIMITS[usage.plan as Plan] ?? 30;
  const allowed = usage.message_count < limit;

  if (allowed) {
    const newCount = usage.message_count + 1;
    await supabase
      .from('user_usage')
      .update({ message_count: newCount, updated_at: new Date().toISOString() })
      .eq('user_key', usage.user_key);
    usage.message_count = newCount;
  }

  return {
    allowed,
    remaining: Math.max(0, limit - usage.message_count),
    limit,
    usage,
  };
}

export async function getUsageInfo(): Promise<{
  remaining: number;
  limit: number;
  plan: Plan;
}> {
  const usage = await getOrCreateUsage();
  if (!usage) return { remaining: 30, limit: 30, plan: 'free' };
  const limit = PLAN_LIMITS[usage.plan as Plan] ?? 30;
  return {
    remaining: Math.max(0, limit - usage.message_count),
    limit,
    plan: usage.plan as Plan,
  };
}

export async function getUserPlan(): Promise<Plan> {
  if (typeof window === 'undefined') return 'free';

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', session.user.id)
        .maybeSingle();
      if (profile?.plan && (profile.plan as string) in PLAN_LIMITS) {
        return profile.plan as Plan;
      }
    }
  } catch {}

  const usage = await getOrCreateUsage();
  return (usage?.plan as Plan) ?? 'free';
}
