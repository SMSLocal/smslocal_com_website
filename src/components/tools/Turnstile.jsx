import { useEffect, useRef } from 'react'

// Same Cloudflare Turnstile site key and loading pattern as Signup.jsx. The
// token goes to /api/tools/send-test-sms, which verifies it server-side.
export const TURNSTILE_SITEKEY = '0x4AAAAAABbL2RN0Z6ROmEVU'
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

/**
 * Renders the challenge and reports its token through `onToken` ('' when it
 * expires or fails; `onError` additionally fires when it cannot run at all).
 * Change `resetKey` to get a fresh token: Turnstile tokens
 * are single-use, so each send needs a new one.
 */
export default function Turnstile({ onToken, onError, resetKey = 0 }) {
  const containerRef = useRef(null)
  const widgetId = useRef(null)

  useEffect(() => {
    let cancelled = false
    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          // Hidden unless Cloudflare needs the visitor to interact.
          appearance: 'interaction-only',
          callback: (token) => onToken(token),
          'expired-callback': () => onToken(''),
          'timeout-callback': () => onToken(''),
          'error-callback': () => {
            onToken('')
            onError?.()
          },
        })
      })
      .catch(() => {
        onToken('')
        onError?.()
      })
    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
      widgetId.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  return <div className="tool-captcha" ref={containerRef} />
}
