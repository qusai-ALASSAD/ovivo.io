'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Star, Eye, Heart, TrendingUp } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.08)]" dir="rtl">
    <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-5">هوية العلامة التجارية</p>
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">OV</span>
        </div>
        <div>
          <div className="text-white font-bold">Ovivo</div>
          <div className="text-xs text-gray-500">الهوية الرئيسية</div>
        </div>
      </div>
      <div className="flex gap-2">
        {['#0066FF', '#00D4AA', '#FF6B35', '#1A1A2E'].map((color) => (
          <div
            key={color}
            className="h-10 flex-1 rounded-lg"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">Aa البُعد</div>
        <div className="text-sm text-gray-400">الخط الأساسي — Bold</div>
        <div className="text-sm text-gray-500">الخط الثانوي — Regular</div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/10">
        <div>
          <div className="text-base font-bold text-white">شعار</div>
          <div className="text-[10px] text-gray-500">الرئيسي</div>
        </div>
        <div>
          <div className="text-base font-bold text-amber-400">ألوان</div>
          <div className="text-[10px] text-gray-500">النظام</div>
        </div>
        <div>
          <div className="text-base font-bold text-blue-400">خطوط</div>
          <div className="text-[10px] text-gray-500">الطباعة</div>
        </div>
      </div>
    </div>
  </div>
);

export default function BrandingArPage() {
  return (
    <ServicePageLayout
      lang="ar"
      badge="الهوية والعلامة التجارية"
      heroTitle="علامتك التجارية تُحكم"
      heroGradient="أول انطباع."
      heroSubtitle="نبني هويات بصرية احترافية تعكس قيمك وتجذب عملاءك المثاليين — من الشعار إلى كامل نظام الهوية البصرية."
      heroImage={heroImage}
      whyTitle="لماذا الهوية البصرية تصنع الفرق"
      whyItems={[
        { icon: Eye, title: 'أول انطباع لا يُنسى', desc: 'العملاء يحكمون على عملك في أقل من ثانية. احرص أن يكون الحكم لصالحك.' },
        { icon: Heart, title: 'ثقة وولاء', desc: 'الهوية المتسقة تبني الثقة وتجعل عملاءك يعودون دائماً.' },
        { icon: Star, title: 'تميز عن المنافسين', desc: 'في سوق مزدحم، الهوية القوية هي ما يجعل عملك لا يُنسى.' },
        { icon: TrendingUp, title: 'يدعم النمو', desc: 'الهوية الاحترافية تتيح لك رفع أسعارك وجذب عملاء أفضل جودةً.' },
      ]}
      beforeAfter={[
        { before: 'شعار مصمم بشكل رخيص يضر بمصداقيتك', after: 'هوية احترافية تعكس جودة خدماتك' },
        { before: 'ألوان وخطوط مختلفة في كل مكان', after: 'هوية متسقة عبر جميع القنوات' },
        { before: 'لا تستطيع التمييز بين نفسك والمنافسين', after: 'علامة تجارية مميزة لا تُنسى' },
        { before: 'العملاء لا يتذكرون اسمك', after: 'هوية بصرية تبقى في الذهن' },
      ]}
      deliverables={[
        {
          category: 'الشعار',
          items: ['شعار رئيسي متكامل', 'شعار أفقي وعمودي', 'نسخة أيقونة (favicon)', 'ملفات بجميع الصيغ (SVG, PNG, PDF)'],
        },
        {
          category: 'نظام الألوان والخطوط',
          items: ['لوحة ألوان أساسية وثانوية', 'اختيار خطوط العربية والإنجليزية', 'قواعد استخدام الخطوط', 'ألوان للمواقع الرقمية'],
        },
        {
          category: 'مواد التطبيق',
          items: ['تصميم بطاقة العمل', 'قالب اللترهيد والمستندات', 'قوالب وسائل التواصل', 'دليل العلامة التجارية'],
        },
        {
          category: 'الدليل والتسليم',
          items: ['دليل الهوية البصرية الكامل', 'قواعد الاستخدام الصحيح والخاطئ', 'تسليم جميع الملفات الأصلية', 'فيديو تعريفي بالهوية'],
        },
      ]}
      useCases={[
        { industry: 'الشركات الناشئة', icon: '🚀', example: 'هوية قوية من اليوم الأول تضع الأساس للنمو وتجذب المستثمرين.' },
        { industry: 'الخدمات المهنية', icon: '💼', example: 'هوية تعكس الاحترافية وتبرر أسعارك المميزة.' },
        { industry: 'المطاعم والكافيهات', icon: '🍽️', example: 'هوية بصرية تخلق تجربة متكاملة من الشعار للمنيو والديكور.' },
        { industry: 'التجارة الإلكترونية', icon: '🛍️', example: 'علامة تجارية قوية تبني الثقة وتميزك في السوق.' },
        { industry: 'التعليم والتدريب', icon: '📚', example: 'هوية موثوقة تعكس خبرتك وتجذب المتعلمين.' },
      ]}
      process={[
        { step: '01', title: 'اكتشاف وأبحاث', desc: 'نفهم قيمك وجمهورك والمنافسين لبناء هوية مميزة وليست مجرد جميلة.' },
        { step: '02', title: 'مفاهيم أولية', desc: 'نقدم 3 اتجاهات تصميمية مختلفة لتختار الأنسب لعلامتك.' },
        { step: '03', title: 'التطوير والتحسين', desc: 'نطور الاتجاه المختار ونضيف التفاصيل والأنظمة البصرية.' },
        { step: '04', title: 'إنشاء المواد', desc: 'نطبق الهوية على جميع المواد المطلوبة.' },
        { step: '05', title: 'التسليم والدليل', desc: 'نسلمك جميع الملفات ودليلاً كاملاً لاستخدام هويتك.' },
      ]}
      packages={[
        {
          name: 'هوية أساسية',
          price: 'من €800',
          timeline: 'تسليم خلال 7 أيام',
          badge: 'مبتدئ',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'شعار احترافي',
            '3 اقتراحات أولية',
            'لوحة الألوان',
            'اختيار الخطوط',
            'ملفات التسليم الكاملة',
          ],
        },
        {
          name: 'هوية متكاملة',
          price: 'من €1,800',
          timeline: 'تسليم خلال 12 يوماً',
          badge: 'الأكثر طلباً',
          badgeClass: 'bg-blue-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'كل ما في الأساسية',
            'تصميم بطاقة العمل',
            'قوالب وسائل التواصل',
            'قالب المستندات',
            'دليل الهوية البصرية',
            'مراجعتان مجانيتان',
          ],
        },
        {
          name: 'هوية شاملة',
          price: 'من €3,500',
          timeline: 'تسليم خلال 18 يوماً',
          badge: 'النظام الكامل',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          deliverables: [
            'كل ما في المتكاملة',
            'تصميم المنيو أو الكتالوج',
            'تصاميم بيئة العمل والإعلانات',
            'كتيب المنتجات',
            'دليل هوية شامل 30+ صفحة',
            'مراجعات غير محدودة',
            'دعم تطبيق 30 يوماً',
          ],
        },
      ]}
      faqs={[
        { q: 'كم مراجعة مسموح بها؟', a: 'الباقة الأساسية تشمل مراجعة واحدة. المتكاملة مراجعتين. الشاملة مراجعات غير محدودة حتى رضاك الكامل.' },
        { q: 'هل تصممون باللغة العربية؟', a: 'نعم، نتخصص في تصميم الهويات العربية ثنائية اللغة (عربي وإنجليزي).' },
        { q: 'ما صيغ الملفات التي أستلمها؟', a: 'تستلم جميع الصيغ — SVG وPNG وPDF وAI — لاستخدامها في الطباعة والويب.' },
        { q: 'هل يمكنني الحصول على ملفات المصدر؟', a: 'نعم، في باقة الهوية المتكاملة والشاملة تستلم ملفات المصدر الأصلية كاملة.' },
        { q: 'كم من الوقت تستغرق العملية؟', a: 'الهوية الأساسية تُسلّم في 7 أيام. الهوية الشاملة تستغرق 18 يوماً مع جميع المراجعات.' },
      ]}
      relatedServices={[
        { href: '/ar/services/funnels', label: 'موقع + قمع مبيعات' },
        { href: '/ar/services/ads', label: 'الإعلانات والتسويق' },
        { href: '/ar/services/automation', label: 'أنظمة الأتمتة' },
        { href: '/ar/services/ai-chatbot', label: 'روبوت الذكاء الاصطناعي' },
      ]}
    />
  );
}
