'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';

const caseStudies = [
  {
    id: 1,
    title: 'Restaurant Launch in Hamburg',
    client: 'Fresh Bites',
    industry: 'Restaurant',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    metrics: { traffic: '+350%', leads: '120', conversion: '18%' },
    story: 'Fresh Bites came to us with no online presence and a limited budget. Within 14 days, we built a complete digital system including website, social media, and email marketing. The results: 350% increase in website traffic, 120 qualified leads in the first month, and 18% conversion rate on their booking funnel.',
  },
  {
    id: 2,
    title: 'Salon Growth in Munich',
    client: 'Beauty Studio M',
    industry: 'Beauty & Wellness',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    metrics: { traffic: '+280%', leads: '95', conversion: '22%' },
    story: 'Beauty Studio M needed to scale their appointment bookings. We implemented an automated booking system, social media campaigns, and email sequences. Result: 280% traffic increase, 95 new monthly clients, and 22% conversion rate on their funnel.',
  },
  {
    id: 3,
    title: 'Fitness Studio in Berlin',
    client: 'PowerFit Gym',
    industry: 'Fitness',
    image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800',
    metrics: { traffic: '+420%', leads: '200', conversion: '15%' },
    story: 'PowerFit Gym wanted to double their membership. We created a complete marketing system with ads, landing pages, and automation. Within 60 days: 420% increase in website visits, 200 leads generated, and 15% became paying members.',
  },
  {
    id: 4,
    title: 'Consulting Agency Launch',
    client: 'Strategy Partners',
    industry: 'Consulting',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    metrics: { traffic: '+310%', leads: '80', conversion: '25%' },
    story: 'A new consulting firm needed credibility and clients fast. We built their brand, website, and lead generation system. Results: 310% organic traffic growth, 80 qualified leads, and 25% became clients worth €120k in contracts.',
  },
  {
    id: 5,
    title: 'E-commerce Store Growth',
    client: 'Organic Market',
    industry: 'E-commerce',
    image: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=800',
    metrics: { traffic: '+500%', leads: '350', conversion: '12%' },
    story: 'Organic Market wanted to increase online sales. We optimized their store, created ad campaigns, and built email flows. Within 90 days: 500% traffic increase, 350 newsletter subscribers, and 12% purchase conversion rate.',
  },
  {
    id: 6,
    title: 'Real Estate Agency',
    client: 'Home Experts',
    industry: 'Real Estate',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    metrics: { traffic: '+390%', leads: '150', conversion: '20%' },
    story: 'Home Experts needed more property inquiries. We built a modern website, local SEO, and ad campaigns. Results: 390% increase in site visits, 150 qualified property inquiries, and 20% became clients.',
  },
];

export default function CaseStudiesPage() {
  const [selectedCase, setSelectedCase] = useState<typeof caseStudies[0] | null>(null);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/8 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <RevealSection>
            <SectionHeader
              badge="Success Stories"
              title="Real Results from"
              titleGradient="Real Businesses"
              subtitle="See how businesses like yours transformed their growth with Ovivo."
            />
          </RevealSection>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <StaggerItem key={study.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  onClick={() => setSelectedCase(study)}
                  className="glass rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                        {study.industry}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-600 transition-all group-hover:text-blue-400 group-hover:translate-x-1" />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-1">{study.title}</h3>
                    <p className="text-sm text-gray-500 mb-5">{study.client}</p>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="glass rounded-xl p-3">
                        <TrendingUp className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                        <p className="text-base font-bold text-white">{study.metrics.traffic}</p>
                        <p className="text-[10px] text-gray-500">Traffic</p>
                      </div>
                      <div className="glass rounded-xl p-3">
                        <Users className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                        <p className="text-base font-bold text-white">{study.metrics.leads}</p>
                        <p className="text-[10px] text-gray-500">Leads</p>
                      </div>
                      <div className="glass rounded-xl p-3">
                        <DollarSign className="h-4 w-4 text-orange-400 mx-auto mb-1" />
                        <p className="text-base font-bold text-white">{study.metrics.conversion}</p>
                        <p className="text-[10px] text-gray-500">CVR</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl bg-[#0d1117] border-white/10 text-white">
          {selectedCase && (
            <>
              <DialogHeader>
                <div className="aspect-video overflow-hidden rounded-xl mb-4">
                  <img
                    src={selectedCase.image}
                    alt={selectedCase.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="inline-flex w-fit items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 mb-2">
                  {selectedCase.industry}
                </span>
                <DialogTitle className="text-2xl text-white">{selectedCase.title}</DialogTitle>
                <p className="text-gray-400">{selectedCase.client}</p>
              </DialogHeader>

              <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6 text-center">
                <div>
                  <TrendingUp className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedCase.metrics.traffic}</p>
                  <p className="text-sm text-gray-500">Traffic Increase</p>
                </div>
                <div>
                  <Users className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedCase.metrics.leads}</p>
                  <p className="text-sm text-gray-500">New Leads</p>
                </div>
                <div>
                  <DollarSign className="h-5 w-5 text-orange-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedCase.metrics.conversion}</p>
                  <p className="text-sm text-gray-500">Conversion Rate</p>
                </div>
              </div>

              <div className="py-4">
                <h3 className="font-semibold text-white mb-3">The Story</h3>
                <p className="text-gray-400 leading-relaxed">{selectedCase.story}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
