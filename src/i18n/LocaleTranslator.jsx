import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  useEffect(() => {
    applyTranslations()
  }, [pathname])

  // applyTranslations rewrites internal hrefs to /<locale>/..., but a React
  // Router <Link> navigates using its own JSX `to` prop and never reads the
  // DOM href — so clicking one dropped the locale and silently returned the
  // visitor to English. Capture the click before React's own handler and
  // route to the href that's actually on the element.
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

      e.preventDefault()
      e.stopPropagation()
      navigate(href)
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [navigate])

  return null
}

export default LocaleTranslator
