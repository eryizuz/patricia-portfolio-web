import Laptop from './Laptop'

export default function Contact({ data }) {
  const { laptop } = data

  return (
    <section className="slide ct" id="s9" style={{ '--c': '1fr 1fr' }}>
      <div className="pn lt">
        <h2 className="an rv">{data.title}</h2>
        <p className="rv" style={{ maxWidth: '36ch' }}>
          {data.paragraph}
        </p>
        <div className="kp5 rv">
          {data.kpis.map((kpi) => (
            <div key={kpi.label}>
              <b>{kpi.value}</b>
              <small>{kpi.label}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="pn rd">
        <Laptop className="rv">
          <h3>{laptop.heading}</h3>
          {laptop.links.map((link) => (
            <a href={link.href} key={link.href}>
              <i>{link.icon}</i>
              <span>
                {link.text}
                <small>{link.label}</small>
              </span>
            </a>
          ))}
        </Laptop>
      </div>
    </section>
  )
}
