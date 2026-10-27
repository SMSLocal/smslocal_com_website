import { useState } from 'react'
import PhoneCountrySelect from '../PhoneCountrySelect.jsx'
import { DIAL_CODES } from '../../data/dialCodes.js'
import Turnstile from './Turnstile.jsx'
import { track } from '../../lib/track.js'

// The fixed text both SMS tools send. Mirrors TEST_MESSAGE in api/_lib/tools.js
// (the server never takes message content from the visitor).
export const TEST_MESSAGE = 'SMSLocal: Test globally. Free SMS test now.'

// Every message the form can show. All of them are rendered (hidden) from the
// start, so they are in the prerendered HTML and get translated on locale
// pages — a string that only appears after an API call would stay English.
const MESSAGES = {
  invalid_details: 'Please enter your name and a valid email address.',
  invalid_number: "That doesn't look like a valid phone number for the selected country.",
  not_mobile: 'That number looks like a landline. Please enter a mobile number.',
  captcha: "We couldn't verify that you're human. Please try again.",
  rate_limited: "You've reached the free test limit for today. Please try again in 24 hours.",
  unavailable: 'The free SMS test is temporarily unavailable. Please try again later.',
  failed: 'The message could not be sent. Please check the number and try again.',
  network: 'Something went wrong. Please check your connection and try again.',
}

/**
 * `tool` is 'send-text' (three steps: details → number → send, and the
 * details are passed on as a lead) or 'text-free' (number → send).
 */
export default function SmsTestForm({ tool }) {
  const withDetails = tool === 'send-text'
  const [step, setStep] = useState(withDetails ? 1 : 2)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState(DIAL_CODES[0].code)
  const [number, setNumber] = useState('')
  const [token, setToken] = useState('')
  const [captchaKey, setCaptchaKey] = useState(0)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [code, setCode] = useState('')

  const dial = DIAL_CODES.find((c) => c.code === country)?.dial || ''
  // A number typed with its own +country code wins over the picker, same as
  // on the server.
  const fullNumber = number.trim().startsWith('+') ? number.trim() : `${dial} ${number}`.trim()

  function nextFromDetails(e) {
    e.preventDefault()
    setCode('')
    setStatus('idle')
    setStep(2)
  }

  function nextFromNumber(e) {
    e.preventDefault()
    setCode('')
    setStatus('idle')
    setStep(3)
  }

  async function send() {
    setStatus('sending')
    setCode('')
    try {
      const res = await fetch('/api/tools/send-test-sms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, name, email, country, number, token }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setStatus('sent')
        track('test_sms_sent', { tool })
      } else {
        setStatus('error')
        setCode(MESSAGES[data.code] ? data.code : 'network')
        track('test_sms_failed', { tool, code: MESSAGES[data.code] ? data.code : 'network' })
        // Bad details or number: send them back to the step that can fix it.
        if (data.code === 'invalid_details') setStep(1)
        if (data.code === 'invalid_number' || data.code === 'not_mobile') setStep(2)
      }
    } catch {
      setStatus('error')
      setCode('network')
      track('test_sms_failed', { tool, code: 'network' })
    }
    // Turnstile tokens are single-use.
    setToken('')
    setCaptchaKey((k) => k + 1)
  }

  function startOver() {
    setStatus('idle')
    setCode('')
    setNumber('')
    setStep(withDetails ? 1 : 2)
  }

  const total = withDetails ? 3 : 2
  const shownStep = withDetails ? step : step - 1

  return (
    <div className="tool-card">
      <div className="tool-card-head">
        {/* Whole sentences, one per step, so each translates as a unit. */}
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className="tool-step-count" hidden={shownStep !== i + 1}>
            {`Step ${i + 1} of ${total}`}
          </span>
        ))}
        <div className="tool-progress" aria-hidden="true">
          <span style={{ width: `${(shownStep / total) * 100}%` }} />
        </div>
      </div>

      {withDetails && (
        <form className="tool-step" hidden={step !== 1 || status === 'sent'} onSubmit={nextFromDetails}>
          <h3 className="tool-step-title">Your details</h3>
          <div className="contact-field">
            <label htmlFor={`${tool}-name`}>Full name</label>
            <input
              id={`${tool}-name`}
              type="text"
              autoComplete="name"
              maxLength={100}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="contact-field">
            <label htmlFor={`${tool}-email`}>Email address</label>
            <input
              id={`${tool}-email`}
              type="email"
              autoComplete="email"
              maxLength={200}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary tool-submit">Next</button>
        </form>
      )}

      <form className="tool-step" hidden={step !== 2 || status === 'sent'} onSubmit={nextFromNumber}>
        <h3 className="tool-step-title">{withDetails ? 'Your mobile number' : 'Text my phone'}</h3>
        {!withDetails && (
          <p className="tool-step-sub">Enter your mobile number to receive a test message from SMSLocal.</p>
        )}
        <div className="contact-field">
          <label htmlFor={`${tool}-number`}>Mobile number</label>
          <div className="contact-phone-row">
            <PhoneCountrySelect value={country} onChange={setCountry} />
            <input
              id={`${tool}-number`}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="Phone number"
              pattern="[0-9\s()+.-]{4,24}"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="tool-step-actions">
          {withDetails && (
            <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>
          )}
          <button type="submit" className="btn btn-primary tool-submit">Next</button>
        </div>
      </form>

      <div className="tool-step" hidden={step !== 3 || status === 'sent'}>
        <h3 className="tool-step-title">Send your test message</h3>
        <dl className="tool-summary">
          {withDetails && (
            <>
              <dt>Name</dt>
              <dd data-no-translate>{name}</dd>
              <dt>Email</dt>
              <dd data-no-translate>{email}</dd>
            </>
          )}
          <dt>Phone</dt>
          <dd data-no-translate>{fullNumber}</dd>
        </dl>
        <div className="tool-template">
          <span className="tool-template-label">Message</span>
          <p data-no-translate>{TEST_MESSAGE}</p>
        </div>
        {step === 3 && status !== 'sent' && (
          <Turnstile
            onToken={setToken}
            onError={() => {
              setStatus('error')
              setCode('captcha')
            }}
            resetKey={captchaKey}
          />
        )}
        <div className="tool-step-actions">
          <button type="button" className="btn btn-ghost" onClick={() => setStep(2)} disabled={status === 'sending'}>
            Back
          </button>
          <button
            type="button"
            className="btn btn-primary tool-submit"
            onClick={send}
            disabled={status === 'sending' || !token}
          >
            <span hidden={status === 'sending'}>Send message</span>
            <span hidden={status !== 'sending'}>Sending…</span>
          </button>
        </div>
        <p className="tool-note" hidden={Boolean(token) || status !== 'idle'}>Checking your browser…</p>
      </div>

      <div className="tool-result tool-result-ok" hidden={status !== 'sent'} role="status">
        <h3>Message sent!</h3>
        <p>
          Your test message is on its way to <strong data-no-translate>{fullNumber}</strong>. It usually arrives
          within a minute.
        </p>
        <button type="button" className="btn btn-ghost" onClick={startOver}>Send another test</button>
      </div>

      <div className="tool-errors" role="alert">
        {Object.entries(MESSAGES).map(([key, text]) => (
          <p key={key} className="tool-error" hidden={status !== 'error' || code !== key}>{text}</p>
        ))}
      </div>
    </div>
  )
}
