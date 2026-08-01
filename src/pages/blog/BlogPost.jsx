import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react'
import Seo from '../../components/Seo.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { SITE_ORIGIN } from '../../components/Canonical.jsx'
import PostCard from '../../components/PostCard.jsx'
import { flattenRich, getPostBySlug, getRelatedPosts, titleParts } from '../../lib/posts.js'
import BodyBlocks from './BodyBlocks.jsx'
import TableOfContents from './TableOfContents.jsx'
import SidebarPromos from './SidebarPromos.jsx'
import FaqSection from './FaqSection.jsx'
import './blog-theme.css'
import styles from './BlogPost.module.css'

function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <Navigate to="/blog" replace />

  const related = getRelatedPosts(post.slug)
  const url = `${SITE_ORIGIN}${post.routePath ?? `/blog/${post.slug}`}`

  return (
    <div className="blog-scope">
      <Seo
        title={post.metaTitle ? undefined : post.title}
        exactTitle={post.metaTitle}
        description={post.metaDescription ?? post.excerpt}
        keywords={post.keywords}
        canonical={`${window.location.origin}${post.routePath ?? `/blog/${post.slug}`}`}
        ogImage={post.cover}
        ogType="article"
        publishedTime={post.publishedISO}
        modifiedTime={post.modifiedISO}
      />

      {/* Dates are the post's own — the imported archive keeps the source
          publish/modify timestamps — so datePublished and dateModified agree
          with the byline the reader sees. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${url}#article`,
          mainEntityOfPage: url,
          headline: post.title,
          description: post.metaDescription ?? post.excerpt,
          image: post.cover ? `${SITE_ORIGIN}${post.cover}` : undefined,
          datePublished: post.publishedISO,
          dateModified: post.modifiedISO ?? post.publishedISO,
          author: {
            '@type': 'Person',
            name: post.author.name,
            url: post.author.url || undefined,
          },
          publisher: { '@id': `${SITE_ORIGIN}/#organization` },
          articleSection: post.category,
          keywords: post.keywords?.length ? post.keywords : undefined,
          wordCount: post.words,
        }}
      />

      {post.faqs.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: post.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.rich ? flattenRich(faq.rich) : faq.a,
              },
            })),
          }}
        />
      )}

      {/* Hero sits in its own full-bleed band so its tint runs edge to edge,
          while the copy inside stays on the shared 1280px measure. */}
      <div className={styles.heroBand}>
        <div className={styles.wrap}>
          <Link to="/blog" className={styles.breadcrumb}>
            <ArrowLeft size={14} strokeWidth={2.5} />
            All Posts
          </Link>

          <div className={styles.headerGrid}>
          <div className={styles.header}>
            <span className={styles.catPill}>{post.category}</span>
            <h1>
              {/* Geist + Instrument Serif italic in one headline, as on the
                  homepage heroes. Body headings stay single-family. */}
              {(({ before, accent, after }) => (
                <>
                  {before}
                  {accent && <span className="serifItalic">{accent}</span>}
                  {after}
                </>
              ))(titleParts(post.title))}
            </h1>

            <div className={styles.byline}>
              <div className={styles.bylineAuthor}>
                <div className={styles.avatar}>{post.author.initials}</div>
                <div>
                  <div className={styles.bylineName}>
                    {/* Imported bylines link to the author profile the source links to */}
                    {post.author.url ? (
                      <a
                        className={styles.bylineLink}
                        href={post.author.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.author.name}
                      </a>
                    ) : (
                      post.author.name
                    )}{' '}
                    <span className={styles.bylineRole}>· {post.author.role}</span>
                  </div>
                  <div className={styles.bylineMeta}>
                    <span className={styles.bylineMetaItem}>
                      <Calendar size={13} strokeWidth={2} />
                      {post.date}
                    </span>
                    <span className={styles.bylineMetaItem}>
                      <Clock size={13} strokeWidth={2} />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

            <div className={styles.coverCard}>
              {post.cover ? (
                <img className={styles.coverImage} src={post.cover} alt={post.coverAlt ?? post.title} />
              ) : (
                <div className={styles.cover} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.layout}>
          {/* id is the measuring stick for the TOC's reading-progress bar */}
          <div id="article-body" className={styles.content}>
            <div className={styles.prose}>
              <BodyBlocks blocks={post.body} />
            </div>

            <FaqSection faqs={post.faqs} />
          </div>

          <aside className={styles.sidebar}>
            <TableOfContents blocks={post.body} hasFaq={post.faqs.length > 0} />
            <SidebarPromos />
          </aside>
        </div>

        <div className={styles.ctaBand}>
          <span className={styles.ctaGlow} aria-hidden="true" />
          <div className={styles.ctaInner}>
            <span className={styles.ctaBadge}>
              <Sparkles size={13} strokeWidth={2} />
              Get Started
            </span>
            <h2 className={styles.ctaTitle}>Start sending with SMSLocal</h2>
            <p className={styles.ctaText}>
              Bulk SMS, two-way replies and delivery reporting from one dashboard — no apps, no
              code, free to start.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/signup" className={styles.ctaPrimary}>
                Create Free Trial Account
                <ArrowRight size={15} strokeWidth={2.2} />
              </Link>
              <Link to="/contact-us" className={styles.ctaGhost}>
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.relatedWrap}>
        <div className={styles.sectionLabel}>Keep Reading</div>
        <div className={styles.relatedGrid}>
          {related.map((p) => (
            <PostCard key={p.slug} post={p} compact />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPost
