import type { Metadata } from 'next';

// Archived, unverified 2024–2025 articles are not part of the approved SEO strategy.
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function BlogLayout({ children }: { children: React.ReactNode }) { return children; }
