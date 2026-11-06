import { LegalInfo } from '@/components/legal-info';

export const metadata = {
 title: 'Impressum | OVIVO.IO',
 description: 'Rechtliche Informationen zu OVIVO.IO',
 robots: { index: false, follow: false },
};

export default function Page() { return <LegalInfo lang="de" type="imprint" />; }
