import { verify, sign, hashCode } from './_util.js'

const VERIFIED_TTL_MS = 15 * 60 * 1000

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { token, code } = req.body || {}
  const payload = verify(token)
  if (!payload) {
    return res.status(400).json({ success: false, message: 'Your session has expired, please start again.' })
  }
  if (!payload.codeHash || hashCode(payload.email, String(code || '').trim()) !== payload.codeHash) {
    return res.status(400).json({ success: false, message: 'Code is wrong, please try again.' })
  }

  const verifiedToken = sign({ email: payload.email, verified: true, exp: Date.now() + VERIFIED_TTL_MS })

  return res.status(200).json({
    success: true,
    message: 'Email is successfully validated.',
    token: verifiedToken,
  })
}
