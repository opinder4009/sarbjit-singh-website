import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { brand } from '@/lib/brand';
import { posts, getPostBySlug, type ArticleBlock } from '@/lib/posts';
import BookCta from '@/components/BookCta';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

function absoluteUrl(path: string) {
  return `${brand.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: `Blogs — ${brand.name}` };
  const description = post.metaDescription ?? post.excerpt;
  const url = absoluteUrl(`/blogs/${post.slug}`);
  return {
    title: `${post.title} — ${brand.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url,
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
  };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 style={{ marginTop: 12, fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', color: 'var(--paper)', fontWeight: 600, lineHeight: 1.2 }}>
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 style={{ marginTop: 8, fontSize: '1.25rem', color: 'var(--paper)', fontWeight: 600 }}>
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul style={{ display: 'grid', gap: 10, paddingLeft: 22, color: 'var(--paper-dim)', fontSize: '1.0625rem', lineHeight: 1.65 }}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote
          style={{
            margin: 0,
            paddingLeft: 20,
            borderLeft: '2px solid var(--gold)',
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: '1.25rem',
            color: 'var(--gold)',
            lineHeight: 1.5,
          }}
        >
          {block.text}
        </blockquote>
      );
    default:
      return (
        <p style={{ color: 'var(--paper-dim)', fontSize: '1.0625rem', lineHeight: 1.7 }}>{block.text}</p>
      );
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blogs/${post.slug}`);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: brand.name },
    publisher: { '@type': 'Organization', name: brand.company },
    mainEntityOfPage: url,
  };
  const faqJsonLd = post.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <section
        style={{
          background: 'var(--ink)',
          padding: 'clamp(96px, 16vh, 160px) var(--edge) clamp(56px, 8vh, 96px)',
        }}
      >
        <Reveal>
          <Link
            href="/blogs"
            style={{
              color: 'var(--steel)',
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            ← All posts
          </Link>

          <div
            style={{
              marginTop: 24,
              display: 'flex',
              alignItems: 'baseline',
              gap: 16,
              color: 'var(--steel)',
              fontSize: '0.8125rem',
            }}
          >
            <span style={{ color: 'var(--gold)' }}>{post.tag}</span>
            <span>{post.dateLabel}</span>
            <span>{post.readTime}</span>
          </div>

          <h1
            style={{
              marginTop: 14,
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.2vw, 3.5rem)',
              lineHeight: 1.06,
              color: 'var(--paper)',
              maxWidth: 820,
            }}
          >
            {post.title}
          </h1>
        </Reveal>
      </section>

      <section
        style={{
          borderTop: '1px solid var(--line)',
          padding: 'clamp(48px, 8vh, 88px) var(--edge)',
        }}
      >
        <Reveal>
          <article style={{ display: 'grid', gap: 22, maxWidth: 680 }}>
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>

          {post.faq && post.faq.length > 0 && (
            <div style={{ marginTop: 56, maxWidth: 680, borderTop: '1px solid var(--line)', paddingTop: 40 }}>
              <p className="eyebrow">Frequently Asked</p>
              <div style={{ marginTop: 24, display: 'grid', gap: 24 }}>
                {post.faq.map((item) => (
                  <div key={item.question}>
                    <h3 style={{ fontSize: '1.0625rem', color: 'var(--paper)', fontWeight: 600 }}>{item.question}</h3>
                    <p style={{ marginTop: 8, color: 'var(--paper-dim)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {post.sources && post.sources.length > 0 && (
            <div style={{ marginTop: 48, maxWidth: 680 }}>
              <p style={{ color: 'var(--steel)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Sources
              </p>
              <ul style={{ marginTop: 10, display: 'grid', gap: 6, paddingLeft: 18 }}>
                {post.sources.map((source) => (
                  <li key={source.href} style={{ fontSize: '0.8125rem' }}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--steel)' }}>
                      {source.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      </section>

      <BookCta />
      <SiteFooter />
    </main>
  );
}
