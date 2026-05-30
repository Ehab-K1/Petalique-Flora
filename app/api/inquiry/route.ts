import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const KINDS = ['wedding', 'corporate', 'subscription', 'wholesale', 'newsletter', 'concierge'] as const;
type Kind = (typeof KINDS)[number];

interface Inquiry {
  kind: Kind;
  email?: string;
  [k: string]: unknown;
}

/**
 * Inquiry intake. Accepts JSON or form-url-encoded bodies (newsletter form posts
 * the latter from the footer). Persists nothing yet — wire up Resend / Postmark /
 * SendGrid by setting RESEND_API_KEY + INQUIRY_NOTIFY_EMAIL; until then we log
 * the lead server-side and return a quick confirmation so the UI can move on.
 */
export async function POST(req: NextRequest) {
  let payload: Inquiry;
  const contentType = req.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      payload = (await req.json()) as Inquiry;
    } else {
      const form = await req.formData();
      payload = Object.fromEntries(form.entries()) as unknown as Inquiry;
    }
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const kind = (KINDS as readonly string[]).includes(String(payload.kind))
    ? (payload.kind as Kind)
    : 'concierge';

  const id = `INQ-${Date.now().toString(36).toUpperCase()}`;

  // ── Forward to Resend if configured ────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const notify = process.env.INQUIRY_NOTIFY_EMAIL;
  if (apiKey && notify) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Petalique Flora <hello@petalique.com>',
          to: [notify],
          subject: `New ${kind} inquiry · ${id}`,
          text: JSON.stringify(payload, null, 2),
        }),
      });
    } catch (err) {
      console.error('[inquiry] notify failed', err);
    }
  } else {
    console.log('[inquiry:demo]', id, kind, payload);
  }

  // Newsletter form posts come from <form action="/api/inquiry">. Redirect
  // back so the user lands on the same page with a friendly hash.
  if (kind === 'newsletter' && !contentType.includes('application/json')) {
    const ref = req.headers.get('referer') || '/';
    const url = new URL(ref);
    url.hash = 'subscribed';
    return NextResponse.redirect(url, 303);
  }

  return NextResponse.json({ ok: true, id });
}
