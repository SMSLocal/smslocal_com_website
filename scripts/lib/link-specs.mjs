/**
 * Site-wide internal/external link count policy: every post should carry
 * exactly 2 internal content links and exactly 1 external content link (CTA
 * buttons like "Register Now" are separate UI elements, not counted here).
 * Most imported posts arrive scraped with far more of both — many pointing
 * at blog posts or product pages this site hasn't built yet, which render
 * as a "Coming Soon" placeholder locally even though they work on the live
 * WordPress site.
 *
 * A key absent entirely means "leave that kind of link alone" — most posts
 * already have exactly 1 external link and need no external change at all;
 * an empty array would instead mean "strip every one," which is why this
 * only lists `keepExternal` for the posts that actually need trimming.
 *
 * `keepInternal` / `keepExternal`: indices (within internal-only or
 *   external-only link order, 0-indexed, document order) to leave as real
 *   links; every other occurrence of that kind is unwrapped to plain text.
 * `remapInternal` / `remapExternal`: { index: { href, text? } } — same
 *   occurrence, new destination (used where a broken/unbuilt target's
 *   existing anchor text already fits a page this site does have, or where
 *   a confirmed-dead external URL needs a working replacement).
 * `addAfterHeading`: extra sentence(s) appended to a new paragraph right
 *   after a named heading, for posts that didn't have enough keepable links
 *   of that kind to reach the 2-internal/1-external target.
 */

export const LINK_SPECS = {
  '469-area-code': { keepInternal: [1, 2] },
  '216-area-code': { keepInternal: [1, 2], keepExternal: [0] },
  'what-does-frl-mean-in-text': { keepInternal: [0, 1] },
  'what-does-dw-mean-in-text': { keepInternal: [0, 1] },
  'exploring-the-808-area-code': { keepInternal: [0, 2] },
  '913-area-code': { keepInternal: [0, 4] },
  '22395-short-code': {
    keepInternal: [],
    remapInternal: { 2: { href: '/blog/what-does-otp-mean-in-text/' } },
    addAfterHeading: [
      {
        afterHeading: 'Common Uses of the 22395 Short Code',
        sentence: ['Per-message ', { a: '/pricing', x: false, c: ['pricing'] }, ' for a short code campaign varies by volume and use case, so it’s worth comparing plans before committing to one.'],
      },
    ],
    keepExternal: [1],
  },
  '252-area-code': { keepInternal: [2, 3], keepExternal: [0] },
  'message-blocking-is-active': {
    keepInternal: [0],
    addAfterHeading: [
      {
        afterHeading: 'What Does “Message Blocking Is Active” Mean?',
        sentence: ['If clearing the block yourself doesn’t work, ', { a: '/contact-us', x: false, c: ['contact your carrier or SMSLocal support'] }, ' directly — some blocks are applied on the account side and need to be lifted manually.'],
      },
    ],
    keepExternal: [1],
  },
  'what-does-ty-mean': {
    keepInternal: [0, 1],
    addAfterHeading: [
      {
        afterHeading: 'Different Ways to Say “Thank You” in Text: Similar Abbreviations to “TY”',
        sentence: ['For a fuller picture of how these shorthand terms evolve, ', { a: 'https://www.netlingo.com/acronyms.php', x: true, c: ['NetLingo’s internet acronym dictionary'] }, ' tracks new ones as they catch on.'],
      },
    ],
  },
  'what-does-otp-mean-in-text': { keepInternal: [0, 1] },
  'unlocking-the-770-area-code': { keepInternal: [0, 2], keepExternal: [1] },
  '626-area-code': { keepInternal: [3, 5] },
  'sms-bomber': {
    keepInternal: [3],
    addAfterHeading: [
      {
        afterHeading: 'How to Protect Yourself from SMS Bombing',
        sentence: ['Carrier-level spam filtering only goes so far — pairing it with your own number’s ', { a: '/products', x: false, c: ['messaging tools'] }, ' gives you a second layer of control.'],
      },
    ],
  },
  '971-area-code': { keepInternal: [0, 1], keepExternal: [1] },
  '385-area-code': { keepInternal: [1, 2], keepExternal: [0] },
  'what-does-ttyl-mean': { keepInternal: [0, 2] },
  'what-does-tbh-mean': {
    keepInternal: [1, 3],
    addAfterHeading: [
      {
        afterHeading: 'Wrapping Up',
        sentence: ['If TBH is new to you, ', { a: 'https://www.netlingo.com/acronyms.php', x: true, c: ['NetLingo’s internet acronym dictionary'] }, ' is a good place to look up whatever comes up next.'],
      },
    ],
  },
  'what-does-mb-mean': {
    keepInternal: [0, 2],
    addAfterHeading: [
      {
        afterHeading: 'Conclusion',
        sentence: ['For a longer list of texting shorthand like this, ', { a: 'https://www.netlingo.com/acronyms.php', x: true, c: ['NetLingo’s internet acronym dictionary'] }, ' is a reliable reference.'],
      },
    ],
  },
  'what-does-istg-mean': {
    keepInternal: [3, 4],
    addAfterHeading: [
      {
        afterHeading: 'Wrapping Up',
        sentence: ['Curious about other shorthand you run into? ', { a: 'https://www.netlingo.com/acronyms.php', x: true, c: ['NetLingo’s internet acronym dictionary'] }, ' covers most of them.'],
      },
    ],
  },
  'what-does-ig-mean': { keepInternal: [1, 2] },
  'what-does-lwk-mean-in-text': { keepInternal: [0, 2] },
  'what-does-wyll-mean': { keepInternal: [0, 2] },
  'what-does-nfs-mean-in-text': {
    keepInternal: [0, 1],
    remapExternal: { 0: { href: 'https://www.netlingo.com/acronyms.php', text: 'NetLingo’s internet acronym dictionary' } },
  },
  'what-does-wyf-mean': { keepInternal: [0, 1] },
  'what-does-wtw-mean': { keepInternal: [0, 1] },
  'what-does-ts-mean-in-text': { keepInternal: [0, 1] },
  'what-does-mk-mean': { keepInternal: [0, 1] },
  '801-area-code': { keepInternal: [0, 7] },
  'emoji-meaning-in-text': {
    keepInternal: [0, 3],
    remapExternal: { 0: { href: 'https://unicode.org/emoji/charts/full-emoji-list.html', text: 'Unicode Consortium’s full emoji list' } },
  },
  'what-does-smh-mean-in-text': { keepInternal: [0, 1] },
}

function richText(rich) {
  if (!rich) return ''
  return rich.map((n) => (typeof n === 'string' ? n : richText(n.c ?? n.b ?? n.i))).join('')
}

/** Depth-first, left-to-right walk of a rich array, mutating link nodes in place via `visit`. */
function walkRich(rich, visit) {
  if (!Array.isArray(rich)) return
  for (let i = 0; i < rich.length; i++) {
    const node = rich[i]
    if (!node || typeof node !== 'object') continue
    if (node.a) {
      const action = visit(node)
      if (action === 'unlink') {
        rich.splice(i, 1, ...node.c)
        i += node.c.length - 1
      } else if (action && action.remap) {
        node.a = action.remap.href
        if (action.remap.text) node.c = [action.remap.text]
      }
      continue
    }
    if (node.b) walkRich(node.b, visit)
    else if (node.i) walkRich(node.i, visit)
  }
}

/**
 * Applies a post's LINK_SPECS entry: unwraps every internal/external link
 * not on the keep list, remaps a few broken-but-fixable ones, and appends
 * any new link the post needed to reach exactly 2 internal / 1 external.
 * No-op for any slug without an entry.
 */
export function applyLinkCuration(slug, blocks, faqs) {
  const spec = LINK_SPECS[slug]
  if (!spec) return { blocks, faqs }

  let internalIdx = 0
  let externalIdx = 0
  const visit = (node) => {
    if (node.x) {
      const idx = externalIdx++
      if (spec.remapExternal?.[idx]) return { remap: spec.remapExternal[idx] }
      if (spec.keepExternal && !spec.keepExternal.includes(idx)) return 'unlink'
      return null
    }
    const idx = internalIdx++
    if (spec.remapInternal?.[idx]) return { remap: spec.remapInternal[idx] }
    if (spec.keepInternal && !spec.keepInternal.includes(idx)) return 'unlink'
    return null
  }

  for (const b of blocks) {
    if (b.rich) walkRich(b.rich, visit)
    if (b.items) b.items.forEach((it) => walkRich(it, visit))
    if (b.rows) b.rows.forEach((row) => row.forEach((cell) => walkRich(cell, visit)))
    if (b.head) b.head.forEach((cell) => walkRich(cell, visit))
    if (b.type === 'cta') {
      walkRich(b.heading, visit)
      walkRich(b.text, visit)
    }
  }
  for (const f of faqs) {
    if (f.rich) walkRich(f.rich, visit)
  }

  if (spec.addAfterHeading) {
    for (const add of spec.addAfterHeading) {
      const idx = blocks.findIndex((b) => /^h[234]$/.test(b.type) && b.text === add.afterHeading)
      if (idx === -1) {
        console.warn(`[link-specs] "${add.afterHeading}" not found in ${slug} — link not added`)
        continue
      }
      blocks.splice(idx + 1, 0, { type: 'p', rich: add.sentence })
    }
  }

  return { blocks, faqs }
}
