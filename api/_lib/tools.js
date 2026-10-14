// Shared plumbing for the free tools under /tools/ (send-text, text-free,
// carrier-lookup). The leading underscore keeps Vercel from deploying this
// directory as its own function.
//
// Environment (set in Vercel → Project → Settings → Environment Variables):
//   SMSLOCAL_TOKEN        API token for the SMSLocal platform. Required to send
//                         the test SMS; without it the SMS tools answer 503.
//   SMSLOCAL_SENDER_ID    Sender ID the test SMS is sent from (default SMSLOCAL).
//   TURNSTILE_SECRET_KEY  Cloudflare Turnstile secret for the site key the
//                         pages render. Required to send: an unprotected
//                         endpoint that texts any number is an abuse magnet.
import { parsePhoneNumberFromString } from 'libphonenumber-js/max'

const SMS_API_URL = 'https://secure.smslocal.com/api/service/enterprise-service/external/sms'

// The only text either SMS tool can send. The old WordPress tool used the same
// fixed template; never take message content from the visitor, or the tool
// becomes a free anonymous texting relay.
export const TEST_MESSAGE = 'SMSLocal: Test globally. Free SMS test now.'

export function clientIp(req) {
  const fwd = String(req.headers['x-forwarded-for'] || '')
  return fwd.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
}

// Per-instance fixed-window counters. Not shared across instances, so this is
// a backstop behind Turnstile (and any Vercel Firewall rate-limit rule), not
// the only line of defence.
const windows = new Map()
export function rateLimited(key, max, windowMs) {
  const now = Date.now()
  const w = windows.get(key)
  if (!w || now - w.start >= windowMs) {
    windows.set(key, { start: now, count: 1 })
    if (windows.size > 50_000) {
      for (const [k, v] of windows) if (now - v.start >= windowMs) windows.delete(k)
    }
    return false
  }
  w.count += 1
  return w.count > max
}

export async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return { ok: false, configured: false }
  if (!token) return { ok: false, configured: true }
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8000),
    })
    const data = await res.json()
    return { ok: data.success === true, configured: true }
  } catch {
    return { ok: false, configured: true }
  }
}

/** Parses `number` (national or international) in `country` (ISO2). */
export function parsePhone(country, number) {
  const raw = String(number || '').trim()
  if (!/^[+\d\s().-]{4,24}$/.test(raw)) return null
  return parsePhoneNumberFromString(raw, String(country || '').toUpperCase() || undefined) || null
}

export async function sendTestSms(phone) {
  const token = process.env.SMSLOCAL_TOKEN
  if (!token) return { ok: false, configured: false }
  try {
    const res = await fetch(SMS_API_URL, {
      method: 'POST',
      headers: { Token: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.SMSLOCAL_SENDER_ID || 'SMSLOCAL',
        to: phone.number.replace(/^\+/, ''),
        content: TEST_MESSAGE,
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) {
      console.error('send-test-sms: SMS API answered', res.status, (await res.text()).slice(0, 300))
      return { ok: false, configured: true }
    }
    return { ok: true, configured: true }
  } catch (err) {
    console.error('send-test-sms: SMS API request failed', err.message)
    return { ok: false, configured: true }
  }
}

export function methodNotAllowed(res) {
  res.setHeader('Allow', 'POST')
  return res.status(405).json({ error: 'Method not allowed.' })
}
