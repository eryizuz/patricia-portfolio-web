import { useEffect, useState } from 'react'

/**
 * Devuelve el id de la diapositiva visible (la que cruza el 50 % del viewport).
 */
export default function useActiveSlide() {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined

    const slides = Array.from(document.querySelectorAll('.slide'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { threshold: 0.5 },
    )

    slides.forEach((slide) => observer.observe(slide))

    return () => observer.disconnect()
  }, [])

  return activeId
}
