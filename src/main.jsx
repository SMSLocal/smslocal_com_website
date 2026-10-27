import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/theme.css'
import './styles/home-tailwind.css'
import App from './App.jsx'
import { initCtaTracking } from './lib/track.js'

initCtaTracking()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
