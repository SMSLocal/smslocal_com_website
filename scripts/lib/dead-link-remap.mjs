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
const SAME_SITE = /^https?:\/\/(www\.)?smslocal\.com(\/|$)/i

export function applyDeadLinkFixes(value) {
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
    return out
  }
  return walk(value)
}
