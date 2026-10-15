// POST /api/signup — the signup backend, moved off WordPress.
//
// A port of the bulksms-partner-signup WordPress plugin (which ran on the old
// A2 host behind /wp-admin/admin-ajax.php). Same three actions, same
// { success, message } replies, so the /signup/ page keeps its flow:
//
//   did_check_email            email a 6-digit code
//   did_verify_code            check it
//   did_bulksms_partner_signup create the account via the SMSLocal platform
//
// The plugin kept the code in a PHP session. Here it travels in a signed,
// short-lived ticket instead, so nothing is stored server-side. Emails go
// through the same Google Apps Script as the contact form
// (scripts/gas-contact-form.gs, type: 'email').
//
// Environment: GAS_WEB_APP_URL + GAS_SHARED_SECRET (already set for the
// contact form; the secret also signs the tickets unless SIGNUP_SECRET is
// set). TURNSTILE_SECRET_KEY is optional here: when set, the Turnstile token
// the page already collects is verified.
import { createHmac, createHash, randomInt, timingSafeEqual } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { clientIp, rateLimited, verifyTurnstile } from './_lib/tools.js'
// Common SMTP email service
import { sendSmtpEmail } from './_lib/email.js'

const REGISTER_URL = 'https://secure.smslocal.com/api/user/register'
// Same recipients as the plugin's "New Order Bulksms" notification.
const ADMIN_EMAILS = 'furqan@mycountrymobile.com, sadik@mycountrymobile.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const CODE_TTL = 15 * 60 * 1000
const VERIFIED_TTL = 60 * 60 * 1000
const HOUR = 60 * 60 * 1000
// The plugin's list, plus a few of the most common throwaway services.
const DISPOSABLE = new Set([
  'mailgw.com', 'tempmail.com', 'mailinator.com', 'guerrillamail.com', 'yopmail.com',
  '10minutemail.com', 'temp-mail.org', 'trashmail.com', 'sharklasers.com', 'getnada.com',
])

const template = (name) => readFileSync(join(process.cwd(), 'api/_lib/signup-emails', name), 'utf8')
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
// Secret for signing short-lived verification tickets (falls back to smtp_pass if GAS secrets are not set)
// OLD CODE:
// const secret = () => process.env.SIGNUP_SECRET || process.env.GAS_SHARED_SECRET || ''
// NEW CODE:
const secret = () =>
  process.env.SIGNUP_SECRET ||
  process.env.GAS_SHARED_SECRET ||
  process.env.smtp_pass ||
  process.env.SMTP_PASS ||
  'smslocal-signup-secret'

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const mac = createHmac('sha256', secret()).update(body).digest('base64url')
  return `${body}.${mac}`
}

function unsign(ticket, kind) {
  const [body, mac] = String(ticket || '').split('.')
  if (!body || !mac) return null
  const expected = createHmac('sha256', secret()).update(body).digest('base64url')
  if (mac.length !== expected.length || !timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString())
    return data.k === kind && data.x > Date.now() ? data : null
  } catch {
    return null
  }
}

const codeHash = (email, code) => createHash('sha256').update(`${secret()}|${email}|${code}`).digest('base64url')
const isDisposable = (email) => DISPOSABLE.has(email.split('@')[1]?.toLowerCase() || '')

// =============================================================================
// EMAIL SENDING: OLD CODE (Google Apps Script) vs NEW CODE (SMTP via Nodemailer)
// =============================================================================

// OLD CODE (Google Apps Script):
// async function sendEmail(to, subject, html, text = '') {
//   const url = process.env.GAS_WEB_APP_URL
//   if (!url) return false
//   try {
//     const res = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ secret: process.env.GAS_SHARED_SECRET, type: 'email', to, subject, html, text }),
//       redirect: 'follow',
//       signal: AbortSignal.timeout(15000),
//     })
//     const data = await res.json().catch(() => null)
//     if (!data?.ok) console.error('signup: email not sent', res.status, data?.error)
//     return data?.ok === true
//   } catch (err) {
//     console.error('signup: email request failed', err.message)
//     return false
//   }
// }

