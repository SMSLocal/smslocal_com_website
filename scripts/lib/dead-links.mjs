/**
 * Internal URLs that 404 on the live site: legacy WordPress paths (old
 * product/feature pages, /resources/insights/* articles, tools, regulation
 * pages) that the scraped blog posts still link to. Taken from the
 * smslocal.com internal-broken-links crawl of 2026-10-08.
 *
 * transform-smslocal-blogs.mjs runs stripDeadLinks() last, so a re-run of the
 * import unwraps these links to plain text (and drops CTA buttons that point
 * at them) instead of reintroducing the 404s. We deliberately don't redirect
 * them: the pages are gone, and the surrounding copy reads fine without the link.
 *
 * To add one, append its path (leading + trailing slash, no host).
 */
export const DEAD_LINKS = new Set([
  '/a2p-messaging/',
  '/about-us/management-team/',
  '/area-codes/',
  '/benefits-of-sms/',
  '/boost-your-reach-with-bulk-sms-marketing-ultimate-guide/',
  '/bulk-sms-plans-for-usa/',
  '/bulk-sms/',
  '/campaigns/',
  '/campaigns/hr-01/',
  '/cookie-policy/',
  '/corporate-policies/',
  '/developer/',
  '/developers-doc/',
  '/features-test/',
  '/features/',
  '/features/automatic-opt-out/',
  '/features/automatic-responses/',
  '/features/long-sms-messages/',
  '/features/personalise-your-sms-messages/',
  '/features/schedule-sms-messages/',
  '/features/send-sms-messages-from-your-email/',
  '/features/send-sms-messages-from-your-mobile-to-group/',
  '/features/sms-landing-pages/',
  '/features/sms-reseller/',
  '/features/two-way-sms-messaging/',
  '/free-trial/',
  '/frequently-asked-questions/',
  '/http-api/',
  '/integrations/api/',
  '/integrations/google-sheets/',
  '/integrations/multichannel-api/',
  '/integrations/one-time-passwords/',
  '/integrations/optimove/',
  '/integrations/sms-smpp/',
  '/integrations/square/',
  '/local-numbers/',
  '/local-numbers/hawaii/',
  '/long-text-messages-sending-long-text-messages/',
  '/mobi-gram-messages/',
  '/products/alert-sms/',
  '/products/bulk-sms-messaging/',
  '/products/bulk-sms/',
  '/products/bulksms-api/',
  '/products/bulksms-text-messenger/',
  '/products/inbound-long-number-application/',
  '/products/integration-gateway/',
  '/products/premium-rated-sms/',
  '/products/promotional-sms/',
  '/products/promotional-voice-call/',
  '/products/sending-bulk-sms/',
  '/products/transactional-sms/',
  '/products/two-way-sms/',
  '/products/web-to-sms/',
  '/resources-and-regulations/',
  '/resources-and-regulations/reverse-billing/',
  '/resources-and-regulations/sms-delivery-to-canada/',
  '/resources-and-regulations/sms-delivery-to-singapore/',
  '/resources-and-regulations/spain-sms-regulations/',
  '/resources-and-regulations/usa-debt-collection-digital-communications/',
  '/resources/insights/',
  '/resources/insights/applying-for-a-sender-id/',
  '/resources/insights/building-an-sms-database/',
  '/resources/insights/how-does-a2p-messaging-work/',
  '/resources/insights/how-to-attach-pdfs-to-your-messages/',
  '/resources/insights/how-to-send-a-mass-text-from-an-iphone/',
  '/resources/insights/how-to-send-smses-from-your-computer/',
  '/resources/insights/how-to-upload-bulk-sms-messages/',
  '/resources/insights/send-bulk-sms-messages-from-internet/',
  '/resources/insights/sender-id/',
  '/send-sms-online-with-confidence-try-smslocal/',
  '/smslocal-tool/',
  '/tcpa-transactional-messages-compliance-engagement-guide/',
  '/tools/',
  '/tools/ai-text-message-generator/',
  '/tools/sms-character-limit/',
  '/tools/text-free/',
  '/tools/text-to-speech-online-free-unlimited/',
  '/transactional-bulk-sms-revolutionizing-business-communication/',
  '/wpbc-booking-received/',
  '/xml-api/',
])

const isDeadHref = (href) => {
  if (typeof href !== 'string') return false
  if (!/^(https?://(www.)?smslocal.com)?//i.test(href)) return false
  let path = href.replace(/^https?://(www.)?smslocal.com/i, '').split(/[?#]/)[0]
  if (!path.endsWith('/')) path += '/'
  return DEAD_LINKS.has(path)
}

/**
 * Unwraps every { a: <dead href>, c: [...] } rich node to its children
 * (anywhere in the tree: paragraphs, lists, tables, CTAs, FAQs) and drops
 * CTA blocks whose button points at a dead URL. Returns new { blocks, faqs }.
 */
export function stripDeadLinks(blocks, faqs) {
  const walk = (node) => {
    if (Array.isArray(node)) {
      const out = []
      for (const child of node) {
        if (child && typeof child === 'object' && !Array.isArray(child) && isDeadHref(child.a)) {
          out.push(...walk(child.c ?? []))
        } else {
          out.push(walk(child))
        }
      }
      return out
    }
    if (node && typeof node === 'object') {
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, walk(v)]))
    }
    return node
  }
  const keptBlocks = blocks.filter((b) => !(b?.type === 'cta' && isDeadHref(b.buttonHref)))
  return { blocks: walk(keptBlocks), faqs: walk(faqs) }
}
