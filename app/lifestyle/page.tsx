import type { Metadata } from 'next';
import { brand } from '@/lib/brand';
import LifestyleCinematic from '@/components/LifestyleCinematic';
import BookCta from '@/components/BookCta';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: `Lifestyle — ${brand.name}`,
  description: brand.lifestyleIntro,
};

export default function LifestylePage() {
  return (
    <main>
      <LifestyleCinematic />
      <BookCta />
      <SiteFooter />
    </main>
  );
}
