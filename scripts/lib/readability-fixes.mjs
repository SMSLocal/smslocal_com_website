/**
 * Structural SEO/readability fixes applied to every post body (Semrush
 * "Poor heading hierarchy", "Paragraphs are too long", "Low readability").
 *
 * - Headings: the page renders the title as the H1, so the body must start at
 *   H2 and never skip a level (h2 -> h4). A heading that jumps is pulled up to
 *   one level below the previous heading.
 * - Paragraphs: anything over MAX_PARA_WORDS is split on sentence boundaries.
 * - Sentences: sentences over MAX_SENTENCE_WORDS are split at a semicolon or
 *   a ", and / but / so / which" clause break so the average sentence shrinks.
 *
 * Only plain-string nodes are ever split; bold/link nodes ({b}, {a}) are kept
 * intact so formatting and links survive.
 */
const MAX_PARA_WORDS = 70
const MAX_SENTENCE_WORDS = 24
const TARGET_PARA_WORDS = 55

const PARTICIPLE = {
  making: 'makes', allowing: 'allows', ensuring: 'ensures', providing: 'provides', enabling: 'enables',
  helping: 'helps', leading: 'leads', giving: 'gives', offering: 'offers', reducing: 'reduces',
  improving: 'improves', increasing: 'increases', creating: 'creates', saving: 'saves', keeping: 'keeps',
}

const textOf = (n) =>
  typeof n === 'string' ? n : Array.isArray(n) ? n.map(textOf).join('') : n && typeof n === 'object' ? textOf(Object.values(n)) : ''
const wordCount = (nodes) => textOf(nodes).trim().split(/\s+/).filter(Boolean).length

/** Split a rich array into sentence units, breaking only inside string nodes. */
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
      // Also catches sentences glued together with no space ("recipient.Keep").
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

const cap = (s) => s.replace(/^(\s*["“‘(]?)([a-z])/, (_, a, b) => a + b.toUpperCase())

/** Break one over-long sentence at clause boundaries found in string nodes. */
function shortenSentence(nodes) {
  if (wordCount(nodes) <= MAX_SENTENCE_WORDS) return [nodes]
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (typeof node !== 'string') continue
    // Only breaks that leave two real sentences. ", and" is deliberately not
    // here: it also joins list items ("technology, strategy, and demand"), and
    // splitting there leaves a dangling "And ...". ", which" / ", while" /
    // ", because" fragments are likewise avoided; a participle or "which"
    // clause is turned into "This <verb> ...".
    const re = new RegExp(`(;\\s+|,\\s+(?=but\\s)|,\\s+(?=(?:${Object.keys(PARTICIPLE).join('|')})\\s)|,\\s+(?=which\\s+(?:is|are|can|will|helps|allows|makes|means|gives|lets)\\s))`, 'g')
    let m
    while ((m = re.exec(node))) {
      const left = [...nodes.slice(0, i), node.slice(0, m.index)]
      let rightHead = node.slice(m.index + m[0].length)
      const first = /^(\w+)/.exec(rightHead)?.[1]?.toLowerCase()
      // "..., saving time and improving service" would become "This saves time and improving": skip parallel -ing chains.
      if (first && PARTICIPLE[first] && /(?:and|or)s+w+ing/.test(rightHead)) continue
      if (first && PARTICIPLE[first]) rightHead = `This ${PARTICIPLE[first]}${rightHead.slice(first.length)}`
      else if (first === 'which') rightHead = `This${rightHead.slice('which'.length)}`
      const right = [rightHead, ...nodes.slice(i + 1)]
      const lw = wordCount(left)
      const rw = wordCount(right)
      if (lw < 7 || rw < 7) continue
      const closed = left.map((n, k) => (k === left.length - 1 && typeof n === 'string' ? n.replace(/[,;\s]+$/, '') + '.' : n))
      const opened = right.map((n, k) => (k === 0 && typeof n === 'string' ? cap(n) : n))
      return [...shortenSentence(closed), ...shortenSentence(opened)]
    }
  }
  return [nodes]
}

function fixParagraph(block) {
  const rich = block.rich ?? (block.text ? [block.text] : null)
  if (!rich) return [block]
  const sentences = toSentences(rich).flatMap(shortenSentence)
  const out = []
  let group = []
  let count = 0
  const flush = () => {
    if (!group.length) return
    const merged = []
    group.forEach((s, i) => {
      const parts = i === 0 ? s : [' ', ...s]
      for (const n of parts) {
        const last = merged[merged.length - 1]
        if (typeof n === 'string' && typeof last === 'string') merged[merged.length - 1] = last + n
        else merged.push(n)
      }
    })
    out.push({ ...block, rich: merged })
    group = []
    count = 0
  }
  const total = wordCount(rich)
  for (const s of sentences) {
    const w = wordCount(s)
    if (total > MAX_PARA_WORDS && group.length && count + w > TARGET_PARA_WORDS) flush()
    group.push(s)
    count += w
  }
  flush()
  return out.length ? out : [block]
}

function fixHeadings(blocks) {
  let prev = 1
  return blocks.map((b) => {
    const m = /^h(\d)$/.exec(b.type)
    if (!m) return b
    let level = +m[1]
    if (level > prev + 1) level = prev + 1
    if (level < 2) level = 2
    prev = level
    return level === +m[1] ? b : { ...b, type: `h${level}` }
  })
}

export function applyReadabilityFixes(blocks) {
  return fixHeadings(blocks).flatMap((b) => (b.type === 'p' ? fixParagraph(b) : [b]))
}
