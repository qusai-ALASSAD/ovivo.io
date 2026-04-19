'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { ChartBar as BarChart3, Target, TrendingUp, Zap } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-rose-500/20 shadow-[0_0_60px_rgba(244,63,94,0.08)]" dir="rtl">
    <p className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-5">أداء الحملة الإعلانية</p>
    <div className="grid grid-cols-2 gap-4 mb-5">
      {[
        { label: 'مشاهدات', value: '48,200', change: '+12%', up: true },
        { label: 'نقرات', value: '1,840', change: '+28%', up: true },
        { label: 'تكلفة العميل', value: '€6.40', change: '-18%', up: false },
        { label: 'عائد الإنفاق', value: '4.2x', change: '+0.8x', up: true },
      ].map((stat) => (
        <div key={stat.label} className="glass rounded-xl p-3 border-white/10">
          <div className="text-[10px] text-gray-500 mb-1">{stat.label}</div>
          <div className="text-xl font-bold text-white">{stat.value}</div>
          <div className="text-[10px] font-semibold mt-0.5 text-emerald-400">{stat.change} هذا الشهر</div>
        </div>
      ))}
    </div>
    <div className="space-y-3">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">أفضل الإعلانات أداءً</div>
      {[
        { name: 'فيديو — قبل وبعد', spend: '€320', leads: '48', cpl: '€6.67' },
        { name: 'كاروسيل — الخدمات', spend: '€280', leads: '42', cpl: '€6.67' },
        { name: 'صورة ثابتة — عرض', spend: '€200', leads: '34', cpl: '€5.88' },
      ].map((ad) => (
        <div key={ad.name} className="flex items-center justify-between text-xs">
          <span className="text-gray-400">{ad.name}</span>
          <div className="flex gap-3 text-gray-500">
            <span>{ad.spend}</span>
            <span className="text-emerald-400">{ad.leads} عميل</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function AdsArPage() {
  return (
    <ServicePageLayout
      lang="ar"
      badge="الإعلانات والتسويق"
      heroTitle="إعلانات تحقق"
      heroGradient="نتائج حقيقية."
      heroSubtitle="نبني ونُدير حملات إعلانية على جوجل وميتا وتيك توك مصممة لتحويل كل ريال من ميزانيتك إلى عملاء حقيقيين."
      heroImage={heroImage}
      whyTitle="لماذا إعلاناتك الحالية لا تحقق النتائج"
      whyItems={[
        { icon: Target, title: 'استهداف دقيق', desc: 'نصل إلى العملاء المثاليين في الوقت المناسب بالرسالة المناسبة.' },
        { icon: BarChart3, title: 'بيانات وقرارات', desc: 'كل قرار مدعوم بالبيانات. لا تخمين، لا إنفاق مهدر.' },
        { icon: TrendingUp, title: 'تحسين مستمر', desc: 'نختبر ونحسن ونُطور حملاتك أسبوعياً لتحقيق أفضل عائد.' },
        { icon: Zap, title: 'نتائج سريعة', desc: 'الحملات الأولى تبدأ تُظهر نتائج خلال 48 ساعة من الإطلاق.' },
      ]}
      beforeAfter={[
        { before: 'إنفاق إعلاني بدون نتائج واضحة', after: 'كل ريال مُتتبع ومحسوب العائد' },
        { before: 'استهداف عشوائي يُبدد الميزانية', after: 'استهداف دقيق يصل إلى العملاء الجاهزين للشراء' },
        { before: 'إعلانات لا تتغير لأشهر', after: 'اختبار مستمر وتحسين أسبوعي' },
        { before: 'لا تعرف ما يعمل وما لا يعمل', after: 'تقارير واضحة وشفافة كل أسبوع' },
      ]}
      deliverables={[
        {
          category: 'إعداد الحملة',
          items: ['تدقيق الحسابات الإعلانية الحالية', 'بحث الجمهور والمنافسين', 'هيكلة الحملة الاستراتيجية', 'إعداد التتبع والتحليلات'],
        },
        {
          category: 'المحتوى الإبداعي',
          items: ['نصوص إعلانية متعددة الأشكال', 'تصميم بنرات وصور', 'تصوير وتحرير فيديوهات', 'اختبار A/B للمحتوى'],
        },
        {
          category: 'الإدارة والتحسين',
          items: ['مراقبة يومية للحملات', 'تحسين عروض الأسعار', 'توسيع الجمهور الناجح', 'إيقاف الإعلانات الضعيفة'],
        },
        {
          category: 'التقارير',
          items: ['تقرير أسبوعي للأداء', 'تحليل شهري شامل', 'مقارنة بالمنافسين', 'توصيات التطوير'],
        },
      ]}
      useCases={[
        { industry: 'المطاعم', icon: '🍽️', example: 'إعلانات محلية تستهدف الجوعى في محيط 5 كيلومتر لزيادة الطلبات والحجوزات.' },
        { industry: 'العيادات', icon: '🏥', example: 'إعلانات جوجل تستهدف الباحثين عن خدمات طبية محددة في منطقتك.' },
        { industry: 'العقارات', icon: '🏠', example: 'حملات ميتا للمشترين والمستأجرين المحتملين مع استهداف ديموغرافي دقيق.' },
        { industry: 'التجزئة', icon: '🛍️', example: 'إعلانات تجارة إلكترونية مع ريتارجيتينج لاستعادة الزوار الذين لم يشتروا.' },
        { industry: 'التعليم', icon: '📚', example: 'حملات لاستقطاب الطلاب الجدد مع تتبع التسجيلات والتحويلات.' },
      ]}
      process={[
        { step: '01', title: 'تدقيق وتحليل', desc: 'نراجع حساباتك الحالية، الجمهور، والمنافسين لنفهم أين تكمن الفرص.' },
        { step: '02', title: 'الاستراتيجية', desc: 'نبني استراتيجية حملة كاملة مع أهداف واضحة وميزانية مقسمة بذكاء.' },
        { step: '03', title: 'الإبداع والبناء', desc: 'نصمم الإعلانات ونكتب النصوص وننشئ المحتوى الذي يجذب ويحول.' },
        { step: '04', title: 'الإطلاق والاختبار', desc: 'نطلق الحملات مع مجموعات اختبار متعددة لنجد الأفضل أداءً.' },
        { step: '05', title: 'التحسين المستمر', desc: 'نحسن أسبوعياً بناءً على البيانات لنزيد العائد ونخفض التكاليف.' },
      ]}
      packages={[
        {
          name: 'إعلانات أساسية',
          price: 'من €800/شهر',
          timeline: 'إطلاق خلال 5 أيام',
          badge: 'مبتدئ',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'منصة إعلانية واحدة',
            'حتى €2,000 ميزانية إعلانية',
            '3 حملات نشطة',
            'تقرير شهري',
            'دعم عبر البريد',
          ],
        },
        {
          name: 'إعلانات نمو',
          price: 'من €1,500/شهر',
          timeline: 'إطلاق خلال 7 أيام',
          badge: 'الأكثر طلباً',
          badgeClass: 'bg-blue-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'منصتان إعلانيتان',
            'حتى €5,000 ميزانية إعلانية',
            'إعلانات ريتارجيتينج',
            'محتوى إبداعي شهري',
            'تقارير أسبوعية',
            'اجتماع شهري للاستراتيجية',
            'دعم ذو أولوية',
          ],
        },
        {
          name: 'إعلانات شاملة',
          price: 'من €3,000/شهر',
          timeline: 'إطلاق خلال 10 أيام',
          badge: 'النظام الكامل',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          deliverables: [
            'جميع المنصات الإعلانية',
            'ميزانية إعلانية غير محدودة',
            'استراتيجية قمع كاملة',
            'محتوى فيديو وصور شهرياً',
            'تحليل المنافسين',
            'تقارير أسبوعية تفصيلية',
            'مدير حساب مخصص',
          ],
        },
      ]}
      faqs={[
        { q: 'ما الميزانية الإعلانية المناسبة للبدء؟', a: 'نوصي بميزانية لا تقل عن €500 شهرياً للحصول على بيانات كافية للتحسين. رسوم إدارتنا منفصلة عن ميزانية الإعلانات.' },
        { q: 'متى أرى نتائج؟', a: 'الحملات الأولى تبدأ تُظهر بيانات خلال 48 ساعة. النتائج الحقيقية تبدأ في الأسبوع 2-3 بعد التحسين الأولي.' },
        { q: 'هل تديرون إعلانات جوجل وميتا وتيك توك؟', a: 'نعم، نتخصص في جميع المنصات الرئيسية. نوصي بالمنصة الأنسب لجمهورك وأهدافك.' },
        { q: 'هل تصممون الإعلانات أيضاً؟', a: 'نعم، إنشاء المحتوى الإبداعي (نصوص، صور، فيديوهات) مشمول في جميع الباقات.' },
        { q: 'كيف أعرف أن إعلاناتي تعمل؟', a: 'تحصل على تقارير شفافة أسبوعية وشهرية تُظهر كل الأرقام بوضوح — من التكلفة إلى عدد العملاء.' },
      ]}
      relatedServices={[
        { href: '/ar/services/funnels', label: 'موقع + قمع مبيعات' },
        { href: '/ar/services/automation', label: 'أنظمة الأتمتة' },
        { href: '/ar/services/crm-email', label: 'CRM + تسلسلات البريد' },
        { href: '/ar/services/branding', label: 'الهوية والعلامة التجارية' },
      ]}
    />
  );
}
