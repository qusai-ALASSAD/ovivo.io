import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'أوفيفو – الأتمتة بالذكاء الاصطناعي للمطاعم وشركات الخدمات',
  description: 'أوفيفو يؤتمت تواصلك مع العملاء والحجوزات والتسويق بأحدث تقنيات الذكاء الاصطناعي — لتربح أكثر وتجهد أقل.',
  keywords: ['أتمتة الذكاء الاصطناعي', 'أتمتة المطاعم', 'روبوت واتساب', 'نظام الحجز', 'CRM', 'أتمتة شركات الخدمات'],
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://ovivo.io/ar',
    siteName: 'Ovivo',
    title: 'أوفيفو – الأتمتة بالذكاء الاصطناعي للمطاعم وشركات الخدمات',
    description: 'مزيد من العملاء. أقل جهد. أتمتة كاملة.',
  },
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return children;
}
