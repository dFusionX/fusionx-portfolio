/**
 * Every fact about FusionX that the site copy can't derive for itself lives here.
 *
 * Rule: anything left as an empty string (or empty array) is HIDDEN on the site rather
 * than rendered as a placeholder. So this file is safe to deploy half-filled — the page
 * just says less. Fill a blank and the matching block appears.
 *
 * Nothing in here is guessed. The blanks are blanks on purpose; see the notes on each.
 */

export type Founder = {
  name: string;
  role: string;
  /** One or two sentences. What they actually focus on. Real facts only. */
  bio: string;
  linkedin?: string;
};

export const site = {
  email: 'hello@fusionx.tech',

  /**
   * TODO — highest-value blank on the whole site.
   * Small-business owners overwhelmingly prefer to call rather than fill in a form, and
   * right now there is no way to reach FusionX except the form. Display format, e.g.
   * '+91 98765 43210'. Leave '' and the call/WhatsApp block stays hidden.
   */
  phone: '',
  /** Same number, digits only with country code, for the wa.me link. e.g. '919876543210' */
  whatsapp: '',
  /** TODO — e.g. 'Mon–Fri, 9:30am–6:30pm IST'. Shown next to the phone number. */
  hours: '',

  /** TODO — e.g. 'Chennai, India'. Shown in the "who we are" section. */
  location: '',
  /** TODO — e.g. 'IST (UTC+5:30)'. Reassures overseas prospects about overlap. */
  timezone: 'IST (UTC+5:30), SGT (UTC+8:00)',

  /**
   * TODO — the company LinkedIn page URL.
   * The footer link was previously href="#", which reads as an unfinished site. It is now
   * hidden entirely until this is filled in: no link beats a dead link.
   */
  linkedin: 'https://www.linkedin.com/company/fusionx-tech-1/',

  /**
   * TODO — the single biggest trust gain available to a two-person company.
   * A business owner is being asked to let two strangers near their production database.
   * Add both founders with real names, roles, a sentence each, and LinkedIn URLs.
   * While this array is empty the section still renders (the honest-scale copy stands on
   * its own) but without any named humans.
   */
  founders: [] as Founder[],

  /**
   * TODO — the actual stack, one line, e.g.
   * 'TypeScript · .NET · PostgreSQL · MySQL · Node · React · AWS'
   * Worth being concrete: the business owner forwards the site to whoever handles their
   * IT, and that person is looking for exactly this. Replaces the old Technology section's
   * abstract 'Monoliths · Modular Systems · SOA' list, which said nothing verifiable.
   */
  stack: '',

  assessment: {
    /**
     * TODO — e.g. '1–2 weeks, depending on the size of the system'.
     * Only commit to what you can actually deliver alongside existing client work.
     * Blank hides the row.
     */
    duration: '',
    /**
     * TODO — a business decision, not a copy decision.
     * Publishing a number is the strongest unqualified-lead filter you have. Put the fee
     * here (e.g. 'A fixed ₹XX,XXX') and it appears verbatim. Blank falls back to
     * `priceFallback` below, which is deliberately non-committal but never empty.
     */
    price: '',
    priceFallback: 'A fixed fee, quoted after a short call — no hourly open-endedness.',
    /** Recommended: removes the "am I paying twice?" objection. Set false to hide the line. */
    creditedBackToFirstInvoice: true,
  },

  /**
   * Policies stated on the site. Each is a claim being made publicly — confirm before
   * shipping. Set a string to '' or a boolean to false to hide that FAQ answer.
   */
  policies: {
    /** Defaults to true because it's the standard answer and a real objection-remover. Confirm. */
    signsNda: true,
    /** TODO — e.g. 'You do. Repositories and cloud accounts are in your name from day one.' */
    codeOwnership: '',
    /** TODO — how you avoid downtime, in one sentence. e.g. 'staging rehearsal, then an out-of-hours cutover'. */
    cutoverApproach: '',
    /** TODO — how a migration is verified. e.g. 'row-count and field-level reconciliation against the source, with a rollback path held open until sign-off'. */
    migrationVerification: '',
    /** TODO — the honest answer to "you're only two people, what if you disappear?" */
    continuity: '',
  },

  /** Shown next to the contact form. Only promise what you'll actually hit. */
  responseTime: 'within one business day',

  caseStudy: {
    /**
     * TODO — only fill this in with the client's explicit permission.
     * The rebuild story implies their old system had problems, which is more sensitive
     * than simply listing them as a client. Blank keeps the study unattributed but
     * industry-specific, which still lets a similar business recognise itself.
     */
    attributeTo: '',
    descriptor: 'Retail business · E-commerce, POS and internal systems',
  },
  // Deliberately not `as const`: the blank-by-default strings must widen to `string`, or
  // TypeScript narrows `site.phone` to `never` inside every `site.phone && ...` guard.
};

export const hasPhone = () => Boolean(site.phone);
export const waLink = () => (site.whatsapp ? `https://wa.me/${site.whatsapp}` : '');
