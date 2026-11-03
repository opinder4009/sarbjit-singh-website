import type { Metadata } from 'next';
import { brand } from '@/lib/brand';
import MortgageGuideCinematic from '@/components/MortgageGuideCinematic';
import BookCta from '@/components/BookCta';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: `Mortgage Guide — ${brand.name}`,
  description: brand.guideIntro,
  alternates: { canonical: `${brand.siteUrl}/mortgage-guide` },
  openGraph: { title: `Mortgage Guide — ${brand.name}`, description: brand.guideIntro, url: `${brand.siteUrl}/mortgage-guide` },
};

export default function MortgageGuidePage() {
  return (
    <main>
      <MortgageGuideCinematic />
      <BookCta />
      <SiteFooter />
    </main>
  );
}
