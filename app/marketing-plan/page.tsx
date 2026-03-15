'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, Copy, Download, Rocket, ArrowLeft, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getUserPlan, type Plan } from '@/lib/chat-usage';
import { toast } from 'sonner';

const inputClass = 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 rounded-xl';
const allPlatforms = ['Instagram', 'Facebook', 'Google Ads', 'TikTok'];

const PLAN_LABELS: Record<Plan, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  agency: 'Agency',
};

function buildMarketingPlanPrompt(data: {
  businessName: string;
  industry: string;
  platforms: string[];
  budget: string;
  contentStyle: string;
  offers: string;
  location: string;
}, plan: Plan): string {
  return `Generate a marketing plan with the following details. Do NOT repeat these inputs verbatim — reframe, elevate, and structure them professionally.

Business Name: ${data.businessName}
Industry: ${data.industry}
Location: ${data.location}
Platforms: ${data.platforms.join(', ')}
Monthly Budget: ${data.budget}
Content Style / Brand Voice: ${data.contentStyle}
Main Offers / Services: ${data.offers}

Generate the full marketing plan now according to the ${plan.toUpperCase()} tier output format. Detect the language from the inputs above and respond entirely in that language without mixing languages.`;
}

export default function MarketingPlanPage() {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [output, setOutput] = useState('');
  const [streamingOutput, setStreamingOutput] = useState('');
  const [userPlan, setUserPlan] = useState<Plan>('free');
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    platforms: [] as string[],
    budget: '',
    contentStyle: '',
    offers: '',
    location: '',
  });

  useEffect(() => {
    getUserPlan().then(setUserPlan);
  }, []);

  const handlePlatformToggle = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.platforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }
    setLoading(true);
    setGenerated(false);
    setStreamingOutput('');
    setOutput('');

    try {
      const prompt = buildMarketingPlanPrompt(formData, userPlan);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          mode: 'marketing',
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
        type: 'marketing',
        title: `${formData.businessName} Marketing Plan`,
        input_data: formData,
        output_content: accumulated,
      }]);

      toast.success('Marketing plan generated!');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to generate marketing plan');
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
    a.download = `${formData.businessName.replace(/\s+/g, '-')}-marketing-plan.txt`;
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
              <h1 className="text-3xl font-bold text-white">Your Marketing Plan</h1>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
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
              <div className="flex items-center gap-2 mb-4 text-xs text-emerald-400">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                Generating your {PLAN_LABELS[userPlan]} marketing plan...
              </div>
            )}
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-300">
              {streamingOutput || output}
              {loading && streamingOutput && (
                <span className="inline-block w-0.5 h-4 bg-emerald-400 ml-0.5 animate-pulse" />
              )}
            </pre>
          </div>

          {generated && (
            <div className="relative overflow-hidden glass rounded-2xl border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.1)] p-8 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-600/5" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              <Rocket className="mx-auto h-12 w-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Want Us to Execute This Plan?</h3>
              <p className="text-gray-400 mb-6">Our Done-For-You service includes content creation, ad management, and full execution.</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/services">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/20 mb-5">
            <Target className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Marketing Plan Generator</h1>
          <p className="mt-3 text-gray-400">Get a complete 30-day marketing strategy</p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Sparkles className="h-3 w-3" />
            {PLAN_LABELS[userPlan]} plan —{' '}
            {userPlan === 'agency'
              ? 'Advanced multi-channel strategy + automation'
              : userPlan === 'pro'
              ? 'Full strategy with 30-day calendar + KPIs'
              : 'Concise 30-day plan'}
          </div>
        </div>

        <div className="glass rounded-2xl p-8">
          <h2 className="text-lg font-bold text-white mb-6">Tell Us About Your Marketing Goals</h2>
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

            <div>
              <Label className="text-gray-300 mb-3 block">Target Platforms *</Label>
              <div className="grid grid-cols-2 gap-3">
                {allPlatforms.map((platform) => (
                  <label
                    key={platform}
                    className={`flex items-center gap-3 glass rounded-xl p-3 cursor-pointer transition-all ${
                      formData.platforms.includes(platform) ? 'border-blue-500/40 bg-blue-500/10' : 'hover:border-white/20'
                    }`}
                  >
                    <Checkbox
                      checked={formData.platforms.includes(platform)}
                      onCheckedChange={() => handlePlatformToggle(platform)}
                      className="border-white/30"
                    />
                    <span className="text-sm text-gray-300">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label className="text-gray-300 mb-2 block">Monthly Budget *</Label>
                <Input name="budget" value={formData.budget} onChange={handleChange}
                  placeholder="e.g., €500" required className={inputClass} />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Target Location *</Label>
                <Input name="location" value={formData.location} onChange={handleChange}
                  placeholder="e.g., Lingen, Germany" required className={inputClass} />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Content Style / Brand Voice *</Label>
              <Textarea name="contentStyle" value={formData.contentStyle} onChange={handleChange}
                placeholder="e.g., Professional, friendly, educational, inspiring"
                required className={`${inputClass} min-h-[80px] resize-none`} />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Main Offers / Services *</Label>
              <Textarea name="offers" value={formData.offers} onChange={handleChange}
                placeholder="e.g., Hair styling, coloring, special packages"
                required className={`${inputClass} min-h-[80px] resize-none`} />
            </div>

            {(userPlan === 'free' || userPlan === 'starter') && (
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <p className="text-sm font-semibold text-amber-400 mb-1">Starter output: concise 30-day plan</p>
                <p className="text-xs text-amber-500/80">
                  Upgrade to Pro (€49/mo) for a full strategy with funnel architecture, detailed ad budget splits, automation tasks, and KPI framework.{' '}
                  <Link href="/pricing" className="underline hover:text-amber-300">View plans</Link>
                </p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              disabled={loading}
            >
              <Target className="mr-2 h-5 w-5" />
              {loading ? 'Generating your plan...' : 'Generate Marketing Plan'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
