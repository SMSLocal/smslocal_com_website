// Routing layer for the translated site — the piece this project was missing.
//
// Vercel Routing Middleware runs before the CDN cache on every request. Any
// /<locale>/... URL is handed to api/i18n-ssr, which fetches the English page
// from this same origin, translates it, and returns it with a 7-day edge
// cache. Nothing about a locale page is built or stored: that is what keeps
// the build to the 293 English pages and the deploy to ~2 minutes.
//
// Ported from the Next.js reference implementation (middleware.ts there). The
// framework primitives differ — this project is Vite + React Router, so there
// is no NextResponse — but the flow is the same one: intercept, hand off with
// the locale and the English path attached, let the proxy do the work.
//
// Two differences from the reference, both because they are unnecessary here:
//
//  - No `x-ld-ssr` self-fetch bypass. That exists in the reference because
//    Next's middleware sees every path, so the proxy's own fetch of the
//    English page would loop back into it. Here only /<locale>/... is
//    rewritten, and the proxy fetches the unprefixed path, so it is never
//    re-entered.
//  - The head is localized by the translator (localizeHead), not by rendering
//    the page a second time with the locale forced. The English page is a
//    static file, so there is no per-request render to influence.
import { next, rewrite } from '@vercel/functions'

// Keep in sync with src/data/languages.js. Inlined rather than imported: this
// runs on the edge runtime, where pulling in an app module drags its whole
// import graph into a function that has to stay small and cold-start fast.
const LOCALES = new Set([
  'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'tr',
  'ar', 'hi', 'zh', 'ja', 'ko', 'vi', 'id', 'th', 'sv', 'uk',
])

export default function middleware(request) {
  const url = new URL(request.url)
  const [, first, ...rest] = url.pathname.split('/')

  // English never carries a prefix, so /en/... is a URL that should not exist.
  // Redirecting rather than 404ing keeps any link that was built that way.
  if (first === 'en') {
    const dest = new URL(`/${rest.join('/')}`, url)
    return Response.redirect(dest, 308)
  }

  if (!LOCALES.has(first)) return next()

  // rest already carries the trailing slash: "/fr/blog/x/" splits to
  // ['', 'fr', 'blog', 'x', ''], so joining rest gives "blog/x/". Bare "/fr"
  // and "/fr/" both reduce to "/".
  const path = `/${rest.join('/')}`

  // The destination must end in a slash. vercel.json sets trailingSlash:true,
  // and rewriting to a slashless path triggers an internal redirect that drops
  // the request headers set below — the same trap the reference implementation
  // documents.
  const target = new URL('/api/i18n-ssr/', url)
  target.searchParams.set('locale', first)
  target.searchParams.set('path', path)

  // Belt and braces. The docs show query params on the rewrite destination
  // being read by the target function, but the Next.js reference had to switch
  // to headers because a rewrite there left req.url pointing at the original
  // URL. The handler reads headers first and falls back to the query, so
  // whichever survives, it resolves the same locale and path.
  const headers = new Headers(request.headers)
  headers.set('x-ld-locale-target', first)
  headers.set('x-ld-path', path)

  return rewrite(target, { request: { headers } })
}

// Explicit per-locale entries rather than one clever pattern. A matcher that
// silently fails to match is exactly how every locale URL ended up serving the
// English 404, and `/x/:path*` is the one form the docs state outright.
export const config = {
  matcher: [
    '/en/:path*',
    '/es', '/es/:path*', '/fr', '/fr/:path*', '/de', '/de/:path*',
    '/it', '/it/:path*', '/pt', '/pt/:path*', '/nl', '/nl/:path*',
    '/pl', '/pl/:path*', '/ru', '/ru/:path*', '/tr', '/tr/:path*',
    '/ar', '/ar/:path*', '/hi', '/hi/:path*', '/zh', '/zh/:path*',
    '/ja', '/ja/:path*', '/ko', '/ko/:path*', '/vi', '/vi/:path*',
    '/id', '/id/:path*', '/th', '/th/:path*', '/sv', '/sv/:path*',
    '/uk', '/uk/:path*',
  ],
}
