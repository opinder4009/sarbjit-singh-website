import type { Metadata } from 'next';
import { brand } from '@/lib/brand';
import JourneyCinematic from '@/components/JourneyCinematic';
import BookCta from '@/components/BookCta';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: `My Journey — ${brand.name}`,
  description: brand.journeyHeading,
};

export default function MyJourneyPage() {
  return (
    <main>
      <JourneyCinematic />
      <BookCta />
      <SiteFooter />
    </main>
  );
}
