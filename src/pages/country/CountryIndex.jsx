import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { SITE_ORIGIN } from '../../components/Canonical.jsx'
import { publishedCountries, allCountries, fmt } from '../../lib/countries.js'
import HeroStage from './HeroStage.jsx'
import PopularStrip from './PopularStrip.jsx'
import styles from './CountryCode.module.css'
import index from './CountryIndex.module.css'

/**
 * The /country-code/ hub. Lists every country's dialling code from the
 * generated data, and links through only for markets that have a published
 * page — the rest are shown as reference rows, which is honest about what
 * exists rather than linking to pages that aren't there.
 */
function CountryIndex() {
  const [query, setQuery] = useState('')
  const published = useMemo(() => new Set(publishedCountries.map((c) => c.slug)), [])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allCountries
    return allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.iso2.toLowerCase() === q ||
        (c.iso3 ?? '').toLowerCase() === q,
    )
  }, [query])

  return (
    <div>
      <Seo
        title="Country Codes — International Dialling Codes"
        description="Every international country calling code with ISO codes, population and number formats, plus the sender ID rules and operators SMS senders need."
        canonical={`${SITE_ORIGIN}/country-code/`}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${SITE_ORIGIN}/country-code/#webpage`,
          url: `${SITE_ORIGIN}/country-code/`,
          name: 'International country codes',
          isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        }}
      />

      <div className={styles.heroBand}>
        <span className={styles.heroDots} aria-hidden="true" />
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.badge}>Country codes</span>
              <h1 className={styles.hubTitle}>
                Every international <span className="serifItalic">dialling code</span>
              </h1>
              <p className={styles.lede}>
                {allCountries.length} countries with their calling code, ISO codes and population.
                For the markets we have researched, each page also covers sender ID rules, operators
                and what regulators require before you can send.
              </p>
            </div>
            <HeroStage countries={publishedCountries} />
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>Researched markets</div>
          <h2 className={styles.h2}>Full SMS guides</h2>
          <p className={styles.sub}>
            These markets have verified sender ID, operator and regulatory detail. Hover a card to
            see its number format and networks.
          </p>
          <PopularStrip countries={publishedCountries} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>Reference</div>
          <h2 className={styles.h2}>All country calling codes</h2>
          <div className={index.searchRow}>
            <input
              className={index.search}
              type="text"
              placeholder="Search country, code or ISO…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className={index.count}>{rows.length} of {allCountries.length}</span>
          </div>
          <div className={index.tableWrap}>
            <table className={index.table}>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Code</th>
                  <th>ISO</th>
                  <th className={index.num}>Population</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.slug}>
                    <td>
                      {published.has(c.slug) ? (
                        <Link to={`/country-code/${c.slug}/`}>{c.name}</Link>
                      ) : (
                        c.name
                      )}
                    </td>
                    <td>{c.dial}</td>
                    <td>{c.iso2} / {c.iso3 ?? '—'}</td>
                    <td className={index.num}>{fmt(c.population)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 && <p className={styles.sub}>No country matches “{query}”.</p>}
        </div>
      </section>
    </div>
  )
}

export default CountryIndex
