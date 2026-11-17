import { describeInIstAndSgt } from '../../../src/lib/time';
import {site} from "../../../src/site.config";

// POST /api/contact — validates the submission, then sends it via FusionX Mail API.
// Requires FUSIONX_API_KEY and CONTACT_TO_EMAIL to be set as environment variables
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

function formatRetryDelay(resetIn: string | null) {
  const seconds = Number(resetIn);
  if (!Number.isFinite(seconds) || seconds <= 0) return null;

  if (seconds < 60) return `${Math.ceil(seconds)} second${seconds <= 1 ? '' : 's'}`;

  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`;

  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? '' : 's'}`;
}

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

  const apiKey = process.env.FUSIONX_API_KEY;
  const toEmail = site.email;
  const apiUrl = (process.env.FUSIONX_API_URL || 'https://api.fuseapihub.com').replace(/\/+$/, '');
  // const templateUrl = 'https://fusionx.tech/contact-email-template.html';
  const templateUrl = 'https://udhayarajan.github.io/test-temp/contact.html';

  if (!apiKey || !toEmail) {
    console.error('Contact form: missing FUSIONX_API_KEY or contact recipient.');
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
    ['Name', name], ['Email', email], ['Phone', phoneStr || '—'],
    ['Company', companyStr || '—'], ['Situation', situationLabel], ['Stage', stageLabel],
    ...(preferredTimeLabel ? ([['Preferred call time', preferredTimeLabel]] as [string, string][]) : []),
  ];
  const details = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${message}`;

  try {
    const response = await fetch(`${apiUrl}/v1/send`, {
      method: 'POST',
      headers: {
        'X-FusionX-API-Key': apiKey,
        'X-FusionX-App-ID': process.env.FUSIONX_APP_ID || 'mailbinder',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ownerEmail: toEmail,
        subject,
        templateUrl,
        payload: {
          name, email, message, phone: phoneStr || '—', company: companyStr || '—',
          situation: situationLabel, stage: stageLabel, preferredTime: preferredTimeLabel,
          details,
        },
      }),
    });

    if (!response.ok) {
      console.error('FusionX Mail API error:', response.status, await response.text());

      if (response.status === 429) {
        const retryDelay = formatRetryDelay(response.headers.get('X-RateLimit-Reset-In'));
        return Response.json({
          error: retryDelay
            ? `Too many messages have been sent. Please try again in ${retryDelay}.`
            : 'Too many messages have been sent. Please try again shortly.',
        }, { status: 429 });
      }

      if (response.status === 403) {
        const retryDelay = formatRetryDelay(response.headers.get('X-Quota-Reset-In'));
        return Response.json({
          error: retryDelay
            ? `The message quota has been reached. Please try again in ${retryDelay}.`
            : 'The message quota has been reached. Please try again later.',
        }, { status: 403 });
      }

      return Response.json({ error: 'Could not send the message. Please try again.' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return Response.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}

