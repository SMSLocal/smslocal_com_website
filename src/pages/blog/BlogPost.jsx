import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Seo from '../../components/Seo.jsx'
import PostCard from '../../components/PostCard.jsx'
import { findTagAnchor, getPostBySlug, getRelatedPosts } from '../../lib/posts.js'
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

  return (
    <div className="blog-scope">
      <Seo title={post.title} description={post.excerpt} />

      <div className={styles.wrap}>
        <Link to="/blog" className={styles.breadcrumb}>
          <ArrowLeft size={14} strokeWidth={2.5} />
          All Posts
        </Link>

        <div className={styles.headerGrid}>
          <div className={styles.header}>
            <span className={styles.catPill}>{post.category}</span>
            <h1>
              {post.title.replace(post.emphasis, '')}
              <span className="serifItalic">{post.emphasis}</span>
            </h1>

            <div className={styles.byline}>
              <div className={styles.bylineAuthor}>
                <div className={styles.avatar}>{post.author.initials}</div>
                <div>
                  <div className={styles.bylineName}>
                    {post.author.name} <span className={styles.bylineRole}>· {post.author.role}</span>
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
              <div className={styles.share}>
                <a href="#" title="Share on X">𝕏</a>
                <a href="#" title="Share on LinkedIn">in</a>
                <a href="#" title="Copy link">🔗</a>
              </div>
            </div>
          </div>

          <div className={styles.coverCard}>
            <div className={styles.cover} />
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.content}>
            <div className={styles.prose}>
              <BodyBlocks blocks={post.body} />
            </div>

            <div className={styles.tags}>
              {post.tags.map((tag) => {
                const anchor = findTagAnchor(post.body, tag)
                return anchor ? (
                  <a key={tag} href={`#${anchor}`} className={styles.tagChip}>
                    {tag}
                  </a>
                ) : (
                  <Link
                    key={tag}
                    to={`/blog?search=${encodeURIComponent(tag)}`}
                    className={styles.tagChip}
                  >
                    {tag}
                  </Link>
                )
              })}
            </div>

            <FaqSection faqs={post.faqs} />
          </div>

          <aside className={styles.sidebar}>
            <TableOfContents blocks={post.body} hasFaq={post.faqs.length > 0} />
            <SidebarPromos />
          </aside>
        </div>

        <div className={styles.ctaBand}>
          <h2>Ready to run a campaign like this?</h2>
          <p>Launch your first bulk SMS campaign in minutes — no apps, no coding, no integration needed.</p>
          <div className={styles.ctaButtons}>
            <Link to="/signup" className={styles.btnWhite}>
              Create Free Trial Account
            </Link>
            <Link to="/contact-us" className={styles.btnOutlineWhite}>
              Book a demo
            </Link>
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
