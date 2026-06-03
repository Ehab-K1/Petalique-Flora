import type { Metadata } from 'next';
import { TextReveal } from '@/components/motion/TextReveal';
import { BouquetsBrowser } from '@/components/BouquetsBrowser';
import type { Occasion } from '@/lib/types';
import { OCCASIONS } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Bouquets',
  description:
    'Rose-count-led luxury bouquets, same-day across the GTA. Filter by occasion, colour and price. Priced in the open.',
};

export default async function BouquetsPage({
  searchParams,
}: {
  searchParams: Promise<{ occasion?: string }>;
}) {
  const { occasion } = await searchParams;
  const valid = OCCASIONS.some((o) => o.id === occasion) ? (occasion as Occasion) : undefined;

  return (
    <>
      <section className="page-head bg-cream">
        <div className="container">
          <div className="marker">02 — Bouquets</div>
          <TextReveal
            as="h1"
            className="h1"
            style={{ marginTop: 10, maxWidth: '16ch' }}
            text="Choose a bouquet, or make it *yours*."
          />
          <p className="body-lg maxch" style={{ marginTop: 14 }}>
            Every bouquet is rose-count led and priced in the open. Pick one as it is, or open the
            builder and choose your count, colour, wrap and ribbon.
          </p>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <BouquetsBrowser initialOccasion={valid} />
        </div>
      </section>
    </>
  );
}
