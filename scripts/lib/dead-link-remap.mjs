/**
 * Absolute smslocal.com links that survived in post bodies (scraped from the
 * old WordPress site). Same-site links should be local paths, and several of
 * these targets were never rebuilt here, so they 404 live (Semrush "broken
 * internal links"). DEAD maps each dead path to the closest page that exists.
 * Everything else on smslocal.com is just made relative.
 */
const DEAD = {
  '/blog/rcs-vs-sms': '/products/channels/rcs/',
  '/blog/what-is-sms-otp': '/blog/what-does-otp-mean-in-text/',
  '/testimonial': '/resources/case-studies/',
  '/campaigns': '/products/channels/rcs/',
  '/resources/insights/how-does-a2p-messaging-work': '/blog/a2p-meaning/',
  '/about-us/author': '/about-us/',
  '/resources/insights/how-and-when-do-i-need-to-register-a-sender-id': '/products/cpaas/sms-api/',
  '/resources/insights/difference-between-a2p-and-p2p-sms-messaging': '/blog/a2p-meaning/',
  '/resources/insights/how-to-sign-up-to-bulksms': '/signup/',
  '/resources/insights/how-to-send-sms-from-your-website': '/products/cpaas/sms-api/',
  '/resources/insights/promotional-vs-transactional-texts': '/blog/transactional-sms/',
  '/resources/insights/how-to-send-an-sms-with-a-company-name': '/blog/a2p-messaging/',
}
/**
 * Better-fitting targets for specific anchors, keyed `slug|anchor text`. Only
 * applied to a link that currently sits on one of the stand-in targets above,
 * so a genuine link the author chose is never overridden.
 */
const BY_ANCHOR = {
  'receive-sms-online|SMS online': '/tools/text-free/',
  'best-sms-apis|send and receive text messages': '/products/cpaas/sms-api/',
  'google-voice-bulk-texter|bulk SMS': '/products/channels/sms-broadcasting/',
  'send-sms-through-php|authorized': '/developers/api-reference/',
  'send-bulk-text-messages-from-computer|benefits of using bulk SMS': '/blog/text-messaging-benefits/',
  'creative-sms-marketing-ideas-for-businesses-texting-your-way-to-success|text messages to communicate promotional': '/solutions/use-case/promotions-campaigns/',
  'creative-sms-marketing-ideas-for-businesses-texting-your-way-to-success|SMS messages are a great way to send': '/blog/sms-marketing/',
  'text-message-forwarding-with-our-easy-guide|SMS marketing messages': '/blog/sms-marketing/',
  'send-sms-messages-on-ipad|Send SMS Messages on an iPad': '/tools/send-text/',
  'send-sms-via-php|Bulk SMS': '/products/channels/sms-broadcasting/',
  'communication-how-to-send-an-sms-message|solution for sending SMS': '/products/channels/sms-broadcasting/',
  'transactional-sms|OTPs': '/solutions/use-case/otp-authentication/',
}
const STAND_INS = new Set(Object.values(DEAD))
const plain = (r) => (typeof r === 'string' ? r : Array.isArray(r) ? r.map(plain).join('') : r && typeof r === 'object' ? plain(Object.values(r)) : '')
const SAME_SITE = /^https?:\/\/(www\.)?smslocal\.com(\/|$)/i

export function applyDeadLinkFixes(value, slug = '') {
  const walk = (node) => {
    if (Array.isArray(node)) return node.map(walk)
    if (!node || typeof node !== 'object') return node
    const out = {}
    for (const [k, v] of Object.entries(node)) out[k] = k === 'a' || k === 'buttonHref' ? v : walk(v)
    // Relative links to the same dead pages (the importer already localised them).
    if (typeof out.a === 'string' && out.a.startsWith('/')) {
      const key = out.a.split(/[?#]/)[0].replace(/\/$/, '')
      if (DEAD[key]) out.a = DEAD[key]
    }
    if (typeof out.a === 'string' && SAME_SITE.test(out.a)) {
      const u = new URL(out.a)
      const key = u.pathname.replace(/\/$/, '')
      out.a = DEAD[key] ?? u.pathname + u.search + u.hash
      out.x = false
    }
    const better = BY_ANCHOR[`${slug}|${plain(out.c)}`]
    if (better && STAND_INS.has(out.a)) out.a = better
    return out
  }
  return walk(value)
}
