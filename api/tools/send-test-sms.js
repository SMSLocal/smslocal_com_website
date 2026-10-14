// POST /api/tools/send-test-sms — the backend for /tools/send-text/ and
// /tools/text-free/. Both send one fixed test message (TEST_MESSAGE) to a
// mobile number; send-text also collects a name and email as a lead, the way
// the old WordPress tool did.
//
// Errors are returned as stable codes, not sentences: the page renders the
// matching message itself, so it is in the prerendered HTML and gets
// translated on locale pages like every other string.
import {
  clientIp,
  methodNotAllowed,
  parsePhone,
  rateLimited,
  sendTestSms,
  verifyTurnstile,
} from '../_lib/tools.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const DAY = 24 * 60 * 60 * 1000
const HOUR = 60 * 60 * 1000

// Same spirit as the old tool's "maximum number of tries from this IP address,
// try again after 24 hours", plus a per-number cap so one visitor can't use it
// to text a stranger repeatedly from different networks.
const LIMITS = { perIp: 3, perNumber: 2, perHour: 300 }

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res)

  const { tool, name, email, country, number, token } = req.body ?? {}
  const ip = clientIp(req)
  const fail = (status, code) => res.status(status).json({ ok: false, code })

  if (tool !== 'send-text' && tool !== 'text-free') return fail(400, 'invalid_request')
  if (tool === 'send-text') {
    if (!String(name || '').trim() || String(name).length > 100) return fail(400, 'invalid_details')
    if (!EMAIL_RE.test(String(email || '')) || String(email).length > 200) return fail(400, 'invalid_details')
  }

  const phone = parsePhone(country, number)
  if (!phone || !phone.isValid()) return fail(400, 'invalid_number')
  const type = phone.getType()
  if (type && type !== 'MOBILE' && type !== 'FIXED_LINE_OR_MOBILE') return fail(400, 'not_mobile')

  if (!process.env.SMSLOCAL_TOKEN || !process.env.TURNSTILE_SECRET_KEY) {
    console.error('send-test-sms: SMSLOCAL_TOKEN or TURNSTILE_SECRET_KEY is not set')
    return fail(503, 'unavailable')
  }

  const captcha = await verifyTurnstile(token, ip)
  if (!captcha.ok) return fail(403, 'captcha')

  if (
    rateLimited(`ip:${ip}`, LIMITS.perIp, DAY) ||
    rateLimited(`num:${phone.number}`, LIMITS.perNumber, DAY) ||
    rateLimited('all', LIMITS.perHour, HOUR)
  ) {
    return fail(429, 'rate_limited')
  }

  const sent = await sendTestSms(phone)
  if (!sent.ok) return fail(sent.configured ? 502 : 503, sent.configured ? 'failed' : 'unavailable')

  if (tool === 'send-text') await forwardLead({ name, email, phone, ip })
  return res.status(200).json({ ok: true })
}

// Hands the send-text lead to the same Google Apps Script the contact form
// uses (scripts/gas-contact-form.gs), which emails the sales team. Best effort:
// the visitor already got their SMS, so a failure here is logged, not surfaced.
async function forwardLead({ name, email, phone, ip }) {
  const url = process.env.GAS_WEB_APP_URL
  if (!url) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.GAS_SHARED_SECRET,
        name: String(name).trim(),
        email: String(email).trim(),
        company: 'Not provided',
        reason: 'Free SMS tool (/tools/send-text/)',
        phone: phone.number,
        message: `Sent the free test SMS to ${phone.number} (${phone.country || 'unknown country'}) from IP ${ip}.`,
      }),
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    })
  } catch (err) {
    console.error('send-test-sms: lead forward failed', err.message)
  }
}
