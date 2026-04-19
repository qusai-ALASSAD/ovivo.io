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
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    return NextResponse.json({ leads: data });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
