import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './CountryDirectory.module.css'

/** Largest first, so the sections a visitor most likely wants are nearest. */
const CONTINENTS = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania']

/**
 * The full 195-country reference, grouped into collapsible continents.
 *
 * A single A–Z run of 195 entries is a wall — everything is on screen whether
 * you want it or not. Collapsed continents put the whole world in five rows and
 * let you open only the region you care about.
 *
 * Searching overrides the open/closed state: a continent holding a match opens
 * itself, so results are never hidden behind a collapsed section. That is the
 * failure this pattern usually has, and the reason `open` is derived rather
 * than purely stateful.
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
  return (
    <li>
      {linked ? (
        <Link className={`${styles.row} ${styles.rowLink}`} to={`/country-code/${c.slug}/`}>
          {inner}
        </Link>
      ) : (
        <span className={styles.row}>{inner}</span>
      )}
    </li>
  )
}

function CountryDirectory({ countries, published }) {
  const [query, setQuery] = useState('')
  // One at a time — opening a continent closes whichever was open. Asia starts
  // open so the section reads as expandable rather than as five inert bars.
  const [openRegion, setOpenRegion] = useState('Asia')

  const q = query.trim().toLowerCase()

  const { groups, total } = useMemo(() => {
    const matches = q
      ? countries.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.dial.includes(q) ||
            c.iso2.toLowerCase() === q ||
            (c.iso3 ?? '').toLowerCase() === q,
        )
      : countries

    const byRegion = new Map(CONTINENTS.map((r) => [r, []]))
    for (const c of matches) {
      if (byRegion.has(c.region)) byRegion.get(c.region).push(c)
    }
    return { groups: byRegion, total: matches.length }
  }, [countries, q])

  // Clicking the open one closes it, so the list can be fully collapsed.
  const toggle = (region) => setOpenRegion((prev) => (prev === region ? null : region))

  return (
    <div>
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
          <strong>{total}</strong> of {countries.length}
        </span>
      </div>

      {total === 0 ? (
        <p className={styles.empty}>No country matches “{query}”.</p>
      ) : (
        <div className={styles.stack}>
          {CONTINENTS.map((region) => {
            const list = groups.get(region) ?? []
            if (!list.length) return null
            // While searching, a section with hits is always open.
            const open = q ? true : openRegion === region

            return (
              <section className={styles.group} key={region}>
                <button
                  type="button"
                  className={styles.head}
                  onClick={() => toggle(region)}
                  aria-expanded={open}
                  disabled={Boolean(q)}
                >
                  <span className={styles.headName}>{region}</span>
                  <span className={styles.headCount}>{list.length}</span>
                  <span className={`${styles.chev} ${open ? styles.chevOpen : ''}`} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                {open && (
                  <ul className={styles.rows}>
                    {list.map((c) => (
                      <Row key={c.slug} c={c} linked={published.has(c.slug)} />
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CountryDirectory
