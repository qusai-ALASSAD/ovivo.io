'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Mic, Download, Play, Info, RefreshCw } from 'lucide-react';
import { mockVoiceGeneration } from '@/lib/mock-ai';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const voices = [
  { value: 'sarah', label: 'Sarah — Professional Female' },
  { value: 'michael', label: 'Michael — Professional Male' },
  { value: 'emma', label: 'Emma — Friendly Female' },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'German (Deutsch)' },
];

export default function VoicePage() {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [result, setResult] = useState('');
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('sarah');
  const [language, setLanguage] = useState('en');
  const [speed, setSpeed] = useState([1]);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }
    setLoading(true);
    setGenerated(false);
    try {
      const response = await mockVoiceGeneration(text, voice, language, speed[0]);
      setResult(response.message);
      setGenerated(true);
      await supabase.from('voice_generations').insert([
        { text: text.substring(0, 500), voice, language, speed: speed[0] },
      ]);
      toast.success('Voice generated successfully!');
    } catch {
      toast.error('Failed to generate voice');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    toast.info('In production, this would download your generated audio file');
  };

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/15 border border-orange-500/20 mb-5">
            <Mic className="h-8 w-8 text-orange-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Voice Over Generator</h1>
          <p className="mt-3 text-gray-400">Convert text to natural-sounding speech with AI</p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8 space-y-6">
          <div>
            <Label className="text-gray-300 mb-2 block">Text to Convert *</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the text you want to convert to speech..."
              className="min-h-[180px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 resize-none rounded-xl"
              maxLength={5000}
            />
            <p className="mt-2 text-xs text-gray-600 text-right">{text.length} / 5000</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label className="text-gray-300 mb-2 block">Voice</Label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0d1117] border-white/10">
                  {voices.map((v) => (
                    <SelectItem key={v.value} value={v.value} className="text-gray-300 focus:bg-white/10 focus:text-white">
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0d1117] border-white/10">
                  {languages.map((l) => (
                    <SelectItem key={l.value} value={l.value} className="text-gray-300 focus:bg-white/10 focus:text-white">
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-gray-300 mb-3 block">Speed: {speed[0]}x</Label>
            <Slider value={speed} onValueChange={setSpeed} min={0.5} max={2} step={0.1} />
            <div className="mt-2 flex justify-between text-xs text-gray-600">
              <span>0.5x (Slower)</span>
              <span>1.0x (Normal)</span>
              <span>2.0x (Faster)</span>
            </div>
          </div>

          <div className="flex items-start gap-3 glass rounded-xl p-4 border-blue-500/20">
            <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-blue-400">Commercial Use:</span> The generated voices can be used for commercial purposes. Full rights are included with your subscription.
            </p>
          </div>

          <Button
            onClick={handleGenerate}
            size="lg"
            className="w-full bg-orange-500 hover:bg-orange-400 text-white transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            disabled={loading || !text.trim()}
          >
            <Mic className="mr-2 h-5 w-5" />
            {loading ? 'Generating...' : 'Generate Voice Over'}
          </Button>
        </div>

        {/* Result */}
        {generated && (
          <div className="mt-6 glass rounded-2xl border-emerald-500/30 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/20 mb-5">
              <Play className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Voice Generated!</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-lg mx-auto">{result}</p>

            {/* Waveform visualizer */}
            <div className="flex items-center justify-center gap-0.5 mb-6 h-12">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-emerald-500/60"
                  style={{ height: `${20 + Math.sin(i * 0.5) * 15}px` }}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={handleDownload}
                className="bg-emerald-500 hover:bg-emerald-400 text-white transition-all"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Audio
              </Button>
              <Button
                onClick={() => { setGenerated(false); setText(''); }}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Another
              </Button>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              In production, an audio player would appear here with your generated voiceover.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
