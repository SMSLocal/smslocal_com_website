import './PricingPaymentMarquee.css'

/**
 * "Flexible payment options" section for /pricing — structurally replicated
 * from smslocal.com/pricing's payment-methods strip, rebuilt as a
 * continuous scrolling marquee. Real payment-brand logos (Visa, Mastercard,
 * PayPal, American Express — sourced via Simple Icons, verified against the
 * live dataset), not hand-drawn or recolored per the real-logo-sourcing rule.
 */
const METHODS = [
  { name: 'Visa', src: '/logos/visa.svg' },
  { name: 'Mastercard', src: '/logos/mastercard.svg' },
  { name: 'PayPal', src: '/logos/paypal.svg' },
  { name: 'American Express', src: '/logos/americanexpress.svg' },
]

// Duplicated once so the CSS marquee can loop seamlessly at -50%.
const TRACK = [...METHODS, ...METHODS]

function PricingPaymentMarquee() {
  return (
    <section className="section ppay-section">
      <div className="container">
        <div className="ppay-grid">
          <div className="ppay-copy">
            <span className="section-kicker">Flexible payment options</span>
            <h2 className="section-title">Pay however works for your business</h2>
            <p className="section-subtitle">
              Use any of the following secure payment methods to purchase credits — no upfront costs, no contracts.
            </p>
          </div>

          <div className="ppay-marquee">
            <div className="ppay-track">
              {TRACK.map((m, i) => (
                <span className="ppay-logo" key={`${m.name}-${i}`}>
                  <img src={m.src} alt={m.name} />
                  <span className="ppay-logo-label">{m.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingPaymentMarquee
