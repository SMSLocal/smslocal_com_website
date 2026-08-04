import { useLocation } from 'react-router-dom'
import { SITE_ORIGIN } from './Canonical.jsx'
import { withSlash, stripSlash } from '../lib/url.js'
import { LANGUAGES } from '../data/languages.js'
import { PILOT_ROUTES } from '../data/pilotRoutes.js'

/**
 * Only rendered for routes that actually have a translated static page in
 * every locale (PILOT_ROUTES, shared with scripts/prerender.mjs) — pointing
 * hreflang at a URL that doesn't exist yet would be worse than not declaring
 * alternates at all.
 */
function HreflangTags() {
  const { pathname } = useLocation()
  const clean = stripSlash(pathname) || '/'
  if (!PILOT_ROUTES.includes(clean)) return null

  const englishUrl = `${SITE_ORIGIN}${withSlash(clean)}`

  return (
    <>
      <link rel="alternate" hrefLang="x-default" href={englishUrl} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      {LANGUAGES.map(({ code }) => (
        <link
          key={code}
          rel="alternate"
          hrefLang={code}
          href={`${SITE_ORIGIN}/${code}${withSlash(clean)}`}
        />
      ))}
    </>
  )
}

export default HreflangTags
