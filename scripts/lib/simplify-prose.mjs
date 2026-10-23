/**
 * Extra readability pass for the posts Semrush still flags as "Low
 * readability" after readability-fixes.mjs (heading order, paragraph length,
 * first-pass sentence splitting). It targets the two things that drive the
 * score: sentence length and word length.
 *
 *  - Sentences over MAX_WORDS are split at clause breaks. A trailing
 *    participle becomes its own sentence ("..., making it easier" ->
 *    "... This makes it easier"), and ", which <verb>" becomes "This <verb>".
 *  - A small list of long/formal words is swapped for plain ones.
 *
 * Only plain-string nodes are edited, so bold text and links are untouched.
 * Applied to FOCUS_SLUGS only: the other posts already score fine.
 */
export const FOCUS_SLUGS = new Set([
  '251-area-code',
  '410-area-code',
  '626-area-code',
  '971-area-code',
  'a2p-meaning',
  'a2p-p2p-6-transformative-insights-for-future-of-messaging',
  'automation-anywhere-api',
  'communication-how-to-send-an-sms-message',
  'exploring-the-808-area-code',
  'flextalk-a2p-svr',
  'imessage-vs-sms-which-one-dominates',
  'potential-with-automation-anywhere-api-guide',
  'send-sms-api-php',
  'texting-app',
  'unlocking-the-770-area-code',
])

const MAX_WORDS = 14
const MIN_SIDE = 4

const SWAPS = [
  [/\butili[sz]ing\b/gi, 'using'],
  [/\butili[sz]es\b/gi, 'uses'],
  [/\butili[sz]ed\b/gi, 'used'],
  [/\butili[sz]e\b/gi, 'use'],
  [/\bleveraging\b/gi, 'using'],
  [/\bleverages\b/gi, 'uses'],
  [/\bleveraged\b/gi, 'used'],
  [/\bleverage\b/gi, 'use'],
  [/\bfacilitates\b/gi, 'helps'],
  [/\bfacilitating\b/gi, 'helping'],
  [/\bfacilitate\b/gi, 'help'],
  [/\bin order to\b/gi, 'to'],
  [/\ba variety of\b/gi, 'many'],
  [/\bnumerous\b/gi, 'many'],
  [/\badditionally,/gi, 'Also,'],
  [/\bfurthermore,/gi, 'Also,'],
  [/\bmoreover,/gi, 'Also,'],
  [/\bapproximately\b/gi, 'about'],
  [/\bdemonstrates\b/gi, 'shows'],
  [/\bdemonstrate\b/gi, 'show'],
  [/\bsubsequently\b/gi, 'then'],
  [/\bregarding\b/gi, 'about'],
  [/\bindividuals\b/gi, 'people'],
  [/\bassistance\b/gi, 'help'],
  [/\bpurchase\b/gi, 'buy'],
  [/\bobtain\b/gi, 'get'],
  [/\bsufficient\b/gi, 'enough'],
  [/\bcommence\b/gi, 'start'],
  [/\bprior to\b/gi, 'before'],
  [/\bwith regard to\b/gi, 'about'],
  [/\bin addition to\b/gi, 'besides'],
  [/\bas well as\b/gi, 'and'],
]

const VERB = {
  making: 'makes', allowing: 'allows', ensuring: 'ensures', providing: 'provides', enabling: 'enables',
  helping: 'helps', leading: 'leads', giving: 'gives', offering: 'offers', reducing: 'reduces',
  improving: 'improves', increasing: 'increases', creating: 'creates', saving: 'saves', keeping: 'keeps',
}

const RULES = [
  { re: /;\s+/, lead: '' },
  { re: new RegExp(`,\\s+(?=(?:${Object.keys(VERB).join('|')})\\s)`), participle: true },
  { re: /,\s+(?=which\s+(?:is|are|can|will|helps|allows|makes|means|gives|lets)\s)/, which: true },
  // Not ", and": it also joins list items, and splitting there leaves a dangling "And ...".
  { re: /,\s+(?=but\s)/, lead: '' },
  { re: /\s[–—-]\s/, lead: '' },
]

const textOf = (n) =>
  typeof n === 'string' ? n : Array.isArray(n) ? n.map(textOf).join('') : n && typeof n === 'object' ? textOf(Object.values(n)) : ''
