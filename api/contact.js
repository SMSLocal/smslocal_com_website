const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Retryable: the fetch itself failed, Google's edge returned a non-2xx, or the
// body isn't JSON at all — this last one is what an occasional Apps Script
// hiccup actually looks like: Google briefly serves its generic Docs/Drive
// sign-in HTML instead of running the script. Confirmed from production
// logs (2026-08-06): one submission got that HTML, the next two calls minutes
// later succeeded cleanly with no code or config change in between — the
// definition of transient. NOT retryable: valid JSON with ok:false. That's
// Apps Script's own doPost() rejecting the request (bad secret, missing
// fields) — retrying sends the identical payload and fails the identical way.
class RetryableError extends Error {}

async function callAppsScript(payload, timeoutMs) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  let gasRes
  try {
    gasRes = await fetch(process.env.GAS_WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    })
  } catch (err) {
    throw new RetryableError(`Apps Script request failed: ${err.message}`)
  } finally {
    clearTimeout(timer)
  }

  const text = await gasRes.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new RetryableError(`Apps Script returned a non-JSON response: ${text.slice(0, 200)}`)
  }

  if (!gasRes.ok) {
    throw new RetryableError(`Apps Script responded with status ${gasRes.status}`)
  }
  if (!data.ok) {
    // Deliberately a plain Error, not RetryableError — see the class comment.
    throw new Error(data.error || 'Apps Script rejected the request')
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, reason, phone, message } = req.body || {}

  if (!name || !email || !company || !reason || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }

  if (!process.env.GAS_WEB_APP_URL) {
    console.error('Contact form: GAS_WEB_APP_URL is not configured.')
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }

  const payload = {
    secret: process.env.GAS_SHARED_SECRET,
    name,
    email,
    company,
    reason,
    phone,
    message,
  }

  // One retry, after Google has had a moment to stop whatever it was doing —
  // immediately hammering the same URL again is how you turn a blip into a
  // rate limit. Each attempt gets its own 12s cap so two attempts stay well
  // inside this function's 30s budget (see vercel.json) rather than the
  // visitor discovering the failure only after both have run long.
  try {
    await callAppsScript(payload, 12000)
    return res.status(200).json({ ok: true })
  } catch (err) {
    if (!(err instanceof RetryableError)) {
      console.error('Contact form email rejected:', err)
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
    }
    console.warn('Contact form email failed, retrying once:', err.message)
  }

  try {
    await new Promise((r) => setTimeout(r, 1000))
    await callAppsScript(payload, 12000)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form email failed on retry:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
}
