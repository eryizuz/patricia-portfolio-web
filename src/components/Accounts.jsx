import PhoneVideo from './PhoneVideo'

export default function Accounts({ data }) {
  return (
    <section className="slide full rd ac" id="s7">
      <div className="pn">
        <h2 className="an rv">{data.title}</h2>
        <p className="sub rv">{data.subtitle}</p>
        <div className="rail">
          {data.items.map((account) => (
            <a
              className="rv"
              href={`https://www.instagram.com/${account.handle}/`}
              target="_blank"
              rel="noopener"
              key={account.handle}
            >
              <PhoneVideo handle={account.handle} src={account.video} />
              <span>
                <b>@{account.handle}</b>
                {data.viewLabel}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
