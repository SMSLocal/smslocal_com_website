import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import '../components/SignupFlow.css'
import { COUNTRIES, CURRENCIES, DIAL_CODES, INDUSTRIES, countryIso } from '../data/signupOptions.js'
import FlagSelect from '../components/FlagSelect.jsx'

const DIAL_CODE_OPTIONS = DIAL_CODES.map((d) => ({ value: d.code, iso: d.iso, label: d.label }))
const COUNTRY_OPTIONS = COUNTRIES.map((name) => ({ value: name, iso: countryIso(name), label: name }))
import { IconCheck } from '../components/icons.jsx'

function tokenStorageKey(email) {
  return `smslocal_signup_token:${email}`
}

// sessionStorage doesn't exist during SSR/prerendering (Node has no window),
// so every access goes through here rather than being called directly.
function readStoredToken(email) {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem(tokenStorageKey(email)) || ''
}

function clearStoredToken(email) {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(tokenStorageKey(email))
}

function IconGift() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h10" stroke="#ec4899" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function Register() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const email = searchParams.get('email') || ''
  const [token] = useState(() => location.state?.token || readStoredToken(email))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // Set once the account is created: the page then thanks the user instead of
  // sending them straight to a login form they have no credentials for yet.
  const [loginUrl, setLoginUrl] = useState('')

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

  const enteredAt = useRef(Math.floor(Date.now() / 1000))

  useEffect(() => {
    // No email/token to work with — this page needs both, whether that's a
    // stale bookmark or someone landing here directly (e.g. an old blog
    // post CTA that still points at /register/). Restart at step one.
    if (!email || !token) {
      navigate('/signup/', { replace: true })
    }
  }, [email, token, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!country) {
      setError('Please select a country.')
      return
    }
    if (!acceptedTerms) {
      setError('Please accept the terms and privacy policy to continue.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/signup/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          companyName,
          shortName,
          firstname,
          surname,
          email,
          phone: `${dialCode}${phone.replace(/\D/g, '')}`,
          country,
          currency,
          industry,
          formEnteredAt: String(enteredAt.current),
        }),
      })
      const data = await res.json()
      if (data.success) {
        clearStoredToken(email)
        setLoginUrl(data.redirect || 'https://secure.smslocal.com/cpaas/auth/login?returnUrl=%2Fcpaas%2Fpages')
        window.scrollTo({ top: 0 })
      } else {
        setError(data.message || 'Something went wrong')
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
        title="Set Up Your SMSLocal Account"
        description="Add your business details to finish creating your SMSLocal partner account and get to your dashboard."
      />
      <meta name="robots" content="noindex" />

      <section className="signup-split-page">
        <div className="signup-info-panel">
          <span className="signup-info-glow" aria-hidden="true" />
          <div className="signup-info-inner">
            <span className="signup-info-badge">Step 3 of 3 · Business details</span>
            <h1 className="signup-info-title">
              Almost there — <span className="grad-word">set up your account</span>
            </h1>
            <p className="signup-info-sub">
              This sets up your BulkSMS partner account and gets your dashboard ready.
            </p>

            <ul className="signup-benefits">
              <li>
                <span className="signup-benefit-check"><IconCheck /></span>
                Work email submitted
              </li>
              <li>
                <span className="signup-benefit-check"><IconCheck /></span>
                Email verified
              </li>
              <li>
                <span className="signup-benefit-check" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ec4899' }} />
                </span>
                <strong style={{ color: '#fff' }}>Business details</strong>
              </li>
            </ul>

            <div className="signup-trust-card">
              <div className="signup-trust-card-head">
                <IconGift />
                <span>Free trial credit included</span>
              </div>
              <p>No card required to get started — you can send your first SMS the moment this form is submitted.</p>
            </div>
          </div>
        </div>

        <div className="signup-form-panel">
          <div className="signup-form-inner">
            <div className="signup-steps">
              <span className="signup-step-dot done" />
              <span className="signup-step-dot done" />
              <span className={`signup-step-dot ${loginUrl ? 'done' : 'active'}`} />
            </div>

            {loginUrl ? (
              <div className="signup-done" role="status">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                </svg>
                <h1 className="signup-title">Thanks for signing up with us</h1>
                <p className="signup-subtitle">You will get a confirmation message in email shortly. Check your spam folder if it doesn’t show up in your inbox within a few minutes.</p>
                <a className="btn signup-submit signup-submit-solid" href={loginUrl}>Go to login</a>
              </div>
            ) : (
            <>
            <h1 className="signup-title">Tell us about your business</h1>
            <p className="signup-subtitle">This sets up your BulkSMS partner account.</p>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="signup-split">
                <div className="signup-field">
                  <label htmlFor="reg-firstname">First Name <span className="required">*</span></label>
                  <input id="reg-firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                </div>
                <div className="signup-field">
                  <label htmlFor="reg-surname">Last Name <span className="required">*</span></label>
                  <input id="reg-surname" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                </div>
              </div>

              <div className="signup-field">
                <label htmlFor="reg-shortname">Short Name <span className="required">*</span></label>
                <input id="reg-shortname" type="text" value={shortName} onChange={(e) => setShortName(e.target.value)} required />
              </div>

              <div className="signup-split">
                <div className="signup-field">
                  <label>Email</label>
                  <input type="email" value={email} disabled />
                </div>
                <div className="signup-field">
                  <label htmlFor="reg-phone">Phone Number <span className="required">*</span></label>
                  <div className="signup-phone-row">
                    <FlagSelect
                      id="reg-dial-code"
                      ariaLabel="Country dial code"
                      className="signup-dial-select"
                      value={dialCode}
                      onChange={setDialCode}
                      options={DIAL_CODE_OPTIONS}
                      closedLabel={(opt) => `+${opt.value}`}
                    />
                    <input
                      id="reg-phone"
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
                  <label htmlFor="reg-company">Company Name <span className="required">*</span></label>
                  <input id="reg-company" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                </div>
                <div className="signup-field">
                  <label htmlFor="reg-industry">Industry</label>
                  <select id="reg-industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    <option value="">Select Industry</option>
                    {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              <div className="signup-split">
                <div className="signup-field">
                  <label htmlFor="reg-country">Country <span className="required">*</span></label>
                  <FlagSelect
                    id="reg-country"
                    ariaLabel="Country"
                    value={country}
                    onChange={setCountry}
                    options={COUNTRY_OPTIONS}
                    placeholder="Select a country"
                  />
                </div>
                <div className="signup-field">
                  <label htmlFor="reg-currency">Currency <span className="required">*</span></label>
                  <select id="reg-currency" value={currency} onChange={(e) => setCurrency(e.target.value)} required>
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
                By continuing I accept the <Link to="/terms-and-conditions/" target="_blank">terms</Link> and{' '}
                <Link to="/privacy-policy/" target="_blank">privacy policy</Link>
              </label>

              {error && <p className="signup-message error">{error}</p>}

              <button type="submit" className="btn signup-submit signup-submit-solid" disabled={loading}>
                {loading ? 'Submitting…' : 'Submit'}
              </button>
            </form>
            </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Register
