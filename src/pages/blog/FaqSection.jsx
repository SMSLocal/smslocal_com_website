import { useState } from 'react'
import { RichText } from './BodyBlocks.jsx'
import styles from './BlogPost.module.css'

/* Controlled accordion rather than a stack of always-expandable <details>:
   one answer open at a time, matching the sitewide FAQ section. The first
   question starts open so the section never reads as an inert list of boxes. */
function FaqSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0)

  if (faqs.length === 0) return null

  return (
    <section className={styles.faqSection}>
      <div className={styles.sectionLabel}>FAQ</div>
      <h2 id="faq" className={styles.faqHeading}>
        Frequently Asked Questions
      </h2>
      <div className={styles.faqList}>
        {faqs.map((faq, idx) => {
          const open = openIndex === idx
          return (
            <div
              key={faq.q}
              className={`${styles.faqItem} ${open ? styles.faqItemOpen : ''}`}
            >
              <button
                type="button"
                className={styles.faqQuestion}
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? -1 : idx)}
              >
                {faq.q}
                <span className={styles.faqCaret} aria-hidden="true">
                  {open ? '−' : '+'}
                </span>
              </button>
              <div className={styles.faqAnswerWrap}>
                <div className={styles.faqAnswerInner}>
                  <p className={styles.faqAnswer}>
                    {/* Authored posts use a plain `a` string; imported ones keep links. */}
                    {faq.rich ? <RichText rich={faq.rich} /> : faq.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FaqSection
