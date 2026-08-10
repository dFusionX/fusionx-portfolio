const NODES = [
  {
    num: '01', name: 'Build', role: 'Custom Software Development', current: true,
    desc: 'Turn business requirements and workflows into reliable software.',
    tags: ['Web Apps', 'E-commerce', 'APIs', 'Internal Systems', 'MVPs'],
  },
  {
    num: '02', name: 'Improve', role: 'Engineering & Optimization',
    desc: "Existing software doesn't always need a rewrite — sometimes it needs better engineering.",
    tags: ['DB Tuning', 'Caching', 'Refactoring', 'API Perf'],
  },
  {
    num: '03', name: 'Modernize', role: 'Software Modernization',
    desc: "Software often grows faster than its architecture. We bring aging systems up to a standard that supports what's next.",
    tags: ['Architecture', 'Legacy → New', 'Scalability', 'CDN'],
    note: "We don't add complexity because it's fashionable — we choose architecture based on what the business needs.",
  },
  {
    num: '04', name: 'Migrate', role: 'Data & System Migration',
    desc: "Moving to a new system doesn't mean leaving your business data behind.",
    tags: ['DB Migration', 'Transformation', 'Validation'],
  },
  {
    num: '05', name: 'Maintain', role: 'Ongoing Engineering',
    desc: "Software doesn't stop needing engineering after launch.",
    tags: ['Bug Fixing', 'Security', 'Monitoring'],
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">How we engage</p>
          <h2>Five ways to move a system forward.</h2>
          <p className="lede">
            Not every system needs the same thing. We meet you at whichever stage yours is at — and can move
            with you into the next one.
          </p>
        </div>

        <div className="spine reveal">
          <div className="spine-line" />
          <div className="spine-nodes">
            {NODES.map((n) => (
              <div className={`node${n.current ? ' is-current' : ''}`} key={n.num}>
                <div className="node-num">{n.num}</div>
                <h3>{n.name}</h3>
                <span className="role">{n.role}</span>
                <p>{n.desc}</p>
                <div className="tag-row">
                  {n.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                {n.note && <p className="node-note">{n.note}</p>}
              </div>
            ))}
          </div>
        </div>

        <p style={{ marginTop: '2rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '.85rem' }}>
          Need someone to take care of your existing software?
        </p>
        <div className="btn-row" style={{ marginTop: '.9rem' }}>
          <a className="btn btn-ghost" href="#contact">Talk to an Engineer</a>
        </div>
      </div>
    </section>
  );
}
