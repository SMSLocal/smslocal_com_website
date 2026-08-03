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
const COST_CARDS = [
  {
    stat: '160',
    unit: 'characters',
    title: 'GSM-7',
    body: 'The default alphabet. Plain Latin with no accents — English, Malay, Swahili, Indonesian — fits 160 characters in one billable segment.',
  },
  {
    stat: '70',
    unit: 'characters',
    title: 'Unicode',
    body: 'Arabic, Cyrillic, Greek, Hebrew, Thai and CJK have no GSM-7 equivalent, so a segment drops to 70 characters. The same message can cost twice as much.',
    cost: true,
  },
  {
    stat: '1',
    unit: 'character',
    title: 'That is all it takes',
    body: 'A single é, ñ, ł or ș tips an entire message from GSM-7 to unicode. Transliterating to plain Latin is the usual fix — decide it deliberately, not on an invoice.',
    cost: true,
  },
  {
    stat: '~7',
    unit: 'characters lost',
    title: 'Long messages',
    body: 'Past one segment, each part carries a header so handsets can reassemble them. That leaves 153 usable characters per part on GSM-7, and 67 on unicode.',
  },
]

/**
 * Four cards. Deliberately the plain shape — the earlier comparison table and
 * segment-ruler artifact were both rejected here, and the content is four
 * discrete facts rather than one thing worth diagramming.
 */
export function EncodingCards() {
  return (
    <div className={styles.costCards}>
      {COST_CARDS.map((c) => (
        <div className={styles.costCard} key={c.title}>
          <span className={`${styles.costStat} ${c.cost ? styles.costStatWarn : ''}`}>
            {c.stat}
            <span className={styles.costUnit}>{c.unit}</span>
          </span>
          <span className={styles.costTitle}>{c.title}</span>
          <span className={styles.costBody}>{c.body}</span>
        </div>
      ))}
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
 * Plain cards, matching the cost section above.
 *
 * This was an absolutely-positioned timeline: markers placed along an axis by
 * year, alternating above and below it. It measured as non-overlapping but
 * looked broken — the alternation did not read, and the fixed axis height left
 * a large empty band above the cards. Absolute positioning against a
 * percentage axis is not worth it for six items.
 */
export function NumberingChanges() {
  return (
    <>
      <div className={`${styles.costCards} ${styles.changeCards}`}>
        {CHANGES.map((c) => (
          <div className={styles.costCard} key={c.where}>
            <span className={`${styles.costStat} ${styles.costStatWarn}`}>{c.when}</span>
            <span className={styles.costTitle}>{c.where}</span>
            <span className={styles.costBody}>{c.what}</span>
          </div>
        ))}
      </div>
      <p className={styles.changesNote}>
        Six in seven years, and none announced to the people holding the old numbers. A list
        gathered before any of them still looks valid — right digit count, right prefix — and simply
        never arrives.
      </p>
    </>
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
