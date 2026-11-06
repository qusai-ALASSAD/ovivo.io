import { Suspense } from 'react';
import { ServiceRequestPage } from '@/components/service-request-page';

export default function Page() {
  return <Suspense fallback={<div className="min-h-screen bg-[#F4F7FB]" />}><ServiceRequestPage lang="ar" /></Suspense>;
}
