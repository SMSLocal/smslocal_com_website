import { createElement, lazy, useState } from 'react'

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
  // React.lazy suspends on its first render even when the chunk has already been
  // fetched, which drew one empty frame (footer jumping up) over the prerendered
  // page. Remember the preloaded component and render it directly instead.
  let Loaded
  const load = () => loader().then((mod) => { Loaded = mod.default; return mod })
  const Lazy = lazy(load)
  function Page(props) {
    // chosen once per mount, so a page never remounts in the middle of a visit
    const [Component] = useState(() => Loaded || Lazy)
    return createElement(Component, props)
  }
  Page.preload = load
  return Page
}

export function pagesReady() {
  return Promise.all(pending)
}
