import { site } from '../site.config';

/**
 * Restructured, for three reasons:
 *
 * 1. The rebuild-and-migrate story was the strongest asset on the site and was sitting in
 *    an unattributed grey card at the bottom of the grid, disconnected from the client
 *    card two positions above it. It now leads the section.
 * 2. The VOH card said "Case study — coming soon" — a visible unkept promise on the most
 *    relevant client. Gone.
 * 3. Fuse API Hub is FusionX's own product but was presented in the same grid as client
 *    work. Labelled honestly, it's better proof: it shows FusionX runs production
 *    software, not just delivers it.
 *
 * The nursery website is last on purpose. It's real work, but it's the one item that
 * signals "we build brochure sites" — which attracts precisely the enquiries FusionX
 * doesn't want.
 */
export default function Work() {
  const { attributeTo, descriptor } = site.caseStudy;

  return (
    <section id="work">
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">Proof</p>
          <h2>Selected work.</h2>
        </div>

        <article className="study reveal">
          <div className="study-head">
            <span className="card-tag">Case study</span>
            <h3>When software outgrows its foundation</h3>
            <span className="strap">{attributeTo || descriptor}</span>
            {attributeTo && <span className="study-desc">{descriptor}</span>}
          </div>

          <div className="study-body">
            <div className="study-beat">
              <h4>The situation</h4>
              <p>
                A business application had been running and growing for years. Features were added continuously
                as the business changed — each one reasonable on its own. Over time, the original database
                structure and architecture stopped matching what the system had become.
              </p>
            </div>
            <div className="study-beat">
              <h4>What that meant day to day</h4>
              <p>
                Changes took longer than they should have. Each new addition carried more risk than the last. The
                parts of the system that worked well were increasingly held back by the parts underneath them.
              </p>
            </div>
            <div className="study-beat">
              <h4>What we tried first</h4>
              <p>
                Optimization, before replacement. Some of it helped. But we reached the point where each further
                improvement cost more and returned less — the constraint wasn&apos;t the code we were fixing, it
                was the foundation beneath it.
              </p>
            </div>
            <div className="study-beat">
              <h4>The decision</h4>
              <p>
                We assessed the system and concluded the next version needed a healthier database and
                architecture. That wasn&apos;t the starting assumption. It was the conclusion after finding out
                where the problems actually came from.
              </p>
            </div>
            <div className="study-beat">
              <h4>The hard part</h4>
              <p>
                Years of business data and operational history, none of it disposable. A rebuild that lost it
                would have cost the business more than the problems it was meant to solve.
              </p>
            </div>
            <div className="study-beat">
              <h4>Where it landed</h4>
              <p>
                The next version was built on a sound foundation, and the existing data was migrated across in a
                controlled, validated process. The business didn&apos;t start from zero — it moved forward on
                everything it had already built.
              </p>
            </div>
            <p className="micro study-note">
              We don&apos;t publish performance figures we didn&apos;t measure. If you want to know how we&apos;d
              approach a system like yours, ask us.
            </p>
          </div>
        </article>

        <div className="work-grid reveal">
          <div className="card">
            <span className="card-tag">Our own product · built and operated by us</span>
            <h3>Fuse API Hub</h3>
            <span className="strap">API infrastructure &amp; marketplace platform</span>
            <p>
              A platform connecting API providers and consumers — distribution, monetization, and management in
              one place. We designed it, built it, and run it in production.
            </p>
            <div className="tag-row">
              <span className="tag">Platform Eng.</span><span className="tag">Auth</span><span className="tag">Subscriptions</span><span className="tag">Analytics</span>
            </div>
            <a className="card-link" href="https://fuseapihub.com/info" target="_blank" rel="noopener noreferrer">
              Visit Fuse API Hub →
            </a>
          </div>

          <div className="card">
            <span className="card-tag">Client · Ongoing engineering</span>
            <h3>VOH Opticians</h3>
            <span className="strap">Engineering &amp; maintenance partner</span>
            <p>
              Ongoing support for a customer-facing platform and the internal business software behind it —
              e-commerce, POS, and backend systems in daily operational use.
            </p>
            <div className="tag-row">
              <span className="tag">E-commerce</span><span className="tag">POS</span><span className="tag">Backend</span>
            </div>
          </div>

          <div className="card">
            <span className="card-tag">Client · Website</span>
            <h3>Washingtonia Nursery</h3>
            <span className="strap">A digital presence for a growing business</span>
            <p>
              A responsive site built around the business itself — services, project showcase, gallery, and a
              clear path for new leads to reach the business.
            </p>
            <div className="tag-row">
              <span className="tag">Web Dev</span><span className="tag">Gallery</span><span className="tag">Lead Gen</span>
            </div>
            <a className="card-link" href="https://www.washingtonianurseryqa.com/" target="_blank" rel="noopener noreferrer">
              Visit Site →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
