import { useLocation } from 'react-router-dom'
import JsonLd from './JsonLd.jsx'
import { SITE_ORIGIN } from './Canonical.jsx'
import { withSlash } from '../lib/url.js'

/**
 * Page-level schema for a product page: a Service provided by the sitewide
 * Organization (see SiteSchema.jsx). The page's FAQPage is no longer built
 * here: the shared FAQ section emits it (see FaqSchema.jsx), so it cannot be
 * emitted twice.
 */
function PageSchema({ name, description }) {
  const { pathname } = useLocation()
  const url = `${SITE_ORIGIN}${withSlash(pathname)}`

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            '@id': `${url}#service`,
            name,
            description,
            url,
            provider: { '@id': `${SITE_ORIGIN}/#organization` },
            serviceType: name,
          },
        ],
      }}
    />
  )
}

export default PageSchema
