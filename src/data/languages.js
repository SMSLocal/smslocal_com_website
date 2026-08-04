/**
 * The 19-language set this system supports, matching the reference
 * implementation this was adapted from. `country` is a 2-letter ISO used for
 * flag icons; `rtl` drives the `dir="rtl"` attribute on translated pages.
 */
export const LANGUAGES = [
  { code: 'es', native: 'Español', country: 'es', rtl: false },
  { code: 'fr', native: 'Français', country: 'fr', rtl: false },
  { code: 'de', native: 'Deutsch', country: 'de', rtl: false },
  { code: 'it', native: 'Italiano', country: 'it', rtl: false },
  { code: 'pt', native: 'Português', country: 'pt', rtl: false },
  { code: 'nl', native: 'Nederlands', country: 'nl', rtl: false },
  { code: 'pl', native: 'Polski', country: 'pl', rtl: false },
  { code: 'ru', native: 'Русский', country: 'ru', rtl: false },
  { code: 'tr', native: 'Türkçe', country: 'tr', rtl: false },
  { code: 'ar', native: 'العربية', country: 'sa', rtl: true },
  { code: 'hi', native: 'हिन्दी', country: 'in', rtl: false },
  { code: 'zh', native: '简体中文', country: 'cn', rtl: false },
  { code: 'ja', native: '日本語', country: 'jp', rtl: false },
  { code: 'ko', native: '한국어', country: 'kr', rtl: false },
  { code: 'vi', native: 'Tiếng Việt', country: 'vn', rtl: false },
  { code: 'id', native: 'Bahasa Indonesia', country: 'id', rtl: false },
  { code: 'th', native: 'ไทย', country: 'th', rtl: false },
  { code: 'sv', native: 'Svenska', country: 'se', rtl: false },
  { code: 'uk', native: 'Українська', country: 'ua', rtl: false },
]

export const LOCALE_CODES = LANGUAGES.map((l) => l.code)

export function isRTL(code) {
  return LANGUAGES.find((l) => l.code === code)?.rtl ?? false
}
