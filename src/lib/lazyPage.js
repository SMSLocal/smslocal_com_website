import { createElement, lazy } from 'react'

/* Route-level code splitting that leaves the prerender untouched.
 *
 * In the browser each page is its own chunk, fetched when a visitor reaches it
 * (src/main.jsx fetches the current route's chunk before the first render, so a
 * direct visit never shows an empty page). During the build, scripts/prerender.mjs
 * calls renderToString synchronously for every route, and a React.lazy component
 * would render its Suspense fallback instead of the page. So when bundling for
 * SSR the loaders run up front and App.jsx awaits pagesReady() once, which keeps
 * every page a plain synchronous component for the server render.
 */
const pending = []

export function page(loader) {
  if (import.meta.env.SSR) {
    let Component
    pending.push(loader().then((mod) => { Component = mod.default }))
    return function Page(props) {
      return createElement(Component, props)
    }
  }
  const Lazy = lazy(loader)
  Lazy.preload = loader
  return Lazy
}

export function pagesReady() {
  return Promise.all(pending)
}
