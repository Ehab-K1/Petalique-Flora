import type { Metadata } from 'next';
import { BouquetsBrowser } from '@/components/BouquetsBrowser';
import { TrustBar } from '@/components/TrustBar';
import type { Occasion } from '@/lib/types';
import { OCCASIONS } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Shop bouquets',
  description:
    'Same-day rose delivery across the GTA. Hand-tied bouquets priced in the open — filter by occasion, colour and price, or build your own.',
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
      <section className="page-head bg-bone">
        <div className="container">
          <div className="marker">Shop</div>
          <h1 className="h1" style={{ marginTop: 10, maxWidth: '18ch' }}>
            Bouquets. Priced in the open. Delivered tonight.
          </h1>
          <p className="body-lg" style={{ marginTop: 14, maxWidth: '54ch' }}>
            Every bouquet is hand-tied to order. Filter by occasion, colour or price, or build
            your own from 6 to 100 stems.
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
          <BouquetsBrowser initialOccasion={valid} />
        </div>
      </section>
    </>
  );
}