// NEW CODE: Send email via SMTP using sendSmtpEmail from ./_lib/email.js
// Uses Vercel SMTP environment variables (smtp_host, smtp_pass, smtp_port, smtp_user, smpt_from).
// Matches the exact boolean return (true/false) expected by checkEmail and createAccount so callers work seamlessly.
async function sendEmail(to, subject, html, text = '') {
  try {
    const result = await sendSmtpEmail({ to, subject, html, text })
    if (!result.ok) {
      console.error('signup: SMTP email not sent:', result.error)
      return false
    }
    return true
  } catch (err) {
    console.error('signup: SMTP email request failed:', err.message)
    return false
  }
}

const reply = (res, success, message, extra = {}) => res.status(200).json({ success, message, ...extra })

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed.' })
  }
  // OLD CODE: Required Google Apps Script URL
  // if (!secret() || !process.env.GAS_WEB_APP_URL) {
  //   console.error('signup: GAS_WEB_APP_URL / GAS_SHARED_SECRET not set')
  //   return reply(res, false, 'Signup is temporarily unavailable. Please try again later.')
  // }
  //
  // NEW CODE: With SMTP, GAS_WEB_APP_URL is no longer required. Only require signing secret.
  if (!secret()) {
    console.error('signup: signing secret is not configured')
    return reply(res, false, 'Signup is temporarily unavailable. Please try again later.')
  }

  const { action, fields = {}, captcha, ticket } = req.body ?? {}
  const ip = clientIp(req)

  if (action === 'did_check_email') return checkEmail(res, fields, captcha, ip)
  if (action === 'did_verify_code') return verifyCode(res, fields, ticket, ip)
  if (action === 'did_bulksms_partner_signup') return createAccount(res, fields, captcha, ticket, ip)
  return reply(res, false, 'Something went wrong')
}

async function captchaOk(token, ip) {
  // Optional: the page always collects a token, but signup must not depend on
  // the secret being configured.
  if (!process.env.TURNSTILE_SECRET_KEY) return true
  return (await verifyTurnstile(token, ip)).ok
}

async function checkEmail(res, fields, captcha, ip) {
  const email = String(fields.email || '').trim().toLowerCase()
  if (!EMAIL_RE.test(email) || email.length > 200) return reply(res, false, 'Please enter a valid email address.')
  if (isDisposable(email)) return reply(res, false, 'Disposable email addresses are not allowed')
  if (!(await captchaOk(captcha, ip))) return reply(res, false, 'Security check failed. Please reload the page and try again.')
  if (rateLimited(`signup-code:${ip}`, 8, HOUR) || rateLimited(`signup-code:${email}`, 5, HOUR)) {
    return reply(res, false, 'Too many attempts. Please try again in an hour.')
  }

  const code = String(randomInt(111111, 1000000))
  const html = template('code.html').replace('{{code}}', code)

  // ---------------------------------------------------------------------------
  // Sending verification code email via SMTP using sendEmail (Nodemailer):
  // Returns boolean (sent = true/false). On success, returns matching ticket
  // so Signup.jsx can transition to step 2 ('code') with res.success and ticket.
  // ---------------------------------------------------------------------------
  const sent = await sendEmail(email, 'Verify Email Address', html, `Your SMSLocal confirmation code: ${code}`)
  if (!sent) return reply(res, false, 'We could not send the verification email. Please try again in a few minutes.')

  return reply(res, true, 'Plese check your inbox and activate your account!', {
    ticket: sign({ k: 'code', e: email, h: codeHash(email, code), x: Date.now() + CODE_TTL }),
  })
}

async function verifyCode(res, fields, ticket, ip) {
  const data = unsign(ticket, 'code')
  if (!data) return reply(res, false, 'Your code has expired. Please go back and request a new one.')
  if (rateLimited(`signup-verify:${data.e}`, 10, CODE_TTL) || rateLimited(`signup-verify-ip:${ip}`, 30, HOUR)) {
    return reply(res, false, 'Too many attempts. Please request a new code.')
  }
  const code = String(fields.code || '').trim()
  if (codeHash(data.e, code) !== data.h) return reply(res, false, 'Code is wrong, please try again.')
  return reply(res, true, 'Email is successfully validated.', {
    ticket: sign({ k: 'verified', e: data.e, x: Date.now() + VERIFIED_TTL }),
  })
}

