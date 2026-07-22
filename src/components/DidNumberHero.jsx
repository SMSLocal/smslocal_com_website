import './DidNumberHero.css'
import { IconPhone, IconChat } from './icons.jsx'

/**
 * Hero visual for the DID / virtual numbers page.
 * Animated story of a virtual number coming to life and splitting its routes:
 * a small country selector flips through flag + dial-code chips (US, UK, IN, AU),
 * a large phone number assembles digit-by-digit, then two routing lines fan out
 * from the number to two destinations — "Voice -> your team" and "SMS -> your app".
 * Floating on the page with NO enclosing frame. Pure-CSS loop that resolves to a
 * fully-assembled static state when the visitor prefers reduced motion.
 */
const COUNTRIES = [
  { flag: '\u{1F1FA}\u{1F1F8}', code: '+1', name: 'US' },
  { flag: '\u{1F1EC}\u{1F1E7}', code: '+44', name: 'UK' },
  { flag: '\u{1F1EE}\u{1F1F3}', code: '+91', name: 'IN' },
  { flag: '\u{1F1E6}\u{1F1FA}', code: '+61', name: 'AU' },
]

const NUMBER = '+1 (415) 555-0182'

function DidNumberHero() {
  return (
    <div className="dnh" aria-hidden="true">
      {/* Country selector — flips between flag + dial-code chips */}
      <div className="dnh-selector">
        <span className="dnh-selector-label">Country</span>
        <span className="dnh-chip-slot">
          {COUNTRIES.map((c, i) => (
            <span className={`dnh-chip dnh-chip--${i}`} key={c.name}>
              <span className="dnh-flag">{c.flag}</span>
              <span className="dnh-code">{c.code}</span>
            </span>
          ))}
        </span>
      </div>

      {/* The virtual number assembling digit-by-digit */}
      <div className="dnh-number">
        {NUMBER.split('').map((ch, i) => (
          <span
            className={ch === ' ' ? 'dnh-digit dnh-digit--space' : 'dnh-digit'}
            style={{ animationDelay: `${1.8 + i * 0.07}s` }}
            key={i}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </div>

      <span className="dnh-live">Live in minutes</span>

      {/* Two routing lines splitting from the number */}
      <div className="dnh-split">
        <svg className="dnh-wires" viewBox="0 0 280 68" fill="none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="dnhGrad" x1="0" y1="0" x2="1" y2="0">
              <stop className="dnh-g0" offset="0" />
              <stop className="dnh-g1" offset="1" />
            </linearGradient>
          </defs>
          <circle className="dnh-wire-node" cx="140" cy="6" r="4" fill="url(#dnhGrad)" />
          <path className="dnh-wire dnh-wire--l" d="M140 8 C 140 40, 62 30, 52 60" stroke="url(#dnhGrad)" strokeWidth="2.4" strokeLinecap="round" />
          <path className="dnh-wire dnh-wire--r" d="M140 8 C 140 40, 218 30, 228 60" stroke="url(#dnhGrad)" strokeWidth="2.4" strokeLinecap="round" />
          <circle className="dnh-wire-dot dnh-wire-dot--l" cx="52" cy="60" r="3.2" />
          <circle className="dnh-wire-dot dnh-wire-dot--r" cx="228" cy="60" r="3.2" />
        </svg>

        <div className="dnh-dests">
          <span className="dnh-dest dnh-dest--voice">
            <span className="dnh-dest-icon"><IconPhone /></span>
            <span className="dnh-dest-text">
              <strong>Voice</strong>
              <span>&rarr; your team</span>
            </span>
          </span>
          <span className="dnh-dest dnh-dest--sms">
            <span className="dnh-dest-icon"><IconChat /></span>
            <span className="dnh-dest-text">
              <strong>SMS</strong>
              <span>&rarr; your app</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default DidNumberHero
