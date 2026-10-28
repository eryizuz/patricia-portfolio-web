import Imac from './Imac'

export default function Analytics({ data }) {
  return (
    <section className="slide an8" id="s8" style={{ '--c': '.85fr 1.15fr' }}>
      <div className="pn lt">
        <svg className="ic rv" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 20h18M6 16v-5M11 16V6M16 16v-8M21 16v-3" />
        </svg>
        <h2 className="an rv">{data.title}</h2>
        <p className="rv">{data.paragraph}</p>
      </div>
      <div className="pn rd">
        <div className="mons rv">
          {data.monitors.map((monitor) => (
            <div key={monitor.title}>
              <h3>{monitor.title}</h3>
              <Imac>
                {monitor.image ? (
                  <img src={monitor.image} alt={monitor.title} />
                ) : (
                  <>
                    <strong>{monitor.value}</strong>
                    <svg viewBox="0 0 120 44" preserveAspectRatio="none">
                      <path
                        d={monitor.path}
                        fill="none"
                        stroke="var(--acc)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </Imac>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
