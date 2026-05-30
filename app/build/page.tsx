import type { Metadata } from 'next';
import { BouquetBuilder } from '@/components/BouquetBuilder';

export const metadata: Metadata = {
  title: 'Build a bouquet',
  description:
    'Build a bouquet like a gift, not a configurator. Count, colour, wrap, ribbon, message and schedule — with a live preview the whole way.',
};

export default function BuildPage() {
  return (
    <>
      <section className="page-head bg-cream">
        <div className="container">
          <div className="marker">03 — Build a bouquet</div>
          <h1 className="h1 serif-em" style={{ marginTop: 10, maxWidth: '18ch' }}>
            Build it like a <em>gift</em>, not a configurator.
          </h1>
          <p className="body-lg maxch" style={{ marginTop: 14 }}>
            One question at a time. The preview never disappears, so you always see what you’re
            sending before you pay. About sixty seconds, start to finish.
          </p>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <BouquetBuilder />
        </div>
      </section>
    </>
  );
}
