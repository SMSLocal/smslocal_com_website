import { useMemo } from 'react'
import Seo from '../../components/Seo.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { SITE_ORIGIN } from '../../components/Canonical.jsx'
import { publishedCountries, allCountries } from '../../lib/countries.js'
import HeroStage from './HeroStage.jsx'
import PopularStrip from './PopularStrip.jsx'
import CountryDirectory from './CountryDirectory.jsx'
import styles from './CountryCode.module.css'

/**
 * The /country-code/ hub. Lists every country's dialling code from the
 * generated data, and links through only for markets that have a published
 * page — the rest are shown as reference rows, which is honest about what
 * exists rather than linking to pages that aren't there.
 */
function CountryIndex() {
  const published = useMemo(() => new Set(publishedCountries.map((c) => c.slug)), [])

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
          <p className={styles.sub}>
            Every calling code, A–Z. Countries with a published guide link through; the rest are
            listed for reference.
          </p>
          <CountryDirectory countries={allCountries} published={published} />
        </div>
      </section>
    </div>
  )
}

export default CountryIndex
