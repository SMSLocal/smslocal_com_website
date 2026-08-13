import { useMemo } from 'react'
import Seo from '../../components/Seo.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { SITE_ORIGIN } from '../../components/Canonical.jsx'
import { researchedCountries, allCountries } from '../../lib/countries.js'
import HeroStage from './HeroStage.jsx'
import PopularStrip from './PopularStrip.jsx'
import CountryDirectory from './CountryDirectory.jsx'
import { NumberAnatomy, EncodingCards, NumberingChanges, FAQS } from './CountryHubSections.jsx'
// The shared inner-page FAQ and CTA, in the order every other page uses them.
import { FAQ, CTABanner } from '../../components/sections/Sections.jsx'
import styles from './CountryCode.module.css'

/**
 * The /country-code/ hub. Lists every country's dialling code from the
 * generated data, and links through only for markets that have a published
 * page — the rest are shown as reference rows, which is honest about what
 * exists rather than linking to pages that aren't there.
 */
function CountryIndex() {
  // Every country has a page now, so every name in the directory links.
  const published = useMemo(() => new Set(allCountries.map((c) => c.slug)), [])

  return (
    <div>
      <Seo
        title="International Country Codes"
        description="Every international country calling code, with ISO codes, number formats and SMS sender ID rules."
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

      {/* Built from the same FAQS array the section renders, so the markup and
          the visible answers cannot drift — mismatched FAQ schema is treated as
          misleading structured data. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${SITE_ORIGIN}/country-code/#faq`,
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
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
            <HeroStage countries={researchedCountries} />
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>Researched markets</div>
          <h2 className={styles.h2}>Full SMS guides</h2>
          <p className={styles.sub}>
            These markets have researched sender ID, operator and regulatory detail. Hover a card to
            see its number format and networks.
          </p>
          <PopularStrip countries={researchedCountries} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>How it works</div>
          <h2 className={styles.h2}>What a country code actually is</h2>
          <p className={styles.sub}>
            Every number on this page is one part of a longer string. Here is what each part does,
            and the three things that most often go wrong.
          </p>
          <NumberAnatomy />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>Reference</div>
          <h2 className={styles.h2}>All country calling codes</h2>
          <p className={styles.sub}>
            Pick a continent, or search by name, code or ISO. Countries with a published guide link
            through; the rest are listed for reference.
          </p>
          <CountryDirectory countries={allCountries} published={published} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>Cost</div>
          <h2 className={styles.h2}>Why the same message costs more in some countries</h2>
          <p className={styles.sub}>
            Rarely the country code itself. Usually the alphabet — which decides how much text fits
            in one billable segment.
          </p>
          <EncodingCards />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>Watch out</div>
          <h2 className={styles.h2}>Changes that quietly break contact lists</h2>
          <p className={styles.sub}>
            Countries renumber and rename. Numbers collected before a change look perfectly valid
            and simply never arrive.
          </p>
          <NumberingChanges />
        </div>
      </section>

      <CTABanner
        title={<>Send to every country code from one account</>}
        subtitle="Direct routes, per-operator delivery reporting and sender ID handling — from one dashboard or one API call."
        cta={{ label: 'Create a free account', href: '/signup/' }}
        secondaryCta={{ label: 'See pricing', href: '/pricing/' }}
      />

      <FAQ title={<>Country codes — frequently asked questions</>} items={FAQS} alt />
    </div>
  )
}

export default CountryIndex
