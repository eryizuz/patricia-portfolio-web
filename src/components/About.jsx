import RichText from './RichText'

function Player({ data }) {
  return (
    <div className="player rv">
      <img alt={data.alt} src={data.photo} />
      <div className="t">
        <span>{data.name}</span>
        <span>{data.role}</span>
      </div>
      <div className="bar">
        <i style={{ width: `${data.progress}%` }} />
      </div>
      <div className="t" style={{ marginTop: 6 }}>
        <span>{data.currentTime}</span>
        <span>{data.remainingTime}</span>
      </div>
      <div className="ctl">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 18V6l-8.5 6zm.5-6 8.5 6V6z" />
        </svg>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
        </svg>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 6v12l8.5-6zM4 18l8.5-6L4 6z" />
        </svg>
      </div>
      <div className="vol">
        <span>♪</span>
        <div className="bar">
          <i style={{ width: `${data.volume}%` }} />
        </div>
        <span>♬</span>
      </div>
    </div>
  )
}

export default function About({ data }) {
  return (
    <section className="slide about" id="s3" style={{ '--c': '.8fr 1.2fr' }}>
      <div className="pn lt">
        <Player data={data.player} />
      </div>
      <div className="pn rd about">
        <h2 className="an rv">
          {data.title[0]}
          <br />
          {data.title[1]}
        </h2>
        {data.paragraphs.map((paragraph) => (
          <RichText as="p" className="rv" key={paragraph} text={paragraph} />
        ))}
      </div>
    </section>
  )
}
