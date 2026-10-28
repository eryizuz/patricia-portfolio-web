export default function Experience({ data }) {
  return (
    <section className="slide full lt xp" id="s4">
      <div className="pn">
        <h2 className="an rv">{data.title}</h2>
        <div className="cols">
          {data.columns.map((column) => (
            <div className="col rv" key={column.period}>
              <h3>{column.period}</h3>
              <h4>{column.heading}</h4>
              <p>{column.text}</p>
            </div>
          ))}
        </div>
        <div className="sk rv">
          {data.skills.featured.map((skill) => (
            <span className="chip on" key={skill}>
              {skill}
            </span>
          ))}
          {data.skills.other.map((skill) => (
            <span className="chip" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
