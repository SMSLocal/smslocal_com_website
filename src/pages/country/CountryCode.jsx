import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '../../components/Seo.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { SITE_ORIGIN } from '../../components/Canonical.jsx'
import { getCountry, relatedCountries, variantOf, fmt } from '../../lib/countries.js'
import styles from './CountryCode.module.css'

/**
 * One country's dialling and A2P page.
 *
 * Sections are assembled from a list whose order varies per country, keyed off
 * a hash of the slug — deterministic, so prerender and client agree, but enough
 * that two countries don't read as the same page with the name swapped. The
 * regulatory sections only render when the market has actually been researched
 * (see countryContent.js); a country without that gets the factual page and an
 * explicit note rather than invented compliance claims.
 */
function CountryCode() {
  const { slug } = useParams()
  const c = getCountry(slug)

  if (!c) return <Navigate to="/country-code/" replace />

  const url = `${SITE_ORIGIN}/country-code/${c.slug}/`
  const related = relatedCountries(c.slug)
  const v = variantOf(c.slug)

  const Facts = (
    <section key="facts" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>At a glance</div>
        <h2 className={styles.h2}>{c.name} by the numbers</h2>
        <p className={styles.sub}>
          The figures below come from public country data and set the context for how much SMS
          traffic {c.name} actually carries.
        </p>
        <div className={styles.facts}>
          <div className={styles.fact}>
            <div className={styles.factN}>{c.dial}</div>
            <div className={styles.factL}>Country code</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factN}>{c.iso2} / {c.iso3 ?? '—'}</div>
            <div className={styles.factL}>ISO codes</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factN}>{fmt(c.population)}</div>
            <div className={styles.factL}>Population</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factN}>{fmt(c.areaKm2)}</div>
            <div className={styles.factL}>Area km²</div>
          </div>
          {c.gdpUsd && (
            <div className={styles.fact}>
              <div className={styles.factN}>{c.gdpUsd}</div>
              <div className={styles.factL}>GDP (USD)</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )

  const SenderId = c.senderId && (
    <section key="sender" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Sender ID</div>
        <h2 className={styles.h2}>How your name appears in {c.name}</h2>
        <div className={styles.callout}>
          <div className={styles.calloutIcon}>ID</div>
          <div className={styles.calloutBody}>
            <h3>Sender ID rules for {c.dial}</h3>
            <p>{c.senderId}</p>
          </div>
        </div>
      </div>
    </section>
  )

  const Rules = c.rules && (
    <section key="rules" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Before you send</div>
        <h2 className={styles.h2}>What {c.name} requires</h2>
        <p className={styles.sub}>
          These are the constraints that decide whether a message is delivered, filtered or blocked
          — not general best practice.
        </p>
        <div className={styles.rules}>
          {c.rules.map((r, i) => (
            <div className={styles.rule} key={r}>
              <span className={styles.ruleN}>{i + 1}</span>
              <span className={styles.ruleT}>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const Operators = c.operators && (
    <section key="ops" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Networks</div>
        <h2 className={styles.h2}>Mobile operators in {c.name}</h2>
        <p className={styles.sub}>
          We deliver to every network below. Route quality is measured per operator, not averaged
          across the country.
        </p>
        <div className={styles.ops}>
          {c.operators.map((o) => (
            <span className={styles.op} key={o}>{o}</span>
          ))}
        </div>
      </div>
    </section>
  )

  const UseCases = c.useCases && (
    <section key="cases" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Traffic</div>
        <h2 className={styles.h2}>What businesses send in {c.name}</h2>
        <div className={styles.cases}>
          {c.useCases.map((u) => (
            <div className={styles.case} key={u}>
              <div className={styles.caseT}>{u}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const Dialling = (
    <section key="dial" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Dialling</div>
        <h2 className={styles.h2}>How to dial {c.name}</h2>
        <div className={styles.dialExample}>
          <code>
            {c.dial} — {c.format ?? 'national number, leading zero removed'}
          </code>
          <p>
            From abroad, replace your exit code with <strong>+</strong>, then {c.dial.replace('+', '')},
            then the national number without its leading zero. Store numbers in E.164
            ({c.dial}…) and they will work from any country and any API.
          </p>
        </div>
      </div>
    </section>
  )

  const Unresearched = !c.researched && (
    <section key="note" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.note}>
          We publish sender ID and regulatory detail for {c.name} only once we have verified it with
          the operators. The dialling and country data above is accurate today; for current sending
          rules in this market, <Link to="/contact-us/">talk to our team</Link>.
        </div>
      </div>
    </section>
  )

  // Fixed hero and CTA; the middle rotates so no two countries present in the
  // same order. Rotation is by slug hash, so it is stable across builds.
  const middle = [Facts, SenderId, Rules, Operators, UseCases, Dialling, Unresearched].filter(Boolean)
  const pivot = v % middle.length
  const ordered = [...middle.slice(pivot), ...middle.slice(0, pivot)]

  return (
    <div>
      <Seo
        title={`${c.name} Country Code ${c.dial} — SMS Guide`}
        // Kept under ~155 characters so Google shows it whole rather than
        // truncating mid-sentence. Longest published name is United Arab Emirates.
        description={`${c.name} country code is ${c.dial} (ISO ${c.iso2}). How to dial ${c.name}, mobile number format, operators and SMS sender ID rules.`}
        canonical={url}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: `${c.name} country code ${c.dial}`,
          description: `Dialling code, number format and SMS sending requirements for ${c.name}.`,
          isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
          about: { '@type': 'Country', name: c.name, identifier: c.iso2 },
        }}
      />

      <div className={styles.heroBand}>
        <span className={styles.heroDots} aria-hidden="true" />
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.badge}>Country code {c.dial}</span>
              <h1>
                Sending SMS to <span className="serifItalic">{c.name}</span>
              </h1>
              <p className={styles.lede}>
                {c.intro ??
                  `${c.name} uses the country code ${c.dial}. Below: how to dial it, how mobile numbers are formatted, and what you need in place before sending business SMS into this market.`}
              </p>
            </div>
            <div className={styles.dialCard}>
              <div className={styles.dialCode}>{c.dial}</div>
              <div className={styles.dialLabel}>{c.name} country code</div>
              <div className={styles.dialMeta}>
                <div>
                  <span className={styles.k}>ISO</span>
                  <span className={styles.v}>{c.iso2} / {c.iso3 ?? '—'}</span>
                </div>
                <div>
                  <span className={styles.k}>Population</span>
                  <span className={styles.v}>{fmt(c.population)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {ordered}

      {related.length > 0 && (
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.kicker}>Nearby codes</div>
            <h2 className={styles.h2}>Other country codes</h2>
            <p className={styles.sub}>Countries with neighbouring dialling codes.</p>
            <div className={styles.related}>
              {related.map((r) => (
                <Link className={styles.relCard} to={`/country-code/${r.slug}/`} key={r.slug}>
                  <div className={styles.relName}>{r.name}</div>
                  <div className={styles.relDial}>{r.dial}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.cta}>
            <span className={styles.ctaGlow} aria-hidden="true" />
            <h2>Start sending to {c.name}</h2>
            <p>
              Direct routes, per-operator delivery reporting and sender ID handling for {c.dial} —
              from one dashboard or one API call.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.btnPrimary} to="/signup/">Create free account</Link>
              <Link className={styles.btnGhost} to="/pricing/">See {c.name} pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CountryCode
