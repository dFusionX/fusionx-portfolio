import { site } from '../site.config';

/**
 * New section, absorbing the old About, WhyFusionX, InternalSystems and Technology
 * sections — which between them were the 7th, 8th and 9th restatements of "we're capable"
 * and contained no information a visitor couldn't already have guessed.
 *
 * What replaces them is the thing that was missing entirely: who FusionX actually is.
 * A two-person company asking to touch someone's production database and never naming a
 * single human is the largest trust gap on the site.
 *
 * Founder details, location and stack all come from site.config.ts and are hidden until
 * filled in — the honest-scale copy below stands on its own without them.
 */
const PRINCIPLES = [
  {
    title: 'Business first, then technology',
    desc: 'We work out what the software has to accomplish before deciding how to build it.',
  },
  {
    title: 'Beyond the interface',
    desc: 'Databases, backend systems, architecture, infrastructure and data — not just the screens on top of them.',
  },
  {
    title: 'Existing systems welcome',
    desc: "We don't expect a client to start from zero, and we'll say so when starting over is the wrong answer.",
  },
  {
    title: 'Built to be changed',
    desc: 'Software that can be modified a year from now is worth more than software that was clever on launch day.',
  },
];

export default function WhoWeAre() {
  const { founders, location, timezone, stack } = site;

  return (
    <section id="about">
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">Who you&apos;ll be working with</p>
          <h2>Two engineers. You work with the people writing the code.</h2>
          <p className="lede">
            FusionX is deliberately small. We take on a limited number of clients at a time, which means
            there&apos;s no account manager between you and the person who understands your system. When you ask
            why something is slow, you&apos;re asking the person who looked at it.
          </p>
        </div>

        {founders.length > 0 && (
          <div className="people reveal">
            {founders.map((f) => (
              <div className="person" key={f.name}>
                <h3>{f.name}</h3>
                <span className="person-role">{f.role}</span>
                <p>{f.bio}</p>
                {f.linkedin && (
                  <a className="card-link" href={f.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {(location || timezone) && (
          <p className="micro reveal" style={{ marginTop: '1.5rem' }}>
            {location && <>Based in {location}.</>}
            {location && timezone && ' '}
            {timezone && <>We work {timezone}.</>}
          </p>
        )}

        <div className="why-grid reveal" style={{ marginTop: '3rem' }}>
          {PRINCIPLES.map((c) => (
            <div className="why-card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>

        {stack && (
          <div className="reveal stack-line">
            <p className="eyebrow">What we work with</p>
            <p>{stack}</p>
          </div>
        )}

        <div className="grid-2 reveal" style={{ marginTop: '3rem' }}>
          <div>
            <p className="lede">
              We work across the whole lifecycle of a system — from the first idea through production,
              maintenance, modernization and migration. That includes the software nobody outside the business
              ever sees: POS platforms, inventory, dashboards, operational tools and internal workflow systems.
            </p>
          </div>
          <div>
            <p className="lede">
              Good engineering isn&apos;t about using the most complicated technology available. It&apos;s about
              understanding the problem, choosing technology that fits the requirements and constraints rather
              than what&apos;s currently popular, and building something that still supports the business next
              year.
            </p>
            <p className="manifesto">
              Build what matters. Improve what exists. Prepare for what&apos;s ne<span className="x">x</span>t.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
