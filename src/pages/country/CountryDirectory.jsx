import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './CountryDirectory.module.css'

/** Largest first; the rail order is fixed so it never reorders under the cursor. */
const CONTINENTS = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania']

/**
 * Two-pane browser for the 195-country reference: continent rail on the left,
 * that continent's countries on the right.
 *
 * The pane is a fixed height and scrolls internally, so the section occupies
 * the same space whichever continent is selected and never pushes the rest of
 * the page around — which is what both the long A–Z list and the expanding
 * accordions did.
 *
 * Searching switches the right pane to results across every continent and
 * annotates the rail with per-continent hit counts, so a match is never hidden
 * behind an unselected region.
 */
function Row({ c, linked }) {
  const inner = (
    <>
      <img
        className={styles.flag}
        src={`/flags/${c.iso2.toLowerCase()}.svg`}
        alt=""
        width="20"
        height="15"
        loading="lazy"
      />
      <span className={styles.name}>{c.name}</span>
      <span className={styles.iso}>{c.iso2}</span>
      <span className={styles.dial}>{c.dial}</span>
    </>
  )
  return linked ? (
    <Link className={`${styles.row} ${styles.rowLink}`} to={`/country-code/${c.slug}/`}>
      {inner}
    </Link>
  ) : (
    <span className={styles.row}>{inner}</span>
  )
}

function CountryDirectory({ countries, published }) {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('Asia')
  const q = query.trim().toLowerCase()

  const matches = useMemo(() => {
    if (!q) return null
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.iso2.toLowerCase() === q ||
        (c.iso3 ?? '').toLowerCase() === q,
    )
  }, [countries, q])

  const counts = useMemo(() => {
    const source = matches ?? countries
    const m = new Map(CONTINENTS.map((r) => [r, 0]))
    for (const c of source) if (m.has(c.region)) m.set(c.region, m.get(c.region) + 1)
    return m
  }, [countries, matches])

  // Searching shows hits from every continent at once; otherwise the pane
  // shows the selected one.
  const list = matches ?? countries.filter((c) => c.region === region)

  return (
    <div className={styles.browser}>
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search country, code or ISO…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search countries"
        />
        <span className={styles.count}>
          <strong>{list.length}</strong> {matches ? 'found' : `in ${region}`}
        </span>
      </div>

      <div className={styles.panes}>
        <nav className={styles.rail} aria-label="Continents">
          {CONTINENTS.map((r) => {
            const n = counts.get(r) ?? 0
            const active = !matches && r === region
            return (
              <button
                key={r}
                type="button"
                className={`${styles.railItem} ${active ? styles.railItemOn : ''}`}
                onClick={() => {
                  setQuery('')
                  setRegion(r)
                }}
                aria-current={active || undefined}
              >
                <span className={styles.railName}>{r}</span>
                {/* While searching this shows hits per continent rather than
                    the total, so the rail explains where results are. */}
                <span className={`${styles.railCount} ${matches && n === 0 ? styles.railCountOff : ''}`}>
                  {n}
                </span>
              </button>
            )
          })}
        </nav>

        <div className={styles.pane}>
          {list.length === 0 ? (
            <p className={styles.empty}>No country matches “{query}”.</p>
          ) : (
            <div className={styles.rows}>
              {list.map((c) => (
                <Row key={c.slug} c={c} linked={published.has(c.slug)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryDirectory
