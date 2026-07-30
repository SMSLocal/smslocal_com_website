/**
 * One banner spec per imported post. Hand-written rather than derived from the
 * post title, because the source titles carry years, brand names and filler
 * ("Learn More Here") that the banner rules forbid.
 *
 * Rules these obey:
 *  - no brand name and no year anywhere on the artwork
 *  - short title so it can be set very large (mobile cards scale to ~35%)
 *  - `facts` add substance on the text side, `visual` carries content of its
 *    own rather than being decoration
 */

/** Soft tints of the theme palette. No dark fills — backgrounds stay pale. */
export const PALETTE = [
  { key: 'indigo', bg: '#eef2fc', ink: '#154989', accent: '#4f5bd5', soft: '#dfe5fa' },
  { key: 'rose', bg: '#fdeff6', ink: '#9d1f5f', accent: '#ec4899', soft: '#fbdcec' },
  { key: 'teal', bg: '#e9f8f5', ink: '#0f6b60', accent: '#14b8a6', soft: '#d3f0ea' },
  { key: 'violet', bg: '#f3effd', ink: '#4c3a9e', accent: '#7c5cd6', soft: '#e6ddfa' },
  { key: 'coral', bg: '#fff1f0', ink: '#a53a41', accent: '#fb7185', soft: '#fddedd' },
  { key: 'sky', bg: '#eaf5fd', ink: '#125f8a', accent: '#38a3d9', soft: '#d5eaf8' },
]

const areaCode = (code, place, facts, detail) => ({
  eyebrow: 'Area Code',
  title: `${code} Area Code`,
  desc: `Where it reaches, how to dial it, and what it means for calls and texts.`,
  facts,
  visual: { kind: 'areaCode', code, place, detail },
})

export const COVER_SPECS = {
  '216-area-code': areaCode('216', 'Cleveland, Ohio', ['Northeast Ohio', 'Eastern Time'], [
    ['Serves', 'Cleveland'],
    ['Dialling', '10 digits'],
  ]),
  '252-area-code': areaCode('252', 'North Carolina', ['Inner & Outer Banks', 'Eastern Time'], [
    ['Split from', '919'],
    ['Dialling', '10 digits'],
  ]),
  '385-area-code': areaCode('385', 'Utah', ['Overlays 801', 'Mountain Time'], [
    ['Serves', 'Salt Lake City'],
    ['Dialling', '10 digits'],
  ]),
  '469-area-code': areaCode('469', 'Northeast Texas', ['Dallas metro', 'Central Time'], [
    ['Overlays', '214 & 972'],
    ['Dialling', '10 digits'],
  ]),
  '626-area-code': areaCode('626', 'Los Angeles County', ['San Gabriel Valley', 'Pacific Time'], [
    ['Serves', 'Pasadena'],
    ['Dialling', '10 digits'],
  ]),
  '801-area-code': areaCode('801', 'Utah', ['Utah’s original code', 'Mountain Time'], [
    ['Overlaid by', '385'],
    ['Dialling', '10 digits'],
  ]),
  '913-area-code': areaCode('913', 'Kansas City', ['Northeast Kansas', 'Central Time'], [
    ['Serves', 'Kansas City'],
    ['Dialling', '10 digits'],
  ]),
  '971-area-code': areaCode('971', 'Sacramento', ['Overlay code', 'Pacific Time'], [
    ['Runs with', '916'],
    ['Dialling', '10 digits'],
  ]),
  'exploring-the-808-area-code': areaCode('808', 'Hawaii', ['Statewide code', 'Hawaii Time'], [
    ['Covers', 'All islands'],
    ['Dialling', '10 digits'],
  ]),
  'unlocking-the-770-area-code': areaCode('770', 'Atlanta Suburbs', ['Metro ring', 'Eastern Time'], [
    ['Rings', 'Atlanta'],
    ['Dialling', '10 digits'],
  ]),

  '22395-short-code': {
    eyebrow: 'Short Code',
    title: '22395 Short Code',
    desc: 'Who sends from it, what it is used for, and how to reply safely.',
    facts: ['Five-digit sender', 'Two-way capable'],
    visual: { kind: 'shortCode', code: '22395', label: 'Five-digit sender', note: 'Reply STOP to opt out' },
  },

  'message-blocking-is-active': {
    eyebrow: 'Troubleshooting',
    title: 'Message Blocking',
    desc: 'Why the error appears on your phone, and how to get texts sending again.',
    facts: ['Carrier block', 'Fixable in settings'],
    visual: { kind: 'blocked', status: 'Not delivered', note: 'Message blocking is active' },
  },
  'sms-bomber': {
    eyebrow: 'SMS Security',
    title: 'SMS Bombing',
    desc: 'How text-flooding attacks work, what they cost you, and how to stop them.',
    facts: ['Inbox flooding', 'Report & block'],
    visual: { kind: 'flood', count: '1,284', label: 'texts in minutes' },
  },
  'emoji-meaning-in-text': {
    eyebrow: 'Text Meanings',
    title: 'Emoji Meanings',
    desc: 'What the most-used emoji actually signal, and how tone changes by context.',
    facts: ['230+ entries', 'Tone by context'],
    visual: { kind: 'emoji', labels: ['Warm', 'Flat', 'Unsure'] },
  },
  'how-to-send-a-system-generated-sms': {
    eyebrow: 'SMS API',
    title: 'Automated SMS',
    desc: 'How an SMS API sends system-generated texts with no manual sending.',
    facts: ['Triggered by code', 'No manual login'],
    visual: { kind: 'automation', from: 'Your app', to: 'Delivered' },
  },
}

