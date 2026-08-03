import styles from './CountryHubSections.module.css'

/**
 * The three information sections on the country-code hub.
 *
 * FAQ and CTA are deliberately not here — the site already has shared FAQ and
 * CTABanner components in components/sections/Sections.jsx, used by every inner
 * page in that order, and this page uses those rather than a bespoke pair.
 * FAQS lives here only because both the shared FAQ component and the FAQPage
 * schema read from it, and they must not drift apart.
 */

/* ======================================================= 1. anatomy ====== */
/**
 * Sits between the researched markets and the reference list: what the rest of
 * the page is a directory of. The parts of a real number are labelled in place
 * rather than described in prose, because the whole question is which digits
 * mean what.
 */
export function NumberAnatomy() {
  return (
    <div className={styles.anatomy}>
      <div className={styles.numberRow}>
        <span className={`${styles.part} ${styles.partPlus}`}>
          <span className={styles.digits}>+</span>
          <span className={styles.partLabel}>Exit</span>
        </span>
        <span className={`${styles.part} ${styles.partCode}`}>
          <span className={styles.digits}>91</span>
          <span className={styles.partLabel}>Country code</span>
        </span>
        <span className={`${styles.part} ${styles.partNsn}`}>
          <span className={styles.digits}>98765 43210</span>
          <span className={styles.partLabel}>National number</span>
        </span>
      </div>

      <p className={styles.anatomyNote}>
        Written together with no spaces or punctuation — <code>+919876543210</code> — that is E.164,
        the format every network and API agrees on.
      </p>

      <div className={styles.notes}>
        <div className={styles.note}>
          <span className={styles.noteKey}>The + replaces your exit code</span>
          <span className={styles.noteVal}>
            00 from most of Europe, 011 from the US, 010 from Japan. Store the + and you never have
            to know which country the message is being sent from.
          </span>
        </div>
        <div className={styles.note}>
          <span className={styles.noteKey}>Drop the trunk zero</span>
          <span className={styles.noteVal}>
            Most countries put a 0 in front of a number dialled domestically. It is not part of the
            international number: 07700 900123 becomes +447700900123, not +4407700900123.
          </span>
        </div>
        <div className={styles.note}>
          <span className={styles.noteKey}>A code is not always one country</span>
          <span className={styles.noteVal}>
            +1 covers the US, Canada and 18 Caribbean states, separated only by area code. +7 is
            shared by Russia and Kazakhstan. The code alone does not identify a country.
          </span>
        </div>
        <div className={styles.note}>
          <span className={styles.noteKey}>Length varies, deliberately</span>
          <span className={styles.noteVal}>
            One digit (+1, +7) to three (+265, +971). Shorter codes went to the largest networks of
            the 1960s, which is why they look arbitrary today.
          </span>
        </div>
      </div>
    </div>
  )
}

/* ====================================================== 2. encoding ====== */
const SAMPLE =
  'Your verification code is 4172. It expires in 10 minutes. Do not share this code with anyone, including our support team.'

/**
 * One message, measured against both segment rulers.
 *
 * Was a five-row comparison table, which is exactly the boxy repeated-row shape
 * that gets rejected on this project. This shows the actual mechanism instead:
 * the same 120 characters laid against a 160-character ruler and a 70-character
 * one, so the split — and the doubled cost — is visible rather than asserted.
 */
export function EncodingRuler() {
  const len = SAMPLE.length
  const gsmSegments = Math.ceil(len / 160)
  const uniSegments = Math.ceil(len / 70)

  return (
    <div className={styles.ruler}>
      <div className={styles.rulerMsg}>
        <span className={styles.rulerMsgLabel}>One message · {len} characters</span>
        <p className={styles.rulerMsgText}>{SAMPLE}</p>
      </div>

      <div className={styles.tracks}>
        {/* GSM-7: fits inside a single 160-character segment. */}
        <div className={styles.track}>
          <div className={styles.trackHead}>
            <span className={styles.trackName}>GSM-7</span>
            <span className={styles.trackScripts}>Latin without accents — English, Malay, Swahili, Indonesian</span>
          </div>
          <div className={styles.bar}>
            <span className={styles.fill} style={{ width: `${(len / 160) * 100}%` }} />
            <span className={styles.barCap}>160</span>
          </div>
          <div className={styles.trackFoot}>
            <span className={styles.segGood}>{gsmSegments} segment</span>
            <span className={styles.trackNote}>{160 - len} characters spare</span>
          </div>
        </div>

        {/* Unicode: the same text needs two segments at 70 characters each. */}
        <div className={styles.track}>
          <div className={styles.trackHead}>
            <span className={styles.trackName}>Unicode</span>
            <span className={styles.trackScripts}>
              Arabic, Cyrillic, Greek, Hebrew, Thai, CJK — and any accented Latin
            </span>
          </div>
          <div className={styles.bar}>
            <span className={`${styles.fill} ${styles.fillCost}`} style={{ width: '100%' }} />
            <span className={styles.split} style={{ left: `${(70 / len) * 100}%` }}>
              <span className={styles.splitLabel}>70</span>
            </span>
            <span className={styles.barCap}>{len}</span>
          </div>
          <div className={styles.trackFoot}>
            <span className={styles.segCost}>{uniSegments} segments</span>
            <span className={styles.trackNote}>billed as {uniSegments} messages</span>
          </div>
        </div>
      </div>

      <p className={styles.rulerNote}>
        Nothing about the destination changed — only the alphabet. One accented character is enough
        to move a message across this line, so <strong>{SAMPLE.length} characters costs twice as
        much</strong> in Cairo as in Nairobi. Transliterating to plain Latin is the usual fix, and
        it is worth deciding deliberately rather than discovering it on an invoice.
      </p>
    </div>
  )
}

