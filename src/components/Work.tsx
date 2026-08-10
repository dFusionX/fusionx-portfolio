export default function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">Software we've worked on</p>
          <h2>Selected work.</h2>
        </div>
        <div className="work-grid reveal">
          <div className="card">
            <span className="card-tag">Product · API Infrastructure</span>
            <h3>Fuse API Hub</h3>
            <span className="strap">API infrastructure &amp; marketplace platform</span>
            <p>A platform connecting API providers and consumers — distribution, monetization, and management in one place.</p>
            <div className="tag-row">
              <span className="tag">Platform Eng.</span><span className="tag">Auth</span><span className="tag">Subscriptions</span><span className="tag">Analytics</span>
            </div>
            <a className="card-link" href="https://fuseapihub.com/info" target="_blank" rel="noopener noreferrer">
              Visit Fuse API Hub →
            </a>
          </div>
          <div className="card">
            <span className="card-tag">Website · Digital Presence</span>
            <h3>Washingtonia Nursery</h3>
            <span className="strap">A digital presence for a growing business</span>
            <p>A responsive site built around the business itself — services, project showcase, gallery, and a clear path for new leads to reach the business.</p>
            <div className="tag-row">
              <span className="tag">Web Dev</span><span className="tag">Gallery</span><span className="tag">Lead Gen</span>
            </div>
            <a className="card-link" href="https://www.washingtonianurseryqa.com/" target="_blank" rel="noopener noreferrer">
              Visit Site →
            </a>
          </div>
          <div className="card">
            <span className="card-tag">E-commerce · Business Software</span>
            <h3>VOH Opticians</h3>
            <span className="strap">Engineering &amp; maintenance partner</span>
            <p>Ongoing support for a customer-facing platform and the internal business software behind it — e-commerce, POS, and backend systems.</p>
            <div className="tag-row">
              <span className="tag">E-commerce</span><span className="tag">POS</span><span className="tag">Backend</span>
            </div>
            <span className="card-link is-pending">Case study — coming soon</span>
          </div>
          <div className="card wide">
            <div>
              <span className="card-tag">Case Study</span>
              <h3 style={{ marginTop: '.5rem' }}>When software outgrows its foundation</h3>
            </div>
            <div>
              <p>A business application had evolved for years through continuous feature additions, until the original database structure and architecture became difficult to maintain. Incremental optimization could only take it so far.</p>
              <p style={{ marginTop: '.75rem' }}>Rather than patch indefinitely, FusionX designed the next version with a healthier database and architecture — and migrated the business's existing data across in a controlled process.</p>
              <p style={{ marginTop: '.75rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '.82rem' }}>The business didn't start from zero. It moved forward on everything it had already built.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
