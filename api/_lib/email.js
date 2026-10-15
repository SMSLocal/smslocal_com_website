/**
 * Common SMTP email service for Vercel Serverless Functions.
 *
 * Reads SMTP credentials from Vercel environment variables:
 *   - smtp_host / SMTP_HOST: SMTP server hostname (e.g. smtp.gmail.com, mail.example.com)
 *   - smtp_port / SMTP_PORT: Port (587 for STARTTLS, 465 for SSL, 25)
 *   - smtp_user / SMTP_USER: SMTP username / account
 *   - smtp_pass / SMTP_PASS / SMTP_PASSWORD: SMTP password / app password
 *   - smpt_from / smtp_from / SMTP_FROM: Default sender address (e.g. "SMSLocal <no-reply@smslocal.com>")
 *   - smtp_secure / SMTP_SECURE: Optional boolean override for TLS/SSL
 *
 * Distinct method names to avoid collision with existing functions:
 *   import { sendSmtpEmail, verifySmtpConnection, getSmtpConfig, createSmtpTransporter } from './_lib/email.js'
 */

import nodemailer from 'nodemailer'

/**
 * Retrieves normalized SMTP configuration from environment variables.
 * Supports both lowercase (as saved in Vercel: smtp_host, smtp_pass, smtp_port, smtp_user, smpt_from)
 * and standard uppercase variants.
 *
 * @param {Object} [overrides={}] - Optional configuration overrides
 * @returns {Object} Normalized SMTP config object
 */
export function getSmtpConfig(overrides = {}) {
  const host = overrides.host || process.env.smtp_host || process.env.SMTP_HOST || ''
  const portRaw = overrides.port || process.env.smtp_port || process.env.SMTP_PORT || '587'
  const port = parseInt(String(portRaw), 10) || 587
  const user = overrides.user || process.env.smtp_user || process.env.SMTP_USER || ''
  const pass = overrides.pass || process.env.smtp_pass || process.env.SMTP_PASS || process.env.SMTP_PASSWORD || ''

  // Support both "smpt_from" (noted in Vercel env) and "smtp_from" / "SMTP_FROM"
  const from =
    overrides.from ||
    process.env.smpt_from ||
    process.env.smtp_from ||
    process.env.SMTP_FROM ||
    process.env.SMPT_FROM ||
    user ||
    ''

  const secure =
    overrides.secure !== undefined
      ? Boolean(overrides.secure)
      : process.env.smtp_secure === 'true' || process.env.SMTP_SECURE === 'true' || port === 465

  return {
    host,
    port,
    secure,
    user,
    pass,
    auth: user || pass ? { user, pass } : undefined,
    from,
    isConfigured: Boolean(host && (user || port)),
  }
}

/**
 * Creates and returns a Nodemailer transporter instance configured with SMTP settings.
 *
 * @param {Object} [configOverrides={}] - Optional SMTP configuration overrides
 * @returns {nodemailer.Transporter}
 */
export function createSmtpTransporter(configOverrides = {}) {
  const config = getSmtpConfig(configOverrides)
  if (!config.host) {
    throw new Error('SMTP host is not configured. Please set smtp_host in Vercel environment variables.')
  }

  const transportOptions = {
    host: config.host,
    port: config.port,
    secure: config.secure,
    connectionTimeout: 10000, // 10s timeout to fit serverless execution
    greetingTimeout: 10000,
    socketTimeout: 15000,
  }

  if (config.auth) {
    transportOptions.auth = config.auth
  }

  return nodemailer.createTransport(transportOptions)
}

/**
 * Verifies that the SMTP server is reachable and authentication succeeds.
 * Useful for health checks and configuration testing without sending an email.
 *
 * @param {Object} [configOverrides={}] - Optional SMTP configuration overrides
 * @returns {Promise<{ ok: boolean, message?: string, error?: string }>}
 */
export async function verifySmtpConnection(configOverrides = {}) {
  try {
    const config = getSmtpConfig(configOverrides)
    if (!config.isConfigured) {
      return {
        ok: false,
        error: 'SMTP credentials missing. Please configure smtp_host, smtp_user, and smtp_pass in Vercel.',
      }
    }
    const transporter = createSmtpTransporter(configOverrides)
    await transporter.verify()
    return { ok: true, message: 'SMTP connection verified successfully.' }
  } catch (err) {
    return { ok: false, error: err.message || 'Failed to verify SMTP connection.' }
  }
}

/**
 * Common method to send an email via SMTP.
 *
 * Supports both named options object or positional arguments:
 *   sendSmtpEmail({ to, subject, html, text, ... })
 *   sendSmtpEmail(to, subject, html, text, options)
 *
 * @param {Object|string|string[]} targetOrOptions - Recipient or full options object
 * @param {string} [argSubject] - Email subject line (when using positional args)
 * @param {string} [argHtml] - HTML body (when using positional args)
 * @param {string} [argText] - Plain text body (when using positional args)
 * @param {Object} [argExtra={}] - Additional options (cc, bcc, from, etc.)
 * @returns {Promise<{ ok: boolean, messageId?: string, error?: string, response?: string }>}
 */
export async function sendSmtpEmail(targetOrOptions, argSubject, argHtml, argText = '', argExtra = {}) {
  let opts = {}

  if (targetOrOptions && typeof targetOrOptions === 'object' && !Array.isArray(targetOrOptions)) {
    opts = { ...targetOrOptions }
  } else {
    opts = {
      to: targetOrOptions,
      subject: argSubject,
      html: argHtml,
      text: argText,
      ...argExtra,
    }
  }

  const { to, subject, html, text, from, cc, bcc, replyTo, attachments, headers, smtpConfig = {} } = opts

  const config = getSmtpConfig(smtpConfig)

  if (!config.host) {
    const err = 'SMTP host not configured (missing smtp_host / SMTP_HOST in Vercel environment).'
    console.error(`[SMTP email] ${err}`)
    return { ok: false, error: err }
  }

  const sender = from || config.from
  if (!sender) {
    const err = 'Sender email not configured (missing smpt_from / smtp_from / smtp_user in Vercel environment).'
    console.error(`[SMTP email] ${err}`)
    return { ok: false, error: err }
  }

  if (!to || (Array.isArray(to) && to.length === 0)) {
    return { ok: false, error: 'Recipient address (to) is required.' }
  }

  if (!subject) {
    return { ok: false, error: 'Subject is required.' }
  }

  if (!html && !text) {
    return { ok: false, error: 'Email content (html or text) is required.' }
  }

  try {
    const transporter = createSmtpTransporter(smtpConfig)

    // Strip HTML tags for clean text fallback if no plain text was provided
    const textContent = text || (html ? html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '')

    const mailOptions = {
      from: sender,
      to,
      subject,
      text: textContent,
      ...(html ? { html } : {}),
      ...(cc ? { cc } : {}),
      ...(bcc ? { bcc } : {}),
      ...(replyTo ? { replyTo } : {}),
      ...(attachments ? { attachments } : {}),
      ...(headers ? { headers } : {}),
    }

    const info = await transporter.sendMail(mailOptions)

    return {
      ok: true,
      messageId: info.messageId,
      response: info.response,
    }
  } catch (err) {
    console.error('[SMTP email] Failed to send email:', err.message)
    return {
      ok: false,
      error: err.message || 'Failed to send email via SMTP.',
    }
  }
}
