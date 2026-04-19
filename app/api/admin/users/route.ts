import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-server';
import { isAdminEmail } from '@/lib/admin';

export async function GET(req: NextRequest) {
  const adminEmail = req.headers.get('x-admin-email') || '';
  if (!adminEmail || !isAdminEmail(adminEmail)) {
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
  const adminEmail = req.headers.get('x-admin-email') || '';
  if (!adminEmail || !isAdminEmail(adminEmail)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { userId, action, plan } = await req.json();
    const db = createServiceClient();

    if (action === 'reset_usage') {
      const resetAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      await db.from('profiles').update({ message_count: 0, reset_at: resetAt }).eq('id', userId);
      await db.from('audit_logs').insert([{
        admin_email: adminEmail,
        action: 'reset_usage',
        meta: { user_id: userId },
      }]);
    } else if (action === 'change_plan') {
      await db.from('profiles').update({ plan }).eq('id', userId);
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
