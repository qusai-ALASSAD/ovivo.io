import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, TriangleAlert as AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Imprint - Ovivo',
  description: 'Legal notice and imprint for Ovivo.io',
};

const sections = [
  {
    title: 'Information pursuant to §5 TMG',
    rows: [
      { label: 'Company Name', value: '[Your Company Name]' },
      { label: 'Legal Form', value: '[e.g., GmbH, UG, Einzelunternehmen]' },
      { label: 'Address', value: '[Street and Number], [Postal Code and City], Germany' },
    ],
  },
  {
    title: 'Contact',
    rows: [
      { label: 'Email', value: 'hello@ovivo.io' },
      { label: 'Phone', value: '+49 176 56565322' },
      { label: 'Website', value: 'ovivo.io' },
    ],
  },
  {
    title: 'Represented by',
    rows: [
      { label: 'Managing Director / Owner', value: '[Name]' },
      { label: 'Commercial Register', value: '[Register Court] [Register Number]' },
      { label: 'VAT ID', value: 'DE[XXXXXXXXX] (according to §27a UStG)' },
    ],
  },
];

const legalSections = [
  {
    title: 'Dispute Resolution',
    content: `The European Commission provides a platform for online dispute resolution (ODR). We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.`,
    link: { href: 'https://ec.europa.eu/consumers/odr', label: 'https://ec.europa.eu/consumers/odr' },
  },
  {
    title: 'Liability for Content',
    content: `As a service provider, we are responsible for our own content on these pages according to general law pursuant to Section 7(1) of the German Telemedia Act (TMG). However, according to Sections 8 to 10 TMG, we are not obliged as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information according to general laws remain unaffected. Liability in this regard is only possible from the time of knowledge of a specific legal violation. Upon becoming aware of corresponding legal violations, we will remove this content immediately.`,
  },
  {
    title: 'Liability for Links',
    content: `Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. Upon notification of violations, we will remove such links immediately.`,
  },
  {
    title: 'Copyright',
    content: `The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.`,
  },
  {
    title: 'Data Protection',
    content: `For information on how we handle your personal data, please refer to our Privacy Policy.`,
    internalLink: { href: '/privacy', label: 'Privacy Policy' },
  },
];

export default function ImprintPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-blue-500/6 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              Legal
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white">Impressum / Imprint</h1>
          <p className="mt-3 text-gray-500">Legal Notice pursuant to German Law (§5 TMG)</p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">{section.title}</h2>
              <div className="space-y-3">
                {section.rows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[160px_1fr] gap-4">
                    <span className="text-sm font-medium text-gray-500">{row.label}</span>
                    <span className="text-sm text-gray-300">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {legalSections.map((section) => (
            <div key={section.title} className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {section.content}
                {section.internalLink && (
                  <>
                    {' '}
                    <Link href={section.internalLink.href} className="text-blue-400 hover:text-blue-300 transition-colors">
                      {section.internalLink.label}
                    </Link>
                    .
                  </>
                )}
              </p>
              {section.link && (
                <a
                  href={section.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {section.link.label}
                </a>
              )}
            </div>
          ))}

          <div className="relative overflow-hidden glass rounded-2xl border-orange-500/20 p-6">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500/8 via-transparent to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-orange-400">Important Notice: </span>
                This is a template imprint for demonstration purposes. Before going live with your website, you MUST replace all placeholder information with your actual company details. Consult with a legal professional to ensure compliance with German law (TMG, UrhG, and other applicable regulations). An incomplete or incorrect imprint can result in legal warnings and fines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
