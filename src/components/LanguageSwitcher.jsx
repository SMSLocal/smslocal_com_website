import { useLocation } from 'react-router-dom'
import { useLocale } from '../lib/LocaleContext.jsx'
import { addLocaleToPath } from '../lib/locale.js'
import { LANGUAGES } from '../data/languages.js'
import { PILOT_ROUTES } from '../data/pilotRoutes.js'
import { stripSlash, withSlash } from '../lib/url.js'

/**
 * A native <select>, not a custom dropdown — no widget code, no extra CSS,
 * fully keyboard-accessible for free. Only shows on PILOT_ROUTES pages, since
 * every other page genuinely has nowhere to send a non-English visitor yet.
 * Always a real navigation (never client-side routing): picking a language
 * has to fetch that page's own static translated file, not repaint the
 * current one — see applyTranslations.js for why that distinction matters.
 */
function LanguageSwitcher() {
  const { pathname } = useLocation()
  const locale = useLocale()
  const clean = stripSlash(pathname) || '/'
  if (!PILOT_ROUTES.includes(clean)) return null

  function handleChange(e) {
    const target = e.target.value
    window.location.href = target === 'en' ? withSlash(clean) : addLocaleToPath(clean, target)
  }

  return (
    <label className="flex items-center gap-2 text-sm text-white/50">
      <span className="sr-only">Language</span>
      <select
        className="rounded-md border border-white/20 bg-transparent px-2 py-1 text-white/70"
        value={locale}
        onChange={handleChange}
      >
        <option value="en" className="text-black">
          English
        </option>
        {LANGUAGES.map(({ code, native }) => (
          <option key={code} value={code} className="text-black">
            {native}
          </option>
        ))}
      </select>
    </label>
  )
}

export default LanguageSwitcher