const wordCount = (nodes) => textOf(nodes).trim().split(/\s+/).filter(Boolean).length
const cap = (s) => s.replace(/^(\s*["“‘(]?)([a-z])/, (_, a, b) => a + b.toUpperCase())

function swapWords(s) {
  let out = s
  for (const [re, to] of SWAPS) {
    out = out.replace(re, (m) => (/^[A-Z]/.test(m) ? to.charAt(0).toUpperCase() + to.slice(1) : to))
  }
  return out
}

function toSentences(rich) {
  const sentences = []
  let cur = []
  for (const node of rich) {
    if (typeof node !== 'string') {
      cur.push(node)
      continue
    }
    let rest = node
    for (;;) {
      const m = /([.!?]["”’)]?)(\s+(?=["“‘(]?[A-Z0-9])|(?<=[a-z]{3}[.!?])(?=[A-Z][a-z]{2}))/.exec(rest)
      if (!m) break
      const end = m.index + m[1].length
      cur.push(rest.slice(0, end))
      sentences.push(cur)
      cur = []
      rest = rest.slice(end + m[2].length)
    }
    if (rest) cur.push(rest)
  }
  if (cur.length) sentences.push(cur)
  return sentences
}

function shorten(nodes) {
  if (wordCount(nodes) <= MAX_WORDS) return [nodes]
  let best = null
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (typeof node !== 'string') continue
    for (const rule of RULES) {
      const re = new RegExp(rule.re.source, 'g')
      let m
      while ((m = re.exec(node))) {
        const left = [...nodes.slice(0, i), node.slice(0, m.index)]
        let rightHead = node.slice(m.index + m[0].length)
        // "..., saving time and improving service" would become "This saves time and improving": skip -ing chains.
        if (rule.participle && /\b(?:and|or)\s+\w+ing\b/.test(rightHead)) continue
        if (rule.participle) {
          const w = /^(\w+)/.exec(rightHead)[1]
          rightHead = `This ${VERB[w.toLowerCase()]}${rightHead.slice(w.length)}`
        } else if (rule.which) {
          rightHead = `This${rightHead.slice('which'.length)}`
        }
        const right = [rightHead, ...nodes.slice(i + 1)]
        const lw = wordCount(left)
        const rw = wordCount(right)
        if (lw < MIN_SIDE || rw < MIN_SIDE) continue
        // Prefer the split that leaves the two halves most even.
        const balance = Math.abs(lw - rw)
        if (!best || balance < best.balance) best = { left, right, balance }
      }
    }
  }
  if (!best) return [nodes]
  const close = (arr) => arr.map((n, k) => (k === arr.length - 1 && typeof n === 'string' ? n.replace(/[,;\s]+$/, '').replace(/[.!?]?$/, '.') : n))
  const open = (arr) => arr.map((n, k) => (k === 0 && typeof n === 'string' ? cap(n) : n))
  return [...shorten(close(best.left)), ...shorten(open(best.right))]
}

function joinSentences(sentences) {
  const merged = []
  sentences.forEach((s, i) => {
    for (const n of i === 0 ? s : [' ', ...s]) {
      const last = merged[merged.length - 1]
      if (typeof n === 'string' && typeof last === 'string') merged[merged.length - 1] = last + n
      else merged.push(n)
    }
  })
  return merged
}

const swapRich = (rich) => rich.map((n) => (typeof n === 'string' ? swapWords(n) : n))

export function simplifyProse(slug, blocks) {
  if (!FOCUS_SLUGS.has(slug)) return blocks
  return blocks.flatMap((b) => {
    if (b.type === 'p' && b.rich) {
      const sentences = toSentences(swapRich(b.rich)).flatMap(shorten)
      // Keep paragraphs short: split again if the rewrite made one too long.
      const out = []
      let group = []
      let count = 0
      const flush = () => {
        if (group.length) out.push({ ...b, rich: joinSentences(group) })
        group = []
        count = 0
      }
      for (const s of sentences) {
        const w = wordCount(s)
        if (group.length && count + w > 55) flush()
        group.push(s)
        count += w
      }
      flush()
      return out
    }
    if ((b.type === 'ul' || b.type === 'ol') && b.items) return [{ ...b, items: b.items.map((it) => (Array.isArray(it) ? swapRich(it) : it)) }]
    return [b]
  })
}
