import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Production domain this site deploys to (see deployment-flow-rule memory —
// `main` builds to this exact host). Canonicals must be absolute URLs.
const SITE_ORIGIN = 'https://smslocal-com-website.vercel.app'

/**
 * Renders nothing — sets/updates <link rel="canonical"> in <head> to the
 * current path on every route change. Lives in Layout.jsx (every route goes
 * through Layout), not per-page, so canonical tags never depend on a page
 * remembering to render <Seo> correctly.
 */
function Canonical() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Strip a trailing slash (except the root) so "/pricing/" and "/pricing"
    // never canonicalize to two different URLs.
    const clean = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    const href = `${SITE_ORIGIN}${clean}`

    let tag = document.querySelector('link[rel="canonical"]')
    if (!tag) {
      tag = document.createElement('link')
      tag.setAttribute('rel', 'canonical')
      document.head.appendChild(tag)
    }
    tag.setAttribute('href', href)
  }, [pathname])

  return null
}

export default Canonical
