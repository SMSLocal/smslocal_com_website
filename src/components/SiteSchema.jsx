import { useLocation } from 'react-router-dom'
import JsonLd from './JsonLd.jsx'
import { SITE_ORIGIN } from './Canonical.jsx'
import { stripSlash, withSlash } from '../lib/url.js'
import pageDates from '../data/pageDates.generated.json'

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
                  '@type': 'WebPage',
                  '@id': `${url}#webpage`,
                  url,
                  isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
                  dateModified,
                },
              ]
            : []),
        ],
      }}
    />
  )
}

export default SiteSchema
