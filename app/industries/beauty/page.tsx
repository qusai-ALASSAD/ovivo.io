import { IndustryPage } from '@/components/industry-page';
import { industriesData } from '@/lib/industries-data';
export default function Page() {
  return <IndustryPage lang="de" data={industriesData.beauty.de} />;
}
