import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyTranslations, forceReloadOnLocaleLinks } from './applyTranslations.js'

/**
 * Client-only — entry-server.jsx also renders this tree during prerendering,
 * where there's no DOM to touch, so this must never run its effect there
 * (useEffect never fires during renderToString, which is exactly what makes
 * this safe: it only ever runs in the browser).
 */
function LocaleTranslator() {
  const { pathname } = useLocation()

  useEffect(() => {
    forceReloadOnLocaleLinks()
    applyTranslations()
  }, [pathname])

  return null
}

export default LocaleTranslator
