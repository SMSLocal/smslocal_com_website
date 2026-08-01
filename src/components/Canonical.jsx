import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPostBySlug } from '../lib/posts.js'

// Production domain this site deploys to (see deployment-flow-rule memory —
// `main` builds to this exact host). Canonicals must be absolute URLs.
export const SITE_ORIGIN = 'https://smslocal-com-website.vercel.app'

/**
 * The single canonical emitter — lives in Layout.jsx (every route goes through
 * Layout), not per-page, so canonical tags never depend on a page remembering
 * to render <Seo> correctly. Rendered rather than written from an effect so it
 * lands in the prerendered HTML too.
 *
 * Posts resolve under both /blog/:slug and /resources/insights/:slug, so they
 * canonicalize to the single routePath they were imported under instead of to
 * whichever of the two URLs was requested.
 */
function Canonical() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Prerendered pages ship static <title>/<meta>/<link> so crawlers that
    // don't run JS still see them (scripts/prerender.mjs). React hoists its own
    // copies into <head> without noticing those, so once it has mounted the
    // originals are duplicates — and two <title>s have no defined winner. React
    // owns the head from here; these are dropped once, on mount.
    for (const tag of document.head.querySelectorAll('[data-prerendered]')) tag.remove()
  }, [])

  // Strip a trailing slash (except the root) so "/pricing/" and "/pricing"
  // never canonicalize to two different URLs.
  const clean = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  const segments = clean.split('/').filter(Boolean)
  const post = /^\/(blog|resources\/insights)\/[^/]+$/.test(clean)
    ? getPostBySlug(segments[segments.length - 1])
    : null

  return <link rel="canonical" href={`${SITE_ORIGIN}${post?.routePath ?? clean}`} />
}

export default Canonical
