import { IndustryPage } from '@/components/industry-page';
import { industriesData } from '@/lib/industries-data';
export default function Page() {
  return <IndustryPage lang="ar" data={industriesData.fitness.ar} />;
}
