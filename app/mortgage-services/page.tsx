import type { Metadata } from 'next';
import { brand } from '@/lib/brand';
import MortgageServices3D from '@/components/MortgageServices3D';
import Faq from '@/components/Faq';
import BookCta from '@/components/BookCta';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: `Mortgage Services — ${brand.name}`,
  description: brand.servicesIntro,
  alternates: { canonical: `${brand.siteUrl}/mortgage-services` },
  openGraph: { title: `Mortgage Services — ${brand.name}`, description: brand.servicesIntro, url: `${brand.siteUrl}/mortgage-services` },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: brand.servicesFaq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function MortgageServicesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <MortgageServices3D />
      <Faq eyebrow={brand.servicesFaqEyebrow} heading={brand.servicesFaqHeading} items={brand.servicesFaq} />
      <BookCta />
      <SiteFooter />
    </main>
  );
}
