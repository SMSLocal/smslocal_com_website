import { verify, sendEmail, checkSignupAllowed, recordSignup, getClientIp } from './_util.js'

// Same disposable-domain list as the old WordPress plugin.
const DISPOSABLE_DOMAINS = ['mailgw.com', 'tempmail.com']

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

  let apiResult
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
    })
    apiResult = await apiRes.json()
  } catch (err) {
    console.error('register: secure.smslocal.com call failed:', err)
    return res.status(502).json({ success: false, message: 'Something went wrong. Please try again.' })
  }

  if (!apiResult || !apiResult.id) {
    const message = apiResult?.apierror?.message || 'Something went wrong'
    return res.status(400).json({ success: false, message })
  }

  // Best-effort bookkeeping: log the signup and send notification/welcome
  // emails, but a failure here shouldn't fail the signup itself — the real
  // account already exists on secure.smslocal.com at this point.
  recordSignup({ phone, ip }).catch((err) => console.error('register: recordSignup failed:', err))

  const adminBody = `
    <h4>Hi Admin</h4>
    <p>A new user (${firstname} ${surname}) has signed up with information displayed below.</p>
    <p><b>Full Name:</b> ${firstname} ${surname}</p>
    <p><b>Company Name:</b> ${companyName}</p>
    <p><b>Short Name:</b> ${shortName}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Industry:</b> ${industry || ''}</p>
    <p><b>Country:</b> ${country}</p>
    <p><b>Currency:</b> ${currency}</p>
  `
  sendEmail('furqan@mycountrymobile.com,sadik@mycountrymobile.com', 'New Order Bulksms', adminBody).catch((err) =>
    console.error('register: admin notify email failed:', err)
  )

  const welcomeBody = `
    <h4>Hi ${firstname},</h4>
    <p>Thanks for signing up with SMSLocal! We have received your details.</p>
    <p>Your login details will reach you in a separate email. Once you have them, you can sign in here: <a href="https://secure.smslocal.com/cpaas/auth/login?returnUrl=%2Fcpaas%2Fpages">secure.smslocal.com</a></p>
  `
  sendEmail(email, 'Welcome to SMSLocal', welcomeBody).catch((err) =>
    console.error('register: welcome email failed:', err)
  )

  return res.status(200).json({
    success: true,
    message: 'Please check your inbox and activate your account!',
    redirect: 'https://secure.smslocal.com/cpaas/auth/login?returnUrl=%2Fcpaas%2Fpages',
  })
}
