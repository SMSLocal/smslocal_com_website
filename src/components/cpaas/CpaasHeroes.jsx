import { useEffect, useState } from 'react'
import './cpaas-heroes.css'

/**
 * Animated hero graphics for the CPaaS pages. Each one is a different scene
 * with its own motion language:
 *   SmsApiHero   — a terminal types a request, a packet drops into a phone
 *   VerifyHero   — a one-time code is entered digit by digit against a countdown
 *   LookupHero   — a radar sweeps and locks onto a number's carrier
 *
 * Each scene replays every few seconds by remounting (the `key` below), so the
 * CSS can be plain one-shot keyframes with staggered delays. With
 * prefers-reduced-motion the CSS shows the finished frame and nothing moves.
 */

function useReplay(ms) {
  const [cycle, setCycle] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCycle((c) => c + 1), ms)
    return () => clearInterval(t)
  }, [ms])
  return cycle
}

/* ───────────────────────── SMS API ───────────────────────── */

export function SmsApiHero() {
  const cycle = useReplay(11000)
  return (
    <div className="sah" key={cycle} role="img" aria-label="A terminal sending an SMS request, the message arriving on a phone, and a delivery report returning to a server">
      <div className="sah-term">
        <div className="sah-bar">
          <span className="sah-dots"><i /><i /><i /></span>
          <span>POST /external/sms</span>
        </div>
        <div className="sah-body">
          <p><span className="hr-type" style={{ '--w': '20ch', '--n': 20, '--t': '1.1s', '--d': '0.3s' }}><b className="sah-k">POST</b> /external/sms</span></p>
          <p className="hr-in" style={{ '--d': '1.5s' }}><span className="sah-dim">Token: </span>••••••••</p>
          <p><span className="hr-type" style={{ '--w': '38ch', '--n': 38, '--t': '1.6s', '--d': '1.9s' }}>{'{ "to": "14155550123", "content": "…" }'}</span></p>
          <p className="hr-in sah-ok" style={{ '--d': '3.8s' }}>← 200 {'{ "msgid": "9f2a7c10", "errorcode": 0 }'}</p>
        </div>
      </div>

      <span className="sah-wire hr-in" style={{ '--d': '3.9s' }} aria-hidden="true"><i /></span>

      <div className="sah-row">
        <div className="sah-phone">
          <span className="sah-notch" />
          <div className="sah-from">SMSLOCAL</div>
          <div className="sah-bubble hr-pop" style={{ '--d': '4.8s' }}>Your code is 481920.</div>
          <div className="sah-status hr-in" style={{ '--d': '5.6s' }}><span className="sah-ticks">✓✓</span> Delivered</div>
        </div>

        <span className="sah-arrow hr-in" style={{ '--d': '5.8s' }} aria-hidden="true">→</span>

        <div className="sah-hook hr-pop" style={{ '--d': '6.1s' }}>
          <span className="sah-hook-label">Your callback URL</span>
          <code>status: Delivrd</code>
          <code>msgid: 9f2a7c10</code>
          <span className="sah-hook-ok">200 OK</span>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Verify API ───────────────────────── */

const DIGITS = ['4', '2', '8', '1', '9', '0']

export function VerifyHero() {
  const cycle = useReplay(10000)
  return (
    <div className="vfh" key={cycle} role="img" aria-label="A one-time passcode being entered on a phone and verified before it expires">
      <div className="vfh-chips" aria-hidden="true">
        <span className="vfh-chip vfh-chip--sms hr-pop" style={{ '--d': '0.2s' }}>SMS</span>
        <span className="vfh-chip vfh-chip--wa hr-pop" style={{ '--d': '0.5s' }}>WhatsApp</span>
        <span className="vfh-chip vfh-chip--voice hr-pop" style={{ '--d': '0.8s' }}>Voice</span>
      </div>

      <div className="vfh-phone">
        <span className="vfh-notch" />
        <p className="vfh-title">Enter your code</p>
        <p className="vfh-sub">Sent to +1 ••• ••• 0123</p>

        <div className="vfh-boxes">
          {DIGITS.map((d, i) => (
            <span className="vfh-box" key={i} style={{ '--i': i }}>
              <b className="hr-in" style={{ '--d': `${1.2 + i * 0.45}s` }}>{d}</b>
            </span>
          ))}
        </div>

        <div className="vfh-timer">
          <svg viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r="18" className="vfh-ring-bg" />
            <circle cx="22" cy="22" r="18" className="vfh-ring" />
          </svg>
          <span>Expires soon</span>
        </div>

        <div className="vfh-btn-wrap">
          <span className="vfh-btn vfh-btn--idle">Verify</span>
          <span className="vfh-btn vfh-btn--done hr-in" style={{ '--d': '4.4s' }}>✓ Verified</span>
        </div>
      </div>

      <span className="vfh-shield hr-pop" style={{ '--d': '4.5s' }} aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3z" /><path d="M8.5 12.2l2.4 2.4 4.6-5" /></svg>
      </span>
    </div>
  )
}

/* ───────────────────────── Number Lookup ───────────────────────── */

export function LookupHero() {
  const cycle = useReplay(9000)
  return (
    <div className="lkh" key={cycle} role="img" aria-label="A radar scanning a phone number and identifying its carrier">
      <div className="lkh-radar" aria-hidden="true">
        <span className="lkh-ring lkh-ring--1" />
        <span className="lkh-ring lkh-ring--2" />
        <span className="lkh-ring lkh-ring--3" />
        <span className="lkh-cross lkh-cross--h" />
        <span className="lkh-cross lkh-cross--v" />
        <span className="lkh-sweep" />
        <span className="lkh-blip lkh-blip--a hr-pop" style={{ '--d': '1.4s' }} />
        <span className="lkh-blip lkh-blip--b hr-pop" style={{ '--d': '2.2s' }} />
        <span className="lkh-blip lkh-blip--c hr-pop" style={{ '--d': '3s' }} />
        <span className="lkh-lock hr-pop" style={{ '--d': '3.6s' }} />
      </div>

      <div className="lkh-input">
        <span className="lkh-label">Phone number</span>
        <span className="hr-type lkh-num" style={{ '--w': '16ch', '--n': 16, '--t': '1.4s', '--d': '0.3s' }}>+1 415 555 0123</span>
      </div>

      <div className="lkh-result hr-rise" style={{ '--d': '3.7s' }}>
        <span className="lkh-tag">Example result</span>
        <dl>
          <div><dt>Number</dt><dd>+1 415 555 0123</dd></div>
          <div><dt>Country</dt><dd>United States</dd></div>
          <div><dt>Carrier</dt><dd className="lkh-carrier">Example Mobile</dd></div>
        </dl>
      </div>
    </div>
  )
}
