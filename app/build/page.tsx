import type { Metadata } from 'next';
import { BouquetBuilder } from '@/components/BouquetBuilder';
import { TrustBar } from '@/components/TrustBar';

export const metadata: Metadata = {
  title: 'Build your own bouquet',
  description:
    'Build a bouquet in under a minute. Pick count, colour, wrap, ribbon, gift message — see the price update as you go.',
};

export default function BuildPage() {
  return (
    <>
      <section className="page-head bg-bone">
        <div className="container">
          <div className="marker">Build your own</div>
          <h1 className="h1" style={{ marginTop: 10, maxWidth: '20ch' }}>
            Build it in under a minute.
          </h1>
          <p className="body-lg" style={{ marginTop: 14, maxWidth: '54ch' }}>
            Pick the count, colour, wrap and ribbon. The price updates as you go. The preview
            updates with every change. Same-day across the GTA.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container">
          <TrustBar />
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
