import { useLocation } from 'react-router-dom'
import JsonLd from './JsonLd.jsx'
import { SITE_ORIGIN } from './Canonical.jsx'
import { stripSlash, withSlash } from '../lib/url.js'
import pageDates from '../data/pageDates.generated.json'
import { SEO_OVERRIDES } from '../data/seoOverrides.js'

// Pages that already emit their own Service node through PageSchema.jsx.
const HAS_PAGE_SCHEMA = new Set([
  '/products/cpaas/',
  '/products/cpaas/lookup-api/',
  '/products/cpaas/sms-api/',
  '/products/cpaas/verify-api/',
  '/products/channels/did/',
  '/products/channels/email/',
  '/products/channels/voice/',
  '/products/channels/whatsapp/',
])

// The schema.org type that describes what the page actually is. Everything
// else stays a plain WebPage.
const PAGE_TYPE = {
  '/about-us/': 'AboutPage',
  '/contact-us/': 'ContactPage',
  '/blog/': 'CollectionPage',
  '/compare/': 'CollectionPage',
}

// The company's own profiles, as linked from the site footer.
const SAME_AS = [
  'https://www.linkedin.com/company/sms-local',
  'https://www.facebook.com/smslocal.official',
  'https://www.instagram.com/sms_local',
  'https://twitter.com/smslocal01',
  'https://www.youtube.com/@smslocal',
]

/**
 * A product or solution page describes a service the Organization provides.
 * Name and description come from the page's own search title and description
 * (seoOverrides.js), so the markup says what the page says. The two index pages
 * are directories, not services, and are left as WebPage.
 */
function serviceFor(path, url) {
  const isOffering =
    (path.startsWith('/products/') || path.startsWith('/solutions/')) &&
    path !== '/products/' &&
    path !== '/solutions/'
  const meta = SEO_OVERRIDES[path]
  if (!isOffering || !meta || HAS_PAGE_SCHEMA.has(path)) return null
  const name = meta.title.replace(/ \| SMSLocal$/, '').split(':')[0].trim()
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description: meta.description,
    url,
    provider: { '@id': `${SITE_ORIGIN}/#organization` },
    serviceType: name,
  }
}

/**
 * Sitewide identity schema (Organization + WebSite), plus a WebPage node
 * carrying the current route's `dateModified`. Rendered once in Layout.jsx so
 * every route gets it — including `/`, which the Breadcrumbs block skips.
 *
 * Blog posts deliberately get no WebPage node: they carry their own BlogPosting
 * with real per-post dates, and two competing date claims for one URL is exactly
 * the inconsistency that gets the signal discounted.
 *
 * Dates come from src/data/pageDates.generated.json (see scripts/gen-page-dates.mjs).
 */
function SiteSchema() {
  const { pathname } = useLocation()
  // pageDates is keyed off App.jsx's route paths, which carry no trailing slash.
  const dateModified = pageDates[stripSlash(pathname)]
  const url = `${SITE_ORIGIN}${withSlash(pathname)}`
  const service = serviceFor(withSlash(pathname), url)

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_ORIGIN}/#organization`,
            name: 'SMSLocal',
            url: SITE_ORIGIN,
            logo: `${SITE_ORIGIN}/smslocal-logo-v2.svg`,
            // The number shown in the TopBar and footer. E.164, which is what
            // schema.org expects.
            telephone: '+1-559-549-5149',
            sameAs: SAME_AS,
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_ORIGIN}/#website`,
            name: 'SMSLocal',
            url: SITE_ORIGIN,
            publisher: { '@id': `${SITE_ORIGIN}/#organization` },
          },
          ...(dateModified
            ? [
                {
                  '@type': PAGE_TYPE[withSlash(pathname)] ?? 'WebPage',
                  '@id': `${url}#webpage`,
                  url,
                  isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
                  dateModified,
                },
              ]
            : []),
          ...(service ? [service] : []),
        ],
      }}
    />
  )
}

export default SiteSchema
