/**
 * This list used to be a second five-verb framework (Diagnose/Optimize/Modernize/Migrate/
 * Rebuild) sitting alongside the Services one (Build/Improve/Modernize/Migrate/Maintain).
 * Two competing pentads is worse than one, so these are now framed as what an assessment
 * concludes — a visibly different thing from the service list — and "Diagnose" is gone,
 * because diagnosis is the assessment itself, not one of its outcomes.
 *
 * No CTA here on purpose: the Assessment section follows immediately and owns it.
 */
const OUTCOMES = [
  { title: 'Fix what’s actually wrong', desc: 'Targeted work on the real bottleneck. No rewrite.' },
  { title: 'Repair the foundation', desc: 'Improve the architecture and data model the system sits on, in place.' },
  { title: 'Move it somewhere healthier', desc: 'Migrate the application and its data onto a platform that can support it.' },
  {
    title: 'Rebuild, and carry the data across',
    desc: 'When the foundation has reached its limits, build the next version properly — and bring your business data with it.',
  },
];

export default function ExistingSoftware() {
  return (
    <section id="existing">
      <div className="wrap grid-2">
        <div className="reveal">
          <p className="eyebrow">Already have software?</p>
          <h2 style={{ fontSize: 'clamp(1.7rem,3.1vw,2.5rem)', margin: '1rem 0 1.25rem' }}>
            You don&apos;t necessarily need to start over.
          </h2>
          <p className="lede">
            Your application may be slow. Your database may have grown messy. Your backend may be hard to
            change. Your original developers may be long gone. Or years of feature additions may have left the
            system difficult to maintain.
          </p>
          <p className="lede" style={{ marginTop: '1rem' }}>
            Those are different problems with different answers, and from the outside they look identical. We
            find out which one you actually have before recommending anything — including recommending that you
            leave it alone.
          </p>
          <p className="micro">Where it usually lands, once we&apos;ve looked:</p>
        </div>
        <div className="grid-4 single-col reveal">
          {OUTCOMES.map((p) => (
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
