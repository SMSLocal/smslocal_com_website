import { Link } from 'react-router-dom'
import styles from './PostCard.module.css'

function PostCard({ post, compact = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className={styles.card}>
      <div className={`${styles.thumb} ${compact ? styles.thumbCompact : ''}`}>
        <span className={styles.cat}>{post.category}</span>
      </div>
      <div className={`${styles.body} ${compact ? styles.bodyCompact : ''}`}>
        <div className={styles.meta}>
          {post.date.toUpperCase()} · {post.readTime.toUpperCase()}
        </div>
        <h3 className={`${styles.title} ${compact ? styles.titleCompact : ''}`}>
          {post.title}
        </h3>
        {!compact && <p className={styles.excerpt}>{post.excerpt}</p>}
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
