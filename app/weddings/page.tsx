import type { Metadata } from 'next';
import { WeddingInquiry } from '@/components/WeddingInquiry';
import { WEDDING_PACKAGES } from '@/lib/plans';
import { money } from '@/lib/pricing';
import { ProductImage } from '@/components/ProductImage';

export const metadata: Metadata = {
  title: 'Wedding flowers',
  description:
    'Consult-led floral design for weddings, engagements, Nikkahs and receptions across the GTA. Bouquets, ceremony, reception, installations.',
};

const PORTFOLIO = [
  { id: 'arch', label: 'Ceremony arch', tall: false },
  { id: 'centrepieces', label: 'Reception centrepieces', tall: true },
  { id: 'bridal-bouquet', label: 'Bridal bouquet', tall: false },
  { id: 'aisle', label: 'Aisle installation', tall: false },
];

export default function WeddingsPage() {
  return (
    <>
      <section className="page-head bg-bone">
        <div className="container">
          <div className="marker">Weddings & events</div>
          <h1 className="h1" style={{ marginTop: 10, maxWidth: '22ch' }}>
            Wedding flowers, planned with you.
          </h1>
          <p className="body-lg" style={{ marginTop: 14, maxWidth: '54ch' }}>
            Consult-led floral design for weddings, engagements, Nikkahs, receptions, and any
            celebration that asks for the room to hold still for a second. Bouquets, ceremony
            arches, centrepieces, full installations.
          </p>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <div className="weddings-grid">
            <div className="weddings-portfolio">
              <h2 className="h2" style={{ maxWidth: '24ch' }}>
                Designed for your room, your colours, your day.
              </h2>
              <p className="body-lg" style={{ marginTop: 14, maxWidth: '46ch' }}>
                Two consults, one quote, no hidden fees. We design from your moodboard, install
                the morning of, strike the same night.
              </p>

              <div className="portfolio-grid">
                {PORTFOLIO.map((p) => (
                  <div key={p.id} className={p.tall ? 'tall' : ''}>
                    <ProductImage
                      slug={`wedding-${p.id}`}
                      alt={`${p.label} by Petalique`}
                      ratio={p.tall ? '3/4' : '4/5'}
                      sizes="(max-width: 760px) 50vw, 280px"
                    />
                    <p className="caption" style={{ marginTop: 8 }}>{p.label}</p>
                  </div>
                ))}
              </div>

              <h3 className="h3" style={{ marginTop: 'var(--s-7)', marginBottom: 14 }}>Package tiers</h3>
              <div className="grid gap-3">
                {WEDDING_PACKAGES.map((p) => (
                  <div key={p.id} className="card" style={{ background: 'var(--paper)' }}>
                    <div className="between" style={{ alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
                      <h4 className="display" style={{ fontSize: 22, fontWeight: 500 }}>{p.name}</h4>
                      <span className="tag">from {money(p.from)}</span>
                    </div>
                    <p className="body" style={{ marginTop: 6 }}>{p.desc}</p>
                    <ul className="plan-perks" style={{ marginTop: 10 }}>
                      {p.includes.map((i) => (
                        <li key={i}><span className="accent">●</span> {i}</li>
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
          <div className="press-keep">
            <div>
              <div className="eyebrow" style={{ color: 'rgba(250,248,244,0.6)', marginBottom: 14 }}>
                <span className="dot">●</span> Signature service · included
              </div>
              <h2 className="h2 on-dark" style={{ maxWidth: '22ch' }}>
                Your bouquet, pressed and framed. Returned in six weeks.
              </h2>
              <p className="body-lg" style={{ color: 'rgba(250,248,244,0.82)', marginTop: 14, maxWidth: '46ch' }}>
                We take the bridal bouquet at the end of the night, press it, frame it in archival
                glass, and hand it back in six weeks. Included in every wedding contract — never
                an upsell.
              </p>
            </div>
            <ProductImage slug="wedding-pressed" alt="A pressed wedding bouquet framed in archival glass" ratio="4/5" sizes="(max-width: 900px) 100vw, 480px" />
          </div>
        </div>
      </section>
    </>
  );
}
