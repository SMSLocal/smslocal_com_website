import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react'
import Seo, { DEFAULT_OG_IMAGE } from '../../components/Seo.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { SITE_ORIGIN } from '../../components/Canonical.jsx'
import { withSlash } from '../../lib/url.js'
import PostCard from '../../components/PostCard.jsx'
import { getPostBody, getPostBySlug, getRelatedPosts, loadPostBody, richToText, titleParts, utcISO } from '../../lib/posts.js'
import BodyBlocks from './BodyBlocks.jsx'
import TableOfContents from './TableOfContents.jsx'
import SidebarPromos from './SidebarPromos.jsx'
import FaqSection from './FaqSection.jsx'
import './blog-theme.css'
import styles from './BlogPost.module.css'

function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  // The body is a separate chunk (see lib/posts.js). On a first load main.jsx has
  // already fetched it; this covers arriving here from another route in-app.
  const [, setLoaded] = useState(false)
  useEffect(() => {
    if (post && !getPostBody(slug)) loadPostBody(slug).then(() => setLoaded(true))
  }, [post, slug])
  const content = getPostBody(slug)

  if (!post) return <Navigate to="/blog/" replace />

  if (!content) return <div className="blog-scope" />

  const { body, faqs } = content
  const related = getRelatedPosts(post.slug)
  // Posts whose banner is an SVG keep their original raster image for sharing;
  // Seo falls back to the sitewide card when neither is a raster file.
  const shareImage = [post.sourceCover, post.cover].find((src) =>
    /\.(png|jpe?g|webp|gif)$/i.test(src ?? ''),
  )
  const url = `${SITE_ORIGIN}${withSlash(post.routePath ?? `/blog/${post.slug}`)}`

  return (
    <div className="blog-scope">
      <Seo
        title={post.metaTitle ? undefined : post.title}
        exactTitle={post.metaTitle}
        description={post.metaDescription ?? post.excerpt}
        keywords={post.keywords}
        canonical={url}
        ogImage={shareImage}
        ogType="article"
        publishedTime={utcISO(post.publishedISO)}
        modifiedTime={utcISO(post.modifiedISO)}
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
          image: `${SITE_ORIGIN}${shareImage ?? DEFAULT_OG_IMAGE}`,
          datePublished: utcISO(post.publishedISO),
          dateModified: utcISO(post.modifiedISO ?? post.publishedISO),
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

      {faqs.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.rich ? richToText(faq.rich) : faq.a,
              },
            })),
          }}
        />
      )}

      {/* Hero sits in its own full-bleed band so its tint runs edge to edge,
          while the copy inside stays on the shared 1280px measure. */}
      <div className={styles.heroBand}>
        <div className={styles.wrap}>
          <Link to="/blog/" className={styles.breadcrumb}>
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
              <BodyBlocks blocks={body} />
            </div>

            <FaqSection faqs={faqs} />
          </div>

          <aside className={styles.sidebar}>
            <TableOfContents blocks={body} hasFaq={faqs.length > 0} />
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
              <Link to="/signup/" className={styles.ctaPrimary}>
                Create Free Trial Account
                <ArrowRight size={15} strokeWidth={2.2} />
              </Link>
              <Link to="/contact-us/" className={styles.ctaGhost}>
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
