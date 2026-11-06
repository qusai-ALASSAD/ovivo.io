import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "روبوت محادثة ذكي لخدمة عملاء الشركات | OVIVO.IO",
  description: "روبوتات محادثة بالذكاء الاصطناعي للرد على العملاء والدعم والحجوزات مع ربط الأنظمة حسب الحاجة. تواصل مع OVIVO.IO.",
  alternates: { canonical: "/ar/services/ai-chatbot/", languages: {"de-DE":"/services/ai-chatbot/","en":"/en/services/ai-chatbot/","ar":"/ar/services/ai-chatbot/","x-default":"/services/ai-chatbot/"} },
  openGraph: {
    type: 'website',
    title: "روبوت محادثة ذكي لخدمة عملاء الشركات | OVIVO.IO",
    description: "روبوتات محادثة بالذكاء الاصطناعي للرد على العملاء والدعم والحجوزات مع ربط الأنظمة حسب الحاجة. تواصل مع OVIVO.IO.",
    url: "https://ovivo.io/ar/services/ai-chatbot/",
    locale: "ar_AR",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
