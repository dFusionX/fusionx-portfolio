import { trackCta } from '../lib/analytics';

/**
 * Replaces the old Problem section, which restated the five service verbs as five
 * question-and-answer tiles ("Have an idea? We can build it.") — the third time the same
 * framework appeared before a visitor reached any proof.
 *
 * Two doors instead of five options: a visitor needs to recognise their own situation in
 * about two seconds, and every real enquiry is one of these two.
 */
export default function TwoDoors() {
  return (
    <section id="start">
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">Where things stand</p>
          <h2>Two kinds of software problem.</h2>
          <p className="lede">
            Almost everyone who contacts us is in one of these two situations. Both are normal, and they need
            different first steps.
          </p>
        </div>

        <div className="doors reveal">
          <div className="door">
            <span className="door-tag">Existing system</span>
            <h3>You already have software, and it&apos;s not working the way it needs to</h3>
            <p>
              It&apos;s slower than it used to be. Changes take longer and break more. The database has grown
              messy after years of additions. The people who originally built it may be gone. You&apos;re not sure
              whether it needs fixing, modernizing, or replacing.
            </p>
            <p className="door-line">We start by finding out which — before recommending anything.</p>
            <a
              className="btn btn-primary"
              href="#assessment"
              onClick={() => trackCta('Get a Technical Assessment', 'two-doors')}
            >
              Get a Technical Assessment
            </a>
          </div>

          <div className="door">
            <span className="door-tag">New build</span>
            <h3>You need software that doesn&apos;t exist yet</h3>
            <p>
              Your process doesn&apos;t fit any product on the market. Spreadsheets have quietly become the
              system. Off-the-shelf software covers most of what you do and fights you on the rest. It might be
              customer-facing, or it might be the POS, inventory, or workflow software that runs the business
              behind the scenes.
            </p>
            <p className="door-line">We build around how your business actually operates.</p>
            <a
              className="btn btn-ghost"
              href="#contact"
              onClick={() => trackCta('Talk to an Engineer', 'two-doors')}
            >
              Talk to an Engineer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
