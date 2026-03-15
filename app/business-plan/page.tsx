'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Copy, Download, Rocket, ArrowLeft, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getUserPlan, type Plan } from '@/lib/chat-usage';
import { toast } from 'sonner';

const inputClass = 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 rounded-xl';

const PLAN_LABELS: Record<Plan, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  agency: 'Agency',
};

function buildBusinessPlanPrompt(data: {
  businessName: string;
  industry: string;
  location: string;
  targetAudience: string;
  budget: string;
  services: string;
  competitors: string;
  goals3mo: string;
  goals12mo: string;
}, plan: Plan): string {
  return `Generate a business plan with the following details. Do NOT repeat these inputs verbatim — reframe, elevate, and structure them professionally.

Business Name: ${data.businessName}
Industry: ${data.industry}
Location: ${data.location}
Target Audience: ${data.targetAudience}
Startup Budget: ${data.budget}
Products/Services: ${data.services}
Main Competitors: ${data.competitors || 'Not specified'}
3-Month Goals: ${data.goals3mo}
12-Month Goals: ${data.goals12mo}

Generate the full business plan now according to the ${plan.toUpperCase()} tier output format. Detect the language from the inputs above and respond entirely in that language without mixing languages.`;
}

export default function BusinessPlanPage() {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [output, setOutput] = useState('');
  const [userPlan, setUserPlan] = useState<Plan>('free');
  const [streamingOutput, setStreamingOutput] = useState('');

  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    location: '',
    targetAudience: '',
    budget: '',
    services: '',
    competitors: '',
    goals3mo: '',
    goals12mo: '',
  });

  useEffect(() => {
    getUserPlan().then(setUserPlan);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGenerated(false);
    setStreamingOutput('');
    setOutput('');

    try {
      const prompt = buildBusinessPlanPrompt(formData, userPlan);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          mode: 'business',
          plan: userPlan,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error || 'Generation failed');
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setStreamingOutput(accumulated);
      }

      setOutput(accumulated);
      setStreamingOutput('');
      setGenerated(true);

      await supabase.from('generated_plans').insert([{
        type: 'business',
        title: `${formData.businessName} Business Plan`,
        input_data: formData,
        output_content: accumulated,
      }]);

      toast.success('Business plan generated!');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to generate business plan');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const exportPlan = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.businessName.replace(/\s+/g, '-')}-business-plan.txt`;
    a.click();
    toast.success('Downloaded!');
  };

  const isShowingOutput = generated || (loading && !!streamingOutput);

  if (isShowingOutput) {
    return (
      <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">Your Business Plan</h1>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400">
                {PLAN_LABELS[userPlan]}
              </span>
            </div>
            <div className="flex gap-2">
              {generated && (
                <>
                  <Button onClick={copyToClipboard} variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/5 hover:border-white/30">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button onClick={exportPlan} variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/5 hover:border-white/30">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </>
              )}
              <Button
                onClick={() => { setGenerated(false); setStreamingOutput(''); setOutput(''); }}
                variant="outline"
                size="sm"
                className="border-white/20 text-gray-300 hover:bg-white/5 hover:border-white/30"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                New Plan
              </Button>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 mb-6">
            {loading && streamingOutput && (
              <div className="flex items-center gap-2 mb-4 text-xs text-blue-400">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                Generating your {PLAN_LABELS[userPlan]} plan...
              </div>
            )}
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-300">
              {streamingOutput || output}
              {loading && streamingOutput && (
                <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse" />
              )}
            </pre>
          </div>

          {generated && (
            <div className="relative overflow-hidden glass rounded-2xl border-blue-500/20 shadow-[0_0_60px_rgba(59,130,246,0.12)] p-8 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/5" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <Rocket className="mx-auto h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Want Ovivo to Build This for You?</h3>
              <p className="text-gray-400 mb-6">Our Done-For-You service handles complete implementation in 14 days.</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/services">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    View Packages
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    Book a Call
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/15 border border-blue-500/20 mb-5">
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Business Plan Generator</h1>
          <p className="mt-3 text-gray-400">Generate a comprehensive business plan in minutes</p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Sparkles className="h-3 w-3" />
            {PLAN_LABELS[userPlan]} plan —{' '}
            {userPlan === 'agency'
              ? 'Investor-ready output'
              : userPlan === 'pro'
              ? 'Full professional output (15+ sections)'
              : 'Concise output (6–8 sections)'}
          </div>
        </div>

        <div className="glass rounded-2xl p-8">
          <h2 className="text-lg font-bold text-white mb-6">Tell Us About Your Business</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label className="text-gray-300 mb-2 block">Business Name *</Label>
                <Input name="businessName" value={formData.businessName} onChange={handleChange}
                  placeholder="e.g., Fresh Bites Restaurant" required className={inputClass} />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Industry *</Label>
                <Input name="industry" value={formData.industry} onChange={handleChange}
                  placeholder="e.g., Restaurant, Salon, Gym" required className={inputClass} />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label className="text-gray-300 mb-2 block">City / Country *</Label>
                <Input name="location" value={formData.location} onChange={handleChange}
                  placeholder="e.g., Hamburg, Germany" required className={inputClass} />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Startup Budget *</Label>
                <Input name="budget" value={formData.budget} onChange={handleChange}
                  placeholder="e.g., €25,000" required className={inputClass} />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Target Audience *</Label>
              <Textarea name="targetAudience" value={formData.targetAudience} onChange={handleChange}
                placeholder="e.g., Health-conscious professionals aged 25-45"
                required className={`${inputClass} min-h-[80px] resize-none`} />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Products / Services *</Label>
              <Textarea name="services" value={formData.services} onChange={handleChange}
                placeholder="e.g., Organic meals, catering services, cooking classes"
                required className={`${inputClass} min-h-[80px] resize-none`} />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Main Competitors</Label>
              <Textarea name="competitors" value={formData.competitors} onChange={handleChange}
                placeholder="e.g., Local restaurants, chain establishments"
                className={`${inputClass} min-h-[80px] resize-none`} />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label className="text-gray-300 mb-2 block">3-Month Goals *</Label>
                <Textarea name="goals3mo" value={formData.goals3mo} onChange={handleChange}
                  placeholder="e.g., Launch, 50 customers, €10k revenue"
                  required className={`${inputClass} min-h-[80px] resize-none`} />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">12-Month Goals *</Label>
                <Textarea name="goals12mo" value={formData.goals12mo} onChange={handleChange}
                  placeholder="e.g., Profitable, expand, €100k revenue"
                  required className={`${inputClass} min-h-[80px] resize-none`} />
              </div>
            </div>

            {(userPlan === 'free' || userPlan === 'starter') && (
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <p className="text-sm font-semibold text-amber-400 mb-1">Starter output: 6–8 focused sections</p>
                <p className="text-xs text-amber-500/80">
                  Upgrade to Pro (€49/mo) for 15+ sections, detailed financials, funnel architecture, and a 90-day execution plan.{' '}
                  <Link href="/pricing" className="underline hover:text-amber-300">View plans</Link>
                </p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-blue-500 hover:bg-blue-400 text-white transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              disabled={loading}
            >
              <FileText className="mr-2 h-5 w-5" />
              {loading ? 'Generating your plan...' : 'Generate Business Plan'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
