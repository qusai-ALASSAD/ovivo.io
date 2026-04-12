'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, Zap, Bot, Globe, ChartBar as BarChart3, Mail, Palette, ChevronDown } from 'lucide-react';

function useLanguage() {
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');
  const isAr = pathname.startsWith('/ar');
  const prefix = isEn ? '/en' : isAr ? '/ar' : '';
  return { isEn, isAr, prefix };
}

const serviceLinksDE = [
  { href: '/services/automation', icon: Zap, label: 'Automation Systeme', color: 'text-blue-400' },
  { href: '/services/ai-chatbot', icon: Bot, label: 'KI-Chatbot', color: 'text-emerald-400' },
  { href: '/services/funnels', icon: Globe, label: 'Website & Funnels', color: 'text-orange-400' },
  { href: '/services/ads', icon: BarChart3, label: 'Ads & Marketing', color: 'text-rose-400' },
  { href: '/services/crm-email', icon: Mail, label: 'CRM & E-Mail', color: 'text-cyan-400' },
  { href: '/services/branding', icon: Palette, label: 'Branding & Content', color: 'text-amber-400' },
];

const serviceLinksEN = [
  { href: '/en/services/automation', icon: Zap, label: 'Automation Systems', color: 'text-blue-400' },
  { href: '/en/services/ai-chatbot', icon: Bot, label: 'AI Chatbot', color: 'text-emerald-400' },
  { href: '/en/services/funnels', icon: Globe, label: 'Website & Funnels', color: 'text-orange-400' },
  { href: '/en/services/ads', icon: BarChart3, label: 'Ads & Marketing', color: 'text-rose-400' },
  { href: '/en/services/crm-email', icon: Mail, label: 'CRM & Email', color: 'text-cyan-400' },
  { href: '/en/services/branding', icon: Palette, label: 'Branding & Content', color: 'text-amber-400' },
];

