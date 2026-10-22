import { useEffect, useState } from 'react'

/** True once the element has scrolled into view (and stays true when `once`). */
export function useInView(ref, once = true) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); if (once) io.disconnect() } else if (!once) setSeen(false)
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, once])
  return seen
}

/** Tracks the visitor's reduced-motion preference. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = (e) => setReduced(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}
