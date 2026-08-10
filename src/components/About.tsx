export default function About() {
  return (
    <section id="about">
      <div className="wrap grid-2">
        <div className="reveal">
          <p className="eyebrow">About FusionX</p>
          <h2 style={{ fontSize: 'clamp(1.7rem,3.1vw,2.5rem)', margin: '1rem 0 1.25rem' }}>
            We build software for businesses that need it to work.
          </h2>
        </div>
        <div className="reveal">
          <p className="lede">
            FusionX is a software engineering company focused on building, improving, and modernizing business
            software. We work across the entire lifecycle of a system — from the first idea to production,
            maintenance, modernization, and migration.
          </p>
          <p className="lede" style={{ marginTop: '1rem' }}>
            Our work spans customer-facing applications, e-commerce, APIs, internal business systems, databases,
            and infrastructure. Good engineering isn't about using the most complicated technology — it's about
            understanding the problem, choosing the right solution, and building something that can keep
            supporting the business tomorrow.
          </p>
          <p className="manifesto">
            Build what matters. Improve what exists. Prepare for what's ne<span className="x">x</span>t.
          </p>
        </div>
      </div>
    </section>
  );
}
