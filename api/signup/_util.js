import crypto from 'crypto'
import nodemailer from 'nodemailer'

// Vercel functions are stateless, so the multi-step signup (email -> code ->
// full form) can't rely on a server session. Instead each step hands the
// client a signed, short-lived token carrying the state that step verified;
// the client passes it back untouched on the next call, and we re-verify the
// signature + expiry server-side.
function sign(payload) {
  const secret = process.env.SIGNUP_TOKEN_SECRET
  const json = JSON.stringify(payload)
  const b64 = Buffer.from(json).toString('base64url')
  const sig = crypto.createHmac('sha256', secret).update(b64).digest('base64url')
  return `${b64}.${sig}`
}

function verify(token) {
  const secret = process.env.SIGNUP_TOKEN_SECRET
  if (!token || typeof token !== 'string' || !token.includes('.')) return null
  const [b64, sig] = token.split('.')
  const expected = crypto.createHmac('sha256', secret).update(b64).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  try {
    const payload = JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'))
    if (payload.exp && Date.now() > payload.exp) return null
    return payload
  } catch {
    return null
  }
}

// Email: sent directly via SMTP (info@smslocal.com's Google Workspace
// mailbox) — no third-party email API involved. The transporter is built
// once per cold start and reused across invocations.
let transporter
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      // Nodemailer's defaults wait up to two minutes on a stalled connection;
      // the function is killed at 20s, which reaches the browser as a non-JSON
      // gateway error ("There was an error processing the form"). Short limits
      // make a slow SMTP handshake fail fast enough to retry and, if it still
      // fails, to return a clean JSON error instead.
      connectionTimeout: 6000,
      greetingTimeout: 6000,
      socketTimeout: 9000,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  return transporter
}

function hashCode(email, code) {
  return crypto
    .createHmac('sha256', process.env.SIGNUP_TOKEN_SECRET)
    .update(`otp:${String(email).toLowerCase()}:${code}`)
    .digest('base64url')
}

async function sendEmail(to, subject, html, text) {
  // Two attempts: a stalled or dropped SMTP connection is the usual failure,
  // and a fresh transporter on the second try gets a fresh connection.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const info = await getTransporter().sendMail({
        from: process.env.SMTP_FROM || 'SMSLocal <info@smslocal.com>',
        to,
        subject,
        html,
        text,
      })
      // SMTP can accept the connection yet reject the recipient itself.
      if (info.rejected?.length) {
        console.error('sendEmail: recipient rejected', info.rejected, info.response)
        return false
      }
      return true
    } catch (err) {
      console.error(`sendEmail: SMTP send failed (attempt ${attempt})`, err.code, err.responseCode, err.message)
      transporter = undefined
    }
  }
  return false
}

// Anti-abuse storage, via the Upstash Redis (KV) database already connected
// to this Vercel project as SIGNUP_DB_* — replaces the WordPress
// sms_partner_signup table. REST calls, no client library needed.
async function kv(...args) {
  const url = process.env.SIGNUP_DB_KV_REST_API_URL
  const token = process.env.SIGNUP_DB_KV_REST_API_TOKEN
  const res = await fetch(`${url}/${args.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data.result
}

const MONTHLY_SIGNUP_LIMIT = 10
const IP_COUNTER_TTL_SECONDS = 60 * 60 * 24 * 35 // ~35 days, covers a full month

async function checkSignupAllowed({ phone, ip }) {
  const phoneKey = `signup:phone:${phone}`
  const phoneExists = await kv('EXISTS', phoneKey)
  if (phoneExists) {
    return { success: false, message: 'Phone already exists!' }
  }

  if (ip) {
    const month = new Date().toISOString().slice(0, 7) // YYYY-MM
    const ipKey = `signup:ip:${ip}:${month}`
    const count = Number((await kv('GET', ipKey)) || 0)
    if (count >= MONTHLY_SIGNUP_LIMIT) {
      return { success: false, message: 'You can not create more than 10 accounts in one month!' }
    }
  }

  return { success: true }
}

async function recordSignup({ phone, ip }) {
  await kv('SET', `signup:phone:${phone}`, '1')
  if (ip) {
    const month = new Date().toISOString().slice(0, 7)
    const ipKey = `signup:ip:${ip}:${month}`
    await kv('INCR', ipKey)
    await kv('EXPIRE', ipKey, String(IP_COUNTER_TTL_SECONDS))
  }
}

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for']
  if (xff) return String(xff).split(',')[0].trim()
  return req.socket?.remoteAddress || ''
}

export { sign, verify, hashCode, sendEmail, checkSignupAllowed, recordSignup, getClientIp }
