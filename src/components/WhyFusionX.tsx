const CARDS = [
  { title: 'Business-first', desc: 'We understand what the software needs to accomplish before deciding how to build it.' },
  { title: 'Engineering depth', desc: 'We work beyond the UI — databases, backend systems, architecture, infrastructure, and data.' },
  { title: 'Existing systems welcome', desc: "We don't expect every client to start from zero." },
  { title: 'Built for change', desc: 'Software should be able to evolve as the business does.' },
];

export default function WhyFusionX() {
  return (
    <section>
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">Why FusionX</p>
          <h2>Practical engineering over unnecessary complexity.</h2>
        </div>
        <div className="why-grid reveal">
          {CARDS.map((c) => (
            <div className="why-card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
