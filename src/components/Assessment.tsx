const LOOK_AT = [
  'Architecture', 'Database Design', 'Backend', 'APIs', 'Infrastructure', 'Performance',
  'Security', 'Scalability', 'Technical Debt', 'Deployment', 'Dependencies',
];

const RECEIVE = [
  { term: 'Current State', desc: 'What exists today.' },
  { term: 'Problems', desc: "What's holding the system back." },
  { term: 'Root Causes', desc: 'Why those problems exist.' },
  { term: 'Recommendations', desc: 'What should change.' },
  { term: 'Roadmap', desc: 'What should happen next.' },
];

export default function Assessment() {
  return (
    <section id="assessment">
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">Before you rebuild</p>
          <h2>Understand what you're rebuilding, before you rebuild it.</h2>
          <p className="lede">
            Not every slow or unstable application needs to be rewritten. Not every legacy system can be saved
            with another patch. We assess your existing software, identify the underlying problems, and
            recommend the most practical path forward.
          </p>
        </div>
        <div className="panel reveal">
          <div className="panel-grid">
            <div>
              <p className="eyebrow" style={{ color: 'var(--steel)' }}>We look at</p>
              <div className="cloud">
                {LOOK_AT.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
              <div className="btn-row">
                <a className="btn btn-primary" href="#contact">Get a Technical Assessment</a>
              </div>
            </div>
            <div>
              <p className="eyebrow" style={{ color: 'var(--steel)' }}>You receive</p>
              <dl style={{ margin: '1rem 0 0' }}>
                {RECEIVE.map((r) => (
                  <div className="report-row" key={r.term}>
                    <dt>{r.term}</dt>
                    <dd>{r.desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
