'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Send, Plus, Download, Sparkles, MessageSquare, Trash2,
  Copy, RefreshCw, Briefcase, TrendingUp,
  Zap, Check, PenLine, ChevronRight, LayoutGrid, Users,
} from 'lucide-react';
import { supabase, ChatSession, ChatMessage } from '@/lib/supabase';
import { checkAndIncrementUsage, getUsageInfo, getUserPlan, Plan } from '@/lib/chat-usage';
import { toast } from 'sonner';

type ChatMode = 'client' | 'growth' | 'automation';

interface ModeConfig {
  id: ChatMode;
  label: string;
  osLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  activeColor: string;
}

const MODES: ModeConfig[] = [
  {
    id: 'client',
    label: 'Client OS',
    osLabel: 'Client OS',
    icon: Briefcase,
    description: 'Build complete client systems: revenue model, funnel, automation map, 90-day plan, KPIs',
    color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    activeColor: 'border-blue-500 bg-blue-500/15 text-blue-300',
  },
  {
    id: 'growth',
    label: 'Growth OS',
    osLabel: 'Growth OS',
    icon: TrendingUp,
    description: 'Demand generation, CAC/LTV analysis, ad strategy, channel optimization loops',
    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    activeColor: 'border-emerald-500 bg-emerald-500/15 text-emerald-300',
  },
  {
    id: 'automation',
    label: 'Automation OS',
    osLabel: 'Automation OS',
    icon: Zap,
    description: 'n8n workflows, CRM stages, data model, integrations, trigger-action sequences',
    color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    activeColor: 'border-amber-500 bg-amber-500/15 text-amber-300',
  },
];

const QUICK_PROMPTS: Record<ChatMode, { text: string; icon: string }[]> = {
  client: [
    { text: 'Build a full client system for a B2B wholesale company in Germany.', icon: '🏗' },
    { text: 'Create a 90-day execution roadmap for my client\'s e-commerce brand.', icon: '📅' },
    { text: 'Design a funnel + ad strategy for a lead generation client.', icon: '📊' },
    { text: 'Create an n8n automation workflow for a client\'s lead follow-up process.', icon: '⚡' },
  ],
  growth: [
    { text: 'Build a demand generation strategy for a SaaS client targeting SMBs.', icon: '🚀' },
    { text: 'Calculate CAC and LTV targets for a €49/mo subscription business.', icon: '💰' },
    { text: 'Create a full Meta + Google ad strategy with budget allocation.', icon: '📣' },
    { text: 'Design an optimization loop for my client\'s paid acquisition funnel.', icon: '🔁' },
  ],
  automation: [
    { text: 'Design an n8n workflow: lead capture → CRM → email sequence → Slack alert.', icon: '🔗' },
    { text: 'Build a CRM stage model with automated follow-up triggers for my client.', icon: '🗂' },
    { text: 'Create a data model for a multi-channel lead nurturing system.', icon: '🗃' },
    { text: 'Map all integrations needed between HubSpot, Stripe, and Notion.', icon: '🔌' },
  ],
};

