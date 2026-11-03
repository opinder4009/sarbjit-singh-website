import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { brand } from '@/lib/brand';
import { mortgageServices, getMortgageServiceBySlug } from '@/lib/mortgageServices';
import MortgageServiceIcon from '@/components/MortgageServiceIcon';
import BookCta from '@/components/BookCta';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';

export function generateStaticParams() {
  return mortgageServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getMortgageServiceBySlug(slug);
  if (!service) return { title: `Mortgage Services — ${brand.name}` };
  const url = `${brand.siteUrl}/mortgage-services/${service.slug}`;
  return {
    title: `${service.title} — ${brand.name}`,
    description: service.summary,
    alternates: { canonical: url },
    openGraph: { title: `${service.title} — ${brand.name}`, description: service.summary, url },
  };
}

export default async function MortgageServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getMortgageServiceBySlug(slug);
  if (!service) notFound();

  const url = `${brand.siteUrl}/mortgage-services/${service.slug}`;
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    provider: { '@type': 'Person', name: brand.name },
    areaServed: brand.region,
    url,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section
        style={{
          background: 'var(--ink)',
          padding: 'clamp(96px, 16vh, 160px) var(--edge) clamp(56px, 8vh, 96px)',
        }}
      >
        <Reveal>
          <Link
            href="/mortgage-services"
            style={{ color: 'var(--steel)', fontSize: '0.875rem', textDecoration: 'none' }}
          >
            ← All mortgage services
          </Link>

          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              style={{
                flexShrink: 0,
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(201,162,74,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MortgageServiceIcon slug={service.slug} size={28} />
            </span>
            <p className="eyebrow" style={{ margin: 0 }}>{brand.servicesEyebrow}</p>
          </div>

          <h1
            style={{
              marginTop: 20,
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.2vw, 3.5rem)',
              lineHeight: 1.06,
              color: 'var(--paper)',
              maxWidth: 820,
            }}
          >
            {service.title}
          </h1>
          <p style={{ marginTop: 18, maxWidth: 580, color: 'var(--paper-dim)', fontSize: '1.0625rem', lineHeight: 1.65 }}>
            {service.summary}
          </p>
        </Reveal>
      </section>

      <section
        style={{
          borderTop: '1px solid var(--line)',
          padding: 'clamp(48px, 8vh, 88px) var(--edge)',
        }}
      >
        <Reveal>
          <div style={{ display: 'grid', gap: 22, maxWidth: 680 }}>
            <p style={{ color: 'var(--paper-dim)', fontSize: '1.0625rem', lineHeight: 1.7 }}>{service.intro}</p>

            <div style={{ marginTop: 16 }}>
              <p className="eyebrow">What we&apos;ll look at</p>
              <ul style={{ marginTop: 18, display: 'grid', gap: 14, listStyle: 'none', padding: 0 }}>
                {service.points.map((point) => (
                  <li key={point} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', marginTop: 9 }} />
                    <span style={{ color: 'var(--paper-dim)', fontSize: '1rem', lineHeight: 1.6 }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 56, maxWidth: 680, borderTop: '1px solid var(--line)', paddingTop: 40 }}>
            <p className="eyebrow">Other mortgage services</p>
            <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {mortgageServices
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/mortgage-services/${s.slug}`}
                    style={{
                      padding: '9px 16px',
                      borderRadius: 999,
                      border: '1px solid var(--line-strong)',
                      color: 'var(--paper-dim)',
                      fontSize: '0.8125rem',
                      textDecoration: 'none',
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
            </div>
          </div>
        </Reveal>
      </section>

      <BookCta />
      <SiteFooter />
    </main>
  );
}
