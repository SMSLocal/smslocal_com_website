// POST /api/send-email — Vercel Serverless Function to send emails via SMTP
//
// Reads SMTP configuration saved in Vercel environment variables:
//   - smtp_host: SMTP server host
//   - smtp_port: SMTP port (587, 465, etc.)
//   - smtp_user: SMTP username
//   - smtp_pass: SMTP password
//   - smpt_from: Default sender email (e.g. "SMSLocal <alerts@smslocal.com>")
//
// Usage:
//   POST /api/send-email
//   Body: { "to": "user@example.com", "subject": "Hello", "html": "<p>Hello world</p>" }
//
// To test SMTP connection without sending:
//   POST /api/send-email
//   Body: { "action": "verify" }

import { sendSmtpEmail, verifySmtpConnection, getSmtpConfig } from './_lib/email.js'
import { clientIp, rateLimited } from './_lib/tools.js'

const HOUR = 60 * 60 * 1000

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed. Use POST.' })
  }

  const body = req.body || {}
  const ip = clientIp(req)

  // Allow optional action to verify SMTP configuration
  if (body.action === 'verify' || body.action === 'test_connection') {
    const testResult = await verifySmtpConnection()
    const status = testResult.ok ? 200 : 500
    return res.status(status).json(testResult)
  }

  // Basic abuse prevention (limit 30 emails/hr per IP unless an API key is provided)
  const apiKey = req.headers['x-api-key'] || body.apiKey
  const expectedKey = process.env.EMAIL_API_KEY || process.env.GAS_SHARED_SECRET
  const isAuthorized = expectedKey && apiKey === expectedKey

  if (!isAuthorized && rateLimited(`send-email-ip:${ip}`, 30, HOUR)) {
    return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' })
  }

  const { to, subject, html, text, from, replyTo, cc, bcc } = body

  if (!to) {
    return res.status(400).json({ ok: false, error: 'Missing required field: "to"' })
  }

  if (!subject) {
    return res.status(400).json({ ok: false, error: 'Missing required field: "subject"' })
  }

  if (!html && !text) {
    return res.status(400).json({ ok: false, error: 'Email content is required (provide "html" or "text")' })
  }

  // Check if SMTP is configured before attempting to send
  const config = getSmtpConfig()
  if (!config.host) {
    console.error('SMTP configuration error: smtp_host is missing in Vercel environment variables.')
    return res.status(500).json({
      ok: false,
      error: 'SMTP service is not configured. Please ensure smtp_host, smtp_user, and smtp_pass are set in Vercel.',
    })
  }

  const result = await sendSmtpEmail({
    to,
    subject,
    html,
    text,
    from,
    replyTo,
    cc,
    bcc,
  })

  if (result.ok) {
    return res.status(200).json({
      ok: true,
      messageId: result.messageId,
      message: 'Email sent successfully via SMTP.',
    })
  }

  return res.status(500).json({
    ok: false,
    error: result.error || 'Failed to send email via SMTP.',
  })
}
