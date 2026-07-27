import styles from './BlogPost.module.css'

function SidebarPromos() {
  return (
    <>
      <div className={styles.promoCard}>
        <div className={styles.promoHeading}>
          <span aria-hidden="true">🔥</span>
          Why Choose Our SMS Service?
        </div>
        <ul className={styles.promoList}>
          <li>
            <span className={styles.promoCheck} aria-hidden="true">✓</span>
            99% Delivery Rate
          </li>
          <li>
            <span className={styles.promoCheck} aria-hidden="true">✓</span>
            Affordable Bulk SMS
          </li>
          <li>
            <span className={styles.promoCheck} aria-hidden="true">✓</span>
            Instant Delivery Reports
          </li>
        </ul>
      </div>

      <div className={styles.offerBanner}>
        <div className={styles.promoHeading}>
          <span aria-hidden="true">📣</span>
          Special Offer:
        </div>
        <p className={styles.offerBannerText}>
          <strong>Get Free SMS</strong> on your first purchase!
        </p>
      </div>
    </>
  )
}

export default SidebarPromos
