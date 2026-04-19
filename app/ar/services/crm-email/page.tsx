'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Mail, Users, TrendingUp, Repeat } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.08)]" dir="rtl">
    <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-5">تسلسل البريد — مباشر</p>
    <div className="space-y-2.5">
      {[
        { day: 'يوم 0', subject: 'مرحباً بك في عائلتنا!', open: '78%', status: 'sent' },
        { day: 'يوم 2', subject: 'كيف نساعدك في تحقيق أهدافك', open: '52%', status: 'sent' },
        { day: 'يوم 5', subject: 'قصة نجاح: كيف وفّر أحمد 3 ساعات يومياً', open: '61%', status: 'sent' },
        { day: 'يوم 7', subject: 'عرض خاص لك — ينتهي الجمعة', open: '—', status: 'scheduled' },
        { day: 'يوم 14', subject: 'هل لديك أسئلة؟', open: '—', status: 'pending' },
      ].map((email) => (
        <div key={email.day} className="flex items-center gap-3 text-xs">
          <span className="text-gray-600 w-12 flex-shrink-0">{email.day}</span>
          <span className={`flex-1 ${email.status === 'pending' ? 'text-gray-600' : 'text-gray-300'}`}>{email.subject}</span>
          {email.status === 'sent' && <span className="text-emerald-400 font-bold">{email.open}</span>}
          {email.status === 'scheduled' && <span className="text-orange-400 font-bold text-[10px]">مجدول</span>}
          {email.status === 'pending' && <span className="text-gray-600 font-bold text-[10px]">قريباً</span>}
        </div>
      ))}
    </div>
    <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
      <div>
        <div className="text-lg font-bold text-white">62%</div>
        <div className="text-[10px] text-gray-500">متوسط الفتح</div>
      </div>
      <div>
        <div className="text-lg font-bold text-cyan-400">+38%</div>
        <div className="text-[10px] text-gray-500">معدل التحويل</div>
      </div>
      <div>
        <div className="text-lg font-bold text-blue-400">€4.2</div>
        <div className="text-[10px] text-gray-500">عائد لكل ريال</div>
      </div>
    </div>
  </div>
);

