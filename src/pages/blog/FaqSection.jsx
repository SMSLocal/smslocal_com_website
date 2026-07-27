import styles from './BlogPost.module.css'

function FaqSection({ faqs }) {
  if (faqs.length === 0) return null

  return (
    <div className={styles.faqSection}>
      <div className={styles.sectionLabel}>FAQ</div>
      <h2 id="faq" className={styles.faqHeading}>
        Frequently Asked Questions
      </h2>
      <div className={styles.faqList}>
        {faqs.map((faq) => (
          <details key={faq.q} className={styles.faqItem}>
            <summary className={styles.faqQuestion}>
              {faq.q}
              <span className={styles.faqIcon} aria-hidden="true">
                +
              </span>
            </summary>
            <p className={styles.faqAnswer}>{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

export default FaqSection
