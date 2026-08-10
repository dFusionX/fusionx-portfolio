import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
      // honeypot — real users never fill this in; bots often do
      company: String(data.get('company') || ''),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, and a message.');
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
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong sending your message.');
    }
  }

  return (
    <section className="cta-band" id="contact">
      <div className="wrap">
        <div className="cta-inner reveal">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 style={{ marginTop: '1rem' }}>Have a software problem?</h2>
            <p className="lede" style={{ marginTop: '1rem' }}>
              Whether you're starting something new, dealing with an existing system, or planning a migration —
              let's understand the problem first. Tell us what you're trying to build, fix, or improve.
            </p>
          </div>

          <form className="form" onSubmit={handleSubmit} noValidate>
            {/* honeypot field — hidden from real users via CSS, left empty by them, often filled by bots */}
            <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
              <label>
                Company
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
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
            <label className="field-label">
              <span>What are you trying to build, fix, or improve?</span>
              <textarea name="message" required />
            </label>

            <div className="btn-row" style={{ marginTop: 0, alignItems: 'center' }}>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Start a Conversation'}
              </button>
              <span className={`form-status${status === 'ok' ? ' ok' : ''}${status === 'error' ? ' err' : ''}`}>
                {status === 'ok' && "Sent — we'll get back to you shortly."}
                {status === 'error' && errorMsg}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
