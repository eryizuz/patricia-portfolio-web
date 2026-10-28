import Imac from './Imac'
import PhoneVideo, { SmartVideo } from './PhoneVideo'

export default function ContentCreation({ data }) {
  return (
    <section className="slide cc" id="s5" style={{ '--c': '.9fr 1.1fr' }}>
      <div className="pn rd">
        <h2 className="an rv">{data.title}</h2>
        <p className="rv">{data.paragraph}</p>
        <div className="rv" style={{ marginTop: 20 }}>
          {data.tools.map((tool) => (
            <span className="chip" key={tool}>
              {tool}
            </span>
          ))}
        </div>
      </div>
      <div className="pn lt">
        <div className="mix rv">
          <Imac>
            <SmartVideo src={data.monitor} />
          </Imac>
          {data.phones.map((video, index) => (
            <figure key={index}>
              <PhoneVideo src={video} />
              {data.caption}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
