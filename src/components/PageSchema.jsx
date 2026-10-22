import { useLocation } from 'react-router-dom'
import JsonLd from './JsonLd.jsx'
import { SITE_ORIGIN } from './Canonical.jsx'
import { withSlash } from '../lib/url.js'

/**
 * Page-level schema for a product page: a Service provided by the sitewide
 * Organization (see SiteSchema.jsx), plus an FAQPage built from the same items
 * the page's FAQ section renders, so the markup always matches what is shown.
 * Only plain-text answers are included.
 */
function PageSchema({ name, description, faqs = [] }) {
  const { pathname } = useLocation()
  const url = `${SITE_ORIGIN}${withSlash(pathname)}`
  const entities = faqs
    .filter((f) => typeof f.q === 'string' && typeof f.a === 'string')
    .map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))

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
          entities.length > 0 && {
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            url,
            mainEntity: entities,
          },
        ].filter(Boolean),
      }}
    />
  )
}

export default PageSchema
