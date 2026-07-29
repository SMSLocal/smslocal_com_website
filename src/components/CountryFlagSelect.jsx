import { useEffect, useMemo, useRef, useState } from 'react'
import './CountryFlagSelect.css'

/**
 * A country picker showing a real flag image next to each name (native
 * <select><option> can't render an <img>, so this is a custom dropdown
 * button + listbox instead). Flags are real SVGs from flagcdn.com, saved to
 * public/flags/ — not emoji, which render as plain "US"-style text
 * abbreviations on this machine instead of an actual flag glyph.
 *
 * Handles the full ~195-country list: a search box to filter, and a
 * "Popular" / "Other" grouping (matching the real smslocal.com/pricing
 * dropdown) when `popular`/`other` are supplied instead of a flat
 * `countries` list.
 */
function CountryFlagSelect({ countries, popular, other, value, onChange, label = 'Country' }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)
  const searchRef = useRef(null)

  const all = countries || [...(popular || []), ...(other || [])]
  const current = all.find((c) => c.code === value) || all[0]

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
    () => (popular ? popular.filter((c) => c.name.toLowerCase().includes(q)) : []),
    [popular, q],
  )
  const filteredOther = useMemo(() => {
    const source = popular || other ? other || [] : all
    return source.filter((c) => c.name.toLowerCase().includes(q))
  }, [other, all, popular, q])

  const renderOption = (c) => (
    <li key={c.code}>
      <button
        type="button"
        className={c.code === value ? 'cfs-option is-selected' : 'cfs-option'}
        role="option"
        aria-selected={c.code === value}
        onClick={() => {
          onChange(c.code)
          setOpen(false)
        }}
      >
        <img className="cfs-flag" src={c.flagSrc} alt="" />
        <span className="cfs-name">{c.name}</span>
      </button>
    </li>
  )

  return (
    <div className="cfs-field" ref={ref}>
      <span className="cfs-label">{label}</span>
      <button
        type="button"
        className="cfs-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img className="cfs-flag" src={current.flagSrc} alt="" />
        <span className="cfs-name">{current.name}</span>
        <span className={open ? 'cfs-chevron is-open' : 'cfs-chevron'} aria-hidden="true" />
      </button>

      {open && (
        <div className="cfs-panel">
          <input
            ref={searchRef}
            type="text"
            className="cfs-search"
            placeholder="Search countries…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="cfs-list" role="listbox">
            {popular && filteredPopular.length > 0 && (
              <>
                <li className="cfs-group-label" aria-hidden="true">Popular countries</li>
                {filteredPopular.map(renderOption)}
                {filteredOther.length > 0 && <li className="cfs-group-label" aria-hidden="true">Other countries</li>}
              </>
            )}
            {filteredOther.map(renderOption)}
            {filteredPopular.length === 0 && filteredOther.length === 0 && (
              <li className="cfs-empty">No countries match "{query}"</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CountryFlagSelect