export default function CrmEmailArPage() {
  return (
    <ServicePageLayout
      lang="ar"
      badge="CRM وتسلسلات البريد"
      heroTitle="عملاؤك يريدون أن"
      heroGradient="تتذكرهم."
      heroSubtitle="نبني أنظمة CRM متكاملة وتسلسلات بريد إلكتروني ذكية تحوّل العملاء المحتملين إلى عملاء دائمين — بشكل تلقائي كامل."
      heroImage={heroImage}
      whyTitle="لماذا CRM وتسلسلات البريد ضرورية"
      whyItems={[
        { icon: Users, title: 'لا عميل يضيع', desc: 'كل عميل محتمل يدخل نظامك ويُتابع تلقائياً حتى يشتري.' },
        { icon: Mail, title: 'تواصل شخصي على نطاق واسع', desc: 'رسائل تبدو شخصية تصل لآلاف العملاء في وقت واحد.' },
        { icon: TrendingUp, title: 'زيادة الإيرادات', desc: 'عملاؤنا يحققون زيادة تصل إلى 35% في الإيرادات خلال 90 يوماً.' },
        { icon: Repeat, title: 'عملاء يعودون دائماً', desc: 'تسلسلات إعادة الاستهداف تجعل عملاءك يعودون ويشترون مجدداً.' },
      ]}
      beforeAfter={[
        { before: 'عملاء محتملون ينسون عملك سريعاً', after: 'تسلسلات تبقيك في ذهن عملائك دائماً' },
        { before: 'متابعة يدوية غير منتظمة', after: 'متابعة تلقائية في الوقت المثالي' },
        { before: 'لا تعرف أي عملائك على وشك الشراء', after: 'CRM يُظهر لك العملاء الجاهزين للشراء' },
        { before: 'عملاء يختفون بعد أول عملية شراء', after: 'حملات إعادة استهداف تحول العملاء لمشترين متكررين' },
      ]}
      deliverables={[
        {
          category: 'إعداد CRM',
          items: ['اختيار وإعداد منصة CRM', 'تصميم مسار المبيعات', 'تقسيم قاعدة العملاء', 'إعداد التقارير والتحليلات'],
        },
        {
          category: 'تسلسلات البريد',
          items: ['تسلسل ترحيب (5 رسائل)', 'تسلسل رعاية العملاء المحتملين', 'تسلسل ما بعد الشراء', 'حملة إعادة الاستهداف'],
        },
        {
          category: 'الأتمتة',
          items: ['محفزات تلقائية بناءً على السلوك', 'تسجيل النقاط وتأهيل العملاء', 'تنبيهات فريق المبيعات', 'تكامل مع أدوات أخرى'],
        },
        {
          category: 'المحتوى',
          items: ['كتابة جميع رسائل البريد', 'تصميم قوالب البريد', 'اختبار A/B للعناوين', 'تحسين معدلات الفتح'],
        },
      ]}
      useCases={[
        { industry: 'خدمات B2B', icon: '💼', example: 'CRM يتابع كل فرصة مبيعات مع تسلسلات مخصصة لكل مرحلة في مسار البيع.' },
        { industry: 'التجارة الإلكترونية', icon: '🛍️', example: 'تسلسلات ترحيب واسترداد سلة وولاء تزيد القيمة الدائمة للعميل.' },
        { industry: 'التعليم', icon: '📚', example: 'تسلسلات تُرشد المتسجلين المحتملين من المعلومات إلى التسجيل الفعلي.' },
        { industry: 'الخدمات المحلية', icon: '🏪', example: 'حملات إعادة استهداف تجعل عملاءك السابقين يعودون ويحجزون مجدداً.' },
        { industry: 'الرعاية الصحية', icon: '🏥', example: 'تذكيرات المواعيد، نصائح صحية دورية، وحملات خدمات موسمية.' },
      ]}
      process={[
        { step: '01', title: 'تدقيق الوضع الحالي', desc: 'نراجع قاعدة بياناتك الحالية، أدواتك، وعملية المبيعات لتحديد الفجوات.' },
        { step: '02', title: 'تصميم الاستراتيجية', desc: 'نبني خريطة كاملة للتسلسلات والأتمتة المطلوبة لتحقيق أهدافك.' },
        { step: '03', title: 'الكتابة والتصميم', desc: 'نكتب جميع الرسائل بأسلوب يُلائم علامتك التجارية وجمهورك.' },
        { step: '04', title: 'البناء والاختبار', desc: 'نبني الأتمتة في CRM ونختبر كل تدفق بعناية قبل الإطلاق.' },
        { step: '05', title: 'التحسين المستمر', desc: 'نراجع الأداء شهرياً ونحسن العناوين والمحتوى لرفع النتائج.' },
      ]}
      packages={[
        {
          name: 'CRM أساسي',
          price: 'من €1,200',
          timeline: 'تسليم خلال 7 أيام',
          badge: 'مبتدئ',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'إعداد CRM أساسي',
            'تسلسل ترحيب (3 رسائل)',
            'تسجيل العملاء المحتملين',
            'قوالب بريد إلكتروني',
            'دعم 30 يوماً',
          ],
        },
        {
          name: 'CRM نمو',
          price: 'من €2,500',
          timeline: 'تسليم خلال 10 أيام',
          badge: 'الأكثر طلباً',
          badgeClass: 'bg-blue-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'كل ما في الأساسي',
            'تسلسل ترحيب كامل (5 رسائل)',
            'تسلسل رعاية العملاء',
            'تسلسل ما بعد الشراء',
            'أتمتة متقدمة',
            'تقارير الأداء',
            'دعم وتحسين 60 يوماً',
          ],
        },
        {
          name: 'CRM متكامل',
          price: 'من €4,500',
          timeline: 'تسليم خلال 14 يوماً',
          badge: 'النظام الكامل',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          deliverables: [
            'كل ما في النمو',
            'نظام تسجيل نقاط العملاء',
            'تسلسلات متعددة لكل مرحلة',
            'تكامل مع جميع الأدوات',
            'لوحة تحليلات متقدمة',
            'تقارير أسبوعية',
            'دعم مخصص 90 يوماً',
          ],
        },
      ]}
      faqs={[
        { q: 'ما أفضل منصة CRM لعملي؟', a: 'يعتمد على حجم عملك وميزانيتك. نعمل مع HubSpot وActiveCampaign وGoHighLevel وكلاً منها له مزايا مختلفة. نوصيك بالأنسب بعد فهم احتياجاتك.' },
        { q: 'كم رسالة يجب أن يحتوي التسلسل؟', a: 'يعتمد على هدف التسلسل. تسلسل الترحيب يكفيه 3-5 رسائل، بينما تسلسل الرعاية قد يصل إلى 10-15 رسالة على مدى أسابيع.' },
        { q: 'هل تكتبون محتوى البريد بالعربية؟', a: 'نعم، نكتب جميع محتوى البريد باللغة العربية بأسلوب احترافي يناسب جمهورك المحلي.' },
        { q: 'ماذا لو كان لدي قاعدة بيانات عملاء موجودة؟', a: 'نستطيع نقل قاعدة بياناتك الحالية وتنظيفها وتقسيمها ثم بناء التسلسلات المناسبة لها.' },
        { q: 'كيف أتأكد أن رسائلي لا تصل لمجلد الإسبام؟', a: 'نتبع أفضل ممارسات إرسال البريد، نضبط إعدادات DNS، ونراقب معدلات التسليم لضمان وصول رسائلك للبريد الوارد.' },
      ]}
      relatedServices={[
        { href: '/ar/services/automation', label: 'أنظمة الأتمتة' },
        { href: '/ar/services/ai-chatbot', label: 'روبوت الذكاء الاصطناعي' },
        { href: '/ar/services/funnels', label: 'موقع + قمع مبيعات' },
        { href: '/ar/services/ads', label: 'الإعلانات والتسويق' },
      ]}
    />
  );
}
