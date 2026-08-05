import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '../../components/Seo.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { SITE_ORIGIN } from '../../components/Canonical.jsx'
import { CTABanner } from '../../components/sections/Sections.jsx'
import { getCountry, relatedCountries, variantOf, fmt, allCountries } from '../../lib/countries.js'
import CountryHeroVisual from './CountryHeroVisual.jsx'
import CountryDirectory from './CountryDirectory.jsx'
import styles from './CountryCode.module.css'

// Every generated country gets a page (GENERIC.* fills the unresearched
// ones), so the directory below links through for all 195, same as the hub.
const PUBLISHED = new Set(allCountries.map((c) => c.slug))

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
  // Industry-standard facts about how sender IDs work in general — true
  // everywhere, not a claim about this specific market — so unresearched
  // pages have something concrete to show instead of just the paragraph above.
  idTypes: [
    { label: 'Alphanumeric ID', value: 'Your brand name instead of a number, typically up to 11 characters, where the network allows it.' },
    { label: 'Numeric ID', value: 'A long code or short code — falls back to this wherever alphanumeric isn’t supported.' },
    { label: 'Approval time', value: 'Same-day to a few business days, depending on the operator and ID type.' },
  ],
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
// Auto-advancing card carousel for the "what this market requires" rules.
// One rule per slide, but each slide carries an eyebrow + the rule text +
// an honest platform note (true for every market, not a per-country claim)
// so a single slide doesn't read as one bare line. Autoplay restarts on
// every index change — including manual arrow clicks — so a manual nudge
// buys a fresh 5s window instead of jumping again immediately.
function RulesCarousel({ rules, countryName }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % rules.length), 5000)
    return () => clearInterval(id)
  }, [index, rules.length, paused])

  const go = (delta) => setIndex((i) => (i + delta + rules.length) % rules.length)

  return (
    <div
      className={styles.rulesCarousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Visible slides are decorative duplicates of this — screen readers get
          one clean announcement per change instead of reading all four slides
          in document order regardless of which is on screen. */}
      <p className={styles.srOnly} aria-live="polite">
        Requirement {index + 1} of {rules.length}: {rules[index]}
      </p>
      <div className={styles.rulesViewport}>
        <div className={styles.rulesTrack} style={{ transform: `translateX(-${index * 100}%)` }}>
          {rules.map((r, i) => (
            <div className={styles.ruleSlide} key={r} aria-hidden={i !== index}>
              <span className={styles.ruleN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.ruleBody}>
                <div className={styles.ruleEyebrow}>Requirement {i + 1} of {rules.length}</div>
                <p className={styles.ruleT}>{r}</p>
                <p className={styles.ruleSub}>
                  Checked automatically on every message we send to {countryName} — nothing for you to
                  track by hand.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.rulesNav}>
        <button type="button" className={styles.rulesArrow} onClick={() => go(-1)} aria-label="Previous requirement">
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
            <path d="M8 1.5 1.5 7.5 8 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className={styles.rulesDots}>
          {rules.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.rulesDot} ${i === index ? styles.rulesDotActive : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to requirement ${i + 1}`}
            />
          ))}
        </div>
        <button type="button" className={styles.rulesArrow} onClick={() => go(1)} aria-label="Next requirement">
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
            <path d="M1 1.5 7.5 7.5 1 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// One honest, general sentence per use case — keyed off words that already
// appear in the use-case phrase itself (OTP, delivery, appointment, bank...),
// never a per-country claim. Every research phrase in countryContent.js
// matches one of these; anything that doesn't falls through to the default.
function describeUseCase(text) {
  const t = text.toLowerCase()
  if (/otp|verification|authentication|2fa|two-factor/.test(t)) {
    return 'Time-critical — it has to land in seconds, which is the reason SMS still wins here over push or email.'
  }
  if (/delivery|order|logistics|shipping/.test(t)) {
    return "Keeps the recipient's attention without needing an app open, for the moment they actually care about the update."
  }
  if (/appointment|reminder|booking|service/.test(t)) {
    return 'Cuts no-shows more effectively than email — most people notice a text within minutes of it arriving.'
  }
  if (/bank|payment|financial|transaction|alert|insurance|wallet|remittance|pix|bkash|m-pesa/.test(t)) {
    return 'Sent the instant the triggering event happens — trusted for anything time-sensitive tied to money.'
  }
  if (/promotion|marketing|retail|campaign|loyalty|hospitality/.test(t)) {
    return 'Needs clear consent and a working opt-out — the requirements above apply directly to this traffic.'
  }
  if (/government|utility|public|municipal|emergency|weather/.test(t)) {
    return 'Typically exempt from marketing consent rules, but still expected to identify the sender clearly.'
  }
  return 'One of the use cases we see repeatedly in this market — SMS still outperforms other channels for anything that needs to be read quickly.'
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

              {/* Unresearched markets get this instead of the researched
                  page's format/operators detail — general facts about how
                  sender IDs work rather than a claim about {c.name} itself. */}
              {!c.senderId && (
                <div className={styles.senderChecklist}>
                  {GENERIC.idTypes.map((t) => (
                    <div key={t.label}>
                      <div className={styles.senderChecklistLabel}>{t.label}</div>
                      <div className={styles.senderChecklistValue}>{t.value}</div>
                    </div>
                  ))}
                </div>
              )}
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
            {/* Lead the sentence with the phrase as written rather than
                forcing lowercase — several entries carry acronyms (OTP, NHS)
                that .toLowerCase() would mangle. Falls back to GENERIC.useCases
                (universal SMS use cases, not a country-specific claim) so
                unresearched markets aren't left with a half-empty panel. */}
            <p className={styles.senderPlain}>
              What people send most: {(c.useCases ?? GENERIC.useCases).join(' · ')}.
            </p>
            {/* A universal SMS-technical fact (segment length), not a claim
                about {c.name} — genuinely useful and not said anywhere else
                on the page, so it earns its place rather than padding. */}
            <p className={styles.senderPlain}>
              Message length: under the standard SMS encoding, a segment typically holds 160
              GSM-7 characters, or 70 once a message uses Unicode — Arabic, Chinese, Cyrillic,
              emoji. Longer messages split into several segments automatically and are billed per
              segment; exact limits are confirmed for {c.name} as part of onboarding.
            </p>
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
        {/* Auto-advancing carousel, keyed by slug so the slide index resets
            when navigating between country pages. */}
        <RulesCarousel key={c.slug} rules={rulesList} countryName={c.name} />
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
          // Not a card grid — three bordered tiles side by side is the same
          // "repeated boxes" shape as the ring+panel version it replaced,
          // just three of them instead of one. This is one unboxed artifact:
          // a connecting line with three annotated stops on it, the same
          // no-card construction as the requirements carousel's numerals and
          // the sender-ID panel's plain text. Content is platform behaviour
          // already stated in this page's own CTA ("direct routes,
          // per-operator delivery reporting"), not a claim about {c.name}.
          <div className={styles.routeFlow}>
            <div className={styles.routeFlowLine} aria-hidden="true" />
            <div className={styles.routeStep}>
              <span className={styles.routeStepDot} aria-hidden="true">
                <img
                  className={styles.routeStepFlag}
                  src={`/flags/${c.iso2.toLowerCase()}.svg`}
                  alt=""
                  width="20"
                  height="15"
                />
              </span>
              <h3>Full network coverage</h3>
              <p>
                Routes provision automatically to every licensed operator serving {c.name} — no
                operator list for you to maintain.
              </p>
            </div>
            <div className={styles.routeStep}>
              <span className={styles.routeStepDot} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" />
                </svg>
              </span>
              <h3>One route per message</h3>
              <p>
                Each send is evaluated in real time and placed on the best-performing path
                available at that moment.
              </p>
            </div>
            <div className={styles.routeStep}>
              <span className={styles.routeStepDot} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <h3>Delivery reporting either way</h3>
              <p>
                Per-message delivery status, the same whether an operator is named on this page or
                not.
              </p>
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
        {/* Neither a card grid nor a stacked row list — one artifact: a
            message thread down the left, each bubble a real use case, with
            an annotation leader-line running out to the explanation on the
            right. Same "phone" visual language as the sender-ID section
            above, applied here instead of a third construction on the
            page. */}
        <div className={styles.stream}>
          {useCasesList.map((u, i) => (
            <div className={styles.streamRow} key={u}>
              <div className={styles.streamMsg}>
                <span className={styles.streamAvatar} aria-hidden="true">S</span>
                <div className={styles.streamBubble}>{u}</div>
              </div>
              <span className={styles.streamLine} aria-hidden="true" />
              <p className={styles.streamNote}>{describeUseCase(u)}</p>
              {/* Fills the space the note's max-width leaves on wide
                  screens — the same oversized outline numeral used in the
                  requirements section, so it reads as this page's shared
                  mark rather than an empty margin. */}
              <span className={styles.streamN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
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
          {/* Only the literal dial string belongs in <code>. The fallback
              wording is prose, and the translator skips everything inside
              <code> — correctly, since translating a code sample would break
              it. With the prose in there too, "followed by the national
              number" stayed English on all 195 country pages in all 19
              languages. Rendering is unchanged: .dialLine carries the styling
              <code> used to, and code inherits it. */}
          <p className={styles.dialLine}>
            <code>{c.dial}</code> —{' '}
            {c.format ? (
              <code>{c.format}</code>
            ) : (
              <>{c.dial} followed by the national number</>
            )}
          </p>
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

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>Reference</div>
          <h2 className={styles.h2}>All country calling codes</h2>
          <p className={styles.sub}>
            Looking for a different country? Pick a continent, or search by name, code or ISO —
            no need to go back to the directory page.
          </p>
          <CountryDirectory countries={allCountries} published={PUBLISHED} defaultRegion={c.region} />
        </div>
      </section>

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

      {/* The shared closing CTA every other page uses, rather than this
          page's own near-copy of it — that one had drifted (no badge, plain
          buttons, different glow), so country pages ended on a block that
          didn't match the rest of the site. Copy stays country-specific. */}
      <CTABanner
        title={`Start sending to ${c.name}`}
        subtitle={`Direct routes, per-operator delivery reporting and sender ID handling for ${c.dial} — from one dashboard or one API call.`}
        cta={{ label: 'Create free account', href: '/signup/' }}
        secondaryCta={{ label: `See ${c.name} pricing`, href: '/pricing/' }}
      />
    </div>
  )
}

export default CountryCode
