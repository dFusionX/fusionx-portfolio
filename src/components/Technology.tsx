const CATEGORIES = [
  { title: 'Application', desc: 'Web Applications · APIs · Backend Systems' },
  { title: 'Data', desc: 'Relational Databases · Migration · Optimization' },
  { title: 'Infrastructure', desc: 'Cloud · CDN · Caching · Containers · Deployment' },
  { title: 'Architecture', desc: 'Monoliths · Modular Systems · Distributed Systems · SOA' },
];

export default function Technology() {
  return (
    <section id="technology">
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">Technology</p>
          <h2>Technology should serve the problem.</h2>
          <p className="lede">
            We choose technologies and architecture based on requirements, constraints, and where the business
            is headed — not because something is currently popular.
          </p>
        </div>
        <div className="grid-4 reveal">
          {CATEGORIES.map((c) => (
            <div key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
