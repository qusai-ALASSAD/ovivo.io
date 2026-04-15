import { IndustryPage } from '@/components/industry-page';
import { medicalData } from '@/lib/industries-data';
export default function Page() {
  return <IndustryPage lang="ar" data={medicalData.ar} />;
}
