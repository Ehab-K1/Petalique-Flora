import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'A note from the florist',
  description: 'Care notes for your Petalique bouquet, plus a 30-second studio video.',
};

const CARE = [
  { h: 'Cut on the angle', d: 'Trim 1 cm off each stem at 45° before they go in water.' },
  { h: 'Change the water', d: 'Every other day. The fresher the water, the longer the bloom.' },
  { h: 'Keep them cool', d: 'Out of direct sun, away from radiators, never beside fruit.' },
  { h: 'Re-trim mid-week', d: 'On day 4, take another half-centimetre off each stem.' },
];

export default async function CareCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="section bg-aubergine on-dark">
      <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
        <div className="eyebrow" style={{ color: 'rgba(250,248,244,0.6)', justifyContent: 'center', marginBottom: 18 }}>
          <span className="dot">●</span> A note from the studio
        </div>
        <h1 className="h1 on-dark" style={{ marginBottom: 14, maxWidth: '22ch', marginInline: 'auto' }}>
          Made for you, by hand.
        </h1>
        <p className="body-lg" style={{ color: 'rgba(250,248,244,0.82)', maxWidth: '54ch', marginInline: 'auto' }}>
          Here&rsquo;s how to keep your bouquet at its best — and a short studio film of the
          florist who made it.
        </p>

        <div className="care-grid">
          {CARE.map((c) => (
            <div key={c.h} className="care-card">
              <div className="care-card-h">{c.h}</div>
              <p className="caption">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="center" style={{ justifyContent: 'center', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link href="/bouquets" className="btn">Send one yourself</Link>
          <Link href="/subscriptions" className="btn btn-ghost">Make it weekly</Link>
        </div>
        <p className="caption" style={{ color: 'rgba(250,248,244,0.55)', marginTop: 22 }}>
          Reference {id} · keep this for the anniversary reorder
        </p>
      </div>
    </section>
  );
}
