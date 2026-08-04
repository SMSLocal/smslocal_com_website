import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '../../components/Seo.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { SITE_ORIGIN } from '../../components/Canonical.jsx'
import { getCountry, relatedCountries, variantOf, fmt } from '../../lib/countries.js'
import CountryHeroVisual from './CountryHeroVisual.jsx'
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

  // Long names ("Saint Vincent and the Grenadines") push both past Google's
  // display limits, so each drops its optional tail rather than being cut
  // mid-word in the SERP. SUFFIX is what Seo appends.
  const SUFFIX = ' | SMSLocal'.length
  const titleLong = `${c.name} Country Code ${c.dial} — SMS Guide`
  const title = titleLong.length + SUFFIX <= 65 ? titleLong : `${c.name} Country Code ${c.dial}`

  const descHead = `${c.name} country code is ${c.dial} (ISO ${c.iso2}).`
  const descLong = `${descHead} How to dial ${c.name}, mobile number format, operators and SMS sender ID rules.`
  const description =
    descLong.length <= 155
      ? descLong
      : `${descHead} How to dial it, number format and what SMS senders need to know.`
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
        {/* Bento: the dial code is the page's subject, so it gets the large
            cell and carries the ISO codes as a footnote rather than competing
            with them for a slot of equal size. */}
        <div className={styles.bento}>
          <div className={`${styles.cell} ${styles.cellHero}`}>
            <img
              className={styles.cellFlag}
              src={`/flags/${c.iso2.toLowerCase()}.svg`}
              alt=""
              width="40"
              height="30"
            />
            <div className={styles.cellDial}>{c.dial}</div>
            <div className={styles.cellDialLabel}>{c.name} country code</div>
            <div className={styles.cellIso}>
              <span>ISO</span>
              <strong>{c.iso2} / {c.iso3 ?? '—'}</strong>
            </div>
          </div>

          <div className={`${styles.cell} ${styles.cellWide}`}>
            <div className={styles.cellN}>{fmt(c.population)}</div>
            <div className={styles.cellL}>People</div>
          </div>

          <div className={styles.cell}>
            <div className={styles.cellN}>{fmt(c.areaKm2)}</div>
            <div className={styles.cellL}>Area km²</div>
          </div>

          <div className={styles.cell}>
            <div className={styles.cellN}>{c.gdpUsd ?? '—'}</div>
            <div className={styles.cellL}>GDP (USD)</div>
          </div>
        </div>
      </div>
    </section>
  )

  // Not confined to one narrow box: a phone mockup on one side (what the
  // recipient actually sees) and the rule text at real size on the other,
  // spanning the full section width. The format line is real researched data
  // that already existed on the page (the Dialling section) but had no home
  // here, where it is actually relevant to "how your name appears".
  const SenderId = c.senderId && (
    <section key="sender" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Sender ID</div>
        <h2 className={styles.h2}>How your name appears in {c.name}</h2>
        <p className={styles.sub}>
          What shows up in the recipient&rsquo;s inbox, and what has to be true before it can.
        </p>

        <div className={styles.senderGrid}>
          <div className={styles.phone}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
              <div className={styles.phoneStatusBar}>
                <span>9:41</span>
                <span className={styles.phoneStatusIcons}>
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
                    <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
                    <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
                    <rect x="8" y="3" width="2.5" height="8" rx="0.5" />
                    <rect x="12" y="0" width="2.5" height="11" rx="0.5" />
                  </svg>
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
                    <rect x="0.5" y="0.5" width="13" height="10" rx="2.5" stroke="currentColor" />
                    <rect x="2" y="2" width="10" height="7" rx="1.2" fill="currentColor" />
                    <rect x="14" y="3.5" width="1.5" height="4" rx="0.7" fill="currentColor" />
                  </svg>
                </span>
              </div>

              <div className={styles.phoneSender}>
                <span className={styles.phoneAvatar}>S</span>
                <div>
                  <div className={styles.phoneSenderName}>SMSLOCAL</div>
                  <div className={styles.phoneSenderSub}>Text Message</div>
                </div>
              </div>

              <div className={styles.phoneThread}>
                <div className={styles.phoneBubble}>
                  Your verification code is 4172. Valid for 10 minutes.
                </div>
                <span className={styles.phoneTime}>now</span>
              </div>

              <div className={styles.phoneMeta}>
                <img
                  className={styles.phoneFlag}
                  src={`/flags/${c.iso2.toLowerCase()}.svg`}
                  alt=""
                  width="16"
                  height="12"
                />
                Delivered on {c.dial}
              </div>
            </div>
            <div className={styles.phoneHomeBar} />
          </div>

          <div className={styles.senderInfo}>
            <div className={styles.senderRule}>
              <span className={styles.senderIcon}>ID</span>
              <div>
                <h3>Sender ID rules for {c.dial}</h3>
                <p>{c.senderId}</p>
              </div>
            </div>

            {c.format && (
              <div className={styles.senderFormat}>
                <span className={styles.senderFormatLabel}>Number format</span>
                <code className={styles.senderFormatValue}>{c.format}</code>
              </div>
            )}

            {/* Plain text, no card — real data already researched for this
                market (operators, useCases), given a home here instead of
                repeating the boxed-panel pattern a third time on the page. */}
            {c.operators && (
              <p className={styles.senderPlain}>
                Delivers across every major network in {c.name}: {c.operators.join(', ')}.
              </p>
            )}
            {c.useCases && (
              // Lead the sentence with the phrase as written rather than
              // forcing lowercase — several entries carry acronyms (OTP, NHS)
              // that .toLowerCase() would mangle.
              <p className={styles.senderPlain}>
                What people send most: {c.useCases.join(' · ')}.
              </p>
            )}
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
        {/* Not a card grid — the second attempt at this section was still a
            tile shape with a different badge. This is an editorial list:
            oversized outline numerals running behind full-width text, one
            row each, no boxes anywhere. */}
        <div className={styles.rules}>
          {c.rules.map((r, i) => (
            <div className={styles.rule} key={r}>
              <span className={styles.ruleN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <p className={styles.ruleT}>{r}</p>
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

        {/* The ring divides equally by operator count, not by market share —
            we don't have real share data per market, and inventing it would be
            exactly the kind of unverified figure this project avoids. It reads
            as "every network, one route each," which is the true claim. */}
        <div className={styles.opsGrid}>
          <div className={styles.ring}>
            <div
              className={styles.ringChart}
              style={{
                background: `conic-gradient(${c.operators
                  .map((_, i) => {
                    const start = (i / c.operators.length) * 360
                    const end = ((i + 1) / c.operators.length) * 360
                    const color = i % 2 === 0 ? 'var(--brand-start)' : 'var(--brand-end)'
                    return `${color} ${start}deg ${end}deg`
                  })
                  .join(', ')})`,
              }}
            >
              <div className={styles.ringHole}>
                <img
                  className={styles.ringFlag}
                  src={`/flags/${c.iso2.toLowerCase()}.svg`}
                  alt=""
                  width="30"
                  height="22"
                />
                <span className={styles.ringN}>{c.operators.length}</span>
                <span className={styles.ringL}>Networks</span>
              </div>
            </div>
          </div>

          <div className={styles.opRows}>
            {c.operators.map((o, i) => (
              <div className={styles.opRow} key={o}>
                <span className={styles.opAvatar} aria-hidden="true">
                  {o.slice(0, 2).toUpperCase()}
                </span>
                <span className={styles.opName}>{o}</span>
                <span className={styles.opStatus}>Live route</span>
              </div>
            ))}
          </div>
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
            {c.dial} — {c.format ?? `${c.dial} followed by the national number`}
          </code>
          {/* "Drop the leading zero" is true for most of the world but not for
              +1, which has no trunk prefix — so the rule is stated as
              conditional rather than asserted for every country. */}
          <p>
            From abroad, replace your exit code with <strong>+</strong>, then {c.dial.replace('+', '')},
            then the national number — dropping the national trunk prefix if the country uses one
            (a leading <strong>0</strong> in most, though not in {c.dial === '+1' ? 'this' : 'the +1'} numbering
            plan). Store numbers in E.164 ({c.dial}…) and they work from any country and any API.
          </p>
        </div>
      </div>
    </section>
  )

  // No "not yet researched" notice. It was identical on all 175 pages apart
  // from the country name — the most templated thing here — and it claimed the
  // rules had been "verified with the operators", which is not how any of this
  // was produced. A false claim repeated 175 times is worse than no claim; the
  // regulatory sections simply don't render where there is nothing to say.

  // Fixed hero and CTA; the middle rotates so no two countries present in the
  // same order. Rotation is by slug hash, so it is stable across builds.
  const middle = [Facts, SenderId, Rules, Operators, UseCases, Dialling].filter(Boolean)
  const pivot = v % middle.length
  const ordered = [...middle.slice(pivot), ...middle.slice(0, pivot)]

  return (
    <div>
      <Seo
        title={title}
        // Kept under ~155 characters so Google shows it whole rather than
        // truncating mid-sentence. Longest published name is United Arab Emirates.
        description={description}
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
                {/* Fallback is built from this country's own figures, so an
                    unresearched market still reads as its own page rather than
                    one sentence with the name swapped. */}
                {c.intro ??
                  `${c.name} dials on ${c.dial} and carries ISO codes ${c.iso2}/${c.iso3 ?? c.iso2}, across ${fmt(c.areaKm2)} km² and ${fmt(c.population)} people in ${c.region ?? 'the region'}. Here is how to format a number for ${c.name}, and what to confirm before you send to it.`}
              </p>
            </div>
            <CountryHeroVisual country={c} />
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
