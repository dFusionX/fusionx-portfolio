import { site } from '../site.config';
import { trackCta } from '../lib/analytics';

const LOOK_AT = [
  'Architecture', 'Database Design', 'Backend', 'APIs', 'Infrastructure', 'Performance',
  'Security', 'Scalability', 'Technical Debt', 'Deployment', 'Dependencies',
];

const RECEIVE = [
  { term: 'Current State', desc: 'What exists today, described plainly.' },
  { term: 'Problems', desc: "What's holding the system back." },
  { term: 'Root Causes', desc: 'Why those problems exist — not just where they show up.' },
  { term: 'Recommendations', desc: 'What should change, and what shouldn’t.' },
  { term: 'Roadmap', desc: 'What to do first, second, and later.' },
];

/**
 * The section previously listed inputs ("we look at") and outputs ("you receive") but no
 * shape: no duration, no format, no cost, no statement of what access it needs. Nobody
 * buys an unbounded engagement from strangers, so the terms are now on the page.
 *
 * Anything not yet decided lives in site.config.ts and is hidden until it's filled in,
 * rather than shipped as a placeholder.
 */
export default function Assessment() {
  const { duration, price, priceFallback, creditedBackToFirstInvoice } = site.assessment;

  return (
    <section id="assessment">
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">Before you rebuild</p>
          <h2>Understand what you&apos;re rebuilding, before you rebuild it.</h2>
          <p className="lede">
            Not every slow or unstable application needs to be rewritten. Not every aging system can be saved
            with another patch. We assess your existing software, find the underlying problems, and tell you
            which of those two situations you&apos;re actually in.
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

              <p className="eyebrow" style={{ color: 'var(--steel)', marginTop: '2rem' }}>The terms</p>
              <dl className="terms">
                {duration && (
                  <div className="report-row">
                    <dt>Takes</dt>
                    <dd>{duration}</dd>
                  </div>
                )}
                <div className="report-row">
                  <dt>Cost</dt>
                  <dd>
                    {price || priceFallback}
                    {creditedBackToFirstInvoice && (
                      <> If you go ahead with the work, it comes off your first invoice.</>
                    )}
                  </dd>
                </div>
                <div className="report-row">
                  <dt>We&apos;ll need</dt>
                  <dd>
                    Read access to the code and database, some sample data, and a conversation with whoever knows
                    the system best.
                  </dd>
                </div>
                <div className="report-row">
                  <dt>Not included</dt>
                  <dd>
                    A full security audit, or a fixed-price quote for the rebuild itself. Those come after, if
                    you want them.
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="eyebrow" style={{ color: 'var(--steel)' }}>You receive a written report covering</p>
              <dl style={{ margin: '1rem 0 0' }}>
                {RECEIVE.map((r) => (
                  <div className="report-row" key={r.term}>
                    <dt>{r.term}</dt>
                    <dd>{r.desc}</dd>
                  </div>
                ))}
              </dl>
              <p className="micro" style={{ marginTop: '1.25rem' }}>
                Plus a walkthrough call to go through it with you and answer questions.
              </p>

              <div className="assess-note">
                <h3>The report is yours.</h3>
                <p>
                  If the assessment says your system doesn&apos;t need rebuilding, that&apos;s what it will say —
                  and you can take the report to any developer you like. We&apos;d rather tell you the truth than
                  sell you a rebuild you don&apos;t need.
                </p>
              </div>

              <div className="btn-row">
                <a
                  className="btn btn-primary"
                  href="#contact"
                  onClick={() => trackCta('Book a Technical Assessment', 'assessment')}
                >
                  Book a Technical Assessment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
