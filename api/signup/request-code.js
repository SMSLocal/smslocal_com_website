import { sign, sendEmail, hashCode } from './_util.js'

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const CODE_TTL_MS = 15 * 60 * 1000

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { email } = req.body || {}
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
  }

  const code = String(Math.floor(100000 + Math.random() * 900000))
  // The code itself must never travel in the token the browser receives —
  // only a keyed hash of it, so reading the API response reveals nothing.
  const token = sign({ email, codeHash: hashCode(email, code), exp: Date.now() + CODE_TTL_MS })

  const subject = `${code} is your SMSLocal verification code`
  const body = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;color:#0f172a">
      <h2 style="margin:0 0 12px">Verify your email</h2>
      <p style="line-height:1.5">Welcome to SMSLocal. Enter this code on the sign-up page to continue with your BulkSMS registration:</p>
      <p style="font-size:28px;font-weight:bold;letter-spacing:4px;margin:20px 0">${code}</p>
      <p style="line-height:1.5;color:#475569">The code expires in 15 minutes. If you didn't request it, you can ignore this email.</p>
    </div>
  `
  const text = `Your SMSLocal verification code is ${code}. Enter it on the sign-up page to continue. It expires in 15 minutes. If you didn't request it, ignore this email.`

  const sent = await sendEmail(email, subject, body, text)
  if (!sent) {
    console.error('request-code: failed to send verification email to', email)
    return res.status(502).json({ success: false, message: 'Could not send the verification email. Please try again.' })
  }

  return res.status(200).json({
    success: true,
    message: 'Please check your inbox and activate your account!',
    token,
  })
}
