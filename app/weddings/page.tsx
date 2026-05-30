import type { Metadata } from 'next';
import { WeddingInquiry } from '@/components/WeddingInquiry';
import { WEDDING_PACKAGES } from '@/lib/plans';
import { money } from '@/lib/pricing';
import { Placeholder } from '@/components/Placeholder';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Weddings & Events',
  description:
    'Consult-led florals for weddings, engagements, Nikkahs, receptions and private events. Bouquets, ceremony, reception, installations. Press & Keep included.',
};

const PORTFOLIO = [
  { label: 'Ceremony arch · 4:5 · backlit', tone: 'cream' as const },
  { label: 'Reception centrepieces · 4:5 · taper candles', tone: 'ember' as const, tall: true },
  { label: 'Bridal bouquet · 4:5 · held', tone: 'blush' as const },
  { label: 'Aisle installation · 3:2 · low key', tone: 'aubergine' as const },
];

export default function WeddingsPage() {
  return (
    <>
      <section className="page-head bg-cream">
        <div className="container">
          <div className="marker">07 — Weddings & Events</div>
          <h1 className="h1 serif-em" style={{ marginTop: 10, maxWidth: '22ch' }}>
            For the days you’ll be looking at the photos of <em>forever</em>.
          </h1>
          <p className="body-lg maxch" style={{ marginTop: 14 }}>
            A consult-led floral house for weddings, engagements, Nikkahs, receptions, and the
            celebrations only you have a word for. Pressed and framed after the day, if you’d like.
          </p>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <div className="weddings-grid">
            <div className="weddings-portfolio">
              <Reveal>
                <h2 className="h2" style={{ maxWidth: '24ch' }}>Composed for the room, named for the day.</h2>
                <p className="body-lg" style={{ marginTop: 14, maxWidth: '46ch' }}>
                  We design weddings the same way we set a Sunday bouquet — by the light in the
                  room, the colours that belong, the gesture that suits the people. Then we install
                  it, strike it, and press the bouquet for the box you keep.
                </p>
              </Reveal>

              <div className="portfolio-grid">
                {PORTFOLIO.map((p, i) => (
                  <Reveal key={p.label} delay={i * 70}>
                    <Placeholder
                      label={p.label}
                      tone={p.tone}
                      ratio={p.tall ? '4 / 6' : '4 / 5'}
                      className={p.tall ? 'tall' : ''}
                    />
                  </Reveal>
                ))}
              </div>

              <h3 className="h3" style={{ marginTop: 'var(--s-7)', marginBottom: 14 }}>Package tiers</h3>
              <div className="grid gap-3">
                {WEDDING_PACKAGES.map((p) => (
                  <div key={p.id} className="card" style={{ background: 'var(--paper)' }}>
                    <div className="between" style={{ alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
                      <h4 className="display" style={{ fontSize: 22 }}>{p.name}</h4>
                      <span className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ember)' }}>
                        from {money(p.from)}
                      </span>
                    </div>
                    <p className="body" style={{ marginTop: 6 }}>{p.desc}</p>
                    <ul className="plan-perks" style={{ marginTop: 10 }}>
                      {p.includes.map((i) => (
                        <li key={i}><span className="ember">●</span> {i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="weddings-form-col">
              <WeddingInquiry />
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm bg-aubergine on-dark">
        <div className="container">
          <Reveal>
            <div className="press-keep">
              <div>
                <div className="eyebrow" style={{ color: 'rgba(239,232,221,0.55)', marginBottom: 14 }}>
                  <span className="dot">●</span> Signature service · included
                </div>
                <h2 className="h2 on-dark serif-em" style={{ maxWidth: '20ch' }}>
                  Your bouquet, <em>pressed and framed</em>. Returned in six weeks.
                </h2>
                <p className="body-lg" style={{ color: 'rgba(239,232,221,0.82)', marginTop: 14, maxWidth: '46ch' }}>
                  We take the bridal bouquet at the end of the night, press it, frame it in
                  archival glass, and hand it back in six weeks. Built into every wedding contract
                  as a default — never an upsell.
                </p>
              </div>
              <Placeholder label="Pressed bouquet, framed · 4:5 · archive" tone="aubergine" ratio="4 / 5" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
