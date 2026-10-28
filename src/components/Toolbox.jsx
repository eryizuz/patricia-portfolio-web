export default function Toolbox({ data }) {
  return (
    <section className="slide full tool" id="s2">
      <div className="pn">
        <div className="ghost" aria-hidden="true">
          {data.ghost}
        </div>
        <div className="bars">
          {data.bars.map((bar) => (
            <div className="rv" key={bar.label} style={{ '--w': `${bar.width}%` }}>
              {bar.label}
            </div>
          ))}
        </div>
        <div className="chips">
          {data.tools.map((tool) => (
            <span className="chip" key={tool}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
