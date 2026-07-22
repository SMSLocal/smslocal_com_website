import './StitchedSeamCompare.css'

// Bespoke contrast: a stitched stack of five mismatched pieces vs one seamless
// platform bar. Floats on the section background - no card wraps the visual.
const PIECES = [
  { label: 'API', vendor: 'Vendor A' },
  { label: 'Chatbot', vendor: 'Vendor B' },
  { label: 'Campaigns', vendor: 'Vendor C' },
  { label: 'Inbox', vendor: 'Vendor D' },
  { label: 'Numbers', vendor: 'Vendor E' },
]

const CAPS = ['API', 'Chatbot', 'Campaigns', 'Inbox', 'Numbers']

function StitchedSeamCompare() {
  return (
    <section className="section section-alt ssc-section">
      <div className="container">
        <span className="section-kicker">The difference</span>
        <h2 className="section-title">A stitched stack, or one seamless platform</h2>
        <p className="section-subtitle">
          Five tools bolted together never quite line up. One platform is a single, unbroken surface -
          same capabilities, no seams.
        </p>

        <div
          className="ssc-stage"
          role="img"
          aria-label="Top: five mismatched tools stitched together into an uneven strip, with a separate contract, login and bill at every seam. Bottom: the same five capabilities on one seamless SMSLocal platform bar with one contract, one login and one bill."
        >
          <div className="ssc-line">
            <span className="ssc-tag ssc-tag--bad">Before &middot; a stitched stack</span>
            <div className="ssc-strip">
              {PIECES.map((p, i) => (
                <span className={`ssc-piece ssc-piece--${i}`} key={p.label}>
                  <span className="ssc-piece-label">{p.label}</span>
                  <span className="ssc-piece-vendor">{p.vendor}</span>
                  {i < PIECES.length - 1 && <span className="ssc-seam" aria-hidden="true" />}
                </span>
              ))}
            </div>
            <div className="ssc-notes ssc-notes--bad">
              <span>5 contracts</span>
              <span>5 logins</span>
              <span>5 bills</span>
              <span>data gaps</span>
            </div>
          </div>

          <div className="ssc-line">
            <span className="ssc-tag ssc-tag--good">After &middot; one SMSLocal platform</span>
            <div className="ssc-bar">
              <span className="ssc-bar-sheen" aria-hidden="true" />
              {CAPS.map((c) => (
                <span className="ssc-cap" key={c}>{c}</span>
              ))}
            </div>
            <div className="ssc-notes ssc-notes--good">
              <span>1 contract</span>
              <span>1 login</span>
              <span>1 bill</span>
              <span>1 record</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StitchedSeamCompare
