import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

/**
 * Build-time only — see scripts/prerender.mjs. Renders one route to HTML so the
 * schema, title and meta tags land in the served file instead of waiting on the
 * client bundle. `document.head` writes (Seo/Canonical) live in effects, which
 * don't run here, so the prerender script lifts those tags out of the markup
 * itself rather than expecting them in <head>.
 */
export function render(url) {
  return renderToString(<App router={StaticRouter} location={url} />)
}
