import { useState } from 'react'
import CountryFlagSelect from './CountryFlagSelect.jsx'
import { COUNTRIES, POPULAR_COUNTRIES, OTHER_COUNTRIES, EUR_RATE } from '../data/pricingCountries.js'
import './PricingProviderCompare.css'

/**
 * "Compare SMS rates and find the best bulk deals" section for /pricing —
 * content sourced from the live smslocal.com/pricing provider-comparison
 * table (SMSLocal vs Bulksms.com), rebuilt with a new design in this
 * project's own theme. Now carries the same country + USD/EUR controls as
 * the rate calculator above it, for the same reason: the real site has both
 * on this section too.
 *
 * Figures verified live on smslocal.com/pricing, 2026-07-29, United States:
 * SMSLocal $5 minimum / $0.0305 per SMS; Bulksms.com $7 minimum / $0.0321
 * per SMS (5.2% more expensive). Rates on the live site fluctuate — treat
 * these as a dated snapshot, not a permanently fixed figure. Only US has a
 * verified pair of figures here — other countries show the same honest
 * "not published" fallback as the calculator above, rather than an invented
 * comparison.
 */
const PROVIDERS_US = [
  {
    name: 'SMSLocal.com',
    min: 5,
    rate: 0.0305,
    note: 'Lowest SMS rate in the country',
    description: 'The lowest per-message rate available for this destination, with the smallest minimum top-up — no credit system, no contract, and no volume commitment required to get it.',
    lead: true,
  },
  {
    name: 'Bulksms.com',
    min: 7,
    rate: 0.0321,
    note: '5.2% more expensive than SMSLocal',
    description: 'A comparable bulk SMS provider for the same destination, requiring a slightly higher minimum purchase at a per-message rate that runs 5.2% above SMSLocal for the same volume.',
    lead: false,
  },
]

function PricingProviderCompare() {
  const [countryCode, setCountryCode] = useState('US')
  const [currency, setCurrency] = useState('USD')

  const country = COUNTRIES.find((c) => c.code === countryCode)
  const symbol = currency === 'USD' ? '$' : '€'
  const mult = currency === 'EUR' ? EUR_RATE : 1
  const providers = countryCode === 'US' ? PROVIDERS_US : null

  return (
    <section className="section pprov-section">
      <div className="container">
        <span className="section-kicker">Compare bulk deals</span>
        <h2 className="section-title">Compare SMS rates and find the best bulk deal</h2>
        <p className="section-subtitle">
          Same destination, same volume — here's how SMSLocal stacks up against another popular provider.
        </p>

        <div className="pprov-controls">
          <CountryFlagSelect popular={POPULAR_COUNTRIES} other={OTHER_COUNTRIES} value={countryCode} onChange={setCountryCode} />

          <div className="pprov-currency" role="group" aria-label="Currency">
            <button
              type="button"
              className={currency === 'USD' ? 'pprov-currency-btn is-active' : 'pprov-currency-btn'}
              onClick={() => setCurrency('USD')}
            >
              USD
            </button>
            <button
              type="button"
              className={currency === 'EUR' ? 'pprov-currency-btn is-active' : 'pprov-currency-btn'}
              onClick={() => setCurrency('EUR')}
            >
              EUR
            </button>
          </div>
        </div>

        {!providers && (
          <p className="pprov-unavailable">
            A provider comparison for {country.name} isn't published on this preview — request a quote for a like-for-like rate.
          </p>
        )}

        {providers && (
          <div className="pprov-board">
            {providers.map((p) => (
              <div className={p.lead ? 'pprov-row pprov-row--lead' : 'pprov-row'} key={p.name}>
                <div className="pprov-name-col">
                  {p.lead && <span className="pprov-crown">Best rate</span>}
                  <span className="pprov-name">{p.name}</span>
                </div>
                <div className="pprov-stat">
                  <span className="pprov-stat-value">{symbol}{(p.min * mult).toFixed(2).replace(/\.00$/, '')}</span>
                  <span className="pprov-stat-label">Min. purchase</span>
                </div>
                <div className="pprov-stat">
                  <span className="pprov-stat-value">{symbol}{(p.rate * mult).toFixed(4)}</span>
                  <span className="pprov-stat-label">Cost per SMS</span>
                </div>
                <p className="pprov-note">{p.note}</p>
                <p className="pprov-desc">{p.description}</p>
              </div>
            ))}
          </div>
        )}

        <p className="pprov-foot">Rates shown for {country.name}, verified live on smslocal.com/pricing — rates vary by destination and may change.</p>
      </div>
    </section>
  )
}

export default PricingProviderCompare
