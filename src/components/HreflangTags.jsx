import { useLocation } from 'react-router-dom'
import { SITE_ORIGIN } from './Canonical.jsx'
import { withSlash, stripSlash } from '../lib/url.js'
import { LANGUAGES } from '../data/languages.js'
import { hasTranslatedPage } from '../data/translatedRoutes.js'

/**
 * Skipped on routes with no translated page (see i18nScope) — pointing
 * hreflang at a URL that doesn't exist would be worse than declaring no
 * alternates at all.
 */
function HreflangTags() {
  const { pathname } = useLocation()
  const clean = stripSlash(pathname) || '/'
  if (!hasTranslatedPage(clean)) return null

  const englishUrl = `${SITE_ORIGIN}${withSlash(clean)}`

  return (
    <>
      <link rel="alternate" hrefLang="x-default" href={englishUrl} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      {/* The URL always uses the bare code (/zh/…); only the advertised
          hreflang value is refined, for codes that are ambiguous on their
          own. See languages.js. */}
      {LANGUAGES.map(({ code, hreflang }) => (
        <link
          key={code}
          rel="alternate"
          hrefLang={hreflang ?? code}
          href={`${SITE_ORIGIN}/${code}${withSlash(clean)}`}
        />
      ))}
    </>
  )
}

export default HreflangTags
