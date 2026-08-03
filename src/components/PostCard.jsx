import { Link } from 'react-router-dom'
import { withSlash } from '../lib/url.js'
import styles from './PostCard.module.css'

function PostCard({ post, compact = false }) {
  return (
    // routePath is stored without a trailing slash; the served URL has one, so
    // linking to it raw would cost a 308 on every card.
    <Link to={withSlash(post.routePath ?? `/blog/${post.slug}`)} className={styles.card}>
      <div className={`${styles.thumb} ${compact ? styles.thumbCompact : ''}`}>
        {post.cover && (
          <img className={styles.thumbImage} src={post.cover} alt="" loading="lazy" />
        )}
        {/* The banner artwork labels its own topic, so a second overlaid badge
            just collided with it. Keep the badge only as a fallback when a post
            has no cover of its own. */}
        {!post.cover && <span className={styles.cat}>{post.category}</span>}
      </div>
      <div className={`${styles.body} ${compact ? styles.bodyCompact : ''}`}>
        <div className={styles.meta}>
          {post.date.toUpperCase()} · {post.readTime.toUpperCase()}
        </div>
        <h3 className={`${styles.title} ${compact ? styles.titleCompact : ''}`}>
          {post.title}
        </h3>
        {/* Compact cards carry the description too — without it they read as
            an unfinished title-only tile. Clamped to 4 lines in CSS. */}
        <p className={styles.excerpt}>{post.excerpt}</p>
        {!compact && (
          <div className={styles.footer}>
            <div className={styles.author}>
              <span className={styles.avatar}>{post.author.initials}</span>
              {post.author.name}
            </div>
            <span className={styles.readTime}>{post.readTime.replace(' read', '')}</span>
          </div>
        )}
      </div>
    </Link>
  )
}

export default PostCard
