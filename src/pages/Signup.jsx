import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import '../components/SignupFlow.css'
import { COUNTRIES, CURRENCIES, DIAL_CODES, INDUSTRIES } from '../data/signupOptions.js'
import { IconCheck } from '../components/icons.jsx'

const BENEFITS = [
  'Free trial credit included, no card required',
  'Send SMS, WhatsApp, RCS & voice from one API',
  'AI agents that resolve tickets around the clock',
  'Live in minutes — no code, no integration work',
  'Pay only for what you send, cancel anytime',
]

// This is the real 3-step partner-registration flow shipped in the
// bulksms-partner-signup WordPress plugin (email -> code -> full form),
// reimplemented as a React page that talks to the live plugin's AJAX
// handlers instead of the PHP-rendered shortcode. Requires the plugin to be
// active on the WordPress backend below.
const WP_AJAX_URL = 'https://www.smslocal.com/wp-admin/admin-ajax.php'
const TURNSTILE_SITEKEY = '0x4AAAAAABbL2RN0Z6ROmEVU'
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve()
  if (window.__turnstileLoading) return window.__turnstileLoading
  window.__turnstileLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = TURNSTILE_SRC
    script.async = true
    script.defer = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
  return window.__turnstileLoading
}

// Posts to WordPress admin-ajax.php the same way the plugin's jQuery does:
// action + a urlencoded form_data blob that PHP unpacks with parse_str().
async function callWpAjax(action, fields) {
  const body = new URLSearchParams({
    action,
    form_data: new URLSearchParams(fields).toString(),
  })
  const res = await fetch(WP_AJAX_URL, {
    method: 'POST',
    credentials: 'include', // the verify-code step relies on the PHP session cookie
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    throw new Error('Unexpected response from server')
  }
}

// The final step requires a WP nonce (wp_verify_nonce). It can only be
// generated server-side, so we ask the plugin for one. If the plugin hasn't
// been updated with this small helper action yet, this fails gracefully and
// the final submit will surface the server's own "Security check failed"
// message instead of silently pretending to work.
async function fetchSignupNonce() {
  try {
    const data = await callWpAjax('did_get_signup_nonce', {})
    return data?.nonce || ''
  } catch {
    return ''
  }
}

function CaptchaWidget({ active, onToken }) {
  const containerRef = useRef(null)
  const widgetId = useRef(null)

  useEffect(() => {
    if (!active) return
    let cancelled = false

    loadTurnstile().then(() => {
      if (cancelled || !containerRef.current || !window.turnstile) return
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITEKEY,
        callback: (token) => onToken(token),
      })
    })

    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  if (!active) return null
  return <div className="signup-captcha"><div ref={containerRef} /></div>
}

function StepDots({ step }) {
  const order = ['email', 'code', 'form']
  const idx = order.indexOf(step === 'done' ? 'form' : step)
  return (
    <div className="signup-steps">
      {order.map((s, i) => (
        <span
          key={s}
          className={
            'signup-step-dot' +
            (i < idx || step === 'done' ? ' done' : i === idx ? ' active' : '')
          }
        />
      ))}
    </div>
  )
}

function Signup() {
  const [step, setStep] = useState('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  const [firstname, setFirstname] = useState('')
  const [surname, setSurname] = useState('')
  const [shortName, setShortName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [industry, setIndustry] = useState('')
  const [country, setCountry] = useState('')
  const [currency, setCurrency] = useState('')
  const [dialCode, setDialCode] = useState(DIAL_CODES[0].code)
  const [phone, setPhone] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const formEnteredAt = useRef(null)
  useEffect(() => {
    if (step === 'form') formEnteredAt.current = Math.floor(Date.now() / 1000)
  }, [step])

  async function handleEmailSubmit(e) {
    e.preventDefault()
    setError('')
    if (!captchaToken) {
      setError('Please complete the CAPTCHA verification first.')
      return
    }
    setLoading(true)
    try {
      const res = await callWpAjax('did_check_email', { email })
      if (res.success) {
        setStep('code')
        setCaptchaToken('')
      } else {
        setError(res.message || 'Something went wrong')
      }
    } catch {
      setError('There was an error processing the form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCodeSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await callWpAjax('did_verify_code', { code })
      if (res.success) {
        setStep('form')
      } else {
        setError(res.message || 'Something went wrong')
      }
    } catch {
      setError('There was an error processing the form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleFinalSubmit(e) {
    e.preventDefault()
    setError('')
    if (!captchaToken) {
      setError('Please complete the CAPTCHA verification first.')
      return
    }
    if (!acceptedTerms) {
      setError('Please accept the terms and privacy policy to continue.')
      return
    }
    setLoading(true)
    try {
      const nonce = await fetchSignupNonce()
      const res = await callWpAjax('did_bulksms_partner_signup', {
        companyName,
        shortName,
        firstname,
        surname,
        email,
        phone: `${dialCode}${phone.replace(/\D/g, '')}`,
        country,
        currency,
        industry,
        form_time: String(formEnteredAt.current || Math.floor(Date.now() / 1000) - 5),
        bulksms_signup_nonce: nonce,
      })
      if (res.success) {
        setStep('done')
      } else {
        setError(res.message || 'Something went wrong')
      }
    } catch {
      setError('There was an error processing the form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo
        title="Start Free Trial"
        description="Create your free SMSLocal account — send bulk SMS, build chatbots and deploy AI agents in minutes."
      />

      <section className="signup-split-page">
        <div className="signup-info-panel">
          <span className="signup-info-glow" aria-hidden="true" />
          <div className="signup-info-inner">
            <span className="signup-info-badge">Free Trial · No Card Required</span>
            <h1 className="signup-info-title">
              Everything you need to <span className="grad-word">talk to customers</span>, in one platform
            </h1>
            <p className="signup-info-sub">
              SMS, WhatsApp, RCS, voice and AI agents — one account, one API, no juggling vendors.
            </p>

            <ul className="signup-benefits">
              {BENEFITS.map((b) => (
                <li key={b}>
                  <span className="signup-benefit-check"><IconCheck /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="signup-form-panel">
          <div className="signup-form-inner">
            {step !== 'done' && <StepDots step={step} />}

            {step === 'email' && (
              <>
                <h1 className="signup-title">Start your free trial</h1>
                <p className="signup-subtitle">No credit card required — includes free trial credit.</p>

                <form className="signup-form" onSubmit={handleEmailSubmit}>
                  <div className="signup-field">
                    <label htmlFor="signup-email">Work email <span className="required">*</span></label>
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <CaptchaWidget active={step === 'email'} onToken={setCaptchaToken} />

                  {error && <p className="signup-message error">{error}</p>}

                  <button type="submit" className="btn btn-primary signup-submit" disabled={loading}>
                    {loading ? 'Sending…' : 'Verify Email for Free SMS'}
                  </button>
                </form>

                <p className="signup-footer-note">
                  Already have an account? <Link to="/login" className="auth-link">Log in</Link>
                </p>
              </>
            )}

            {step === 'code' && (
              <>
                <h1 className="signup-title">Check your inbox</h1>
                <p className="signup-subtitle">Your code has been sent to {email}</p>

                <form className="signup-form" onSubmit={handleCodeSubmit}>
                  <div className="signup-field">
                    <label htmlFor="signup-code">Paste your code here <span className="required">*</span></label>
                    <input
                      id="signup-code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>

                  {error && <p className="signup-message error">{error}</p>}

                  <button type="submit" className="btn btn-primary signup-submit" disabled={loading}>
                    {loading ? 'Checking…' : 'Submit'}
                  </button>
                  <button type="button" className="signup-back" onClick={() => setStep('email')}>
                    ← Use a different email
                  </button>
                </form>
              </>
            )}

            {step === 'form' && (
              <>
                <h1 className="signup-title">Tell us about your business</h1>
                <p className="signup-subtitle">Almost done — this sets up your BulkSMS partner account.</p>

                <form className="signup-form" onSubmit={handleFinalSubmit}>
                  <div className="signup-split">
                    <div className="signup-field">
                      <label htmlFor="signup-firstname">First Name <span className="required">*</span></label>
                      <input id="signup-firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                    </div>
                    <div className="signup-field">
                      <label htmlFor="signup-surname">Last Name <span className="required">*</span></label>
                      <input id="signup-surname" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                    </div>
                  </div>

                  <div className="signup-field">
                    <label htmlFor="signup-shortname">Short Name <span className="required">*</span></label>
                    <input id="signup-shortname" type="text" value={shortName} onChange={(e) => setShortName(e.target.value)} required />
                  </div>

                  <div className="signup-split">
                    <div className="signup-field">
                      <label>Email</label>
                      <input type="email" value={email} disabled />
                    </div>
                    <div className="signup-field">
                      <label htmlFor="signup-phone">Phone Number <span className="required">*</span></label>
                      <div className="signup-phone-row">
                        <select value={dialCode} onChange={(e) => setDialCode(e.target.value)} aria-label="Country dial code">
                          {DIAL_CODES.map((d) => (
                            <option key={d.iso} value={d.code}>+{d.code}</option>
                          ))}
                        </select>
                        <input
                          id="signup-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="signup-split">
                    <div className="signup-field">
                      <label htmlFor="signup-company">Company Name <span className="required">*</span></label>
                      <input id="signup-company" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                    </div>
                    <div className="signup-field">
                      <label htmlFor="signup-industry">Industry</label>
                      <select id="signup-industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                        <option value="">Select Industry</option>
                        {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="signup-split">
                    <div className="signup-field">
                      <label htmlFor="signup-country">Country <span className="required">*</span></label>
                      <select id="signup-country" value={country} onChange={(e) => setCountry(e.target.value)} required>
                        <option value="" disabled>Select a country</option>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="signup-field">
                      <label htmlFor="signup-currency">Currency <span className="required">*</span></label>
                      <select id="signup-currency" value={currency} onChange={(e) => setCurrency(e.target.value)} required>
                        <option value="">Payment Currency</option>
                        {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <label className="signup-terms">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      required
                    />
                    By continuing I accept the <Link to="/terms-and-conditions" target="_blank">terms</Link> and{' '}
                    <Link to="/privacy-policy" target="_blank">privacy policy</Link>
                  </label>

                  <CaptchaWidget active={step === 'form'} onToken={setCaptchaToken} />

                  {error && <p className="signup-message error">{error}</p>}

                  <button type="submit" className="btn btn-primary signup-submit" disabled={loading}>
                    {loading ? 'Submitting…' : 'Submit'}
                  </button>
                </form>
              </>
            )}

            {step === 'done' && (
              <div className="signup-done">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                </svg>
                <h2>Thanks for signing up with us</h2>
                <p>You will get a confirmation message in your email shortly.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup
