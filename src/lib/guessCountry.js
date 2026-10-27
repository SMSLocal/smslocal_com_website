// Best guess at the visitor's country from the browser's language settings
// (es-PE -> PE), used to pre-select a phone country code. Returns null when no
// region is present or it isn't one of the codes we offer; callers keep their
// default then. Runs in the browser only (the prerender has no navigator).
export function guessCountry(validCodes) {
  if (typeof navigator === 'undefined') return null
  for (const tag of navigator.languages?.length ? navigator.languages : [navigator.language]) {
    const region = String(tag || '').split('-')[1]?.toUpperCase()
    if (region && validCodes.includes(region)) return region
  }
  return null
}
