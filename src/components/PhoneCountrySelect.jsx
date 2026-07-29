import { useEffect, useMemo, useRef, useState } from 'react'
import { DIAL_CODES, POPULAR_DIAL_CODES, OTHER_DIAL_CODES } from '../data/dialCodes.js'
import './PhoneCountrySelect.css'

/**
 * Country-code picker for a phone field: the closed trigger shows only the
 * flag + dial code (e.g. "🇺🇸 +1"), never a text abbreviation like "US" —
 * the flag itself is the country indicator. Expanding it shows flag + full
 * name + dial code per row so picking the right one isn't a guessing game.
 */
function PhoneCountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)
  const searchRef = useRef(null)

  const current = DIAL_CODES.find((c) => c.code === value) || DIAL_CODES[0]

  useEffect(() => {
    if (!open) return
    setQuery('')
    const t = setTimeout(() => searchRef.current?.focus(), 0)
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const q = query.trim().toLowerCase()
  const filteredPopular = useMemo(
    () => POPULAR_DIAL_CODES.filter((c) => c.name.toLowerCase().includes(q) || c.dial.includes(q)),
    [q],
  )
  const filteredOther = useMemo(
    () => OTHER_DIAL_CODES.filter((c) => c.name.toLowerCase().includes(q) || c.dial.includes(q)),
    [q],
  )

  const renderOption = (c) => (
    <li key={c.code}>
      <button
        type="button"
        className={c.code === value ? 'pcs-option is-selected' : 'pcs-option'}
        role="option"
        aria-selected={c.code === value}
        onClick={() => {
          onChange(c.code)
          setOpen(false)
        }}
      >
        <img className="pcs-flag" src={c.flagSrc} alt="" />
        <span className="pcs-name">{c.name}</span>
        <span className="pcs-dial">{c.dial}</span>
      </button>
    </li>
  )

  return (
    <div className="pcs-field" ref={ref}>
      <button
        type="button"
        className="pcs-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code, currently ${current.name} ${current.dial}`}
      >
        <img className="pcs-flag" src={current.flagSrc} alt="" />
        <span className="pcs-dial">{current.dial}</span>
        <span className={open ? 'pcs-chevron is-open' : 'pcs-chevron'} aria-hidden="true" />
      </button>

      {open && (
        <div className="pcs-panel">
          <input
            ref={searchRef}
            type="text"
            className="pcs-search"
            placeholder="Search countries…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="pcs-list" role="listbox">
            {filteredPopular.length > 0 && (
              <>
                <li className="pcs-group-label" aria-hidden="true">Popular countries</li>
                {filteredPopular.map(renderOption)}
                {filteredOther.length > 0 && <li className="pcs-group-label" aria-hidden="true">Other countries</li>}
              </>
            )}
            {filteredOther.map(renderOption)}
            {filteredPopular.length === 0 && filteredOther.length === 0 && (
              <li className="pcs-empty">No countries match "{query}"</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PhoneCountrySelect
