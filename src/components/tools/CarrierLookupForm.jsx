import { useState } from 'react'
import PhoneCountrySelect from '../PhoneCountrySelect.jsx'
import { DIAL_CODES } from '../../data/dialCodes.js'

// Line types as libphonenumber reports them. Every label is rendered (hidden)
// up front so locale pages translate it — see the note in SmsTestForm.jsx.
const TYPES = {
  MOBILE: 'Mobile',
  FIXED_LINE: 'Landline',
  FIXED_LINE_OR_MOBILE: 'Mobile or landline',
  VOIP: 'VoIP',
  TOLL_FREE: 'Toll-free',
  PREMIUM_RATE: 'Premium rate',
  SHARED_COST: 'Shared cost',
  PERSONAL_NUMBER: 'Personal number',
  PAGER: 'Pager',
  UAN: 'Universal access number',
  VOICEMAIL: 'Voicemail',
  UNKNOWN: 'Unknown',
}

const MESSAGES = {
  invalid_number: "That doesn't look like a phone number for the selected country. Check the digits and try again.",
  rate_limited: "You've made a lot of lookups in a short time. Please wait a few minutes and try again.",
  network: 'Something went wrong. Please check your connection and try again.',
}

const countryName = (code) => DIAL_CODES.find((c) => c.code === code)?.name || code

export default function CarrierLookupForm() {
  const [country, setCountry] = useState(DIAL_CODES[0].code)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)

  async function lookup(e) {
    e.preventDefault()
    setStatus('loading')
    setCode('')
    try {
      const res = await fetch('/api/tools/carrier-lookup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, number }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setResult(data)
        setStatus('done')
      } else {
        setResult(null)
        setStatus('error')
        setCode(MESSAGES[data.code] ? data.code : 'network')
      }
    } catch {
      setResult(null)
      setStatus('error')
      setCode('network')
    }
  }

  const r = result || {}
  const shown = status === 'done'
  const nanp = r.callingCode === '1'

  return (
    <div className="tool-card">
      <form className="tool-step" onSubmit={lookup}>
        <h3 className="tool-step-title">Look up a phone number</h3>
        <div className="contact-field">
          <label htmlFor="carrier-number">Phone number</label>
          <div className="contact-phone-row">
            <PhoneCountrySelect value={country} onChange={setCountry} />
            <input
              id="carrier-number"
              type="tel"
              inputMode="tel"
              placeholder="Enter phone number"
              pattern="[0-9\s()+.-]{4,24}"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary tool-submit" disabled={status === 'loading'}>
          <span hidden={status === 'loading'}>Look up carrier</span>
          <span hidden={status !== 'loading'}>Looking up…</span>
        </button>
      </form>

      <div className="tool-result" hidden={!shown} aria-live="polite">
        <p className="tool-result-number" data-no-translate>{r.international}</p>
        <p className="tool-badge tool-badge-bad" hidden={!shown || r.valid}>
          This number is not in use or not valid for its country.
        </p>
        <dl className="tool-summary">
          <dt>Carrier</dt>
          <dd>
            <span data-no-translate hidden={!r.carrier}>{r.carrier}</span>
            <span hidden={Boolean(r.carrier) || !nanp}>Not available for US and Canadian numbers</span>
            <span hidden={Boolean(r.carrier) || nanp}>Not available</span>
          </dd>
          <dt>Line type</dt>
          <dd>
            {Object.entries(TYPES).map(([key, label]) => (
              <span key={key} hidden={(r.type || 'UNKNOWN') !== key}>{label}</span>
            ))}
          </dd>
          <dt>Country</dt>
          <dd data-no-translate>{r.country ? `${countryName(r.country)} (+${r.callingCode})` : `+${r.callingCode || ''}`}</dd>
          <dt hidden={!r.location}>Location</dt>
          <dd data-no-translate hidden={!r.location}>{r.location}</dd>
          <dt hidden={!r.timezones?.length}>Time zone</dt>
          <dd data-no-translate hidden={!r.timezones?.length}>{(r.timezones || []).join(', ')}</dd>
        </dl>
        <p className="tool-note" hidden={!r.carrier}>
          This is the network the number was originally issued by. If it has been ported to another carrier since,
          the current network may differ.
        </p>
        <p className="tool-note" hidden={!nanp || Boolean(r.carrier)}>
          US and Canadian numbers move freely between carriers, so the original network isn't a reliable guide.
          For live carrier checks at volume, talk to our team.
        </p>
      </div>

      <div className="tool-errors" role="alert">
        {Object.entries(MESSAGES).map(([key, text]) => (
          <p key={key} className="tool-error" hidden={status !== 'error' || code !== key}>{text}</p>
        ))}
      </div>
    </div>
  )
}
