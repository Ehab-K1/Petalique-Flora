import type { Metadata } from 'next';
import { Placeholder } from '@/components/Placeholder';
import { Reveal } from '@/components/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { FAQ } from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Atelier & Journal',
  description:
    'Inside the Petalique Flora atelier. Founder story, named growers, the team behind the bouquet, long-form care notes and FAQ.',
};

const TEAM = [
  { n: 'Lead designer', d: 'Sets the editorial direction across weddings, gifting and corporate.' },
  { n: 'Atelier florists', d: 'Hand-tie and quality-check every order, every morning.' },
  { n: 'Delivery florists', d: 'Trained to wait nine minutes, leave a clean handover, send the SMS.' },
  { n: 'Studio team', d: 'The people behind the camera, the website and the recipient films.' },
];

const GROWERS = [
  'Mead & Co Roses · Ecuador · cold-chained 36 hours, never longer.',
  'Niagara Greens · Niagara, Canada · ranunculus, anemone, snapdragon.',
  'High Park Hydrangeas · Holland · imported only in season.',
  'Sienna Foliage · Markham, Canada · eucalyptus, leucadendron, ruscus.',
];

const CARE = [
  { h: 'Cut on the angle', d: 'Trim 1 cm off each stem at 45° before they go in water. A clean cut is the whole game.' },
  { h: 'Change the water', d: 'Every other day. The fresher the water, the longer the bloom.' },
  { h: 'Keep them cool', d: 'Out of direct sun, away from radiators, never beside fruit (ethylene closes them).' },
  { h: 'Re-trim mid-week', d: 'On day 4, take another half-centimetre off each stem and refresh the water.' },
];

export default function AtelierPage() {
  return (
    <>
      <section className="page-head bg-cream">
        <div className="container">
          <div className="marker">08 — Atelier & Journal</div>
          <TextReveal
            as="h1"
            className="h1"
            style={{ marginTop: 10, maxWidth: '20ch' }}
            text="The people, the growers, the *way we work*."
          />
          <p className="body-lg maxch" style={{ marginTop: 14 }}>
            A floral house should be the house and the floral, not just the flowers. These are the
            names, the rules and the rituals behind every bouquet that leaves the atelier.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="section-sm bg-bone" id="founder">
        <div className="container">
          <div className="founder">
            <Reveal>
              <Placeholder label="Founder portrait · 4:5 · atelier morning" tone="ember" ratio="4 / 5" />
            </Reveal>
            <Reveal delay={80}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 14 }}><span className="dot">●</span> Founder</div>
                <h2 className="h2 serif-em">A family that knows weddings the way other families know <em>harvests</em>.</h2>
                <p className="body-lg" style={{ marginTop: 18, maxWidth: '46ch' }}>
                  Petalique Flora was founded in Mississauga by a family that has been close to
                  weddings their whole life — and who believed Canadian florists deserved a house
                  that read the room the way a perfumer reads a wrist.
                </p>
                <p className="body-lg" style={{ marginTop: 12, maxWidth: '46ch' }}>
                  We design every arrangement the same way, whether it’s a $90 gift or a $90,000
                  install. One eye, applied to every room.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-sm bg-cream" id="team">
        <div className="container">
          <Reveal>
            <div className="eyebrow"><span className="dot">●</span> The team behind the bouquet</div>
            <h2 className="h2" style={{ marginTop: 8, marginBottom: 'var(--s-5)', maxWidth: '22ch' }}>Named hands. Standing roles.</h2>
          </Reveal>
          <div className="col-4">
            {TEAM.map((t) => (
              <Reveal key={t.n}>
                <div className="card" style={{ height: '100%' }}>
                  <div className="label">{t.n}</div>
                  <p className="body" style={{ marginTop: 4 }}>{t.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Growers */}
      <section className="section-sm bg-bone" id="growers">
        <div className="container">
          <Reveal>
            <div className="eyebrow"><span className="dot">●</span> Provenance · the growers we use</div>
            <h2 className="h2" style={{ marginTop: 8, marginBottom: 'var(--s-5)', maxWidth: '22ch' }}>
              Stem to story.
            </h2>
          </Reveal>
          <ul className="growers">
            {GROWERS.map((g) => (
              <li key={g} className="display-italic" style={{ fontSize: 22 }}>{g}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Care */}
      <section className="section-sm bg-cream" id="care">
        <div className="container">
          <Reveal>
            <div className="eyebrow"><span className="dot">●</span> Care notes</div>
            <h2 className="h2" style={{ marginTop: 8, marginBottom: 'var(--s-5)', maxWidth: '22ch' }}>
              Keep them at their best.
            </h2>
          </Reveal>
          <div className="col-4">
            {CARE.map((c) => (
              <Reveal key={c.h}>
                <div className="card" style={{ height: '100%' }}>
                  <div className="label">{c.h}</div>
                  <p className="body" style={{ marginTop: 4 }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-sm bg-bone" id="faq">
        <div className="container">
          <Reveal>
            <div className="eyebrow"><span className="dot">●</span> Frequently asked</div>
            <h2 className="h2" style={{ marginTop: 8, marginBottom: 'var(--s-5)', maxWidth: '22ch' }}>
              Questions, answered.
            </h2>
          </Reveal>
          <FAQ />
        </div>
      </section>
    </>
  );
}
