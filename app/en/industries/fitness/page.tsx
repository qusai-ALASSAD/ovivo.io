import { IndustryPage } from '@/components/industry-page';
import { industriesData } from '@/lib/industries-data';
export default function Page() {
  return <IndustryPage lang="en" data={industriesData.fitness.en} />;
}
