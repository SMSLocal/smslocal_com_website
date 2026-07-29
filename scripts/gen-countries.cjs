const fs = require('fs')
const path = require('path')
const countries = require('world-countries')

const list = countries
  .filter((c) => c.independent !== false || c.unMember)
  .map((c) => ({ code: c.cca2, name: c.name.common }))
  .filter((c, i, arr) => arr.findIndex((x) => x.code === c.code) === i)
  .sort((a, b) => a.name.localeCompare(b.name))

console.log('total:', list.length)

const outPath = path.join(__dirname, '..', 'src', 'data', 'allCountries.generated.json')
fs.writeFileSync(outPath, JSON.stringify(list, null, 2))
console.log('written to', outPath)
