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
 * that two countries don't read as the same page with the name swapped.
 *
 * Every section renders on all 195 pages — the design must not vary by
 * whether a market happens to be researched. What varies is the content: for
 * the 20 markets in countryContent.js, the sender-ID rules, requirements,
 * operators and use cases are real per-country research. For the other 175,
 * those same four sections show GENERIC.* content instead — clearly framed as
 * general guidance rather than a claim about that specific country. The line
 * that must never move is inventing a country-specific regulatory fact
 * (a sender-ID registration requirement, a consent law, a named operator) for
 * a market that has not actually been checked.
 */
const GENERIC = {
  senderId:
    'Both alphanumeric and numeric sender IDs are supported where the local network allows it. Exact registration steps, character limits and lead time vary by operator, and are confirmed as part of onboarding before your first send.',
  rules: [
    'Get clear consent before sending marketing messages, and keep a record of it.',
    'Every marketing message needs a working opt-out, honoured immediately.',
    'Sender IDs that impersonate a bank, courier or government body are filtered by most networks.',
    'Country-specific requirements — sender ID registration, timing restrictions, consent rules — are confirmed with you before your first send here.',
  ],
  useCases: [
    'OTP and account verification',
    'Order and delivery updates',
    'Appointment and service reminders',
  ],
}
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
  //
  // Renders on every page now — c.researched decides the text, not whether
  // the section exists. Unresearched markets get GENERIC.senderId, which is
  // written to be honestly general rather than posing as this country's rule.
  const SenderId = (
    <section key="sender" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Sender ID</div>
        <h2 className={styles.h2}>How your name appears in {c.name}</h2>
        <p className={styles.sub}>
          {c.researched
            ? "What shows up in the recipient’s inbox, and what has to be true before it can."
            : `General guidance — we have not yet confirmed ${c.name}-specific sender ID rules.`}
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
                <p>{c.senderId ?? GENERIC.senderId}</p>
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

  // Renders everywhere; content is the real per-market list when researched,
  // GENERIC.rules — universal practice plus an honest "confirmed before you
  // send" line — otherwise. Never a per-country regulatory claim we have not
  // actually checked.
  const rulesList = c.rules ?? GENERIC.rules
  const Rules = (
    <section key="rules" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Before you send</div>
        <h2 className={styles.h2}>What {c.name} requires</h2>
        <p className={styles.sub}>
          {c.researched
            ? 'These are the constraints that decide whether a message is delivered, filtered or blocked — not general best practice.'
            : `General practice for reaching ${c.name} — market-specific requirements are confirmed with you before your first send.`}
        </p>
        {/* Not a card grid — the second attempt at this section was still a
            tile shape with a different badge. This is an editorial list:
            oversized outline numerals running behind full-width text, one
            row each, no boxes anywhere. */}
        <div className={styles.rules}>
          {rulesList.map((r, i) => (
            <div className={styles.rule} key={r}>
              <span className={styles.ruleN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <p className={styles.ruleT}>{r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // Renders everywhere. The per-operator ring needs named operators — we do
  // not have a verified list for the 175 unresearched markets, and a company
  // name is a specific factual claim, not general guidance the way the rules
  // text above can be. So the unresearched version keeps the same section
  // slot and left/right layout but replaces the segmented ring with a single
  // coverage badge and the operator rows with one honest panel, rather than
  // guessing at carrier names.
  const Operators = (
    <section key="ops" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Networks</div>
        <h2 className={styles.h2}>Mobile operators in {c.name}</h2>
        <p className={styles.sub}>
          {c.operators
            ? 'We deliver to every network below. Route quality is measured per operator, not averaged across the country.'
            : `Named operators for ${c.name} have not been confirmed yet — routing still reaches every licensed network in the market.`}
        </p>

        {c.operators ? (
          // The ring divides equally by operator count, not by market share —
          // we don't have real share data per market, and inventing it would
          // be exactly the kind of unverified figure this project avoids. It
          // reads as "every network, one route each," which is the true claim.
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
        ) : (
          <div className={styles.opsGrid}>
            <div className={styles.ring}>
              <div className={styles.ringChart} style={{ background: 'var(--cc-surface)' }}>
                <div className={styles.ringHole}>
                  <img
                    className={styles.ringFlag}
                    src={`/flags/${c.iso2.toLowerCase()}.svg`}
                    alt=""
                    width="30"
                    height="22"
                  />
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--brand-start)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18z" />
                  </svg>
                  <span className={styles.ringL}>Full coverage</span>
                </div>
              </div>
            </div>

            <div className={styles.opRows}>
              <div className={styles.opRow}>
                <span className={styles.opAvatar} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span className={styles.opName}>
                  Routes provision automatically to every licensed operator serving {c.name} — no
                  operator list to maintain on your side.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )

  // Renders everywhere; GENERIC.useCases are near-universal SMS uses (OTP,
  // delivery, reminders), true in essentially every market, so they carry no
  // country-specific claim to get wrong.
  const useCasesList = c.useCases ?? GENERIC.useCases
  const UseCases = (
    <section key="cases" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Traffic</div>
        <h2 className={styles.h2}>
          {c.useCases ? `What businesses send in ${c.name}` : `Common SMS use cases in ${c.name}`}
        </h2>
        {/* Was three short pills — a caption's worth of height. Each is now a
            tall panel: a large outline numeral (same construction as the
            requirements section, so the two feel like one design language)
            plus a message-bubble icon, so three short phrases read as three
            substantial panels rather than three tags. */}
        <div className={styles.cases}>
          {useCasesList.map((u, i) => (
            <div className={styles.case} key={u}>
              <span className={styles.caseN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.caseIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </span>
              <div className={styles.caseT}>{u}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // The national-number pattern, split out of the format string that already
  // exists for every country — not a new fact, just the same string
  // re-presented as its own part rather than folded into one line. Plain
  // string ops rather than a RegExp built from c.dial: the dial code itself
  // contains "+", which needs escaping to be used as a regex literal, and an
  // unescaped "+62" is "one or more of '6'" — not the string "+62".
  const dialHead = c.format ? c.format.split('—')[0].trim() : ''
  const nsnPattern = dialHead
    ? (dialHead.startsWith(c.dial) ? dialHead.slice(c.dial.length).trim() : dialHead)
    : 'national number'

  const Dialling = (
    <section key="dial" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>Dialling</div>
        <h2 className={styles.h2}>How to dial {c.name}</h2>
        <p className={styles.sub}>
          Every part of the number, laid out separately, then the same thing written the way an
          API expects it.
        </p>

        {/* Same three-part construction as the hub's number-anatomy section,
            personalised to this country's own code and format — real values,
            not a second invented example. */}
        <div className={styles.dialParts}>
          <div className={`${styles.dialPart} ${styles.dialPartExit}`}>
            <span className={styles.dialPartV}>+</span>
            <span className={styles.dialPartL}>Exit</span>
          </div>
          <div className={`${styles.dialPart} ${styles.dialPartCode}`}>
            <span className={styles.dialPartV}>{c.dial.replace('+', '')}</span>
            <span className={styles.dialPartL}>Country code</span>
          </div>
          <div className={`${styles.dialPart} ${styles.dialPartNsn}`}>
            <span className={styles.dialPartV}>{nsnPattern}</span>
            <span className={styles.dialPartL}>National number</span>
          </div>
        </div>

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
