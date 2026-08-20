import { useRef, useState, type FormEvent } from 'react';
import { site, waLink } from '../site.config';
import { track, trackContactClick } from '../lib/analytics';
import SlotPicker from './SlotPicker';

type Status = 'idle' | 'sending' | 'ok' | 'error';

/** Deliberately vague bands — no prices invented, but enough to triage an enquiry. */
const SITUATIONS = [
  { value: 'existing-broken', label: 'We have software that needs fixing, improving, or replacing' },
  { value: 'new-build', label: "We need software built that doesn't exist yet" },
  { value: 'migration', label: 'We need to move to a new system without losing our data' },
  { value: 'takeover', label: 'We need someone to take over and maintain an existing system' },
  { value: 'assessment', label: "Not sure yet — we'd like an assessment first" },
];

const STAGES = [
  { value: 'exploring', label: 'Just exploring' },
  { value: 'budgeted', label: 'Planning, with budget to allocate' },
  { value: 'urgent', label: 'Urgent — something is broken now' },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  // Used as a bot check on the server: humans don't complete this form in under 3 seconds.
  const mountedAt = useRef(Date.now());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      company: String(data.get('company') || '').trim(),
      situation: String(data.get('situation') || ''),
      stage: String(data.get('stage') || ''),
      // Already an ISO timestamp (or '') from SlotPicker's hidden input — it only ever
      // offers real available slots, so nothing further to validate or reparse here.
      preferredTime: String(data.get('preferredTime') || ''),
      message: String(data.get('message') || '').trim(),
      // Honeypot. Named so that no browser autofill or password manager recognises it —
      // the previous version was called "company", which autofill does populate, and a
      // populated honeypot silently discarded a real enquiry while telling the visitor it
      // had been sent.
      fx_ref: String(data.get('fx_ref') || ''),
      elapsedMs: Date.now() - mountedAt.current,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, and a short description.');
      return;
    }
    if (!payload.situation) {
      setStatus('error');
      setErrorMsg('Please pick the option that best describes your situation.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error || 'Something went wrong sending your message.');
      setStatus('ok');
      // The conversion event. Situation and stage come through as parameters so lead
      // quality is visible in GA4 rather than just lead count.
      track('generate_lead', { situation: payload.situation, stage: payload.stage || 'unspecified' });
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong sending your message.');
      track('form_error');
    }
  }

  const wa = waLink();

  return (
    <section className="cta-band" id="contact">
      <div className="wrap">
        <div className="cta-inner reveal">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 style={{ marginTop: '1rem' }}>Tell us what you&apos;re dealing with.</h2>
            <p className="lede" style={{ marginTop: '1rem' }}>
              Whether you&apos;re starting something new, working with a system that&apos;s become a problem, or
              planning a migration — the first step is understanding what&apos;s actually going on. The first call
              is 30 minutes and costs nothing, and you&apos;ll be talking to an engineer, not a salesperson.
            </p>
            <p className="micro" style={{ marginTop: '1.25rem' }}>
              We reply {site.responseTime}.
            </p>

            <div className="channels">
              {site.phone && (
                <a
                  className="channel"
                  href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}
                  onClick={() => trackContactClick('phone')}
                >
                  <span className="channel-label">Call</span>
                  <span className="channel-value">{site.phone}</span>
                </a>
              )}
              {wa && (
                <a
                  className="channel"
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick('whatsapp')}
                >
                  <span className="channel-label">WhatsApp</span>
                  <span className="channel-value">Message us</span>
                </a>
              )}
              <a
                className="channel"
                href={`mailto:${site.email}`}
                onClick={() => trackContactClick('email')}
              >
                <span className="channel-label">Email</span>
                <span className="channel-value">{site.email}</span>
              </a>
            </div>
            {site.hours && <p className="micro">{site.hours}</p>}
          </div>

          <form className="form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot — hidden from real users, and named so autofill won't touch it. */}
            <div
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
              aria-hidden="true"
            >
              <label>
                Reference
                <input type="text" name="fx_ref" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="form-row">
              <label className="field-label">
                <span>Name</span>
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label className="field-label">
                <span>Email</span>
                <input type="email" name="email" required autoComplete="email" />
              </label>
            </div>

            <div className="form-row">
              <label className="field-label">
                <span>Phone or WhatsApp (optional)</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label className="field-label">
                <span>Company</span>
                <input type="text" name="company" autoComplete="organization" />
              </label>
            </div>

            <fieldset className="choice">
              <legend>Which best describes your situation?</legend>
              {SITUATIONS.map((s) => (
                <label className="choice-item" key={s.value}>
                  <input type="radio" name="situation" value={s.value} required />
                  <span>{s.label}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className="choice">
              <legend>Where are you in the process?</legend>
              {STAGES.map((s) => (
                <label className="choice-item" key={s.value}>
                  <input type="radio" name="stage" value={s.value} />
                  <span>{s.label}</span>
                </label>
              ))}
            </fieldset>

            <div className="slot-field">
              <span className="slot-field-heading">Preferred time for a call (optional)</span>
              <SlotPicker />
            </div>

            <label className="field-label">
              <span>What&apos;s going on?</span>
              <textarea name="message" required />
            </label>

            <div className="btn-row" style={{ marginTop: 0, alignItems: 'center' }}>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
              <span className={`form-status${status === 'ok' ? ' ok' : ''}${status === 'error' ? ' err' : ''}`}>
                {status === 'ok' && `Sent — we'll reply ${site.responseTime}.`}
                {status === 'error' && errorMsg}
              </span>
            </div>

            <p className="form-note">
              We&apos;ll only use this to reply. We don&apos;t share it
              {site.policies.signsNda && <>, and we&apos;ll sign an NDA before you tell us anything about your system</>}
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
