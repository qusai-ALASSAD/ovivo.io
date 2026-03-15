'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Users, MessageSquare, TrendingUp, Mail, RefreshCw,
  ChevronDown, LogOut, Shield, ExternalLink, Sparkles,
  BarChart3, UserCheck, AlertTriangle, Check,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Profile, Lead } from '@/lib/supabase';
import { isAdminEmail } from '@/lib/admin';
import { toast } from 'sonner';

interface Stats {
  totalUsers: number;
  activeSubscribers: number;
  totalMessages: number;
  totalLeads: number;
  newLeads: number;
}

const PLAN_OPTIONS = ['free', 'starter', 'pro', 'agency'] as const;
type Plan = typeof PLAN_OPTIONS[number];

const planBadge: Record<Plan, string> = {
  free: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  starter: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  pro: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  agency: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass border border-white/10 rounded-2xl p-5"
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border mb-4 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-600 mt-1">{sub}</div>}
    </motion.div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [denied, setDenied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'leads' | 'revenue'>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contactedLeads, setContactedLeads] = useState<Set<string>>(new Set());
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [changePlanFor, setChangePlanFor] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login?redirect=/admin');
      return;
    }
    const email = session.user.email || '';
    if (!isAdminEmail(email)) {
      setDenied(true);
      setChecking(false);
      return;
    }
    setAdminEmail(email);
    setChecking(false);
    loadStats(email);
  };

  const authHeaders = useCallback((email: string) => ({
    'Content-Type': 'application/json',
    'x-admin-email': email,
  }), []);

  const loadStats = async (email: string) => {
    try {
      const res = await fetch('/api/admin/stats', { headers: authHeaders(email) });
      if (res.ok) setStats(await res.json());
    } catch {}
  };

  const loadUsers = async () => {
    if (!adminEmail) return;
    const res = await fetch('/api/admin/users', { headers: authHeaders(adminEmail) });
    if (res.ok) {
      const { users: data } = await res.json();
      setUsers(data || []);
    }
  };

  const loadLeads = async () => {
    if (!adminEmail) return;
    const res = await fetch('/api/admin/leads', { headers: authHeaders(adminEmail) });
    if (res.ok) {
      const { leads: data } = await res.json();
      setLeads(data || []);
    }
  };

  useEffect(() => {
    if (!adminEmail) return;
    if (activeTab === 'users') loadUsers();
    if (activeTab === 'leads') loadLeads();
  }, [activeTab, adminEmail]);

  const resetUsage = async (userId: string) => {
    if (!adminEmail) return;
    setLoadingAction(`reset-${userId}`);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: authHeaders(adminEmail),
        body: JSON.stringify({ userId, action: 'reset_usage' }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? { ...u, message_count: 0, reset_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() }
              : u
          )
        );
        toast.success('Usage reset');
      }
    } finally {
      setLoadingAction(null);
    }
  };

  const changePlan = async (userId: string, plan: Plan) => {
    if (!adminEmail) return;
    setLoadingAction(`plan-${userId}`);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: authHeaders(adminEmail),
        body: JSON.stringify({ userId, action: 'change_plan', plan }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, plan } : u)));
        toast.success(`Plan changed to ${plan}`);
        setChangePlanFor(null);
      }
    } finally {
      setLoadingAction(null);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const toggleContacted = (id: string) => {
    setContactedLeads((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
          <p className="text-sm text-gray-500">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (denied) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/20 mb-5">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 text-sm mb-6">Your account does not have admin privileges.</p>
          <Button onClick={() => router.push('/')} className="bg-white/5 hover:bg-white/10 text-white border border-white/10">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'leads', label: 'Leads', icon: Mail },
    { id: 'revenue', label: 'Revenue', icon: TrendingUp },
  ] as const;

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      {/* Admin Header */}
      <div className="border-b border-white/10 bg-white/[0.02] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Ovivo Admin</h1>
              <p className="text-xs text-gray-500">{adminEmail}</p>
            </div>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            size="sm"
            className="bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 hover:border-white/20 text-xs"
          >
            <LogOut className="mr-1.5 h-3.5 w-3.5" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white/10 pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 mb-8">
              <StatCard
                icon={Users}
                label="Total Users"
                value={stats?.totalUsers ?? '—'}
                color="bg-blue-500/15 border-blue-500/20 text-blue-400"
              />
              <StatCard
                icon={UserCheck}
                label="Paid Subscribers"
                value={stats?.activeSubscribers ?? '—'}
                sub="non-free plans"
                color="bg-emerald-500/15 border-emerald-500/20 text-emerald-400"
              />
              <StatCard
                icon={MessageSquare}
                label="Total Messages"
                value={stats?.totalMessages?.toLocaleString() ?? '—'}
                color="bg-gray-500/15 border-gray-500/20 text-gray-400"
              />
              <StatCard
                icon={Mail}
                label="Total Leads"
                value={stats?.totalLeads ?? '—'}
                color="bg-amber-500/15 border-amber-500/20 text-amber-400"
              />
              <StatCard
                icon={TrendingUp}
                label="New Leads"
                value={stats?.newLeads ?? '—'}
                sub="last 7 days"
                color="bg-rose-500/15 border-rose-500/20 text-rose-400"
              />
            </div>

            <div className="glass border border-white/10 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-white mb-4">Quick Navigation</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <button
                  onClick={() => setActiveTab('users')}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/8 hover:border-white/20 transition-all text-left"
                >
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-sm text-gray-300">Manage Users</span>
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/8 hover:border-white/20 transition-all text-left"
                >
                  <Mail className="h-5 w-5 text-amber-400" />
                  <span className="text-sm text-gray-300">View Leads</span>
                </button>
                <button
                  onClick={() => setActiveTab('revenue')}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/8 hover:border-white/20 transition-all text-left"
                >
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm text-gray-300">Revenue</span>
                </button>
                <button
                  onClick={() => { loadStats(adminEmail!); toast.success('Stats refreshed'); }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/8 hover:border-white/20 transition-all text-left"
                >
                  <RefreshCw className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-300">Refresh Stats</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Users ({users.length})</h2>
              <Button
                onClick={loadUsers}
                variant="outline"
                size="sm"
                className="bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 text-xs"
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Refresh
              </Button>
            </div>

            {users.length === 0 ? (
              <div className="glass border border-white/10 rounded-2xl p-12 text-center">
                <Users className="h-10 w-10 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No users yet.</p>
              </div>
            ) : (
              <div className="glass border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Messages</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reset Date</th>
                        <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-3.5 text-gray-300 font-mono text-xs">{user.email}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${planBadge[user.plan as Plan] || planBadge.free}`}>
                              {user.plan}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-gray-400">{user.message_count.toLocaleString()}</td>
                          <td className="px-5 py-3.5 text-gray-500 text-xs">
                            {new Date(user.reset_at).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => resetUsage(user.id)}
                                disabled={loadingAction === `reset-${user.id}`}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs text-gray-300 transition-all disabled:opacity-50"
                              >
                                <RefreshCw className={`h-3 w-3 ${loadingAction === `reset-${user.id}` ? 'animate-spin' : ''}`} />
                                Reset
                              </button>

                              <div className="relative">
                                <button
                                  onClick={() => setChangePlanFor(changePlanFor === user.id ? null : user.id)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs text-gray-300 transition-all"
                                >
                                  Plan
                                  <ChevronDown className="h-3 w-3" />
                                </button>
                                {changePlanFor === user.id && (
                                  <div className="absolute right-0 top-8 z-10 glass border border-white/10 rounded-xl py-1 min-w-[110px] shadow-xl">
                                    {PLAN_OPTIONS.map((p) => (
                                      <button
                                        key={p}
                                        onClick={() => changePlan(user.id, p)}
                                        disabled={loadingAction === `plan-${user.id}`}
                                        className={`w-full text-left px-3 py-2 text-xs capitalize hover:bg-white/10 transition-colors ${user.plan === p ? 'text-blue-400' : 'text-gray-300'}`}
                                      >
                                        {p}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Leads ({leads.length})</h2>
              <Button
                onClick={loadLeads}
                variant="outline"
                size="sm"
                className="bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 text-xs"
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Refresh
              </Button>
            </div>

            {leads.length === 0 ? (
              <div className="glass border border-white/10 rounded-2xl p-12 text-center">
                <Mail className="h-10 w-10 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No leads yet.</p>
              </div>
            ) : (
              <div className="glass border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contacted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leads.map((lead) => {
                        const isContacted = contactedLeads.has(lead.id);
                        return (
                          <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-3.5 text-gray-300">{lead.name || '—'}</td>
                            <td className="px-5 py-3.5 text-gray-300 font-mono text-xs">{lead.email}</td>
                            <td className="px-5 py-3.5 text-gray-500 text-xs">{lead.company || '—'}</td>
                            <td className="px-5 py-3.5">
                              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-400 capitalize">
                                {lead.source}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-gray-500 text-xs">
                              {new Date(lead.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <button
                                onClick={() => toggleContacted(lead.id)}
                                className={`flex items-center gap-1.5 ml-auto px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                                  isContacted
                                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                    : 'bg-white/5 border-white/10 text-gray-500 hover:text-gray-300'
                                }`}
                              >
                                {isContacted ? <Check className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                                {isContacted ? 'Done' : 'Mark'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div>
            <h2 className="text-lg font-bold text-white mb-5">Revenue & Stripe</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'Stripe Dashboard', href: 'https://dashboard.stripe.com', icon: ExternalLink, color: 'text-blue-400 border-blue-500/20 bg-blue-500/10' },
                { label: 'Subscriptions', href: 'https://dashboard.stripe.com/subscriptions', icon: RefreshCw, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' },
                { label: 'Payments', href: 'https://dashboard.stripe.com/payments', icon: TrendingUp, color: 'text-amber-400 border-amber-500/20 bg-amber-500/10' },
                { label: 'Customers', href: 'https://dashboard.stripe.com/customers', icon: Users, color: 'text-gray-400 border-white/10 bg-white/5' },
                { label: 'Products', href: 'https://dashboard.stripe.com/products', icon: Sparkles, color: 'text-rose-400 border-rose-500/20 bg-rose-500/10' },
                { label: 'Reports', href: 'https://dashboard.stripe.com/reports', icon: BarChart3, color: 'text-gray-400 border-white/10 bg-white/5' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/5 hover:border-white/20 transition-all group"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border flex-shrink-0 ${item.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{item.label}</div>
                      <div className="text-xs text-gray-600 mt-0.5">Open in Stripe</div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-700 group-hover:text-gray-400 transition-colors" />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 glass border border-amber-500/20 bg-amber-500/5 rounded-2xl p-5">
              <p className="text-sm text-amber-400 font-medium mb-1">Stripe Integration Required</p>
              <p className="text-xs text-gray-500">
                To enable revenue tracking and subscription management, add your Stripe secret key as{' '}
                <code className="text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">STRIPE_SECRET_KEY</code>{' '}
                in your environment variables.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
