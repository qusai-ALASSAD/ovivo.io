import { IndustryPage } from '@/components/industry-page';
import { transportData } from '@/lib/industries-data';
export default function Page() {
  return <IndustryPage lang="de" data={transportData.de} />;
}
