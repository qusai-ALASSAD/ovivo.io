import { IndustryPage } from '@/components/industry-page';
import { cleaningData } from '@/lib/industries-data';
export default function Page() {
  return <IndustryPage lang="ar" data={cleaningData.ar} />;
}
