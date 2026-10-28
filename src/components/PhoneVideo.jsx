import { useEffect, useMemo, useRef, useState } from 'react'
import content from '../data/content.json'

const DEFAULT_VIDEO = content.videoDefault || '/videos/test.mp4'

/**
 * Video con resolución automática de fuente y reproducción solo cuando es visible.
 *
 * Orden de búsqueda: src explícito → /videos/{handle}.mp4 → video por defecto.
 * Si una fuente falla, se pasa a la siguiente para que el mockup nunca quede vacío.
 */
export function SmartVideo({ src = null, handle = null, poster = null, className = '', ...rest }) {
  const videoRef = useRef(null)
  const visibleRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [detectedPoster, setDetectedPoster] = useState(null)
  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const candidates = useMemo(() => {
    const list = []
    if (src) list.push(src)
    if (handle) list.push(`/videos/${handle}.mp4`)
    if (DEFAULT_VIDEO) list.push(DEFAULT_VIDEO)
    return [...new Set(list)]
  }, [src, handle])

  const sourceKey = candidates.join('|')
  const current = candidates[Math.min(index, candidates.length - 1)]

  // Reinicia la búsqueda si cambian las fuentes recibidas.
  useEffect(() => {
    setIndex(0)
  }, [sourceKey])

  // Póster opcional: public/videos/{handle}.jpg (solo se usa si existe).
  useEffect(() => {
    if (!handle) return undefined

    let active = true
    const image = new Image()
    image.src = `/videos/${handle}.jpg`
    image.onload = () => {
      if (active) setDetectedPoster(image.src)
    }

    return () => {
      active = false
    }
  }, [handle])

  // Reproduce únicamente cuando el video está en pantalla.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    if (reducedMotion) {
      video.pause()
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      visibleRef.current = true
      video.play().catch(() => {})
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRef.current = entry.isIntersecting
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.25 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion])

  const handleError = () => {
    setIndex((currentIndex) =>
      currentIndex < candidates.length - 1 ? currentIndex + 1 : currentIndex,
    )
  }

  // Si autoPlay arranca fuera de pantalla (o con movimiento reducido), lo detenemos.
  const handlePlay = (event) => {
    if (reducedMotion || !visibleRef.current) event.currentTarget.pause()
  }

  return (
    <video
      ref={videoRef}
      className={className}
      src={current}
      poster={poster || detectedPoster || undefined}
      muted
      loop
      playsInline
      autoPlay={!reducedMotion}
      preload="metadata"
      onError={handleError}
      onPlay={handlePlay}
      {...rest}
    />
  )
}

/**
 * Mockup de teléfono vertical con video.
 */
export default function PhoneVideo({ handle = null, src = null, className = '', style, ...rest }) {
  return (
    <div className={`phone ${className}`.trim()} style={style}>
      <SmartVideo handle={handle} src={src} {...rest} />
    </div>
  )
}
