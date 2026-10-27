import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/theme.css'
import './styles/home-tailwind.css'
import App from './App.jsx'
import { initCtaTracking } from './lib/track.js'
import { stripLocaleFromPathname } from './lib/locale.js'
import { loadPostBody } from './lib/posts.js'

initCtaTracking()

// A post's body is its own chunk. Fetch it first so the article renders in the
// first pass, as the prerendered page it replaces did, rather than after a gap.
const post = stripLocaleFromPathname(window.location.pathname).match(
  /^\/(?:blog|resources\/insights)\/([^/]+)\/?$/,
)
const ready = post ? loadPostBody(post[1]).catch(() => {}) : Promise.resolve()

ready.then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