/* ======================================================= 3. changes ====== */
/**
 * Chronological, and it must stay that way: markers are positioned along the
 * axis by year but alternate above and below it by array index. Out of order,
 * two adjacent years land on the same side and their labels overlap.
 */
const CHANGES = [
  { where: 'Guinea', when: '2016', what: 'Renumbered to nine digits.' },
  { where: 'Eswatini', when: '2018', what: 'Renamed from Swaziland. Still listed under the old name in many datasets.' },
  { where: 'Mexico', when: '2019', what: 'Dropped the 1 and 045 mobile prefixes for a uniform ten digits.' },
  { where: 'Benin', when: '2020', what: 'Eight digits to ten, following the same regional pattern.' },
  { where: 'Ivory Coast', when: '2021', what: 'Moved from eight digits to ten. Older numbers do not deliver at all.' },
  { where: 'Türkiye', when: '2022', what: 'Renamed from Turkey. Breaks name-based matching, not the numbers.' },
]

/**
 * A single timeline rather than six cards. Was a repeated-tile grid, which is
 * the shape this project consistently rejects; chronology is also the honest
 * structure here, since the point is that these keep happening.
 */
export function NumberingChanges() {
  const years = CHANGES.map((c) => Number(c.when))
  const min = Math.min(...years)
  const max = Math.max(...years)
  const at = (y) => ((Number(y) - min) / (max - min)) * 100

  return (
    <div className={styles.timeline}>
      <div className={styles.axis}>
        <span className={styles.axisLine} />
        {CHANGES.map((c, i) => (
          <span
            key={c.where}
            className={`${styles.marker} ${i % 2 ? styles.markerDown : ''}`}
            style={{ left: `${at(c.when)}%` }}
          >
            <span className={styles.dot} />
            <span className={styles.card}>
              <span className={styles.cardYear}>{c.when}</span>
              <span className={styles.cardWhere}>{c.where}</span>
              <span className={styles.cardWhat}>{c.what}</span>
            </span>
          </span>
        ))}
      </div>
      <p className={styles.timelineNote}>
        Six in seven years, and none of them announced to the people holding the old numbers. A list
        gathered before any of these still looks valid — right digit count, right prefix — and
        simply never arrives.
      </p>
    </div>
  )
}

/* =========================================================== FAQ data ==== */
/** Rendered by the shared FAQ component, and by the FAQPage schema. One source. */
export const FAQS = [
  {
    q: 'What is a country calling code?',
    a: 'A one to three digit prefix that routes an international call or message to the right national network. It comes after the + and before the national number — +44 for the United Kingdom, +91 for India, +234 for Nigeria. The ITU assigns them.',
  },
  {
    q: 'What is the difference between a country code and an area code?',
    a: 'The country code selects the country; an area code selects a region inside it. In +1 (212) 555-0100, +1 is the country code for the North American plan and 212 is the area code for part of New York. Many countries have no area codes at all in their mobile plan.',
  },
  {
    q: 'Why do some countries share the same country code?',
    a: 'The North American Numbering Plan puts the United States, Canada and 18 Caribbean nations on +1, distinguished only by area code. Russia and Kazakhstan share +7. So a country code alone does not always tell you which country a number belongs to.',
  },
  {
    q: 'Do I remove the leading zero when dialling internationally?',
    a: 'Usually yes. Most countries use a trunk prefix — normally 0 — for domestic dialling, and it is dropped in the international format. UK 07700 900123 becomes +44 7700 900123. The +1 plan has no trunk prefix, so nothing is removed there.',
  },
  {
    q: 'What is E.164 format?',
    a: 'The ITU standard for writing a phone number so it works from anywhere: a plus sign, the country code, then the national number, with no spaces, dashes or brackets, up to 15 digits. Storing numbers this way means your database does not need to know where a message is being sent from.',
  },
  {
    q: 'Does the country code change what an SMS costs?',
    a: 'The destination does, though not because of the code itself — each operator sets its own termination rate. The bigger variable is usually the alphabet: Arabic, Cyrillic, Greek, Hebrew, Thai and CJK scripts are sent as unicode, which cuts a segment from 160 characters to 70 and can double the segments a message needs.',
  },
  {
    q: 'Can I send SMS to any country code?',
    a: 'We deliver to every country listed on this page. Some markets require a sender ID to be registered or a template pre-approved before traffic passes, which affects lead time rather than reach — the researched market guides above cover where that applies.',
  },
]
