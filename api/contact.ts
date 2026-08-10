import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// POST /api/contact — validates the submission, then sends it as an email via Resend.
// Requires RESEND_API_KEY and CONTACT_TO_EMAIL to be set as environment variables
// (locally in .env, on Vercel under Project Settings → Environment Variables).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, company } = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: a field real visitors never see or fill in. If it's non-empty, it's a bot —
  // report success so the bot moves on, but don't actually send anything.
  if (typeof company === 'string' && company.trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof message !== 'string' || !message.trim()
  ) {
    return res.status(400).json({ error: 'Please fill in your name, email, and a message.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "That email address doesn't look right." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || !toEmail) {
    console.error('Contact form: missing RESEND_API_KEY or CONTACT_TO_EMAIL environment variable.');
    return res.status(500).json({ error: 'Email is not configured on the server yet.' });
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
      return res.status(502).json({ error: 'Could not send the message. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Unexpected server error.' });
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
