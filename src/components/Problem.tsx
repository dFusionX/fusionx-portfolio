const ITEMS = [
  { tag: '[ NEW ]', q: 'Have an idea?', a: 'We can build it.' },
  { tag: '[ BUG ]', q: 'Have a broken system?', a: 'We can diagnose and fix it.' },
  { tag: '[ AGE ]', q: 'Have an aging system?', a: 'We can modernize it.' },
  { tag: '[ MIG ]', q: 'Need a new version?', a: 'We can rebuild and migrate your data.' },
  { tag: '[ OPS ]', q: 'Need someone long-term?', a: 'We can maintain and improve it, continuously.' },
];

export default function Problem() {
  return (
    <section>
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">Where things stand</p>
          <h2>Software shouldn't become a business problem.</h2>
          <p className="lede">
            Maybe you're starting something new. Maybe an existing system has become slow, unstable, or hard to
            change. Maybe the business has simply outgrown the software it started with. Whatever stage you're
            at, FusionX helps you move forward.
          </p>
        </div>
        <div className="diag reveal">
          {ITEMS.map((it) => (
            <div className="diag-item" key={it.q}>
              <span className="diag-tag">{it.tag}</span>
              <h3>{it.q}</h3>
              <p>{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
