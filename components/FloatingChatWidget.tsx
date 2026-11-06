'use client';
import dynamic from 'next/dynamic';

// The sales assistant is not part of the initial page content: load it on the client only.
const SalesChatWidget = dynamic(
  () => import('@/components/sales-chat-widget').then(mod => mod.SalesChatWidget),
  { ssr: false }
);

export default function FloatingChatWidget() { return <SalesChatWidget />; }
