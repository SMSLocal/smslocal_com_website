import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLocale } from '../lib/LocaleContext.jsx'
import { addLocaleToPath } from '../lib/locale.js'
import { LANGUAGES } from '../data/languages.js'
import { hasTranslatedPage } from '../data/translatedRoutes.js'
import { stripSlash, withSlash } from '../lib/url.js'

// English isn't in LANGUAGES (that list is the 19 translation targets), but
// needs the same {code, native, country} shape to sit in the same list here.
const ALL = [{ code: 'en', native: 'English', country: 'us' }, ...LANGUAGES]

/**
 * <details>/<summary> instead of a custom popover — native disclosure
 * behaviour (toggle, Escape, focus handling) for free. A plain <select>
 * can't show a flag next to each name (no browser renders <img> inside
 * <option>), which is the one thing a native select couldn't do here.
 * Only shows on PILOT_ROUTES pages, since every other page genuinely has
 * nowhere to send a non-English visitor yet. Always a real navigation
 * (never client-side routing) — picking a language has to fetch that page's
 * own static translated file, not repaint the current one, see
 * applyTranslations.js for why that distinction matters.
 */
// Navbar-only, so it styles for that one light surface — there was a dark
// variant while this also sat in the footer; that went with it.
const STYLES =
  'text-foreground [&_summary]:border-border [&_ul]:bg-white [&_ul]:border-border [&_li:hover]:bg-muted'

function LanguageSwitcher() {
  const { pathname } = useLocation()
  const locale = useLocale()
  const detailsRef = useRef(null)
  const clean = stripSlash(pathname) || '/'
  if (!hasTranslatedPage(clean)) return null

  const current = ALL.find((l) => l.code === locale) ?? ALL[0]

  function goTo(code) {
    if (detailsRef.current) detailsRef.current.open = false
    window.location.href = code === 'en' ? withSlash(clean) : addLocaleToPath(clean, code)
  }

  // Closes on a click or focus move outside the whole widget — <details>
  // only closes natively on Escape or re-clicking <summary>.
  function handleBlur(e) {
    if (!detailsRef.current?.contains(e.relatedTarget)) detailsRef.current.open = false
  }

  return (
    <details
      ref={detailsRef}
      onBlur={handleBlur}
      className={`relative text-sm ${STYLES}`}
      // Each name here is already in its OWN language — "Español", "Deutsch",
      // "हिन्दी" — that's the point, it's how a reader finds their language in
      // a list of ones they can't read. The translator can't tell that from
      // any other text node on the page, so on a French page it was
      // translating "Deutsch" to "Allemand" and "Español" to "Espagnol" — the
      // one part of the site where a visitor most needs their own language
      // untouched became the one part where it kept changing under them.
      // data-no-translate is the escape hatch both translators already
      // check (see html-translator.mjs and applyTranslations.js); nothing
      // used it until now.
      data-no-translate
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border px-2 py-1 [&::-webkit-details-marker]:hidden">
        <img
          src={`/flags/${current.country}.svg`}
          alt=""
          width="16"
          height="12"
          className="rounded-[2px]"
        />
        {current.native}
      </summary>
      <ul className="absolute right-0 z-20 m-0 mt-1 max-h-72 w-48 list-none overflow-y-auto rounded-md border p-0 py-1 shadow-lg">
        {ALL.map(({ code, native, country }) => (
          <li key={code} className="m-0 p-0">
            {/* [font:inherit] / text-inherit: this renders inside the
                plain-CSS navbar, outside the `home-tw` Tailwind reset, so a
                <button> would otherwise fall back to the browser default
                (Arial 13px, black) instead of the site's own type. */}
            <button
              type="button"
              onClick={() => goTo(code)}
              className="flex w-full cursor-pointer items-center gap-2 border-0 bg-transparent px-3 py-1.5 text-left text-inherit [font:inherit]"
            >
              <img
                src={`/flags/${country}.svg`}
                alt=""
                width="16"
                height="12"
                className="rounded-[2px]"
              />
              {native}
            </button>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default LanguageSwitcher
