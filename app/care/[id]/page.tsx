import type { Metadata } from 'next';
import Link from 'next/link';
import { Placeholder } from '@/components/Placeholder';

export const metadata: Metadata = {
  title: 'A note from the florist',
  description: 'The 30-second film of your bouquet being made, with care notes from the team.',
};

// Care-card QR landing. The QR on every recipient card resolves here.
// The id is the bouquet/order reference; in production the page would also
// embed the 30-second atelier film keyed by that id.
export default async function CareCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="section bg-aubergine on-dark">
      <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
        <div className="eyebrow" style={{ color: 'rgba(239,232,221,0.55)', justifyContent: 'center', marginBottom: 18 }}>
          <span className="dot">●</span> A note from the atelier
        </div>
        <h1 className="h1 on-dark serif-em" style={{ marginBottom: 24, maxWidth: '20ch', marginInline: 'auto' }}>
          Made for <em>you</em>, by hand.
        </h1>

        <div style={{ borderRadius: 'var(--radius-l)', overflow: 'hidden', border: '1px solid rgba(239,232,221,0.2)' }}>
          <Placeholder label={`Atelier film · 9:16 · 30 seconds · ${id}`} tone="aubergine" ratio="9 / 16" />
        </div>

        <p className="display-italic" style={{ fontSize: 22, color: 'var(--bone)', marginTop: 28 }}>
          “Cut on the angle, fresh water every other day, and they’ll open by the weekend.”
        </p>
        <p className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(239,232,221,0.55)', marginTop: 12 }}>
          — Signed, the florist who made it
        </p>

        <div className="center" style={{ justifyContent: 'center', gap: 12, marginTop: 32 }}>
          <Link href="/atelier#care" className="btn">How to keep them</Link>
          <Link href="/" className="btn btn-ghost">Send your own</Link>
        </div>
        <p className="caption" style={{ color: 'rgba(239,232,221,0.55)', marginTop: 22 }}>
          Reference {id} · keep this card for the anniversary reorder
        </p>
      </div>
    </section>
  );
}
