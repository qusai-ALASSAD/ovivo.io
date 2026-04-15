'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Linkedin, Twitter, Sparkles, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { isAdminEmail } from '@/lib/admin';

export function Footer() {
  const [showAdmin, setShowAdmin] = useState(false);
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');
  const isAr = pathname.startsWith('/ar');

  const prefix = isEn ? '/en' : isAr ? '/ar' : '';
  const sPrefix = isEn ? '/en/services' : isAr ? '/ar/services' : '/services';
  const rtl = isAr;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email && isAdminEmail(session.user.email)) {
        setShowAdmin(true);
      }
    });
  }, []);

  const t = isEn
    ? {
        desc: 'AI automation for restaurants & service businesses. We automate reservations, customer inquiries, and customer retention — fully automated.',
        solutions: 'Solutions',
        industries: 'Industries',
        company: 'Company',
        pricing: 'Packages & Pricing',
        automation: 'Automation Systems',
        chatbot: 'AI Chatbot',
        crm: 'CRM & Email',
        funnels: 'Website & Funnels',
        restaurants: 'Restaurants & Cafés',
        hair: 'Hair & Beauty',
        fitness: 'Fitness & Wellness',
        cleaning: 'Cleaning Services',
        transport: 'Transport & Logistics',
        medical: 'Medical Practices',
        about: 'About',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        imprint: 'Imprint',
        copyright: 'All rights reserved.',
      }
    : isAr
    ? {
        desc: 'ذكاء اصطناعي للمطاعم وشركات الخدمات. نؤتمت الحجوزات واستفسارات العملاء والاحتفاظ بهم — بشكل تلقائي كامل.',
        solutions: 'الحلول',
        industries: 'القطاعات',
        company: 'الشركة',
        pricing: 'الباقات والأسعار',
        automation: 'أنظمة الأتمتة',
        chatbot: 'روبوت الدردشة الذكي',
        crm: 'إدارة العملاء والبريد',
        funnels: 'الموقع والقنوات التسويقية',
        restaurants: 'المطاعم والمقاهي',
        hair: 'الحلاقة والتجميل',
        fitness: 'اللياقة والعافية',
        cleaning: 'خدمات التنظيف',
        transport: 'النقل واللوجستيك',
        medical: 'العيادات والصحة',
        about: 'من نحن',
        contact: 'تواصل معنا',
        privacy: 'سياسة الخصوصية',
        imprint: 'بيانات النشر',
        copyright: 'جميع الحقوق محفوظة.',
      }
    : {
        desc: 'KI-Automation für Gastronomie & Servicebetriebe. Wir automatisieren Reservierungen, Kundenanfragen und Kundenbindung — vollautomatisch.',
        solutions: 'Lösungen',
        industries: 'Branchen',
        company: 'Unternehmen',
        pricing: 'Pakete & Preise',
        automation: 'Automation Systeme',
        chatbot: 'KI-Chatbot',
        crm: 'CRM & E-Mail',
        funnels: 'Website & Funnels',
        restaurants: 'Restaurants & Cafés',
        hair: 'Friseure & Beauty',
        fitness: 'Fitness & Wellness',
        cleaning: 'Reinigung & Service',
        transport: 'Transport & Logistik',
        medical: 'Arztpraxen & Gesundheit',
        about: 'Über uns',
        contact: 'Kontakt',
        privacy: 'Datenschutz',
        imprint: 'Impressum',
        copyright: 'Alle Rechte vorbehalten.',
      };

  return (
    <footer className="relative border-t border-white/10 glass mt-20" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1">
            <Link href={prefix || '/'} className={`flex items-center gap-2 group ${rtl ? 'flex-row-reverse justify-end' : ''}`}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 group-hover:shadow-blue-500/50 transition-all duration-300">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">Ovivo</span>
            </Link>
            <p className={`mt-4 text-sm text-gray-400 leading-relaxed ${rtl ? 'text-right' : ''}`}>{t.desc}</p>
            <div className={`mt-6 flex gap-4 ${rtl ? 'flex-row-reverse' : ''}`}>
              <a href="https://facebook.com/ovivo.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/ovivo.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/ovivo_io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/ovivo-io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className={`text-sm font-semibold text-white ${rtl ? 'text-right' : ''}`}>{t.solutions}</h3>
            <ul className={`mt-4 space-y-3 ${rtl ? 'text-right' : ''}`}>
              <li><Link href={`${prefix}/pricing`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.pricing}</Link></li>
              <li><Link href={`${sPrefix}/automation`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.automation}</Link></li>
              <li><Link href={`${sPrefix}/ai-chatbot`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.chatbot}</Link></li>
              <li><Link href={`${sPrefix}/crm-email`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.crm}</Link></li>
              <li><Link href={`${sPrefix}/funnels`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.funnels}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className={`text-sm font-semibold text-white ${rtl ? 'text-right' : ''}`}>{t.industries}</h3>
            <ul className={`mt-4 space-y-3 ${rtl ? 'text-right' : ''}`}>
              <li><Link href={`${prefix}/industries/restaurants`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.restaurants}</Link></li>
              <li><Link href={`${prefix}/industries/beauty`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.hair}</Link></li>
              <li><Link href={`${prefix}/industries/cleaning`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.cleaning}</Link></li>
              <li><Link href={`${prefix}/industries/transport`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.transport}</Link></li>
              <li><Link href={`${prefix}/industries/medical`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.medical}</Link></li>
              <li><Link href={`${prefix}/industries/trades`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.trades}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className={`text-sm font-semibold text-white ${rtl ? 'text-right' : ''}`}>{t.company}</h3>
            <ul className={`mt-4 space-y-3 ${rtl ? 'text-right' : ''}`}>
              <li><Link href={`${prefix}/about`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.about}</Link></li>
              <li><Link href={`${prefix}/contact`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.contact}</Link></li>
              <li><Link href={`${prefix}/privacy`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.privacy}</Link></li>
              <li><Link href={`${prefix}/imprint`} className="text-sm text-gray-400 hover:text-white transition-colors">{t.imprint}</Link></li>
              {showAdmin && (
                <li>
                  <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-400 transition-colors">
                    <Shield className="h-3.5 w-3.5" />
                    Admin Panel
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Ovivo.io. {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
