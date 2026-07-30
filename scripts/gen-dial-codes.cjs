const fs = require('fs')
const path = require('path')
const countries = require('world-countries')

function dialCode(c) {
  if (!c.idd || !c.idd.root) return null
  const suffix = c.idd.suffixes && c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : ''
  return c.idd.root + suffix
}

// Explicit overrides to the default independent/unMember filter below —
// Israel (IL) is excluded and Palestine (PS) is included by client request,
// regardless of what world-countries' independent/unMember flags say.
const EXCLUDE_CODES = ['IL']
const EXTRA_CODES = ['PS']

const list = countries
  .filter((c) => (c.independent !== false || c.unMember) && !EXCLUDE_CODES.includes(c.cca2))
  .concat(countries.filter((c) => EXTRA_CODES.includes(c.cca2)))
  .map((c) => ({ code: c.cca2, name: c.name.common, dial: dialCode(c) }))
  .filter((c) => c.dial)
  .filter((c, i, arr) => arr.findIndex((x) => x.code === c.code) === i)
  .sort((a, b) => a.name.localeCompare(b.name))

console.log('total:', list.length)

const outPath = path.join(__dirname, '..', 'src', 'data', 'dialCodes.generated.json')
fs.writeFileSync(outPath, JSON.stringify(list, null, 2))
console.log('written to', outPath)
