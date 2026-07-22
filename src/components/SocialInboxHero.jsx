import './SocialInboxHero.css'

/**
 * Hero visual for the Social media inbox page.
 * Tells the MANY-to-ONE story: five platform glyph badges (Instagram,
 * Messenger, WhatsApp, Telegram, LINE) each emit a message that streams
 * inward and stacks as rows in ONE unified inbox thread column — every row
 * keeps its little source badge — and a single composer replies once.
 * Pure-CSS animated loop: messages arrive one-by-one and a brand-gradient
 * highlight walks down to the active row. Falls back to a fully-assembled
 * static inbox when the visitor prefers reduced motion. Non-container: the
 * rows float on the page with thin dividers, not inside a framing card.
 */

// Small decorative platform glyphs (aria-hidden). Kept generic and monochrome
// so they tint with the row's accent colour rather than imitating any brand.
const GLYPHS = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  messenger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4C7 4 3 7.7 3 12.2c0 2.4 1.2 4.6 3.1 6V21l2.9-1.6c1 .3 2 .4 3 .4 5 0 9-3.7 9-8.2S17 4 12 4z" />
      <path d="M7.5 13.3l3-3.1 2 2 3-3" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12a7.6 7.6 0 0 1-11 6.8L4 20l1.3-4.1A7.6 7.6 0 1 1 20 12z" />
      <path d="M9.4 9.4c.4 3 2.2 4.8 5.2 5.2l1-1.3-2-1-.9.7c-.9-.5-1.6-1.2-2-2l.7-.9-1-2z" fill="currentColor" stroke="none" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 5L3 12l5 1.8L10 19l2.7-3.1L17 19l4-14z" />
      <path d="M8 13.8l9-6.2" />
    </svg>
  ),
  line: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="13" rx="5.5" />
      <path d="M8.5 17.5L7 20.5l4.3-3" />
    </svg>
  ),
}

const SOURCES = [
  { key: 'instagram', tint: 'ig' },
  { key: 'messenger', tint: 'ms' },
  { key: 'whatsapp', tint: 'wa' },
  { key: 'telegram', tint: 'tg' },
  { key: 'line', tint: 'ln' },
]

const ROWS = [
  { key: 'instagram', tint: 'ig', name: 'Priya', text: 'Is the mint dress back in stock?', time: '2m' },
  { key: 'messenger', tint: 'ms', name: 'Daniel', text: 'Can I move delivery to Friday?', time: '5m' },
  { key: 'whatsapp', tint: 'wa', name: 'Aisha', text: 'Where is order #5120?', time: '8m' },
  { key: 'telegram', tint: 'tg', name: 'Marco', text: 'Do you ship to Lisbon?', time: '12m' },
  { key: 'line', tint: 'ln', name: 'Yuki', text: 'Perfect, thank you!', time: '15m' },
]

function SocialInboxHero() {
  return (
    <div className="sih" aria-hidden="true">
      {/* Sources — many channels */}
      <div className="sih-sources">
        {SOURCES.map((s, i) => (
          <span className={`sih-src sih-tint--${s.tint} sih-src--${i}`} key={s.key}>
            {GLYPHS[s.key]}
          </span>
        ))}
      </div>

      {/* Converging fan — everything flows into one column */}
      <svg className="sih-fan" viewBox="0 0 308 34" preserveAspectRatio="none">
        {[26, 96, 154, 212, 282].map((cx, i) => (
          <g key={cx}>
            <path className="sih-fan-line" d={`M${cx} 2 C ${cx} 18, 154 14, 154 32`} />
            <path className={`sih-fan-pulse sih-fan-pulse--${i}`} d={`M${cx} 2 C ${cx} 18, 154 14, 154 32`} pathLength="100" />
          </g>
        ))}
      </svg>

      {/* One unified inbox */}
      <div className="sih-inbox">
        <div className="sih-inbox-label">
          <span>Shared inbox</span>
          <span className="sih-inbox-count">5 open</span>
        </div>

        <div className="sih-rows">
          <span className="sih-hi" />
          {ROWS.map((r, i) => (
            <div className={`sih-row sih-row--${i}`} key={r.name}>
              <span className={`sih-badge sih-tint--${r.tint}`}>{GLYPHS[r.key]}</span>
              <span className="sih-row-main">
                <span className="sih-row-name">{r.name}</span>
                <span className="sih-row-text">{r.text}</span>
              </span>
              <span className="sih-row-time">{r.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reply once */}
      <div className="sih-composer">
        <span className="sih-composer-field">Reply to Daniel…</span>
        <span className="sih-send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h13M12 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default SocialInboxHero
