/**
 * A tiny forgiving HTML parser — just enough to walk the well-formed
 * WordPress/Elementor markup we import in scripts/transform-smslocal-blogs.mjs.
 * Not a general-purpose parser: no namespaces, no error recovery beyond
 * auto-closing the implied tags listed below.
 */

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])
const RAW = new Set(['script', 'style'])

/** Tags that implicitly close an open sibling when encountered. */
const IMPLIED_CLOSE = {
  li: new Set(['li']),
  p: new Set(['p']),
  td: new Set(['td', 'th']),
  th: new Set(['td', 'th']),
  tr: new Set(['tr']),
  option: new Set(['option']),
}

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  hellip: '…', mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘',
  rdquo: '”', ldquo: '“', trade: '™', copy: '©', reg: '®', deg: '°',
  eacute: 'é', middot: '·', bull: '•', prime: '′', Prime: '″',
}

export function decodeEntities(s) {
  return String(s)
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => ENTITIES[name] ?? m)
}

function parseAttrs(raw) {
  const attrs = {}
  for (const m of raw.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    const name = m[1].toLowerCase()
    if (name in attrs) continue
    attrs[name] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? '')
  }
  return attrs
}

/**
 * Parses `html` into a tree of `{ type: 'el', tag, attrs, children }` and
 * `{ type: 'text', text }` nodes. Returns the root node list.
 */
export function parseHtml(html) {
  const root = { type: 'el', tag: '#root', attrs: {}, children: [] }
  const stack = [root]
  const top = () => stack[stack.length - 1]

  const tagRe = /<(!--[\s\S]*?--|!\[CDATA\[[\s\S]*?\]\]|!DOCTYPE[^>]*|\/?[a-zA-Z][-a-zA-Z0-9]*(?:\s[^>]*?)?)\/?>/g
  let cursor = 0
  let m

  while ((m = tagRe.exec(html)) !== null) {
    if (m.index > cursor) {
      const text = html.slice(cursor, m.index)
      if (text) top().children.push({ type: 'text', text: decodeEntities(text) })
    }
    cursor = m.index + m[0].length

    const inner = m[1]
    if (inner.startsWith('!')) continue // comment / doctype / cdata

    if (inner.startsWith('/')) {
      const tag = inner.slice(1).trim().toLowerCase()
      // Unwind to the nearest matching open tag; ignore strays.
      const at = stack.findLastIndex((n) => n.tag === tag)
      if (at > 0) stack.length = at
      continue
    }

    const sp = inner.search(/[\s/]/)
    const tag = (sp === -1 ? inner : inner.slice(0, sp)).toLowerCase()
    const attrs = parseAttrs(sp === -1 ? '' : inner.slice(sp))
    const node = { type: 'el', tag, attrs, children: [] }

    const closes = IMPLIED_CLOSE[tag]
    if (closes) {
      const at = stack.findLastIndex((n) => closes.has(n.tag))
      if (at > 0) stack.length = at
    }

    top().children.push(node)

    if (VOID.has(tag) || m[0].endsWith('/>')) continue

    if (RAW.has(tag)) {
      const end = html.toLowerCase().indexOf(`</${tag}>`, cursor)
      const stop = end === -1 ? html.length : end
      node.children.push({ type: 'text', text: html.slice(cursor, stop) })
      cursor = stop + tag.length + 3
      tagRe.lastIndex = cursor
      continue
    }

    stack.push(node)
  }

  if (cursor < html.length) {
    const text = html.slice(cursor)
    if (text.trim()) top().children.push({ type: 'text', text: decodeEntities(text) })
  }

  return root.children
}

/** Flattens a node (or node list) to its visible text. */
export function textOf(node) {
  const nodes = Array.isArray(node) ? node : [node]
  let out = ''
  for (const n of nodes) {
    if (n.type === 'text') out += n.text
    else if (n.type === 'el' && !RAW.has(n.tag)) out += textOf(n.children)
  }
  return out
}

export function hasClass(node, name) {
  return String(node.attrs?.class ?? '').split(/\s+/).includes(name)
}

/** Depth-first walk yielding every element node. */
export function* walk(nodes) {
  for (const n of nodes) {
    if (n.type !== 'el') continue
    yield n
    yield* walk(n.children)
  }
}
