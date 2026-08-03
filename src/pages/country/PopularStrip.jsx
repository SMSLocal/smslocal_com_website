import { Link } from 'react-router-dom'
import { fmt } from '../../lib/countries.js'
import styles from './PopularStrip.module.css'

/**
 * A continuously sliding row of portrait country cards.
 *
 * The list is rendered twice and the track travels exactly -50%, so the second
 * copy is under the cursor at the moment the animation restarts — any other
 * distance visibly jumps. The duplicate is aria-hidden and its links removed
 * from the tab order, so the same 20 countries aren't announced twice.
 *
 * Sliding pauses on hover. Without that, growing a card on hover would be
 * useless: it would carry on moving out from under the pointer before anything
 * could be read.
 */
function Card({ c, clone }) {
  const extra = [c.operators?.[0], c.operators?.[1]].filter(Boolean).join(' · ')

  return (
    <Link
      className={styles.card}
      to={`/country-code/${c.slug}/`}
      tabIndex={clone ? -1 : undefined}
      aria-hidden={clone || undefined}
    >
      <span className={styles.top}>
        <img className={styles.flag} src={`/flags/${c.iso2.toLowerCase()}.svg`} alt="" width="34" height="26" />
        <span className={styles.iso}>{c.iso2}</span>
      </span>

      <span className={styles.dial}>{c.dial}</span>
      <span className={styles.name}>{c.name}</span>
      <span className={styles.pop}>{fmt(c.population)} people</span>

      {/* Slides up over the card on hover rather than expanding it — a height
          change here would shove every card after it along the track. */}
      <span className={styles.more}>
        {c.format && <span className={styles.fmt}>{c.format.split('—')[0].trim()}</span>}
        {extra && <span className={styles.ops}>{extra}</span>}
        <span className={styles.cta}>View SMS guide →</span>
      </span>
    </Link>
  )
}

function PopularStrip({ countries }) {
  return (
    <div className={styles.viewport}>
      <div className={styles.track}>
        {countries.map((c) => (
          <Card key={c.slug} c={c} />
        ))}
        {countries.map((c) => (
          <Card key={`clone-${c.slug}`} c={c} clone />
        ))}
      </div>
    </div>
  )
}

export default PopularStrip