/** Acronym posts share one shape: the term, and what it stands for. */
const ACRONYMS = [
  ['what-does-dw-mean-in-text', 'DW', 'Don’t Worry', 'Reassuring a friend', ['Casual tone', 'Reply-friendly']],
  ['what-does-frl-mean-in-text', 'FRL', 'For Real', 'Agreeing emphatically', ['Casual tone', 'Used everywhere']],
  ['what-does-ig-mean', 'IG', 'I Guess / Instagram', 'Two very different reads', ['Context decides', 'Very common']],
  ['what-does-istg-mean', 'ISTG', 'I Swear To God', 'Stressing you mean it', ['Strong emphasis', 'Often joking']],
  ['what-does-lwk-mean-in-text', 'LWK', 'Lowkey', 'Saying it quietly', ['Softens a take', 'Chat & social']],
  ['what-does-mb-mean', 'MB', 'My Bad', 'Owning a small mistake', ['Also megabytes', 'Quick apology']],
  ['what-does-mk-mean', 'MK', 'Mmm, Okay', 'Reluctant agreement', ['Easily misread', 'Tone matters']],
  ['what-does-nfs-mean-in-text', 'NFS', 'Not For Sale', 'Or “not for sure”', ['Multiple reads', 'Listings & chat']],
  ['what-does-otp-mean-in-text', 'OTP', 'One-Time Password', 'Also “one true pairing”', ['Security code', 'Fandom slang']],
  ['what-does-smh-mean-in-text', 'SMH', 'Shaking My Head', 'Disbelief, in two words', ['Mild eye-roll', 'Very common']],
  ['what-does-tbh-mean', 'TBH', 'To Be Honest', 'Prefacing a frank take', ['Softens honesty', 'Chat & social']],
  ['what-does-ts-mean-in-text', 'TS', 'This Stuff', 'And ten more readings', ['Highly variable', 'Context decides']],
  ['what-does-ttyl-mean', 'TTYL', 'Talk To You Later', 'Ending without ending', ['Friendly sign-off', 'Still in use']],
  ['what-does-ty-mean', 'TY', 'Thank You', 'The two-letter thanks', ['Quick gratitude', 'Reply: NP']],
  ['what-does-wtw-mean', 'WTW', 'What’s The Word', 'Opening a conversation', ['Greeting', 'Expects a reply']],
  ['what-does-wyf-mean', 'WYF', 'Where You From', 'Or “what you feeling”', ['Two readings', 'Context decides']],
  ['what-does-wyll-mean', 'WYLL', 'What You Look Like', 'Asking for a photo', ['Dating apps', 'Answer with care']],
]

for (const [slug, term, expansion, gloss, facts] of ACRONYMS) {
  COVER_SPECS[slug] = {
    eyebrow: 'Text Slang',
    title: `${term} Meaning`,
    desc: `What ${term} stands for, when people use it, and how to reply naturally.`,
    facts,
    visual: { kind: 'acronym', term, expansion, gloss },
  }
}

