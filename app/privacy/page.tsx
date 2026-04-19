import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Ovivo',
  description: 'Privacy policy for Ovivo.io',
};

const sections = [
  {
    title: '1. Introduction',
    content: `Welcome to Ovivo.io. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data and tell you about your privacy rights.`,
  },
  {
    title: '2. Data We Collect',
    content: `We may collect, use, store and transfer different kinds of personal data about you:`,
    list: [
      'Identity Data: Name, username, or similar identifier',
      'Contact Data: Email address, telephone numbers, business address',
      'Technical Data: IP address, browser type, time zone, operating system',
      'Usage Data: Information about how you use our website and services',
      'Marketing Data: Your preferences for receiving marketing communications',
    ],
  },
  {
    title: '3. How We Use Your Data',
    content: `We use your personal data for the following purposes:`,
    list: [
      'To provide and maintain our services',
      'To notify you about changes to our services',
      'To provide customer support',
      'To gather analysis or valuable information to improve our services',
      'To monitor usage of our services',
      'To detect, prevent and address technical issues',
      'To send you marketing communications (with your consent)',
    ],
  },
  {
    title: '4. Data Security',
    content: `We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees and partners who have a business need to know.`,
  },
  {
    title: '5. Data Retention',
    content: `We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.`,
  },
  {
    title: '6. Your Legal Rights',
    content: `Under certain circumstances, you have rights under data protection laws in relation to your personal data:`,
    list: [
      'Request access to your personal data',
      'Request correction of your personal data',
      'Request erasure of your personal data',
      'Object to processing of your personal data',
      'Request restriction of processing your personal data',
      'Request transfer of your personal data',
      'Right to withdraw consent',
    ],
  },
  {
    title: '7. Third-Party Services',
    content: `We may use third-party services that collect, monitor and analyze data:`,
    list: [
      'Google Analytics: Web analytics service',
      'Supabase: Database and authentication services',
      'Payment Processors: For processing payments securely',
    ],
  },
  {
    title: '8. Cookies',
    content: `We use cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our services are not intended for children under 16. We do not knowingly collect personal data from children under 16. If you become aware that a child has provided us with personal data, please contact us.`,
  },
  {
    title: '10. Changes to This Privacy Policy',
    content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.`,
  },
  {
    title: '11. Contact Us',
    content: `If you have any questions about this Privacy Policy, please contact us:`,
    list: ['Email: privacy@ovivo.io', 'Website: ovivo.io/contact'],
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-blue-500/6 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              Legal
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: February 2024</p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
              {section.list && (
                <ul className="mt-3 space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="relative overflow-hidden glass rounded-2xl border-blue-500/20 p-6">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/8 via-transparent to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-blue-400">Note: </span>
              This is a template privacy policy for demonstration purposes. For a production website, you should consult with a legal professional to ensure compliance with applicable data protection laws such as GDPR, CCPA, and other relevant regulations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
