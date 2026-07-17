import { useEffect } from 'react'

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function Seo({ title, description, keywords }) {
  useEffect(() => {
    if (title) document.title = `${title} | SMSLocal`
    if (description) setMeta('description', description)
    if (keywords) setMeta('keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords)
  }, [title, description, keywords])

  return null
}

export default Seo
