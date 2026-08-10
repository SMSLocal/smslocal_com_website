import { withSlash } from '../../lib/url.js'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Seo from '../../components/Seo.jsx'
import PostCard from '../../components/PostCard.jsx'
import { categories, getAllPosts, getFeaturedPost } from '../../lib/posts.js'
import './blog-theme.css'
import styles from './BlogIndex.module.css'

function BlogIndex() {
  const featured = getFeaturedPost()
  const posts = useMemo(
    () => getAllPosts().filter((p) => p.slug !== featured.slug),
    [featured.slug],
  )

  // Tag pills on a post page link back here with ?search=<tag>
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('search') ?? '')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category
      const matchesQuery =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [posts, query, category])

  return (
    <div className="blog-scope">
      <Seo
        title="SMSLocal Blog — SMS & Messaging Insights"
        description="Playbooks and product updates on SMS marketing and customer messaging, to help you grow your business."
      />

      <main>
        {/* Hero gets its own full-bleed band so the purple wash and its glow
            patches run edge to edge, with the copy still on the 1280 measure. */}
        <div className={styles.heroBand}>
          <span className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.wrap}>
            <section className={styles.hero}>
              <span className={styles.badge}>SMSLOCAL RESOURCES</span>
              <h1>
                Insights on <span className="serifItalic">SMS Marketing</span>
                <br />
                &amp; Customer Messaging
              </h1>
              <p>
                Playbooks, product updates, and best practices to help you reach more customers over
                text.
              </p>
            </section>
          </div>

          {/* Search + category filters ride inside the band too, so the wash
              covers the whole "browse" zone rather than stopping mid-way. */}
          <div className={styles.wrap}>
            <div className={styles.toolbar}>
          <div className={styles.search}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={styles.chips}>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`${styles.chip} ${category === c ? styles.chipActive : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
            </div>
          </div>
        </div>

        <div className={styles.wrap}>
        <Link to={withSlash(featured.routePath ?? `/blog/${featured.slug}`)} className={styles.featured}>
          <div className={styles.featuredMedia}>
            {featured.cover && (
              <img className={styles.featuredImage} src={featured.cover} alt="" />
            )}
            <span className={styles.tag}>Featured</span>
          </div>
          <div className={styles.featuredBody}>
            <div className={styles.meta}>
              {featured.category.toUpperCase()} &nbsp;·&nbsp; {featured.date.toUpperCase()} &nbsp;·&nbsp;{' '}
              {featured.readTime.toUpperCase()}
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className={styles.readMore}>Read the full story →</span>
          </div>
        </Link>

        <div className={styles.sectionLabel}>Latest Articles</div>
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No articles match your search.</p>
        )}

        {/* Same night treatment as the homepage CTABanner: ink base, two brand
            glows, badge, white headline, gradient action. */}
        <div className={styles.newsletter}>
          <span className={styles.newsletterGlow} aria-hidden="true" />
          <div className={styles.newsletterInner}>
            <span className={styles.newsletterBadge}>
              <Sparkles size={13} strokeWidth={2} />
              Newsletter
            </span>
            <h2>Get SMS marketing tips in your inbox</h2>
            <p>
              Join thousands of businesses getting playbooks, benchmarks, and product updates from
              SMSLocal.
            </p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="you@company.com" required />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
        </div>
      </main>
    </div>
  )
}

export default BlogIndex
