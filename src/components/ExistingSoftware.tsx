const PATHS = [
  { title: 'Diagnose', desc: "Understand what's actually causing the problem." },
  { title: 'Optimize', desc: 'Improve performance without rebuilding everything.' },
  { title: 'Modernize', desc: 'Improve the architecture and technical foundation.' },
  { title: 'Migrate', desc: 'Move the application and its data to a new system.' },
  { title: 'Rebuild', desc: 'When the foundation has reached its limits, build the next version properly.' },
];

export default function ExistingSoftware() {
  return (
    <section id="existing">
      <div className="wrap grid-2">
        <div className="reveal">
          <p className="eyebrow">Already have software?</p>
          <h2 style={{ fontSize: 'clamp(1.7rem,3.1vw,2.5rem)', margin: '1rem 0 1.25rem' }}>
            You don't necessarily need to start over.
          </h2>
          <p className="lede">
            Your application may be slow. Your database may have grown messy. Your backend may be hard to
            change. Your original developers may be long gone. Or years of feature additions may have left the
            system difficult to maintain.
          </p>
          <p className="lede" style={{ marginTop: '1rem' }}>
            FusionX can assess where the problems actually come from, and determine the right path forward.
          </p>
          <p style={{ marginTop: '1.75rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '.85rem' }}>
            Don't know which one you need? That's what a technical assessment is for.
          </p>
          <div className="btn-row">
            <a className="btn btn-primary" href="#contact">Talk to an Engineer</a>
          </div>
        </div>
        <div className="grid-4 single-col reveal">
          {PATHS.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
