import { useState } from 'react'

export default function PaletteSwitch({ options }) {
  const [palette, setPalette] = useState(options[0]?.value ?? '')

  const choose = (value) => {
    setPalette(value)
    document.documentElement.dataset.pal = value
  }

  return (
    <div className="pal" role="group" aria-label="Paleta">
      {options.map((option) => (
        <button
          key={option.label}
          type="button"
          aria-pressed={palette === option.value}
          onClick={() => choose(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
