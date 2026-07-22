import { useState } from 'react'
import './CompareLogo.css'

function initialsOf(name) {
  const clean = name.replace(/\(.*?\)/g, '').trim()
  const words = clean.split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return clean.slice(0, 2).toUpperCase()
}

// Real competitor brand logo via the public favicon service, monogram fallback.
export function CompareLogo({ name, domain, className = '' }) {
  const [err, setErr] = useState(false)
  if (err || !domain) {
    return (
      <span className={`cmp-logo cmp-logo--mono ${className}`} style={{ background: 'var(--navy)' }}>
        {initialsOf(name)}
      </span>
    )
  }
  return (
    <span className={`cmp-logo ${className}`}>
      <img
        src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
        alt={`${name} logo`}
        width="40"
        height="40"
        loading="lazy"
        onError={() => setErr(true)}
      />
    </span>
  )
}

// SMSLocal's own gradient logo tile (brand blue → pink), used as the "us" side.
export function SmsLocalMark({ className = '' }) {
  return <span className={`cmp-brandmark ${className}`} aria-hidden="true">S</span>
}