/**
 * Ten banner compositions, each a different structure rather than a restyle of
 * the last. Implemented in ../gen-blog-covers.mjs.
 *
 *   split    text column left, tall artifact card right
 *   stack    full-width headline, wide artifact strip beneath
 *   mirror   artifact card left, right-aligned text column right
 *   corner   oversized headline, small square artifact in the bottom corner
 *   centred  everything centre-aligned, inline pill row, no card
 *   panel    tall tinted portrait panel right, text left
 *   ghost    oversized pale value behind the text, solid value chip
 *   ticket   notched horizontal card: value stub + perforation + details
 *   thread   text left, chat bubbles cascading down the right
 *   poster   editorial — huge value over a full-width rule, headline below
 *
 * Membership is fixed here rather than computed, because the assignment also
 * satisfies a listing-page constraint: sorted newest-first, no two adjacent
 * cards may share a layout. gen-blog-covers.mjs re-checks that on every run.
 */
const LAYOUT_MEMBERS = {
  split: ['216-area-code', '913-area-code', 'sms-bomber', 'what-does-wyll-mean', 'how-to-send-a-system-generated-sms'],
  stack: ['469-area-code', 'exploring-the-808-area-code', 'unlocking-the-770-area-code', '385-area-code', '22395-short-code'],
  mirror: ['626-area-code', 'what-does-ig-mean', 'what-does-mk-mean'],
  corner: ['what-does-frl-mean-in-text', 'what-does-istg-mean', 'what-does-wtw-mean'],
  centred: ['what-does-otp-mean-in-text', 'what-does-lwk-mean-in-text', 'what-does-ts-mean-in-text'],
  panel: ['message-blocking-is-active', '971-area-code', 'what-does-wyf-mean'],
  ghost: ['252-area-code', 'what-does-ttyl-mean', 'emoji-meaning-in-text'],
  ticket: ['what-does-ty-mean', 'what-does-mb-mean', 'what-does-nfs-mean-in-text'],
  thread: ['what-does-dw-mean-in-text', 'what-does-tbh-mean', '801-area-code'],
  poster: ['what-does-smh-mean-in-text'],
}

export const LAYOUTS = Object.keys(LAYOUT_MEMBERS)

const LAYOUT_BY_SLUG = Object.fromEntries(
  Object.entries(LAYOUT_MEMBERS).flatMap(([layout, slugs]) => slugs.map((s) => [s, layout])),
)

export function layoutFor(slug) {
  return LAYOUT_BY_SLUG[slug] ?? 'split'
}

/**
 * Normalises any spec into the fields every layout draws from, so a new
 * composition works for every post without branching on topic. `icon` replaces
 * `big` where a mark reads better than a word.
 */
export function contentModel(spec) {
  const v = spec.visual
  switch (v.kind) {
    case 'acronym':
      return {
        big: v.term,
        lead: v.expansion,
        note: v.gloss,
        stats: [['Stands for', v.expansion], ['Used for', v.gloss]],
      }
    case 'areaCode':
      return {
        big: `(${v.code})`,
        lead: v.place,
        note: 'One code for calls and texts',
        stats: v.detail,
      }
    case 'shortCode':
      return {
        big: v.code,
        lead: v.label,
        note: v.note,
        stats: [['Sender type', v.label], ['Opt out', 'Reply STOP']],
      }
    case 'blocked':
      return {
        big: 'Blocked',
        icon: 'ban',
        lead: v.status,
        note: v.note,
        stats: [['Status', v.status], ['Cause', 'Carrier or device']],
      }
    case 'emoji':
      return {
        big: '230+',
        icon: 'faces',
        lead: 'Three tones, one phrase',
        note: 'Context sets the meaning',
        stats: [['Entries', '230+'], ['Depends on', 'Context']],
      }
    case 'flood':
      return {
        big: v.count,
        lead: v.label,
        note: 'One number, endless pings',
        stats: [['Volume', v.count], ['Window', 'Minutes']],
      }
    case 'automation':
      return {
        big: 'API',
        lead: v.to,
        note: 'No manual sending',
        stats: [['Trigger', v.from], ['Result', v.to]],
      }
    default:
      return { big: '', lead: '', note: '', stats: [] }
  }
}

/**
 * Colourway per post, indexed *within* its layout group and offset by the
 * group. Every group is smaller than the palette, so no two posts sharing a
 * layout can also share a colour — otherwise two same-layout, same-topic
 * banners come out near-identical.
 */
export function paletteFor(slug) {
  const layout = layoutFor(slug)
  const group = LAYOUT_MEMBERS[layout] ?? []
  const within = Math.max(0, group.indexOf(slug))
  return PALETTE[(within + LAYOUTS.indexOf(layout)) % PALETTE.length]
}

/** Where gen-blog-covers.mjs writes each banner. */
export function coverPath(slug) {
  return `/blog/${slug}/cover.svg`
}
