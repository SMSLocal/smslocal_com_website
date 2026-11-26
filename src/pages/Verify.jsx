import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import '../components/SignupFlow.css'
import { IconCheck } from '../components/icons.jsx'

const OTP_LENGTH = 6

function tokenStorageKey(email) {
  return `smslocal_signup_token:${email}`
}

// sessionStorage doesn't exist during SSR/prerendering (Node has no window),
// so every access goes through here rather than being called directly.
function readStoredToken(email) {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem(tokenStorageKey(email)) || ''
}

function writeStoredToken(email, token) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(tokenStorageKey(email), token)
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z" stroke="#ec4899" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

function Verify() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const email = searchParams.get('email') || ''

  // The verification token issued by /api/signup/request-code travels via
  // router state (set when Signup.jsx navigates here) so it never has to
  // show up in the URL. A page refresh loses router state, so it also falls
  // back to sessionStorage, keyed by email, for the life of this tab.
  const [token, setToken] = useState(() => location.state?.token || readStoredToken(email))

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const [resendMessage, setResendMessage] = useState('')
  const boxRefs = useRef([])

  useEffect(() => {
    if (!email) {
      navigate('/signup/', { replace: true })
      return
    }
    if (token) {
      writeStoredToken(email, token)
    }
  }, [email, token, navigate])

  useEffect(() => {
    if (!token) {
      // No token in state or storage (e.g. a stale/bookmarked link) — the
      // code can't be verified without it, so send them back to request a
      // fresh one.
      navigate('/signup/', { replace: true })
    }
  }, [token, navigate])

  function handleDigitChange(index, rawValue) {
    const value = rawValue.replace(/\D/g, '')
    if (!value) {
      const next = [...digits]
      next[index] = ''
      setDigits(next)
      return
    }
    const chars = value.split('')
    const next = [...digits]
    let i = index
    for (const ch of chars) {
      if (i >= OTP_LENGTH) break
      next[i] = ch
      i += 1
    }
    setDigits(next)
    const focusIndex = Math.min(i, OTP_LENGTH - 1)
    boxRefs.current[focusIndex]?.focus()
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      boxRefs.current[index - 1]?.focus()
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const code = digits.join('')
    if (code.length !== OTP_LENGTH) {
      setError('Please enter the full 6-digit code.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/signup/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, code }),
      })
      const data = await res.json()
      if (data.success) {
        writeStoredToken(email, data.token)
        navigate(`/register/?email=${encodeURIComponent(email)}`, { state: { token: data.token } })
      } else {
        setError(data.message || 'Something went wrong')
      }
    } catch {
      setError('There was an error verifying your code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setError('')
    setResendMessage('')
    setResending(true)
    try {
      const res = await fetch('/api/signup/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setToken(data.token)
        writeStoredToken(email, data.token)
        setDigits(Array(OTP_LENGTH).fill(''))
        setResendMessage('A new code is on its way.')
        boxRefs.current[0]?.focus()
      } else {
        setError(data.message || 'Something went wrong')
      }
    } catch {
      setError('There was an error sending a new code. Please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <>
      <Seo
        title="Verify Your Email"
        description="Enter the verification code sent to your inbox to continue creating your SMSLocal account."
      />
      <meta name="robots" content="noindex" />

      <section className="signup-split-page">
        <div className="signup-info-panel">
          <span className="signup-info-glow" aria-hidden="true" />
          <div className="signup-info-inner">
            <span className="signup-info-badge">Step 2 of 3 · Email verification</span>
            <h1 className="signup-info-title">
              One code away from <span className="grad-word">your dashboard</span>
            </h1>
            <p className="signup-info-sub">
              We just need to confirm this inbox is yours before we create your BulkSMS partner account.
            </p>

            <ul className="signup-benefits">
              <li>
                <span className="signup-benefit-check"><IconCheck /></span>
                Work email submitted
              </li>
              <li>
                <span className="signup-benefit-check" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ec4899' }} />
                </span>
                <strong style={{ color: '#fff' }}>Verifying your code</strong>
              </li>
              <li style={{ opacity: 0.45 }}>
                <span className="signup-benefit-check" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                Business details
              </li>
            </ul>

            <div className="signup-trust-card">
              <div className="signup-trust-card-head">
                <IconShield />
                <span>Your inbox, your account</span>
              </div>
              <p>Codes expire in 15 minutes and only work once — nobody else can activate your account with this email.</p>
            </div>
          </div>
        </div>

        <div className="signup-form-panel">
          <div className="signup-form-inner">
            <div className="signup-steps">
              <span className="signup-step-dot done" />
              <span className="signup-step-dot active" />
              <span className="signup-step-dot" />
            </div>

            <h1 className="signup-title">Check your inbox</h1>
            <p className="signup-subtitle">
              We sent a 6-digit code to <strong style={{ color: 'var(--ink)' }}>{email}</strong>
            </p>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="signup-field">
                <label htmlFor="verify-otp-0">Enter verification code</label>
                <div className="signup-otp-row">
                  {digits.map((d, i) => (
                    <input
                      key={i}
                      id={i === 0 ? 'verify-otp-0' : undefined}
                      ref={(el) => (boxRefs.current[i] = el)}
                      className="signup-otp-box"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={OTP_LENGTH}
                      value={d}
                      onChange={(e) => handleDigitChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                    />
                  ))}
                </div>
              </div>

              {error && <p className="signup-message error">{error}</p>}
              {!error && resendMessage && <p className="signup-message success">{resendMessage}</p>}

              <button type="submit" className="btn signup-submit signup-submit-solid" disabled={loading}>
                {loading ? 'Verifying…' : 'Verify'}
              </button>
            </form>

            <p className="signup-footer-note">
              Didn't get it?{' '}
              <button type="button" className="signup-back" onClick={handleResend} disabled={resending} style={{ display: 'inline' }}>
                {resending ? 'Sending…' : 'Resend code'}
              </button>
            </p>
            <p className="signup-footer-note" style={{ marginTop: '0.4rem' }}>
              Wrong address? <Link to="/signup/" className="auth-link">Use a different email</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Verify
