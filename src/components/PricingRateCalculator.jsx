import { useMemo, useState } from 'react'
import CountryFlagSelect from './CountryFlagSelect.jsx'
import { COUNTRIES, POPULAR_COUNTRIES, OTHER_COUNTRIES, EUR_RATE } from '../data/pricingCountries.js'
import './PricingRateCalculator.css'

/**
 * Bespoke section for /pricing — structurally replicated from the real,
 * live smslocal.com/pricing page: a country selector, a USD/EUR toggle, a
 * preset-amount rate table, and a live "type an amount, see the SMS count"
 * calculator row. New visual design in this project's theme; the rate data
 * itself is real, fetched from the live site (see the trailing note).
 *
 * Only United States carries a verified real rate — see RATES in
 * ../data/pricingCountries.js for the currently-used figure and sourcing
 * note. The live site's other "popular countries" (UK, UAE, Australia,
 * Spain) did not return a fetchable per-country rate through this tool's
 * country-selector widget, so — rather than inventing numbers for them —
 * they're listed as selectable but show a "request rate" state instead of
 * a fabricated figure.
 */

const AMOUNTS = [10, 25, 50, 100]

function formatRate(rate, currency) {
  if (rate == null) return '—'
  const value = currency === 'EUR' ? rate * EUR_RATE : rate
  const symbol = currency === 'EUR' ? '€' : '$'
  return `${symbol}${value.toFixed(4)}`
}

function PricingRateCalculator() {
  const [countryCode, setCountryCode] = useState('US')
  const [currency, setCurrency] = useState('USD')
  const [customAmount, setCustomAmount] = useState('100')

  const country = COUNTRIES.find((c) => c.code === countryCode)
  const symbol = currency === 'USD' ? '$' : '€'
  const rate = country.rate == null ? null : currency === 'EUR' ? country.rate * EUR_RATE : country.rate

  const customCount = useMemo(() => {
    const amt = parseFloat(customAmount)
    if (rate == null || Number.isNaN(amt) || amt <= 0) return null
    return Math.floor(amt / rate)
  }, [customAmount, rate])

  return (
    <section className="section prate-section">
      <div className="container">
        <span className="section-kicker">SMS rate calculator</span>
        <h2 className="section-title">See exactly what you pay, before you pay it</h2>
        <p className="section-subtitle">
          Pick a country and currency, then see the live rate and how many messages your budget buys.
        </p>

        <div className="prate">
          <div className="prate-controls">
            <CountryFlagSelect popular={POPULAR_COUNTRIES} other={OTHER_COUNTRIES} value={countryCode} onChange={setCountryCode} />

            <div className="prate-currency" role="group" aria-label="Currency">
              <button
                type="button"
                className={currency === 'USD' ? 'prate-currency-btn is-active' : 'prate-currency-btn'}
                onClick={() => setCurrency('USD')}
              >
                USD
              </button>
              <button
                type="button"
                className={currency === 'EUR' ? 'prate-currency-btn is-active' : 'prate-currency-btn'}
                onClick={() => setCurrency('EUR')}
              >
                EUR
              </button>
            </div>
          </div>

          {rate == null && (
            <p className="prate-unavailable">
              Live rates for {country.name} aren't published on this preview — request a quote to get your exact per-SMS rate.
            </p>
          )}

          <div className="prate-table">
            <p className="prate-table-desc">
              Top up any of these amounts and see exactly how many messages it covers for {country.name} — or enter your own amount below.
            </p>

            <div className="prate-row prate-head">
              <span>Amount</span>
              <span>Rate per SMS</span>
              <span>Number of SMS</span>
            </div>

            {AMOUNTS.map((amt) => (
              <div className="prate-row" key={amt}>
                <span className="prate-amount">{symbol}{amt}</span>
                <span className="prate-rate">{formatRate(country.rate, currency)}</span>
                <span className="prate-count">{rate ? Math.floor(amt / rate).toLocaleString() : '—'}</span>
              </div>
            ))}

            <div className="prate-row prate-row--custom">
              <span className="prate-custom-input">
                <span className="prate-custom-symbol">{symbol}</span>
                <input
                  type="number"
                  min="0"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  aria-label="Custom amount"
                />
              </span>
              <span className="prate-rate">{formatRate(country.rate, currency)}</span>
              <span className="prate-count prate-count--custom">{customCount != null ? customCount.toLocaleString() : '—'}</span>
            </div>
          </div>

          <p className="prate-foot">
            Rate shown for {country.name}, verified live on smslocal.com/pricing · no credit system, no contracts.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PricingRateCalculator
