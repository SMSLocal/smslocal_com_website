import { useEffect, useRef, useState } from 'react'
import { fmt } from '../../lib/countries.js'
import styles from './CountryHeroVisual.module.css'

/**
 * Hero artifact for a single country page: the dial code as a transmitting
 * signal, with that country's real figures counting up around it.
 *
 * Everything shown comes from the country's own data, so no two pages animate
 * to the same numbers — the point is that this is Nigeria's page, not a
 * template with Nigeria dropped in.
 *
 * Counters start at their final value so the prerendered HTML carries the real
 * figures (a crawler reading static HTML sees 223,804,632, not 0), then rewind
 * and count up once the client mounts.
 */
const DURATION = 1100

/**
 * Counts to `target`, and — this is the part that matters — always ends on it.
 *
 * Driven by an interval rather than requestAnimationFrame, with a separate
 * timeout that hard-sets the final value. rAF is paused entirely in background
 * tabs, so an rAF-only version leaves the counter reading 0 for as long as the
 * tab stays unfocused: a page that says a country has 0 people. Steps are
 * computed from elapsed wall-clock time, so a throttled tab catches up rather
 * than finishing late.
 */
function useCountUp(target, run) {
  const [value, setValue] = useState(target)
  const timers = useRef([])

  useEffect(() => {
    if (!run || !target) return
    const start = Date.now()
    setValue(0)

    const id = setInterval(() => {
      const t = Math.min((Date.now() - start) / DURATION, 1)
      // easeOutCubic — quick, then settling, so it reads as arriving.
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t >= 1) clearInterval(id)
    }, 32)

    // Backstop: whatever the interval did or didn't do, the figure shown is
    // the real one shortly after.
    const done = setTimeout(() => {
      clearInterval(id)
      setValue(target)
    }, DURATION + 150)

    timers.current = [id, done]
    return () => {
      clearInterval(id)
      clearTimeout(done)
    }
  }, [target, run])

  return value
}

function CountryHeroVisual({ country: c }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!reduce) setMounted(true)
  }, [])

  const population = useCountUp(c.population, mounted)
  const area = useCountUp(c.areaKm2, mounted)

  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.signal}>
        {/* Three rings on staggered delays read as one repeating pulse rather
            than three separate animations. */}
        <span className={`${styles.ring} ${styles.ring1}`} />
        <span className={`${styles.ring} ${styles.ring2}`} />
        <span className={`${styles.ring} ${styles.ring3}`} />

        <div className={styles.core}>
          <img
            className={styles.flag}
            src={`/flags/${c.iso2.toLowerCase()}.svg`}
            alt=""
            width="46"
            height="35"
          />
          <div className={styles.dial}>{c.dial}</div>
          <div className={styles.dialLabel}>Country code</div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{fmt(population)}</span>
          <span className={styles.statLabel}>People</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{fmt(area)}</span>
          <span className={styles.statLabel}>km²</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{c.iso2} / {c.iso3 ?? '—'}</span>
          <span className={styles.statLabel}>ISO</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{c.region ?? '—'}</span>
          <span className={styles.statLabel}>Region</span>
        </div>
      </div>
    </div>
  )
}

export default CountryHeroVisual
