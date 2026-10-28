import { useState } from 'react'
import RichText from './RichText'

export default function Cases({ data }) {
  const [open, setOpen] = useState(() => data.items.map(() => false))

  const toggle = (index) => {
    setOpen((current) => current.map((value, i) => (i === index ? !value : value)))
  }

  return (
    <section className="slide cs" id="s6" style={{ '--c': '.9fr 1.1fr' }}>
      <div className="pn lt">
        <h2 className="pf rv">{data.title}</h2>
        <ul className="rv">
          {data.intro.map((text) => (
            <RichText as="li" key={text} text={text} />
          ))}
        </ul>
      </div>
      <div className="pn rd">
        <div className="acc rv">
          {data.items.map((item, index) => {
            const panelId = `case-panel-${index}`
            return (
              <div className={`it${open[index] ? ' open' : ''}`} key={item.name}>
                <button
                  type="button"
                  aria-expanded={open[index]}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                >
                  <span className="nm">{item.name}</span>
                  <span className="kp">{item.metric}</span>
                </button>
                <div className="pl" id={panelId}>
                  <div>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