async function createAccount(res, fields, captcha, ticket, ip) {
  const data = unsign(ticket, 'verified')
  if (!data) return reply(res, false, 'Your email verification has expired. Please start again.')

  const f = Object.fromEntries(
    ['companyName', 'shortName', 'firstname', 'surname', 'email', 'phone', 'country', 'currency', 'industry', 'form_time']
      .map((k) => [k, String(fields[k] ?? '').trim().slice(0, 200)]),
  )
  const email = f.email.toLowerCase()
  if (email !== data.e) return reply(res, false, 'Please enter correct email. Thanks!')
  if (isDisposable(email)) return reply(res, false, 'Disposable email addresses are not allowed')
  if (Math.floor(Date.now() / 1000) - Number(f.form_time || 0) < 3) return reply(res, false, 'Submission too fast')
  if (!(await captchaOk(captcha, ip))) return reply(res, false, 'Security check failed. Please reload the page and try again.')
  if (rateLimited(`signup-create:${ip}`, 10, 30 * 24 * HOUR)) {
    return reply(res, false, 'You can not create more then 10 accounts in one month!')
  }

  const phoneDigits = f.phone.replace(/\D/g, '')
  if (!f.firstname || !f.surname || !phoneDigits || !f.country || !f.currency) {
    return reply(res, false, 'Please fill all required fields')
  }

  // Same payload as the plugin sent.
  const payload = {
    companyName: f.companyName,
    shortName: f.shortName,
    name: f.firstname,
    surname: f.surname,
    email,
    phone: `+${phoneDigits}`,
    tokenKey: 'google rechaptcha key',
    country: f.country,
    currency: f.currency,
  }

  let result = null
  let failure = ''
  try {
    const r = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20000),
    })
    const text = await r.text()
    try {
      result = JSON.parse(text)
    } catch {
      failure = `HTTP ${r.status}: ${text.slice(0, 200)}`
    }
  } catch (err) {
    failure = err.cause?.code || err.message
  }

  if (result?.apierror) return reply(res, false, result.apierror.message || 'Something went wrong')

  const details = [
    ['Full Name', f.firstname], ['Company Name', f.companyName], ['Short Name', f.shortName],
    ['Surname', f.surname], ['Email', email], ['Phone', payload.phone], ['Industry', f.industry],
    ['Country', f.country], ['Currency', f.currency], ['IP address', ip],
  ].map(([k, v]) => `<p><b>${k}: </b>${esc(v)}</p>`).join('')

  if (result?.id) {
    await sendEmail(
      ADMIN_EMAILS,
      'New Order Bulksms',
      `<h4>Hi Admin</h4><p>A new user (${esc(f.firstname)}) has signed up with information displayed below.</p>${details}`,
    )
    await sendEmail(email, 'New Order Bulksms', template('welcome.html').replaceAll('{{name}}', esc(f.firstname)))
    return reply(res, true, 'Plese check your inbox and activate your account!')
  }

  // The platform didn't create the account (unreachable, or refused the
  // request). Hand the details to the team so the signup isn't lost, and tell
  // the visitor what happens next.
  console.error('signup: register API did not create the account:', failure || JSON.stringify(result).slice(0, 200))
  const handedOff = await sendEmail(
    ADMIN_EMAILS,
    'ACTION NEEDED: signup could not be completed automatically',
    `<h4>Hi Admin</h4><p>A visitor completed signup on the website, but the platform did not create the account automatically
     (${esc(failure || 'unexpected response')}). Please create it manually and contact them.</p>${details}`,
  )
  if (!handedOff) return reply(res, false, 'There was an error processing the form. Please try again.')
  return reply(res, true, 'Thanks! Our team will finish setting up your account and contact you shortly.', { pending: true })
}
