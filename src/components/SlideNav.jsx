import useActiveSlide from '../hooks/useActiveSlide'

export default function SlideNav({ count = 9 }) {
  const activeId = useActiveSlide()

  return (
    <nav className="dots" aria-label="Secciones">
      {Array.from({ length: count }, (_, index) => {
        const id = `s${index + 1}`
        const isActive = activeId === id
        return (
          <a
            key={id}
            href={`#${id}`}
            className={isActive ? 'on' : undefined}
            aria-label={`Sección ${index + 1}`}
            aria-current={isActive ? 'true' : undefined}
          />
        )
      })}
    </nav>
  )
}
