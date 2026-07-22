import './RcsCapabilities.css'

/**
 * Bespoke capabilities section for /rcs-business-messaging.
 * Three RCS message previews fanned like a hand of cards — each demonstrating a
 * capability (branded look, tappable actions, SMS fallback). A product
 * illustration, not a feature grid.
 */
function RcsCapabilities() {
  return (
    <section className="section rcap2-section">
      <div className="container">
        <h2 className="section-title">More than a text — a real conversation</h2>
        <p className="section-subtitle">Three things RCS gives you with SMSLocal: a branded look, tappable actions, and a safety net that never drops a customer.</p>

        <div className="rdeck">
          <figure className="rcard rcard--l">
            <div className="rcard-top"><span className="rcard-av">SL</span><strong>SMSLocal</strong><span className="rcard-tick">✓</span></div>
            <div className="rcard-tags"><span>Logo</span><span>Name</span><span>Brand color</span></div>
            <p className="rcard-note">Your business name, logo and brand color show up automatically — no more unknown numbers.</p>
            <figcaption>A branded look</figcaption>
          </figure>

          <figure className="rcard rcard--c">
            <div className="rcard-top"><span className="rcard-av">SL</span><strong>SMSLocal</strong><span className="rcard-tick">✓</span></div>
            <p className="rcard-bubble">Tap to reply — no typing needed</p>
            <div className="rcard-actions"><span className="rcard-btn rcard-btn--solid">Track order</span><span className="rcard-btn">Book a slot</span></div>
            <p className="rcard-note">Customers tap a button instead of typing a reply — faster, and no typos.</p>
            <figcaption>Tappable actions</figcaption>
          </figure>

          <figure className="rcard rcard--r">
            <div className="rcard-top"><span className="rcard-av">SL</span><strong>SMSLocal</strong><span className="rcard-tick">✓</span></div>
            <div className="rcard-fb"><span>RCS supported</span><b className="rich">rich card</b></div>
            <div className="rcard-fb"><span>No RCS on device</span><b className="sms">SMS sent</b></div>
            <p className="rcard-note">No RCS support? It lands as a normal SMS instead — nobody's left behind.</p>
            <figcaption>Automatic SMS fallback</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default RcsCapabilities
