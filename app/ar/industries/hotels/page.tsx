import { IndustryPage } from '@/components/industry-page';
import { hotelsData } from '@/lib/industries-data';
export default function Page() {
  return <IndustryPage lang="ar" data={hotelsData.ar} />;
}
