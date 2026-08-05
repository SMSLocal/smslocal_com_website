import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyTranslations } from './applyTranslations.js'
import { getLocaleFromPathname } from '../lib/locale.js'

/**
 * Client-only — entry-server.jsx also renders this tree during prerendering,
 * where there's no DOM to touch, so this must never run its effect there
 * (useEffect never fires during renderToString, which is exactly what makes
 * this safe: it only ever runs in the browser).
 */
function LocaleTranslator() {
  const { pathname } = useLocation()

  useEffect(() => {
    applyTranslations()
  }, [pathname])

  // applyTranslations rewrites internal hrefs to /<locale>/..., but a React
  // Router <Link> navigates using its own JSX `to` prop and never reads the
  // DOM href — so clicking one dropped the locale and silently returned the
  // visitor to English. Capture the click before React's own handler and
  // send the browser to the href that's actually on the element.
  //
  // A full page load, not navigate(): translated HTML now comes from
  // api/i18n-ssr per request, so the next page has to be fetched to exist in
  // this language at all. A client-side transition would render the English
  // JSX with no dictionary to repair it. The edge serves that fetch from
  // cache, and it is what keeps the /<locale> prefix in the URL.
  useEffect(() => {
    function onClick(e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const locale = getLocaleFromPathname(window.location.pathname)
      if (locale === 'en') return

      const anchor = e.target.closest?.('a[href]')
      if (!anchor || anchor.target === '_blank') return

      const href = anchor.getAttribute('href') ?? ''
      if (href !== `/${locale}` && !href.startsWith(`/${locale}/`)) return

      // preventDefault alone is enough: React Router's <Link> checks
      // defaultPrevented and bails. stopPropagation was also swallowing the
      // click before other document-level listeners saw it, so on a locale
      // page an open nav dropdown stayed open after navigating.
      e.preventDefault()
      window.location.assign(href)
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}

export default LocaleTranslator
