import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "الهوية البصرية وصناعة المحتوى للشركات | OVIVO.IO",
  description: "تصميم الهوية التجارية والمحتوى الرقمي والمواد الإبداعية بما يناسب مشروعك. اطلب عرضاً مخصصاً من OVIVO.IO.",
  alternates: { canonical: "/ar/services/branding/", languages: {"de-DE":"/services/branding/","en":"/en/services/branding/","ar":"/ar/services/branding/","x-default":"/services/branding/"} },
  openGraph: {
    type: 'website',
    title: "الهوية البصرية وصناعة المحتوى للشركات | OVIVO.IO",
    description: "تصميم الهوية التجارية والمحتوى الرقمي والمواد الإبداعية بما يناسب مشروعك. اطلب عرضاً مخصصاً من OVIVO.IO.",
    url: "https://ovivo.io/ar/services/branding/",
    locale: "ar_AR",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
