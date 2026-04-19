'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Globe, TrendingUp, Zap, Target } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-violet-500/20 shadow-[0_0_60px_rgba(139,92,246,0.08)]" dir="rtl">
    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-5">أداء القمع — مباشر</p>
    <div className="space-y-3 mb-5">
      {[
        { stage: 'زوار الموقع', count: '2,400', pct: 100, color: 'bg-blue-500' },
        { stage: 'العملاء المهتمون', count: '720', pct: 30, color: 'bg-cyan-500' },
        { stage: 'طلبوا معلومات', count: '216', pct: 9, color: 'bg-emerald-500' },
        { stage: 'عملاء فعليون', count: '86', pct: 3.6, color: 'bg-orange-500' },
      ].map((s) => (
        <div key={s.stage}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">{s.stage}</span>
            <span className="text-white font-bold">{s.count}</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-3 text-center pt-3 border-t border-white/10">
      <div>
        <div className="text-lg font-bold text-white">3.6%</div>
        <div className="text-[10px] text-gray-500">معدل التحويل</div>
      </div>
      <div>
        <div className="text-lg font-bold text-emerald-400">€42</div>
        <div className="text-[10px] text-gray-500">تكلفة العميل</div>
      </div>
      <div>
        <div className="text-lg font-bold text-blue-400">5.8x</div>
        <div className="text-[10px] text-gray-500">عائد الاستثمار</div>
      </div>
    </div>
  </div>
);

export default function FunnelsArPage() {
  return (
    <ServicePageLayout
      lang="ar"
      badge="موقع وقمع مبيعات"
      heroTitle="موقعك يجب أن"
      heroGradient="يبيع لك."
      heroSubtitle="نصمم ونبني مواقع وأقماع مبيعات عالية التحويل تحول الزوار إلى عملاء — مع تكامل كامل لأدوات الأتمتة والتتبع."
      heroImage={heroImage}
      whyTitle="لماذا موقعك الحالي لا يحقق مبيعات"
      whyItems={[
        { icon: Globe, title: 'تصميم يحول الزوار', desc: 'كل عنصر في الموقع مصمم لتوجيه الزائر نحو اتخاذ إجراء.' },
        { icon: Zap, title: 'سرعة استثنائية', desc: 'مواقعنا تُحمّل في أقل من 2 ثانية — لأن كل ثانية تأخير تكلفك عملاء.' },
        { icon: Target, title: 'قمع مبيعات واضح', desc: 'مسار واضح من الزيارة إلى الشراء، بدون تشتيت أو إرباك.' },
        { icon: TrendingUp, title: 'تحسين مستمر', desc: 'نتتبع كل نقرة وكل خطوة لتحسين معدل التحويل باستمرار.' },
      ]}
      beforeAfter={[
        { before: 'موقع جميل لكنه لا يجلب عملاء', after: 'موقع مصمم لتحويل كل زائر إلى عميل محتمل' },
        { before: 'زوار يغادرون دون أي تفاعل', after: 'نماذج ودعوات للعمل تلتقط بيانات الزوار' },
        { before: 'لا تعرف لماذا لا يشتري الزوار', after: 'تحليلات تُظهر بالضبط أين يتوقف الزوار' },
        { before: 'موقع لا يعمل على الجوال', after: 'تصميم متجاوب يعمل بشكل مثالي على كل الأجهزة' },
      ]}
      deliverables={[
        {
          category: 'تصميم الموقع',
          items: ['تصميم UI/UX احترافي', 'تصميم متجاوب للجوال', 'صفحات سريعة التحميل', 'تحسين لمحركات البحث SEO'],
        },
        {
          category: 'قمع المبيعات',
          items: ['صفحة هبوط عالية التحويل', 'صفحة الشكر والتأكيد', 'نموذج التقاط العملاء', 'ريتارجيتينج بكسل'],
        },
        {
          category: 'التكاملات',
          items: ['ربط مع CRM', 'تكامل الدفع الإلكتروني', 'تكامل جوجل أناليتيكس', 'ربط مع أدوات الأتمتة'],
        },
        {
          category: 'تحسين التحويل',
          items: ['اختبار A/B للصفحات', 'تحليل خرائط الحرارة', 'تحسين نماذج الاستمارات', 'تحسين دعوات العمل CTA'],
        },
      ]}
      useCases={[
        { industry: 'الخدمات المهنية', icon: '💼', example: 'موقع يُظهر خبرتك ويجعل الزوار يحجزون استشارة مباشرة.' },
        { industry: 'التجارة الإلكترونية', icon: '🛍️', example: 'متجر محسّن لزيادة معدل التحويل وتقليل معدل التخلي عن السلة.' },
        { industry: 'التعليم', icon: '📚', example: 'صفحة هبوط تحول الزوار إلى متسجلين في دوراتك.' },
        { industry: 'العقارات', icon: '🏠', example: 'موقع يُظهر عقاراتك ويجمع بيانات المشترين المهتمين.' },
        { industry: 'المطاعم', icon: '🍽️', example: 'موقع سريع يُظهر القائمة ويتيح الحجز والطلب المباشر.' },
      ]}
      process={[
        { step: '01', title: 'الاستراتيجية والبحث', desc: 'نفهم عملك وجمهورك والمنافسين لبناء موقع يتميز فعلاً.' },
        { step: '02', title: 'التصميم والإطار', desc: 'نصمم wireframes ونحصل على موافقتك قبل الدخول في التصميم التفصيلي.' },
        { step: '03', title: 'التصميم الكامل', desc: 'نبني التصميم النهائي بكل التفاصيل البصرية والمحتوى.' },
        { step: '04', title: 'البناء والتكامل', desc: 'نبني الموقع وندمجه مع جميع أدواتك وأنظمتك.' },
        { step: '05', title: 'الإطلاق والتحسين', desc: 'نطلق الموقع ونتابع الأداء ونحسن معدل التحويل باستمرار.' },
      ]}
      packages={[
        {
          name: 'موقع أساسي',
          price: 'من €1,500',
          timeline: 'تسليم خلال 10 أيام',
          badge: 'مبتدئ',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'موقع 5 صفحات',
            'تصميم متجاوب',
            'نموذج التواصل',
            'تحسين SEO أساسي',
            'ربط جوجل أناليتيكس',
          ],
        },
        {
          name: 'موقع + قمع',
          price: 'من €3,000',
          timeline: 'تسليم خلال 14 يوماً',
          badge: 'الأكثر طلباً',
          badgeClass: 'bg-blue-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'موقع كامل حتى 10 صفحات',
            'صفحة هبوط عالية التحويل',
            'تكامل CRM',
            'تتبع التحويلات',
            'اختبار A/B',
            'تقرير أداء شهري',
            'دعم وتحسين 60 يوماً',
          ],
        },
        {
          name: 'نظام مبيعات كامل',
          price: 'من €6,000',
          timeline: 'تسليم خلال 21 يوماً',
          badge: 'النظام الكامل',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          deliverables: [
            'موقع متكامل غير محدود الصفحات',
            'أقماع مبيعات متعددة',
            'تكامل كامل مع الأتمتة',
            'نظام حجز متكامل',
            'لوحة تحليلات متقدمة',
            'تحسين مستمر لمدة 90 يوماً',
            'دعم تقني مخصص',
          ],
        },
      ]}
      faqs={[
        { q: 'ما منصة بناء المواقع التي تستخدمونها؟', a: 'نعمل مع عدة منصات حسب احتياجاتك — WordPress وWebflow وNext.js للمواقع الاحترافية، وShopify للمتاجر الإلكترونية.' },
        { q: 'هل تكتبون المحتوى أيضاً؟', a: 'نعم، كتابة المحتوى التسويقي مشمولة في باقة موقع + قمع وما فوق. نكتب بالعربية والإنجليزية.' },
        { q: 'كم وقتاً يستغرق بناء الموقع؟', a: 'الموقع الأساسي جاهز في 10 أيام. الموقع الكامل مع القمع يستغرق 14-21 يوماً حسب التعقيد.' },
        { q: 'هل يمكنني تعديل الموقع بنفسي بعد الاستلام؟', a: 'نعم، نسلمك موقعاً يمكنك تعديل المحتوى فيه بسهولة دون معرفة تقنية، مع فيديوهات تدريبية.' },
        { q: 'هل تضمنون تحسين ترتيب موقعي في جوجل؟', a: 'نبني الموقع بأساسيات SEO القوية، لكن التصدر في جوجل يتطلب استراتيجية محتوى مستمرة نقدمها كخدمة منفصلة.' },
      ]}
      relatedServices={[
        { href: '/ar/services/ads', label: 'الإعلانات والتسويق' },
        { href: '/ar/services/automation', label: 'أنظمة الأتمتة' },
        { href: '/ar/services/crm-email', label: 'CRM + تسلسلات البريد' },
        { href: '/ar/services/branding', label: 'الهوية والعلامة التجارية' },
      ]}
    />
  );
}
