import { Resend } from 'resend';
import { describeInIstAndSgt } from '../../../src/lib/time';

// POST /api/contact — validates the submission, then sends it as an email via Resend.
// Requires RESEND_API_KEY and CONTACT_TO_EMAIL to be set as environment variables
// (locally in .env, on Vercel under Project Settings → Environment Variables).

const SITUATION_LABELS: Record<string, string> = {
  'existing-broken': 'Existing software needs fixing / improving / replacing',
  'new-build': 'New software that doesn’t exist yet',
  migration: 'Migration to a new system without losing data',
  takeover: 'Take over and maintain an existing system',
  assessment: 'Not sure yet — wants an assessment first',
};

const STAGE_LABELS: Record<string, string> = {
  exploring: 'Just exploring',
  budgeted: 'Planning, with budget to allocate',
  urgent: 'URGENT — something is broken now',
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const {
    name, email, message, phone, company, situation, stage, preferredTime,
    fx_ref: fxRef, elapsedMs,
  } = (body ?? {}) as Record<string, unknown>;

  // Bot checks. Two of them, because the previous single check used a field named
  // "company" — which browser autofill and password managers do populate, silently
  // discarding real enquiries while showing the visitor a success message.
  //
  // The honeypot is now named fx_ref (nothing autofills that), and a submission completed
  // implausibly fast is treated the same way: report success so the bot moves on, send
  // nothing.
  const trippedHoneypot = typeof fxRef === 'string' && fxRef.trim().length > 0;
  const tooFast = typeof elapsedMs === 'number' && elapsedMs >= 0 && elapsedMs < 3000;
  if (trippedHoneypot || tooFast) {
    return Response.json({ ok: true });
  }

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof message !== 'string' || !message.trim()
  ) {
    return Response.json({ error: 'Please fill in your name, email, and a short description.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || !toEmail) {
    console.error('Contact form: missing RESEND_API_KEY or CONTACT_TO_EMAIL environment variable.');
    return Response.json({ error: 'Email is not configured on the server yet.' }, { status: 500 });
  }

  const situationKey = typeof situation === 'string' ? situation : '';
  const stageKey = typeof stage === 'string' ? stage : '';
  const situationLabel = SITUATION_LABELS[situationKey] || situationKey || 'Not specified';
  const stageLabel = STAGE_LABELS[stageKey] || stageKey || 'Not specified';
  const phoneStr = typeof phone === 'string' ? phone.trim() : '';
  const companyStr = typeof company === 'string' ? company.trim() : '';

  // preferredTime arrives as an ISO timestamp (the client already converted the visitor's
  // local wall-clock entry to it) — reformat into IST/SGT here so the email needs no manual
  // timezone math to read.
  let preferredTimeLabel = '';
  if (typeof preferredTime === 'string' && preferredTime) {
    const d = new Date(preferredTime);
    if (!Number.isNaN(d.getTime())) preferredTimeLabel = describeInIstAndSgt(d);
  }

  // Subject line carries the triage signal, so urgency and type are visible in the inbox
  // list without opening anything.
  const prefix = stageKey === 'urgent' ? '[URGENT] ' : '';
  const subject = `${prefix}${situationLabel} — ${name}${companyStr ? ` (${companyStr})` : ''}`;

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Phone', phoneStr || '—'],
    ['Company', companyStr || '—'],
    ['Situation', situationLabel],
    ['Stage', stageLabel],
    ...(preferredTimeLabel ? ([['Preferred call time', preferredTimeLabel]] as [string, string][]) : []),
  ];

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `FusionX Contact Form <${fromEmail}>`,
      to: toEmail,
      reply_to: email,
      subject,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n---\n\n${message}`,
      html:
        `<table style="border-collapse:collapse;font:14px/1.5 system-ui,sans-serif">${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 12px 4px 0;color:#666">${escapeHtml(k)}</td>` +
              `<td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join('')}</table>` +
        `<hr style="margin:16px 0;border:none;border-top:1px solid #ddd">` +
        `<p style="font:14px/1.6 system-ui,sans-serif">${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: 'Could not send the message. Please try again.' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return Response.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
