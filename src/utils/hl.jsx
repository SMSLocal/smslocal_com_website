/**
 * Homepage heading treatment: every heading mixes Geist with a serif-italic
 * gradient accent word at the end (e.g. "Get Clear Answers On <i>Bulk SMS</i>").
 * For plain-string titles we auto-highlight the trailing word (or last two when
 * the final word is very short). JSX titles that already mark their own
 * highlight (a <span className="grad-word">) are returned untouched.
 */
export function hl(title) {
  if (typeof title !== 'string') return title
  const words = title.trim().split(/\s+/)
  if (words.length < 2) return title
  const lastAlnum = words[words.length - 1].replace(/[^A-Za-z0-9]/g, '')
  const n = lastAlnum.length <= 3 && words.length >= 3 ? 2 : 1
  const head = words.slice(0, words.length - n).join(' ')
  const tail = words.slice(words.length - n).join(' ')
  return (
    <>
      {head} <span className="grad-word">{tail}</span>
    </>
  )
}
