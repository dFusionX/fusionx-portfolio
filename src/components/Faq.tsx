import type { ReactNode } from 'react';
import { site } from '../site.config';

/**
 * New section. The site previously handled no objections at all, and these are the actual
 * reasons a qualified visitor closes the tab: will these two people push a rebuild I don't
 * need, can they work without documentation, will I lose my data, who owns the code, and
 * what happens if they get overloaded.
 *
 * Answers that depend on FusionX's actual policies come from site.config.ts and are
 * omitted entirely when blank — an unanswered question is better than a made-up policy.
 */
type Qa = { q: string; a: ReactNode };

export default function Faq() {
  const { policies } = site;

  const items: Qa[] = [
    {
      q: 'Will you tell me I need a rebuild when I don’t?',
      a: (
        <>
          No. Rebuilds are expensive and risky, and recommending one that isn&apos;t necessary would be the
          fastest way to lose your trust. Plenty of systems we look at need targeted fixes, not replacement. If
          that&apos;s yours, that&apos;s what the assessment will say.
        </>
      ),
    },
    {
      q: 'Our original developers are gone and there’s no documentation. Can you still help?',
      a: (
        <>
          Yes — this is one of the most common situations we&apos;re called into. Reading an unfamiliar system and
          working out how it actually behaves is part of the job, not an obstacle to it.
        </>
      ),
    },
    {
      q: 'Will we lose data in a migration?',
      a: (
        <>
          Not if it&apos;s done properly. Migration is a controlled process: the data is moved, verified against
          the original, and the results confirmed before anything is switched over.
          {policies.migrationVerification && <> {policies.migrationVerification}</>}
        </>
      ),
    },
    ...(policies.cutoverApproach
      ? [{
          q: 'Can you work on our system without taking the business offline?',
          a: <>That&apos;s usually the requirement, and we plan for it from the start: {policies.cutoverApproach}.</>,
        }]
      : []),
    ...(policies.codeOwnership
      ? [{ q: 'Who owns the code?', a: <>{policies.codeOwnership}</> }]
      : []),
    ...(policies.signsNda
      ? [{
          q: 'Will you sign an NDA?',
          a: <>Yes — before you share anything about your system.</>,
        }]
      : []),
    ...(policies.continuity
      ? [{
          q: 'You’re only two people. What if you get busy — or disappear?',
          a: (
            <>
              A fair question, and it&apos;s why we take on a limited number of clients rather than as many as
              possible. {policies.continuity}
            </>
          ),
        }]
      : []),
    {
      q: 'What don’t you do?',
      a: (
        <>
          Brochure websites, one-week projects, and work where the budget doesn&apos;t match the problem. If
          we&apos;re not the right fit, we&apos;ll say so on the first call rather than after you&apos;ve paid for
          something.
        </>
      ),
    },
  ];

  return (
    <section id="faq">
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">Before you get in touch</p>
          <h2>Questions people ask.</h2>
        </div>
        <div className="faq reveal">
          {items.map((it) => (
            <details className="faq-item" key={it.q}>
              <summary>{it.q}</summary>
              <div className="faq-a">
                <p>{it.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
