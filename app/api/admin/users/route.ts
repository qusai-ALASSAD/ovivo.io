import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-server';
import { authenticateAdmin } from '@/lib/authenticate-admin';

export async function GET(req: NextRequest) {
  const adminEmail = await authenticateAdmin(req.headers.get('authorization'));
  if (!adminEmail) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const db = createServiceClient();
    const { data, error } = await db
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return NextResponse.json({ users: data });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const adminEmail = await authenticateAdmin(req.headers.get('authorization'));
  if (!adminEmail) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { userId, action, plan } = await req.json();
    if (typeof userId !== 'string' || !/^[a-f0-9-]{36}$/i.test(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }
    if (action !== 'reset_usage' && action !== 'change_plan') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    if (action === 'change_plan' && !['free', 'starter', 'pro', 'agency'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    const db = createServiceClient();

    if (action === 'reset_usage') {
      const resetAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      const { error } = await db.from('profiles').update({ message_count: 0, reset_at: resetAt }).eq('id', userId);
      if (error) throw error;
      await db.from('audit_logs').insert([{
        admin_email: adminEmail,
        action: 'reset_usage',
        meta: { user_id: userId },
      }]);
    } else if (action === 'change_plan') {
      const { error } = await db.from('profiles').update({ plan }).eq('id', userId);
      if (error) throw error;
      await db.from('audit_logs').insert([{
        admin_email: adminEmail,
        action: 'change_plan',
        meta: { user_id: userId, new_plan: plan },
      }]);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
