'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Gift, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function LeadMagnet() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('ovivo_lead_magnet_shown');

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('lead_magnets')
        .insert([{ email, source: 'popup' }]);

      if (error) throw error;

      toast.success('Success! Check your email for your free marketing plan template.');
      setIsOpen(false);
      localStorage.setItem('ovivo_lead_magnet_shown', 'true');
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('ovivo_lead_magnet_shown', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md glass border-white/20">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 glow">
            <Gift className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-center text-2xl text-white">Get Your Free AI Marketing Plan!</DialogTitle>
          <DialogDescription className="text-center text-base text-gray-300">
            Join 1,000+ entrepreneurs using AI to grow their business. Get instant access to our marketing plan template.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0" disabled={loading}>
            {loading ? 'Sending...' : 'Get Free Template'}
          </Button>

          <p className="text-center text-xs text-gray-400">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
