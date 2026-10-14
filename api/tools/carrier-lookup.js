// POST /api/tools/carrier-lookup — the backend for /tools/carrier-lookup/.
//
// Answers from Google's libphonenumber metadata (bundled, no network call):
// validity, country, line type, the network the number range was allocated
// to, the area it belongs to and its time zones. That network is the
// ORIGINAL carrier — a number ported since keeps its old range — and for
// North American (+1) numbers the metadata carries no carrier at all, since
// portability there is universal. The page says both things plainly.
import { carrier, geocoder, timezones } from 'libphonenumber-geo-carrier'
import { clientIp, methodNotAllowed, parsePhone, rateLimited } from '../_lib/tools.js'

const TEN_MINUTES = 10 * 60 * 1000

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res)

  const { country, number } = req.body ?? {}
  if (rateLimited(`lookup:${clientIp(req)}`, 30, TEN_MINUTES)) {
    return res.status(429).json({ ok: false, code: 'rate_limited' })
  }

  const phone = parsePhone(country, number)
  if (!phone || !phone.isPossible()) return res.status(400).json({ ok: false, code: 'invalid_number' })

  const valid = phone.isValid()
  let network = null
  let location = null
  let zones = []
  if (valid) {
    try {
      ;[network, location, zones] = await Promise.all([
        carrier(phone, 'en'),
        geocoder(phone, 'en'),
        timezones(phone),
      ])
    } catch (err) {
      console.error('carrier-lookup: metadata read failed', err.message)
    }
  }

  return res.status(200).json({
    ok: true,
    valid,
    e164: phone.number,
    international: phone.formatInternational(),
    country: phone.country || null,
    callingCode: phone.countryCallingCode,
    type: valid ? phone.getType() || null : null,
    carrier: network || null,
    location: location || null,
    timezones: zones || [],
  })
}
