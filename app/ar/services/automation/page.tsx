'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import {
  Zap, Clock, Users, TrendingUp, Mail, Calendar,
  ShoppingCart, Star, ArrowRight,
} from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-8 border-blue-500/20 shadow-[0_0_60px_rgba(59,130,246,0.1)]" dir="rtl">
    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">تدفق الأتمتة المباشر</p>
    <div className="space-y-3">
      {[
        { icon: Users, label: 'يصل العميل المحتمل', status: 'complete', color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/20' },
        { icon: Zap, label: 'يُضاف تلقائياً إلى CRM', status: 'complete', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20' },
        { icon: Mail, label: 'إرسال بريد ترحيبي', status: 'complete', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20' },
        { icon: Calendar, label: 'تذكير بالموعد', status: 'active', color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/20' },
        { icon: Star, label: 'طلب تقييم (اليوم 7)', status: 'pending', color: 'text-gray-500', bg: 'bg-white/5 border-white/10' },
      ].map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={i} className="flex items-center gap-4">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl border flex-shrink-0 ${step.bg}`}>
              <Icon className={`h-4 w-4 ${step.color}`} />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className={`text-sm font-medium ${step.status === 'pending' ? 'text-gray-600' : 'text-gray-200'}`}>{step.label}</span>
              {step.status === 'complete' && <span className="text-[10px] text-emerald-400 font-bold">تم</span>}
              {step.status === 'active' && <span className="text-[10px] text-orange-400 font-bold animate-pulse">نشط</span>}
              {step.status === 'pending' && <span className="text-[10px] text-gray-600 font-bold">قريباً</span>}
            </div>
          </div>
        );
      })}
    </div>
    <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-white">47</div>
        <div className="text-xs text-gray-500">عميل اليوم</div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-emerald-400">100%</div>
        <div className="text-xs text-gray-500">تم المتابعة</div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-blue-400">0</div>
        <div className="text-xs text-gray-500">مهمة يدوية</div>
      </div>
    </div>
  </div>
);

const diagramSection = (
  <div dir="rtl">
    <RevealSection className="text-center mb-14">
      <SectionHeader
        badge="كيف يعمل"
        title="تدفق الأتمتة"
        titleGradient="مرئياً"
        subtitle="كل خطوة مؤتمتة. كل عميل محتمل يُلتقط. كل متابعة تُرسل — دون أن تلمس شيئاً."
      />
    </RevealSection>
    <RevealSection>
      <div className="relative overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max mx-auto max-w-5xl px-4">
          {[
            { icon: Users, label: 'وصول العميل', sublabel: 'نموذج، إعلان، أو إحالة', color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/20' },
            { icon: Zap, label: 'إدخال CRM', sublabel: 'تصنيف وتقييم تلقائي', color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/20' },
            { icon: Mail, label: 'إرسال بريد', sublabel: 'ترحيب شخصي', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20' },
            { icon: Calendar, label: 'تدفق الحجز', sublabel: 'إرسال رابط التقويم', color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/20' },
            { icon: TrendingUp, label: 'المتابعة', sublabel: 'تسلسل يوم 2، 5، 10', color: 'text-cyan-400', bg: 'bg-cyan-500/15 border-cyan-500/20' },
            { icon: Star, label: 'طلب تقييم', sublabel: 'تلقائي بعد الخدمة', color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/20' },
          ].map((node, i, arr) => {
            const Icon = node.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="flex flex-col items-center text-center w-28">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border mb-3 ${node.bg}`}>
                    <Icon className={`h-6 w-6 ${node.color}`} />
                  </div>
                  <p className="text-xs font-bold text-white">{node.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{node.sublabel}</p>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-700 flex-shrink-0 rotate-180" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>

    <RevealSection>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
        {[
          { icon: ShoppingCart, title: 'تدفق السلة المتروكة', desc: 'متابعة تلقائية مع العملاء الذين غادروا دون شراء.' },
          { icon: Calendar, title: 'حجز المواعيد', desc: 'أتمتة التذكيرات والتأكيدات ومتابعة الغياب.' },
          { icon: Mail, title: 'واتساب / بريد إلكتروني', desc: 'تسلسلات متعددة القنوات تصل العملاء أينما كانوا.' },
          { icon: Star, title: 'طلبات تقييم جوجل', desc: 'طلبات تقييم تلقائية بعد كل خدمة مكتملة.' },
        ].map((ex) => {
          const Icon = ex.icon;
          return (
            <div key={ex.title} className="glass rounded-xl p-5 border-white/10">
              <Icon className="h-5 w-5 text-blue-400 mb-3" />
              <p className="text-sm font-bold text-white mb-1">{ex.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{ex.desc}</p>
            </div>
          );
        })}
      </div>
    </RevealSection>
  </div>
);

export default function AutomationArPage() {
  return (
    <ServicePageLayout
      lang="ar"
      badge="أنظمة الأتمتة"
      heroTitle="توقف عن تنفيذ المهام."
      heroGradient="ابدأ النمو."
      heroSubtitle="نبني أنظمة أتمتة مخصصة تلتقط كل عميل محتمل، تتابع فوراً، وتحول العملاء المحتملين إلى عملاء — بشكل كامل تلقائي."
      heroImage={heroImage}
      whyTitle="لماذا تحتاج عملك إلى الأتمتة"
      whyItems={[
        { icon: Clock, title: 'وفّر 20+ ساعة أسبوعياً', desc: 'تخلص من المهام اليدوية المتكررة واستعد وقتك للعمل عالي القيمة.' },
        { icon: Users, title: 'صفر عملاء محتملين ضائعين', desc: 'كل عميل يُلتقط ويُصنف ويُتابع — حتى الساعة 2 صباحاً يوم الأحد.' },
        { icon: TrendingUp, title: 'تجربة عملاء أفضل', desc: 'ردود فورية ولمسات شخصية تجعل العملاء يشعرون بالتقدير.' },
        { icon: Mail, title: 'متابعة منتظمة', desc: 'تسلسلات متعددة الخطوات ترعى كل عميل حتى الشراء.' },
      ]}
      beforeAfter={[
        { before: 'يضيع العملاء المحتملون في الفوضى', after: 'كل عميل يُلتقط ويُصنف تلقائياً' },
        { before: 'ساعات تُهدر في المتابعة اليدوية', after: 'التسلسلات تعمل 24/7 دون تدخل بشري' },
        { before: 'تواصل غير منتظم مع العملاء', after: 'كل عميل يحصل على نفس التجربة المميزة' },
        { before: 'غياب وحجوزات منسية', after: 'التذكيرات التلقائية تقلل الغياب بنسبة 60%' },
      ]}
      deliverables={[
        {
          category: 'التقاط العملاء المحتملين',
          items: ['تكامل النموذج مع CRM', 'تقييم وتصنيف العملاء', 'إعداد الإشعارات الفورية', 'تتبع المصدر والإسناد'],
        },
        {
          category: 'البريد والرسائل',
          items: ['تسلسل بريد ترحيبي', 'تدفقات رعاية متعددة الخطوات (5-7 رسائل)', 'تكامل متابعة واتساب', 'حملات إعادة التفاعل'],
        },
        {
          category: 'الحجز والجدولة',
          items: ['تكامل التقويم وأتمتته', 'تدفقات تأكيد المواعيد', 'تسلسلات التذكير (24 ساعة، ساعة)', 'أتمتة متابعة الغياب'],
        },
        {
          category: 'ما بعد البيع',
          items: ['أتمتة طلب التقييم', 'محفزات البيع الإضافي', 'تدفقات طلب الإحالة', 'حملات الولاء وإعادة الحجز'],
        },
        {
          category: 'التجارة الإلكترونية',
          items: ['استرداد السلة المتروكة', 'تسلسلات تأكيد الطلب', 'أتمتة تحديث الشحن', 'طلبات التقييم بعد الشراء'],
        },
        {
          category: 'التقارير والمراقبة',
          items: ['لوحة أداء الأتمتة', 'تتبع معدلات الفتح والنقر', 'تقارير قمع التحويل', 'دعم وتحسين 30 يوماً'],
        },
      ]}
      useCases={[
        { industry: 'المطاعم', icon: '🍽️', example: 'تأكيد الحجوزات تلقائياً، إرسال روابط القائمة، وطلب تقييمات جوجل بعد كل زيارة.' },
        { industry: 'شركات التنظيف', icon: '🧹', example: 'عروض أسعار تلقائية، تأكيدات الحجز، وتذكيرات المواعيد المتكررة.' },
        { industry: 'صالونات الشعر', icon: '✂️', example: 'تذكيرات المواعيد، تدفقات إعادة الحجز، ومكافآت الولاء بعد كل زيارة خامسة.' },
        { industry: 'العيادات', icon: '🏥', example: 'نماذج استقبال المريض، تذكيرات المواعيد، وتسلسلات المتابعة بعد الزيارة.' },
        { industry: 'التجارة الإلكترونية', icon: '🛍️', example: 'تدفقات السلة المتروكة، تحديثات الطلب، طلبات التقييم، وتسلسلات البيع الإضافي.' },
      ]}
      process={[
        { step: '01', title: 'مكالمة الاستكشاف', desc: 'نرسم سير عملك الحالي ونحدد كل نقطة تلامس يدوية يمكننا أتمتتها.' },
        { step: '02', title: 'تصميم التدفق', desc: 'نصمم بنية الأتمتة الكاملة وننتظر موافقتك قبل البناء.' },
        { step: '03', title: 'البناء والربط', desc: 'نبني جميع التدفقات، ونربط أدواتك، ونكتب كل بريد ورسالة.' },
        { step: '04', title: 'الاختبار والإطلاق', desc: 'نختبر كل محفز وكل تدفق وكل حالة طرفية قبل الإطلاق.' },
        { step: '05', title: 'التحسين', desc: 'جلسات شهرية لمراجعة معدلات الفتح وبيانات التحويل وتحسين الأداء.' },
      ]}
      packages={[
        {
          name: 'أتمتة أساسية',
          price: 'من €1,500',
          timeline: 'تسليم خلال 7 أيام',
          badge: 'مبتدئ',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'تكامل التقاط العملاء مع CRM',
            'تسلسل بريد ترحيبي 3 خطوات',
            'تدفق تأكيد المواعيد',
            'أتمتة تذكير أساسية',
            'دعم 30 يوماً',
          ],
        },
        {
          name: 'أتمتة النمو',
          price: 'من €3,000',
          timeline: 'تسليم خلال 10 أيام',
          badge: 'الأكثر طلباً',
          badgeClass: 'bg-blue-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'كل ما في الأساسية',
            'تسلسلات متعددة القنوات (بريد + واتساب)',
            'تدفق رعاية 7 خطوات',
            'أتمتة إعادة الحجز',
            'أتمتة طلب التقييم',
            'تكامل جوجل أناليتيكس',
            'دعم وتحسين 60 يوماً',
          ],
        },
        {
          name: 'أتمتة شاملة',
          price: 'من €5,000',
          timeline: 'تسليم خلال 14 يوماً',
          badge: 'النظام الكامل',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          deliverables: [
            'كل ما في النمو',
            'أتمتة قمع كاملة (10+ تدفقات)',
            'تقسيم وتخصيص متقدم',
            'أتمتة مسار CRM',
            'تسلسلات البيع الإضافي والإحالة',
            'تقارير أداء شهرية',
            'دعم مخصص 90 يوماً',
          ],
        },
      ]}
      faqs={[
        { q: 'ما الأدوات التي تستخدمونها للأتمتة؟', a: 'نعمل مع Make.com وZapier وGoHighLevel وKlaviyo وActiveCampaign والمزيد — أيهما يناسب تقنيتك وميزانيتك الحالية.' },
        { q: 'هل أحتاج إلى CRM للبدء؟', a: 'لا. إذا لم يكن لديك CRM بعد، سنوصي بواحد ونعده كجزء من المشروع. هذا مشمول في جميع الباقات.' },
        { q: 'هل يمكنكم أتمتة رسائل واتساب؟', a: 'نعم، نتكامل مع واتساب بزنس API عبر منصات مثل Twilio أو 360dialog لإرسال رسائل تلقائية وشخصية.' },
        { q: 'كم من الوقت حتى تعمل الأتمتة؟', a: 'الأنظمة الأساسية تعمل خلال 7 أيام. الأنظمة الكاملة تعمل خلال 14 يوماً مع الاختبار والتحسين.' },
        { q: 'ماذا لو حدث خطأ بعد الإطلاق؟', a: 'جميع الباقات تشمل دعماً بعد الإطلاق من 30 إلى 90 يوماً. نراقب ونصلح ونحسن كل تدفق أتمتة.' },
      ]}
      relatedServices={[
        { href: '/ar/services/crm-email', label: 'CRM + تسلسلات البريد' },
        { href: '/ar/services/ai-chatbot', label: 'روبوت الذكاء الاصطناعي' },
        { href: '/ar/services/funnels', label: 'موقع + قمع مبيعات' },
        { href: '/ar/services/ads', label: 'الإعلانات والتسويق' },
      ]}
      extraSection={diagramSection}
    />
  );
}
