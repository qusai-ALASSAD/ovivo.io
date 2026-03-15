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

    const [profilesRes, leadsRes, leadsWeekRes] = await Promise.all([
      db.from('profiles').select('plan, message_count'),
      db.from('leads').select('id', { count: 'exact', head: true }),
      db.from('leads')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    ]);

    const profiles = profilesRes.data || [];
    const totalUsers = profiles.length;
    const activeSubscribers = profiles.filter((p) => p.plan !== 'free').length;
    const totalMessages = profiles.reduce((sum, p) => sum + (p.message_count || 0), 0);
    const totalLeads = leadsRes.count || 0;
    const newLeads = leadsWeekRes.count || 0;

    return NextResponse.json({ totalUsers, activeSubscribers, totalMessages, totalLeads, newLeads });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
