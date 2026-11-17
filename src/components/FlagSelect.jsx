import { useEffect, useRef, useState } from 'react'

function FlagImg({ iso }) {
  if (!iso) return null
  return (
    <img
      className="flag-select-icon"
      src={`https://flagcdn.com/24x18/${iso.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/48x36/${iso.toLowerCase()}.png 2x`}
      width="20"
      height="15"
      alt=""
      aria-hidden="true"
    />
  )
}

// Stands in for a native <select> so each row in the open dropdown can show
// a flag image next to it. A plain <option> can never contain an <img> in
// any browser, so a real <select> has no way to put flags in its own list —
// this custom listbox is what makes that possible.
function FlagSelect({ id, ariaLabel, value, onChange, options, placeholder, closedLabel, className }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef(null)
  const listRef = useRef(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  useEffect(() => {
    if (open && activeIndex >= 0 && listRef.current) {
      const el = listRef.current.children[activeIndex]
      if (el) el.scrollIntoView({ block: 'nearest' })
    }
  }, [open, activeIndex])

  function selectOption(opt) {
    onChange(opt.value)
    setOpen(false)
  }

  function openList() {
    setOpen(true)
    const idx = options.findIndex((o) => o.value === value)
    setActiveIndex(idx >= 0 ? idx : 0)
  }

  function handleButtonKeyDown(e) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!open) openList()
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  function handleListKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (options[activeIndex]) selectOption(options[activeIndex])
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div className={`flag-select${className ? ` ${className}` : ''}`} ref={rootRef}>
      <button
        type="button"
        id={id}
        className="flag-select-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleButtonKeyDown}
      >
        <FlagImg iso={selected?.iso} />
        <span className="flag-select-value">
          {selected ? (closedLabel ? closedLabel(selected) : selected.label) : placeholder}
        </span>
        <svg className="flag-select-caret" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="flag-select-list" role="listbox" ref={listRef} onKeyDown={handleListKeyDown}>
          {options.map((opt, i) => (
            <li
              key={opt.iso ? `${opt.value}-${opt.iso}` : opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`flag-select-option${i === activeIndex ? ' active' : ''}${opt.value === value ? ' selected' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => selectOption(opt)}
            >
              <FlagImg iso={opt.iso} />
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FlagSelect
