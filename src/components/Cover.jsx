import PhoneVideo from './PhoneVideo'

export default function Cover({ data }) {
  return (
    <section className="slide cover" id="s1" style={{ '--c': '1.05fr .95fr' }}>
      <div className="pn lt">
        <h1 className="an rv">
          {data.title}
          <span>{data.name}</span>
        </h1>
        <p className="rv">{data.subtitle}</p>
        <div className="ed">{data.edition}</div>
      </div>
      <div className="pn rd">
        <div className="trio">
          {data.videos.map((video, index) => (
            <PhoneVideo key={index} src={video} />
          ))}
        </div>
      </div>
    </section>
  )
}
