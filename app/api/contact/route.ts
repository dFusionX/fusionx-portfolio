import { Resend } from 'resend';

// POST /api/contact — validates the submission, then sends it as an email via Resend.
// Requires RESEND_API_KEY and CONTACT_TO_EMAIL to be set as environment variables
// (locally in .env, on Vercel under Project Settings → Environment Variables).
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, email, message, company } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a field real visitors never see or fill in. If it's non-empty, it's a bot —
  // report success so the bot moves on, but don't actually send anything.
  if (typeof company === 'string' && company.trim().length > 0) {
    return Response.json({ ok: true });
  }

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof message !== 'string' || !message.trim()
  ) {
    return Response.json({ error: 'Please fill in your name, email, and a message.' }, { status: 400 });
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

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `FusionX Contact Form <${fromEmail}>`,
      to: toEmail,
      reply_to: email,
      subject: `New message from ${name} — FusionX site`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html:
        `<p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>` +
        `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
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
