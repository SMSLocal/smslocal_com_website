import { verify, sendEmail, checkSignupAllowed, recordSignup, getClientIp } from './_util.js'

// Same disposable-domain list as the old WordPress plugin.
const DISPOSABLE_DOMAINS = ['mailgw.com', 'tempmail.com']

// Same recipients as the old signup's notification.
const ADMIN_EMAILS = 'furqan@mycountrymobile.com,sadik@mycountrymobile.com'

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (value) => String(value ?? '').slice(0, 200).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c])

function isDisposable(email) {
  const domain = (email.split('@')[1] || '').toLowerCase()
  return DISPOSABLE_DOMAINS.includes(domain)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const {
    token,
    companyName,
    shortName,
    firstname,
    surname,
    email,
    phone,
    country,
    currency,
    industry,
    formEnteredAt,
  } = req.body || {}

  const payload = verify(token)
  if (!payload || !payload.verified || payload.email !== email) {
    return res.status(400).json({ success: false, message: 'Please verify your email again.' })
  }

  if (!firstname || !surname || !email || !phone || !country || !currency) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields' })
  }

  if (isDisposable(email)) {
    return res.status(400).json({ success: false, message: 'Disposable email addresses are not allowed' })
  }

  // Same bot heuristic as the old plugin: reject a full-form submit that
  // happened less than 3s after the form step was entered.
  const elapsed = Math.floor(Date.now() / 1000) - Number(formEnteredAt || 0)
  if (!Number.isFinite(elapsed) || elapsed < 3) {
    return res.status(400).json({ success: false, message: 'Submission too fast' })
  }

  const ip = getClientIp(req)

  const pre = await checkSignupAllowed({ phone, ip })
  if (!pre.success) {
    return res.status(400).json({ success: false, message: pre.message || 'Signup is not allowed right now.' })
  }

  let apiResult = null
  let failure = ''
  try {
    const apiRes = await fetch('https://secure.smslocal.com/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName,
        shortName,
        name: firstname,
        surname,
        email,
        phone: `+${phone}`,
        country,
        currency,
      }),
      signal: AbortSignal.timeout(8000),
    })
    const text = await apiRes.text()
    try {
      apiResult = JSON.parse(text)
    } catch {
      failure = `HTTP ${apiRes.status}: ${text.slice(0, 200)}`
    }
  } catch (err) {
    failure = err.cause?.code || err.message
  }

  // The platform looked at the details and refused them: tell the visitor why.
  if (apiResult?.apierror) {
    return res.status(400).json({ success: false, message: apiResult.apierror.message || 'Something went wrong' })
  }

  const details = [
    ['Full Name', `${firstname} ${surname}`],
    ['Company Name', companyName],
    ['Short Name', shortName],
    ['Email', email],
    ['Phone', `+${phone}`],
    ['Industry', industry],
    ['Country', country],
    ['Currency', currency],
  ]
    .map(([label, value]) => `<p><b>${label}:</b> ${escapeHtml(value)}</p>`)
    .join('')

  // The platform did not create the account (unreachable, certificate problem,
  // unexpected reply). Send the details to the team so the signup is not lost.
  if (!apiResult?.id) {
    console.error('register: platform did not create the account:', failure || 'unexpected response')
    const handedOff = await sendEmail(
      ADMIN_EMAILS,
      'ACTION NEEDED: signup could not be completed automatically',
      `<h4>Hi Admin</h4><p>A visitor completed signup on the website, but the platform did not create the account
       automatically (${escapeHtml(failure || 'unexpected response')}). Please create it manually and contact them.</p>${details}`,
    )
    if (!handedOff) {
      return res.status(502).json({ success: false, message: 'Something went wrong. Please try again.' })
    }
    await recordSignup({ phone, ip }).catch((err) => console.error('register: recordSignup failed:', err))
    return res.status(200).json({
      success: true,
      pending: true,
      message: 'Thanks! Our team will finish setting up your account and contact you shortly.',
    })
  }

  // Best-effort bookkeeping: log the signup and send notification/welcome
  // emails, but a failure here shouldn't fail the signup itself — the real
  // account already exists on secure.smslocal.com at this point.
  await recordSignup({ phone, ip }).catch((err) => console.error('register: recordSignup failed:', err))

  const adminBody = `<h4>Hi Admin</h4><p>A new user has signed up with information displayed below.</p>${details}`

  const welcomeBody = `
    <h4>Hi ${escapeHtml(firstname)},</h4>
    <p>Thanks for signing up with SMSLocal! We have received your details.</p>
    <p>Your login details will reach you in a separate email. Once you have them, you can sign in here: <a href="https://secure.smslocal.com/cpaas/auth/login?returnUrl=%2Fcpaas%2Fpages">secure.smslocal.com</a></p>
  `

  // Awaited: a serverless function can be frozen as soon as it replies.
  // sendEmail returns false on failure and does not throw.
  await Promise.all([
    sendEmail(ADMIN_EMAILS, 'New Order Bulksms', adminBody),
    sendEmail(email, 'Welcome to SMSLocal', welcomeBody),
  ])

  return res.status(200).json({
    success: true,
    message: 'Please check your inbox and activate your account!',
    redirect: 'https://secure.smslocal.com/cpaas/auth/login?returnUrl=%2Fcpaas%2Fpages',
  })
}
