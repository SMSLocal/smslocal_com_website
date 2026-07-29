const fs = require('fs')
const path = require('path')
const countries = require('world-countries')

function dialCode(c) {
  if (!c.idd || !c.idd.root) return null
  const suffix = c.idd.suffixes && c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : ''
  return c.idd.root + suffix
}

const list = countries
  .filter((c) => c.independent !== false || c.unMember)
  .map((c) => ({ code: c.cca2, name: c.name.common, dial: dialCode(c) }))
  .filter((c) => c.dial)
  .filter((c, i, arr) => arr.findIndex((x) => x.code === c.code) === i)
  .sort((a, b) => a.name.localeCompare(b.name))

console.log('total:', list.length)

const outPath = path.join(__dirname, '..', 'src', 'data', 'dialCodes.generated.json')
fs.writeFileSync(outPath, JSON.stringify(list, null, 2))
console.log('written to', outPath)