function MessageContent({ content }: { content: string }) {
  return (
    <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
      {content}
    </div>
  );
}

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [mode, setMode] = useState<ChatMode>('client');
  const [clientName, setClientName] = useState('');
  const [editingClient, setEditingClient] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [usageInfo, setUsageInfo] = useState<{ remaining: number; limit: number; plan: Plan }>({
    remaining: 30,
    limit: 30,
    plan: 'free',
  });
  const [userPlan, setUserPlan] = useState<Plan>('free');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    loadSessions();
    getUsageInfo().then((info) => {
      setUsageInfo(info);
      setUserPlan(info.plan);
    });
    getUserPlan().then(setUserPlan);
  }, []);

  useEffect(() => {
    if (currentSessionId) loadMessages(currentSessionId);
  }, [currentSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const loadSessions = async () => {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(30);
    if (!error && data) {
      setSessions(data);
      if (data.length > 0 && !currentSessionId) {
        setCurrentSessionId(data[0].id);
      }
    }
  };

  const loadMessages = async (sessionId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    if (!error && data) setMessages(data);
  };

  const createNewSession = async (): Promise<string | null> => {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([{ title: 'New Chat' }])
      .select()
      .single();
    if (!error && data) {
      setSessions((prev) => [data, ...prev]);
      setCurrentSessionId(data.id);
      setMessages([]);
      return data.id;
    }
    return null;
  };

  const deleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from('chat_sessions').delete().eq('id', sessionId);
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      const remaining = sessions.filter((s) => s.id !== sessionId);
      if (remaining.length > 0) {
        setCurrentSessionId(remaining[0].id);
      } else {
        setCurrentSessionId(null);
        setMessages([]);
      }
    }
  };

  const deleteMessage = async (msgId: string) => {
    await supabase.from('chat_messages').delete().eq('id', msgId);
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
  };

  const copyMessage = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const startRename = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingId(session.id);
    setRenameValue(session.title);
  };

  const commitRename = async (sessionId: string) => {
    if (!renameValue.trim()) return;
    await supabase
      .from('chat_sessions')
      .update({ title: renameValue.trim() })
      .eq('id', sessionId);
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, title: renameValue.trim() } : s))
    );
    setRenamingId(null);
  };

  const sendMessage = useCallback(
    async (content?: string) => {
      const messageContent = content || input.trim();
      if (!messageContent || loading) return;

      const { allowed, remaining, limit, usage } = await checkAndIncrementUsage();
      if (!allowed) {
        setShowLimitModal(true);
        return;
      }
      setUsageInfo({ remaining, limit, plan: (usage?.plan as Plan) ?? 'free' });

      let sessionId = currentSessionId;
      if (!sessionId) {
        sessionId = await createNewSession();
        if (!sessionId) return;
      }

      setInput('');
      setLoading(true);
      setStreamingContent('');

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        session_id: sessionId,
        role: 'user',
        content: messageContent,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);

      await supabase.from('chat_messages').insert([{
        session_id: sessionId,
        role: 'user',
        content: messageContent,
      }]);

      const autoTitle = messageContent.substring(0, 60);
      await supabase
        .from('chat_sessions')
        .update({ title: autoTitle, updated_at: new Date().toISOString() })
        .eq('id', sessionId);
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, title: autoTitle } : s))
      );

      const historyForApi = messages
        .concat(userMsg)
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        const controller = new AbortController();
        abortRef.current = controller;

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: historyForApi, mode, plan: userPlan }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'API error');
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;
          setStreamingContent(accumulated);
        }

        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          session_id: sessionId,
          role: 'assistant',
          content: accumulated,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setStreamingContent('');

        await supabase.from('chat_messages').insert([{
          session_id: sessionId,
          role: 'assistant',
          content: accumulated,
        }]);

        await supabase
          .from('chat_sessions')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', sessionId);

        loadSessions();
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          toast.error('Failed to get AI response. Check your API key.');
        }
        setStreamingContent('');
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [input, loading, currentSessionId, messages, mode, userPlan]
  );

  const regenerateLast = async () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
    if (lastAssistant) {
      await deleteMessage(lastAssistant.id);
    }
    sendMessage(lastUser.content);
  };

  const exportChat = () => {
    const text = messages.map((m) => `${m.role.toUpperCase()}:\n${m.content}`).join('\n\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ovivo-os-output.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Output exported');
  };

  const currentMode = MODES.find((m) => m.id === mode)!;
  const ModeIcon = currentMode.icon;

  const modeColorMap: Record<ChatMode, string> = {
    client: 'text-blue-400',
    growth: 'text-emerald-400',
    automation: 'text-amber-400',
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-white/[0.02] hidden md:flex flex-col">
        <div className="p-3 border-b border-white/10">
          <Button
            onClick={() => createNewSession()}
            className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all text-sm"
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Session
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {sessions.length === 0 && (
            <p className="text-xs text-gray-600 text-center py-6">No sessions yet</p>
          )}
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group relative rounded-xl transition-all ${
                currentSessionId === session.id
                  ? 'bg-blue-500/15 border border-blue-500/30'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              {renamingId === session.id ? (
                <div className="p-2">
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => commitRename(session.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitRename(session.id);
                      if (e.key === 'Escape') setRenamingId(null);
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setCurrentSessionId(session.id)}
                  className="w-full text-left p-2.5 pr-8"
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-gray-600" />
                    <span className={`line-clamp-2 text-xs ${currentSessionId === session.id ? 'text-blue-300' : 'text-gray-400'}`}>
                      {session.title}
                    </span>
                  </div>
                </button>
              )}

              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-0.5">
                <button
                  onClick={(e) => startRename(session, e)}
                  className="p-1 rounded-md hover:bg-white/10 text-gray-600 hover:text-gray-300 transition-colors"
                >
                  <PenLine className="h-3 w-3" />
                </button>
                <button
                  onClick={(e) => deleteSession(session.id, e)}
                  className="p-1 rounded-md hover:bg-red-500/20 text-gray-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-white/10">
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Usage</span>
              <span className="text-xs text-gray-600 capitalize">{usageInfo.plan}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mb-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  usageInfo.remaining / usageInfo.limit < 0.1
                    ? 'bg-red-500'
                    : usageInfo.remaining / usageInfo.limit < 0.3
                    ? 'bg-amber-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${Math.max(2, (usageInfo.remaining / usageInfo.limit) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {usageInfo.remaining} / {usageInfo.limit} remaining
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* OS Header */}
        <div className="border-b border-white/10 bg-white/[0.02] px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="h-7 w-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <LayoutGrid className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <span className="text-sm font-bold text-white tracking-tight">Ovivo OS</span>
              </div>

              {/* Client / Project Workspace indicator */}
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-gray-700 text-xs">/</span>
                {editingClient ? (
                  <input
                    autoFocus
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    onBlur={() => setEditingClient(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === 'Escape') setEditingClient(false);
                    }}
                    placeholder="Client or project name..."
                    className="bg-white/10 border border-white/20 rounded-md px-2 py-0.5 text-xs text-white focus:outline-none focus:border-blue-500/50 w-40 placeholder:text-gray-600"
                  />
                ) : (
                  <button
                    onClick={() => setEditingClient(true)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors group"
                  >
                    <Users className="h-3 w-3" />
                    <span className="truncate max-w-[120px]">{clientName || 'Set client name'}</span>
                    <PenLine className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-gray-600 hidden sm:block">
                {usageInfo.remaining}/{usageInfo.limit} msgs
              </span>
              <Button
                onClick={exportChat}
                variant="outline"
                size="sm"
                disabled={messages.length === 0}
                className="bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 hover:border-white/20 transition-all text-xs"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Export
              </Button>
            </div>
          </div>

          {/* OS Mode Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            {MODES.map((m) => {
              const Icon = m.icon;
              const isActive = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                    isActive ? m.activeColor : 'bg-transparent border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 && !streamingContent ? (
            <div className="mx-auto max-w-2xl">
              <div className="text-center py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 border border-blue-500/20 mb-4">
                  <ModeIcon className={`h-7 w-7 ${modeColorMap[mode]}`} />
                </div>
                <h2 className="text-xl font-bold text-white">{currentMode.osLabel}</h2>
                <p className="mt-1.5 text-sm text-gray-400 max-w-sm mx-auto">
                  {currentMode.description}
                </p>
                <p className="mt-2 text-xs text-gray-600">
                  Build systems: strategy, funnels, automation, execution.
                </p>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">Quick Start</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {QUICK_PROMPTS[mode].map((prompt) => (
                    <button
                      key={prompt.text}
                      onClick={() => sendMessage(prompt.text)}
                      className="glass rounded-xl p-4 text-left transition-all group hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-base flex-shrink-0 mt-0.5">{prompt.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-300 group-hover:text-white transition-colors leading-snug line-clamp-2">
                            {prompt.text}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-700 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-4 border-blue-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">OS Output Format</span>
                </div>
                {mode === 'client' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {['Client Snapshot', 'Revenue Model', 'Funnel Structure', 'Automation Map', '90-Day Plan', 'KPI Targets'].map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <div className="h-1 w-1 rounded-full bg-blue-500/50" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
                {mode === 'growth' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {['Demand Channels', 'CAC/LTV Analysis', 'Ad Strategy', 'Budget Split', 'Optimization Loop', 'Growth KPIs'].map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <div className="h-1 w-1 rounded-full bg-emerald-500/50" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
                {mode === 'automation' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {['Workflow Map', 'Data Model', 'CRM Stages', 'Trigger/Action', 'Integrations', 'ROI Estimate'].map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <div className="h-1 w-1 rounded-full bg-amber-500/50" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                >
                  {message.role === 'assistant' && (
                    <div className="h-7 w-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                  )}
                  <div className={`relative max-w-[85%] ${message.role === 'user' ? 'flex flex-col items-end' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-blue-500/20 border border-blue-500/30 text-gray-100 rounded-tr-none'
                          : 'glass text-gray-300 rounded-tl-none'
                      }`}
                    >
                      <MessageContent content={message.content} />
                    </div>

                    <div className={`flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <button
                        onClick={() => copyMessage(message.content, message.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-gray-600 hover:text-gray-300 hover:bg-white/5 transition-colors"
                      >
                        {copiedId === message.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        {copiedId === message.id ? 'Copied' : 'Copy'}
                      </button>
                      {message.role === 'assistant' && (
                        <button
                          onClick={regenerateLast}
                          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-gray-600 hover:text-gray-300 hover:bg-white/5 transition-colors"
                        >
                          <RefreshCw className="h-3 w-3" />
                          Retry
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {streamingContent && (
                <div className="flex justify-start group">
                  <div className="h-7 w-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                    </motion.div>
                  </div>
                  <div className="glass rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%]">
                    <MessageContent content={streamingContent} />
                    <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse" />
                  </div>
                </div>
              )}

              {loading && !streamingContent && (
                <div className="flex justify-start">
                  <div className="h-7 w-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mr-3 flex-shrink-0">
                    <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <div className="glass rounded-2xl rounded-tl-none px-5 py-4">
                    <div className="flex space-x-1.5">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: '0.15s' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-white/10 bg-white/[0.02] p-4 flex-shrink-0">
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex gap-2.5"
            >
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`${currentMode.osLabel}: Describe the client, their business, and the system to build...`}
                className="min-h-[56px] max-h-40 resize-none bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-0 rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={loading}
              />
              <Button
                type="submit"
                size="lg"
                disabled={!input.trim() || loading}
                className="px-4 bg-blue-500 hover:bg-blue-400 text-white transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-40 self-end"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>

            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-700">Enter to send · Shift+Enter for new line</p>
              <div className="flex items-center gap-2">
                {usageInfo.remaining <= 10 && usageInfo.remaining > 0 && (
                  <span className="text-xs text-amber-400 font-medium">Low on messages</span>
                )}
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    usageInfo.remaining === 0
                      ? 'text-red-400 bg-red-500/10 border-red-500/30'
                      : usageInfo.remaining <= 10
                      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                      : usageInfo.remaining / usageInfo.limit < 0.2
                      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                      : 'text-gray-500 bg-white/5 border-white/10'
                  }`}
                >
                  {usageInfo.remaining}/{usageInfo.limit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Limit Modal */}
      <AnimatePresence>
        {showLimitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLimitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/10 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/20 mb-4">
                  <Zap className="h-7 w-7 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Monthly Limit Reached</h3>
                <p className="text-sm text-gray-400">
                  You've used all {usageInfo.limit} messages on your{' '}
                  <span className="text-white font-medium capitalize">{usageInfo.plan}</span> plan this month.
                  Upgrade to keep building.
                </p>
              </div>

              <div className="space-y-2.5 mb-5">
                {usageInfo.plan === 'free' && (
                  <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Starter</p>
                      <p className="text-xs text-gray-400">500 messages / month</p>
                    </div>
                    <Link href="/pricing" onClick={() => setShowLimitModal(false)}>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold">
                        €19/mo
                      </Button>
                    </Link>
                  </div>
                )}
                {(usageInfo.plan === 'free' || usageInfo.plan === 'starter') && (
                  <div className="rounded-xl border border-blue-500/50 bg-blue-500/15 p-3.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-white">Pro</p>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-1.5 py-0.5 rounded-full font-semibold">Most Popular</span>
                      </div>
                      <p className="text-xs text-gray-400">2,000 messages / month</p>
                    </div>
                    <Link href="/pricing" onClick={() => setShowLimitModal(false)}>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold">
                        €49/mo
                      </Button>
                    </Link>
                  </div>
                )}
                {(usageInfo.plan === 'free' || usageInfo.plan === 'starter' || usageInfo.plan === 'pro') && (
                  <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Agency</p>
                      <p className="text-xs text-gray-400">5,000 messages / month</p>
                    </div>
                    <Link href="/pricing" onClick={() => setShowLimitModal(false)}>
                      <Button size="sm" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold">
                        €99/mo
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Link href="/pricing" onClick={() => setShowLimitModal(false)} className="block">
                  <Button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold">
                    See All Plans
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setShowLimitModal(false)}
                  className="w-full bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 hover:border-white/20"
                >
                  Close
                </Button>
              </div>

              <p className="text-xs text-gray-600 mt-4 text-center">Limits reset on the 1st of each month</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
