import { useEffect } from 'react'

/**
 * Revela los elementos .rv al entrar en el viewport.
 * Es la única animación de entrada del sitio (ver index.css).
 */
export default function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.rv'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    elements.forEach((el, index) => {
      el.style.transitionDelay = `${(index % 4) * 70}ms`
    })

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('in'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15 },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
