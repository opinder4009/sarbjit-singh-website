import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sortedPosts } from '@/lib/posts';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: `Blogs — ${brand.name}`,
  description: brand.blogsIntro,
  alternates: { canonical: `${brand.siteUrl}/blogs` },
  openGraph: { title: `Blogs — ${brand.name}`, description: brand.blogsIntro, url: `${brand.siteUrl}/blogs` },
};

const posts = sortedPosts();

export default function BlogsPage() {
  return (
    <main>
      <section
        style={{
          background: 'var(--ink)',
          padding: 'clamp(96px, 16vh, 160px) var(--edge) clamp(56px, 8vh, 96px)',
        }}
      >
        <Reveal>
          <p className="eyebrow">{brand.blogsEyebrow}</p>
          <h1
            style={{
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.25rem, 4.5vw, 4rem)',
              lineHeight: 1.04,
              color: 'var(--paper)',
              marginTop: 16,
              maxWidth: 760,
            }}
          >
            {brand.blogsHeading}
          </h1>
          <p
            style={{
              marginTop: 18,
              maxWidth: 520,
              color: 'var(--paper-dim)',
              fontSize: '1.0625rem',
              lineHeight: 1.6,
            }}
          >
            {brand.blogsIntro}
          </p>
        </Reveal>
      </section>

      <section
        style={{
          borderTop: '1px solid var(--line)',
          padding: 'clamp(48px, 8vh, 72px) var(--edge) clamp(72px, 12vh, 140px)',
        }}
      >
        <div
          className="blog-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(20px, 2.4vw, 28px)',
          }}
        >
          {posts.map((post) => (
            <Reveal key={post.slug}>
              <Link
                href={`/blogs/${post.slug}`}
                className="blog-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  padding: 'clamp(24px, 2.6vw, 30px)',
                  background: 'var(--panel)',
                  border: '1px solid var(--line-strong)',
                  borderRadius: 14,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 12,
                    flexWrap: 'wrap',
                    color: 'var(--steel)',
                    fontSize: '0.75rem',
                  }}
                >
                  <span style={{ color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.04em' }}>{post.tag}</span>
                  <span>{post.dateLabel}</span>
                  <span>{post.readTime}</span>
                </div>

                <h2
                  style={{
                    marginTop: 14,
                    fontSize: '1.25rem',
                    color: 'var(--paper)',
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  {post.title}
                </h2>

                <p
                  style={{
                    marginTop: 10,
                    flex: 1,
                    color: 'var(--paper-dim)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                  }}
                >
                  {post.excerpt}
                </p>

                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.8125rem', fontWeight: 600 }}>Read the post</span>
                  {post.badge && (
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--paper)',
                        background: 'var(--gold-deep)',
                        padding: '4px 10px',
                        borderRadius: 4,
                      }}
                    >
                      {post.badge}
                    </span>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .blog-card:hover {
          border-color: var(--gold-dim);
          transform: translateY(-3px);
        }
        @media (max-width: 980px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
