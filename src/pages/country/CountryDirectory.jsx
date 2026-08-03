import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './CountryDirectory.module.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

/**
 * The full 195-country reference, as an A–Z index rather than a table.
 *
 * A table gives every country a full-width row, so the list runs to a dozen
 * screens and each row carries four columns of mostly whitespace. Grouping by
 * letter and flowing entries into columns fits roughly four times as many on
 * screen, which is what a reference is for — scanning, not reading top to
 * bottom.
 *
 * Countries with a published guide are links; the rest are plain entries, so
 * the list never promises a page that isn't there.
 */
function CountryDirectory({ countries, published }) {
  const [query, setQuery] = useState('')

  const { groups, total } = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = q
      ? countries.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.dial.includes(q) ||
            c.iso2.toLowerCase() === q ||
            (c.iso3 ?? '').toLowerCase() === q,
        )
      : countries

    const byLetter = new Map()
    for (const c of matches) {
      const letter = c.name[0].toUpperCase()
      if (!byLetter.has(letter)) byLetter.set(letter, [])
      byLetter.get(letter).push(c)
    }
    return { groups: byLetter, total: matches.length }
  }, [countries, query])

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

      {/* Jumps rather than filters — the letters stay in place so the index
          doesn't reflow under the cursor. A letter with no entries is dimmed
          instead of removed, so the bar never changes width. */}
      <nav className={styles.alphabet} aria-label="Jump to letter">
        {ALPHABET.map((l) =>
          groups.has(l) ? (
            <a className={styles.letter} href={`#cc-${l}`} key={l}>
              {l}
            </a>
          ) : (
            <span className={styles.letterOff} key={l} aria-hidden="true">
              {l}
            </span>
          ),
        )}
      </nav>

      {total === 0 ? (
        <p className={styles.empty}>No country matches “{query}”.</p>
      ) : (
        <div className={styles.index}>
          {[...groups.entries()].map(([letter, list]) => (
            <section className={styles.group} key={letter} id={`cc-${letter}`}>
              <h3 className={styles.groupLetter}>{letter}</h3>
              <ul className={styles.rows}>
                {list.map((c) => {
                  const has = published.has(c.slug)
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
                    <li key={c.slug}>
                      {has ? (
                        <Link className={`${styles.row} ${styles.rowLink}`} to={`/country-code/${c.slug}/`}>
                          {inner}
                        </Link>
                      ) : (
                        <span className={styles.row}>{inner}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

export default CountryDirectory
