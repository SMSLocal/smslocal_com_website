import dialCodesRaw from './dialCodes.generated.json'

// Matches the same "Popular Countries" set as the pricing page's country
// picker, kept pinned to the top ahead of the alphabetical remainder.
const POPULAR_CODES = ['US', 'GB', 'AE', 'AU', 'ES']

function toEntry(c) {
  return { code: c.code, name: c.name, dial: c.dial, flagSrc: `/flags/${c.code.toLowerCase()}.svg` }
}

const byCode = Object.fromEntries(dialCodesRaw.map((c) => [c.code, c]))

export const POPULAR_DIAL_CODES = POPULAR_CODES.map((code) => toEntry(byCode[code]))

export const OTHER_DIAL_CODES = dialCodesRaw
  .filter((c) => !POPULAR_CODES.includes(c.code))
  .map(toEntry)

// Full list, popular countries first.
export const DIAL_CODES = [...POPULAR_DIAL_CODES, ...OTHER_DIAL_CODES]
