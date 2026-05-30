import { NextRequest, NextResponse } from 'next/server';
import type { CartLine } from '@/lib/types';

export const runtime = 'nodejs';

const lineUnit = (l: CartLine) =>
  Math.max(0, Math.round(l.unitPrice + l.addOns.reduce((a, x) => a + x.price, 0)));

export async function POST(req: NextRequest) {
  let body: { lines: CartLine[]; contact?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const lines = Array.isArray(body.lines) ? body.lines : [];
  if (lines.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || `https://${req.headers.get('host')}`;

  const key = process.env.STRIPE_SECRET_KEY;

  // ── Live mode: real Stripe Checkout Session ────────────────────────────────
  if (key) {
    try {
      const { default: Stripe } = await import('stripe');
      const stripe = new Stripe(key);
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: lines.map((l) => ({
          quantity: Math.max(1, l.qty),
          price_data: {
            currency: 'cad',
            unit_amount: lineUnit(l) * 100,
            product_data: {
              name: `${l.name} · ${l.count} ${l.colourName}`,
              description: [l.wrap, l.bow, l.engraving && `“${l.engraving}”`].filter(Boolean).join(' · '),
            },
          },
        })),
        customer_email: body.contact?.senderEmail,
        success_url: `${origin}/checkout/confirmed?order={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout`,
        metadata: {
          recipientName: body.contact?.recipientName ?? '',
          deliveryDate: body.contact?.date ?? '',
        },
      });
      return NextResponse.json({ url: session.url });
    } catch (err) {
      console.error('[checkout] Stripe error', err);
      return NextResponse.json({ error: 'Payment setup failed' }, { status: 502 });
    }
  }

  // ── Demo mode: no Stripe key configured. Simulate a confirmed order. ────────
  const orderId = `PF-${Date.now().toString(36).toUpperCase()}`;
  console.log('[checkout:demo] order', orderId, {
    items: lines.length,
    recipient: body.contact?.recipientName,
  });
  return NextResponse.json({ orderId, demo: true });
}
