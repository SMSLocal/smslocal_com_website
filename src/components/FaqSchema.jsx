import { useLocation } from 'react-router-dom'
import JsonLd from './JsonLd.jsx'
import { SITE_ORIGIN } from './Canonical.jsx'
import { withSlash } from '../lib/url.js'

/**
 * FAQPage schema built from the same items a page's FAQ section renders, so the
 * markup always matches what is shown (mismatched FAQ markup is treated as
 * misleading structured data). The shared FAQ component renders this, which
 * means a page gets FAQ schema just by showing a FAQ, and no page needs its own
 * copy. Only plain-text answers are included; a page with none emits nothing.
 */
function FaqSchema({ items = [] }) {
  const { pathname } = useLocation()
  const url = `${SITE_ORIGIN}${withSlash(pathname)}`
  const entities = items
    .filter((f) => typeof f.q === 'string' && typeof f.a === 'string')
    .map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))

  if (entities.length === 0) return null

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        url,
        mainEntity: entities,
      }}
    />
  )
}

export default FaqSchema
