import nodemailer from 'nodemailer'

const RECIPIENTS = [
  'amrin@mycountrymobile.com',
  'jasmine@mycountrymobile.com',
  'sk3group@gmail.com',
  'sk3group1@gmail.com',
  'furkan@mycountrymobile.com',
  'sadik@mycountrymobile.com',
  'akil@mycountrymobile.com',
  'firoz@mycountrymobile.com',
  'naheead@mycountrymobile.com',
  'websiteleads001@gmail.com',
  'info@smslocal.com',
  'sk3group2@gmail.com',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, reason, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const safeName = escapeHtml(name)
  const safeCompany = escapeHtml(company || '—')
  const safeReason = escapeHtml(reason || '—')
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

  try {
    await transporter.sendMail({
      from: `"SMSLocal Website" <${process.env.GMAIL_USER}>`,
      to: RECIPIENTS,
      replyTo: email,
      subject: `New contact form submission — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\nReason: ${reason || '—'}\n\nMessage:\n${message}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Reason:</strong> ${safeReason}</p>
        <p><strong>Message:</strong><br>${safeMessage}</p>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form email failed:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
}