const serviceLinksAR = [
  { href: '/ar/services/automation', icon: Zap, label: 'أنظمة الأتمتة', color: 'text-blue-400' },
  { href: '/ar/services/ai-chatbot', icon: Bot, label: 'روبوت الدردشة الذكي', color: 'text-emerald-400' },
  { href: '/ar/services/funnels', icon: Globe, label: 'الموقع والقنوات التسويقية', color: 'text-orange-400' },
  { href: '/ar/services/ads', icon: BarChart3, label: 'الإعلانات والتسويق', color: 'text-rose-400' },
  { href: '/ar/services/crm-email', icon: Mail, label: 'إدارة العملاء والبريد', color: 'text-cyan-400' },
  { href: '/ar/services/branding', icon: Palette, label: 'الهوية التجارية والمحتوى', color: 'text-amber-400' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { isEn, isAr, prefix } = useLanguage();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 14, 26, 0)', 'rgba(10, 14, 26, 0.9)']
  );

  const serviceLinks = isEn ? serviceLinksEN : isAr ? serviceLinksAR : serviceLinksDE;

  const navLinks = isEn
    ? [
        { label: 'Home', href: '/en' },
        { label: 'Services', href: '/en/services' },
        { label: 'Pricing', href: '/en/pricing' },
        { label: 'About', href: '/en/about' },
      ]
    : isAr
    ? [
        { label: 'الرئيسية', href: '/ar' },
        { label: 'الخدمات', href: '/ar/services' },
        { label: 'الأسعار', href: '/ar/pricing' },
        { label: 'من نحن', href: '/ar/about' },
      ]
    : [
        { label: 'Startseite', href: '/' },
        { label: 'Leistungen', href: '/services' },
        { label: 'Preise', href: '/pricing' },
        { label: 'Über uns', href: '/about' },
      ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ctaLabel = isEn ? 'Free Consultation' : isAr ? 'احجز استشارتك' : 'Kostenlose Beratung';
  const servicesLabel = isEn ? 'Services' : isAr ? 'الخدمات' : 'Leistungen';
  const servicesOverview = isEn ? 'All Services' : isAr ? 'جميع الخدمات' : 'Alle Leistungen';

  const langSwitchDE = isEn ? '/' : isAr ? '/' : '/en';
  const langSwitchEN = isEn ? '/ar' : isAr ? '/en' : '/en';

  return (
    <motion.nav
      style={{ backgroundColor }}
      dir={isAr ? 'rtl' : 'ltr'}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'backdrop-blur-xl border-b border-white/10' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={prefix || '/'} className="flex items-center space-x-3 rtl:space-x-reverse group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">Ovivo</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center ${isAr ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
            {/* Home link */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Link href={navLinks[0].href} className="relative px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white group">
                {navLinks[0].label}
                <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-[calc(100%-24px)]" />
              </Link>
            </motion.div>

            {/* Services Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.07 }}
              ref={servicesRef}
              className="relative"
            >
              <button
                onClick={() => setServicesOpen((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
              >
                {servicesLabel}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-[calc(100%-24px)]" />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className={`absolute top-full ${isAr ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} mt-3 w-72 rounded-2xl glass border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden`}
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    <div className="p-2">
                      <Link
                        href={`${prefix}/services`}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/5 transition-all mb-1"
                      >
                        {servicesOverview}
                      </Link>
                      <div className="h-px bg-white/10 mb-2" />
                      {serviceLinks.map((s) => {
                        const Icon = s.icon;
                        return (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                          >
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 flex-shrink-0 group-hover:bg-white/10 transition-colors">
                              <Icon className={`h-3.5 w-3.5 ${s.color}`} />
                            </div>
                            {s.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Pricing + About links */}
            {navLinks.slice(2, 4).map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 2) * 0.07 }}
              >
                <Link href={link.href} className="relative px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white group">
                  {link.label}
                  <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-[calc(100%-24px)]" />
                </Link>
              </motion.div>
            ))}

          </div>

          {/* CTA Buttons + Lang Switcher */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`hidden md:flex items-center ${isAr ? 'space-x-reverse space-x-3' : 'space-x-3'}`}
          >
            <Link href={langSwitchDE} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full glass border border-white/10 hover:border-white/20 text-xs font-bold text-gray-400 hover:text-white transition-all">
              DE
            </Link>
            <Link href={langSwitchEN} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full glass border border-white/10 hover:border-white/20 text-xs font-bold text-gray-400 hover:text-white transition-all">
              {isEn ? 'AR' : isAr ? 'EN' : 'EN'}
            </Link>
            {!isAr && (
              <Link href="/ar" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full glass border border-white/10 hover:border-white/20 text-xs font-bold text-gray-400 hover:text-white transition-all">
                AR
              </Link>
            )}
            <Link href={`${prefix}/consultation`}>
              <Button className="bg-blue-500 hover:bg-blue-400 text-white border-0 shadow-lg hover:shadow-blue-500/40 transition-all duration-300 font-semibold">
                {ctaLabel}
              </Button>
            </Link>
          </motion.div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 glass overflow-hidden"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              <Link
                href={navLinks[0].href}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {navLinks[0].label}
              </Link>

              {/* Mobile Services */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {servicesLabel}
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link
                      href={`${prefix}/services`}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {servicesOverview}
                    </Link>
                    {serviceLinks.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className={`h-4 w-4 ${s.color}`} />
                          {s.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {navLinks.slice(2, 4).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                    <Button variant="outline" className="w-full glass border-white/10 text-gray-400 hover:text-white text-xs">DE</Button>
                  </Link>
                  <Link href="/en" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                    <Button variant="outline" className="w-full glass border-white/10 text-gray-400 hover:text-white text-xs">EN</Button>
                  </Link>
                  <Link href="/ar" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                    <Button variant="outline" className="w-full glass border-white/10 text-gray-400 hover:text-white text-xs">AR</Button>
                  </Link>
                </div>
                <Link href={`${prefix}/consultation`} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-blue-500 hover:bg-blue-400 text-white border-0 font-semibold">
                    {ctaLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
