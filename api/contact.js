const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

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

  try {
    const gasRes = await fetch(process.env.GAS_WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.GAS_SHARED_SECRET,
        name,
        email,
        company,
        reason,
        phone,
        message,
      }),
      redirect: 'follow',
    })

    const text = await gasRes.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error(`Apps Script returned a non-JSON response: ${text.slice(0, 200)}`)
    }

    if (!gasRes.ok || !data.ok) {
      throw new Error(data.error || `Apps Script responded with status ${gasRes.status}`)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form email failed:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
}
