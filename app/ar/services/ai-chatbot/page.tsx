'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Bot, Clock, MessageSquare, TrendingUp, Shield } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.08)]" dir="rtl">
    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-5">روبوت الذكاء الاصطناعي — معاينة مباشرة</p>
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="glass rounded-xl rounded-tl-none p-3 text-xs text-gray-300 leading-relaxed flex-1">
          مرحباً! أنا مساعدك الذكي. يمكنني مساعدتك في الحجوزات والأسئلة والأسعار. بماذا أستطيع مساعدتك اليوم؟
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl rounded-tr-none p-3 text-xs text-gray-200 max-w-[80%]">
          أريد حجز استشارة
        </div>
      </div>
      <div className="flex gap-3">
        <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="glass rounded-xl rounded-tl-none p-3 text-xs text-gray-300 leading-relaxed flex-1">
          <span className="text-emerald-400 font-semibold">اختيار رائع!</span> لدي مواعيد متاحة هذا الأسبوع:
          <div className="mt-2 space-y-1.5">
            {['الثلاثاء 14 يناير — 10:00 صباحاً', 'الأربعاء 15 يناير — 2:00 مساءً', 'الخميس 16 يناير — 11:00 صباحاً'].map((slot) => (
              <div key={slot} className="flex items-center gap-2 bg-emerald-500/10 rounded-lg px-2 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{slot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
      <div>
        <div className="text-lg font-bold text-white">94%</div>
        <div className="text-[10px] text-gray-500">ردود تلقائية</div>
      </div>
      <div>
        <div className="text-lg font-bold text-emerald-400">24/7</div>
        <div className="text-[10px] text-gray-500">متاح دائماً</div>
      </div>
      <div>
        <div className="text-lg font-bold text-blue-400">3 ثوانٍ</div>
        <div className="text-[10px] text-gray-500">متوسط الرد</div>
      </div>
    </div>
  </div>
);

export default function AiChatbotArPage() {
  return (
    <ServicePageLayout
      lang="ar"
      badge="روبوت الذكاء الاصطناعي"
      heroTitle="عملاؤك يريدون ردوداً"
      heroGradient="فورية."
      heroSubtitle="نبني روبوتات ذكاء اصطناعي مخصصة تجيب على الأسئلة وتحجز المواعيد وتحول الزوار إلى عملاء — على مدار 24 ساعة في اليوم، 7 أيام في الأسبوع."
      heroImage={heroImage}
      whyTitle="لماذا يحتاج عملك روبوت ذكاء اصطناعي"
      whyItems={[
        { icon: Clock, title: 'متاح 24/7', desc: 'لا تضيع أي فرصة بيع بسبب ساعات العمل. روبوتنا يعمل حتى وأنت نائم.' },
        { icon: MessageSquare, title: 'ردود فورية', desc: '94% من الأسئلة تُجاب في ثوانٍ. العملاء لا ينتظرون — وروبوتنا لا يجعلهم ينتظرون.' },
        { icon: TrendingUp, title: 'المزيد من الحجوزات', desc: 'الروبوت يوجه الزوار نحو الحجز بشكل طبيعي، مما يزيد معدلات التحويل بنسبة تصل إلى 45%.' },
        { icon: Shield, title: 'متوافق مع حماية البيانات', desc: 'نظام آمن ومتوافق مع اللوائح. بيانات عملائك محمية دائماً.' },
      ]}
      beforeAfter={[
        { before: 'الأسئلة المتكررة تستهلك وقت فريقك', after: 'الروبوت يجيب على 94% من الأسئلة تلقائياً' },
        { before: 'العملاء ينتظرون ساعات للرد', after: 'ردود فورية على مدار الساعة' },
        { before: 'فرص ضائعة خارج ساعات العمل', after: 'الروبوت يحجز المواعيد حتى منتصف الليل' },
        { before: 'تجربة عملاء غير متسقة', after: 'كل زائر يحصل على نفس الخدمة المميزة' },
      ]}
      deliverables={[
        {
          category: 'إعداد الروبوت',
          items: ['تدريب الروبوت على محتوى عملك', 'برمجة الأسئلة المتكررة', 'تخصيص شخصية الروبوت', 'دمج الروبوت في موقعك أو واتساب'],
        },
        {
          category: 'تدفقات المحادثة',
          items: ['تدفق الترحيب والتأهيل', 'تدفق الحجز والمواعيد', 'تدفق الأسعار والعروض', 'تحويل إلى فريق بشري عند الحاجة'],
        },
        {
          category: 'التكاملات',
          items: ['تكامل مع CRM', 'تكامل مع نظام الحجز', 'تكامل واتساب', 'تكامل البريد الإلكتروني'],
        },
        {
          category: 'التحليلات',
          items: ['لوحة تحليلات المحادثات', 'تقارير الأسئلة الأكثر تكراراً', 'تتبع معدل التحويل', 'تحسين شهري للأداء'],
        },
      ]}
      useCases={[
        { industry: 'المطاعم', icon: '🍽️', example: 'الروبوت يجيب على أسئلة القائمة والحساسيات، يحجز الطاولات، ويرسل تذكيرات تلقائية.' },
        { industry: 'العيادات', icon: '🏥', example: 'حجز المواعيد، أسئلة الأسعار، والتحقق من التأمين — كل ذلك دون إشراك الفريق.' },
        { industry: 'الفنادق', icon: '🏨', example: 'الروبوت يجيب على أسئلة الغرف والمرافق ويحجز الإقامات على مدار الساعة.' },
        { industry: 'صالونات الجمال', icon: '💅', example: 'حجز المواعيد، أسئلة الأسعار، وتذكيرات تلقائية تقلل حالات الغياب.' },
        { industry: 'العقارات', icon: '🏠', example: 'الروبوت يؤهل المشترين المحتملين ويجدول جولات مشاهدة العقارات تلقائياً.' },
      ]}
      process={[
        { step: '01', title: 'تدقيق المحتوى', desc: 'نجمع كل الأسئلة المتكررة، قائمة الخدمات، والأسعار لتدريب الروبوت عليها.' },
        { step: '02', title: 'تصميم المحادثة', desc: 'نرسم مسارات المحادثة لكل سيناريو محتمل ونحصل على موافقتك.' },
        { step: '03', title: 'البناء والتدريب', desc: 'نبني الروبوت ونربطه بأنظمتك الحالية.' },
        { step: '04', title: 'الاختبار والضبط', desc: 'نختبر مئات السيناريوهات ونضبط الردود حتى تكون مثالية.' },
        { step: '05', title: 'الإطلاق والتحسين', desc: 'نطلق الروبوت ونراقب أداءه ونحسنه شهرياً.' },
      ]}
      packages={[
        {
          name: 'روبوت أساسي',
          price: 'من €800',
          timeline: 'تسليم خلال 5 أيام',
          badge: 'مبتدئ',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'روبوت أسئلة متكررة',
            'تكامل الموقع الإلكتروني',
            '50 سؤالاً مبرمجاً',
            'تدفق الحجز الأساسي',
            'دعم 30 يوماً',
          ],
        },
        {
          name: 'روبوت ذكي',
          price: 'من €1,800',
          timeline: 'تسليم خلال 7 أيام',
          badge: 'الأكثر طلباً',
          badgeClass: 'bg-blue-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'كل ما في الأساسي',
            'تكامل واتساب',
            'تدفقات حجز متقدمة',
            'تكامل CRM',
            'تحويل للفريق البشري',
            'لوحة تحليلات',
            'دعم وتحسين 60 يوماً',
          ],
        },
        {
          name: 'روبوت متكامل',
          price: 'من €3,200',
          timeline: 'تسليم خلال 10 أيام',
          badge: 'النظام الكامل',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          deliverables: [
            'كل ما في الذكي',
            'دعم متعدد اللغات',
            'تكامل متعدد القنوات',
            'تدفقات مبيعات متقدمة',
            'تكامل نظام الدفع',
            'تقارير أداء شهرية',
            'دعم مخصص 90 يوماً',
          ],
        },
      ]}
      faqs={[
        { q: 'كم وقتاً يستغرق بناء الروبوت؟', a: 'الروبوت الأساسي جاهز في 5 أيام. الروبوت المتكامل يستغرق 10 أيام مع الاختبار الكامل.' },
        { q: 'هل الروبوت يتحدث العربية؟', a: 'نعم، نبني روبوتات عربية كاملة، ويمكننا أيضاً دعم اللغات الإنجليزية والفرنسية وغيرها.' },
        { q: 'ماذا لو سأل العميل سؤالاً لا يعرفه الروبوت؟', a: 'الروبوت يحول المحادثة بسلاسة إلى فريقك البشري مع سياق المحادثة كاملاً.' },
        { q: 'هل يمكن ربط الروبوت بواتساب؟', a: 'نعم، نتكامل مع واتساب بزنس API ليصل الروبوت إلى عملائك على قناتهم المفضلة.' },
        { q: 'هل بياناتي وبيانات عملائي آمنة؟', a: 'نعم، نلتزم بأعلى معايير حماية البيانات. جميع المحادثات مشفرة ومحمية.' },
      ]}
      relatedServices={[
        { href: '/ar/services/automation', label: 'أنظمة الأتمتة' },
        { href: '/ar/services/crm-email', label: 'CRM + تسلسلات البريد' },
        { href: '/ar/services/funnels', label: 'موقع + قمع مبيعات' },
        { href: '/ar/services/ads', label: 'الإعلانات والتسويق' },
      ]}
    />
  );
}
