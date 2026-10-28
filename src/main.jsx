import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/theme.css'
import './styles/home-tailwind.css'
import { matchRoutes } from 'react-router-dom'
import App, { ROUTES } from './App.jsx'
import { initCtaTracking } from './lib/track.js'
import { stripLocaleFromPathname } from './lib/locale.js'
import { loadPostBody } from './lib/posts.js'

initCtaTracking()

// A post's body is its own chunk. Fetch it first so the article renders in the
// first pass, as the prerendered page it replaces did, rather than after a gap.
const post = stripLocaleFromPathname(window.location.pathname).match(
  /^\/(?:blog|resources\/insights)\/([^/]+)\/?$/,
)
const bodyReady = post ? loadPostBody(post[1]).catch(() => {}) : Promise.resolve()

// Same reason for the page itself: each page is a lazy chunk, so fetch the one
// this URL needs before rendering. createRoot replaces the prerendered markup,
// and without this the page would flash empty while its chunk downloads.
const matches = matchRoutes(
  ROUTES.map(([path]) => ({ path })),
  stripLocaleFromPathname(window.location.pathname),
)
const component = matches && ROUTES.find(([path]) => path === matches[0].route.path)?.[1]
const pageReady = component?.preload ? component.preload().catch(() => {}) : Promise.resolve()

const ready = Promise.all([bodyReady, pageReady])

ready.then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
