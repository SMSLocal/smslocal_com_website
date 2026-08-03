import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPostBySlug } from '../lib/posts.js'
import { stripSlash, withSlash } from '../lib/url.js'

// Production domain this site deploys to (see deployment-flow-rule memory —
// `main` builds to this exact host). Canonicals must be absolute URLs.
export const SITE_ORIGIN = 'https://smslocal-com-website.vercel.app'

/**
 * The single canonical emitter — lives in Layout.jsx (every route goes through
 * Layout), not per-page, so canonical tags never depend on a page remembering
 * to render <Seo> correctly. Rendered rather than written from an effect so it
 * lands in the prerendered HTML too.
 *
 * Emits the trailing-slash form, which is what the server serves: without it
 * the canonical would name a URL that 308-redirects.
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

  // Match against the slash-less form: route paths and post slugs carry none.
  const clean = stripSlash(pathname)
  const segments = clean.split('/').filter(Boolean)
  const post = /^\/(blog|resources\/insights)\/[^/]+$/.test(clean)
    ? getPostBySlug(segments[segments.length - 1])
    : null

  return <link rel="canonical" href={`${SITE_ORIGIN}${withSlash(post?.routePath ?? clean)}`} />
}

export default Canonical
