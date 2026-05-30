'use client';

import { useMemo, useState } from 'react';
import { PRODUCTS, OCCASIONS, COLOURS } from '@/lib/catalog';
import type { ColourId, Occasion } from '@/lib/types';
import { ProductCard } from './ProductCard';

const PRICE_BANDS = [
  { id: 'all', name: 'Any price', test: () => true },
  { id: 'under-100', name: 'Under $100', test: (p: number) => p < 100 },
  { id: '100-150', name: '$100 – $150', test: (p: number) => p >= 100 && p <= 150 },
  { id: 'over-150', name: '$150+', test: (p: number) => p > 150 },
] as const;

const COLOUR_FILTERS: ColourId[] = ['white', 'blush', 'pink', 'red', 'peach', 'lavender', 'butter', 'terracotta', 'midnight'];

export function BouquetsBrowser({ initialOccasion }: { initialOccasion?: Occasion }) {
  const [occasion, setOccasion] = useState<Occasion | 'all'>(initialOccasion ?? 'all');
  const [colour, setColour] = useState<ColourId | 'all'>('all');
  const [band, setBand] = useState<(typeof PRICE_BANDS)[number]['id']>('all');

  const results = useMemo(
    () =>
      PRODUCTS.filter((p) => {
        if (occasion !== 'all' && !p.occasions.includes(occasion)) return false;
        if (colour !== 'all' && !p.colours.includes(colour)) return false;
        const test = PRICE_BANDS.find((b) => b.id === band)!.test;
        if (!test(p.basePrice)) return false;
        return true;
      }),
    [occasion, colour, band],
  );

  return (
    <div className="browser">
      <aside className="browser-filters">
        <div className="filter-group">
          <div className="field-label">Occasion</div>
          <div className="flex wrap gap-2" style={{ marginTop: 10 }}>
            <button className="chip" data-active={occasion === 'all'} onClick={() => setOccasion('all')}>
              All
            </button>
            {OCCASIONS.map((o) => (
              <button key={o.id} className="chip" data-active={occasion === o.id} onClick={() => setOccasion(o.id)}>
                {o.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="field-label">Colour</div>
          <div className="flex wrap gap-2" style={{ marginTop: 10, alignItems: 'center' }}>
            <button className="chip" data-active={colour === 'all'} onClick={() => setColour('all')}>
              All
            </button>
            {COLOUR_FILTERS.map((c) => (
              <button
                key={c}
                className="dot-swatch"
                data-active={colour === c}
                style={{ background: COLOURS[c].hex }}
                onClick={() => setColour((cur) => (cur === c ? 'all' : c))}
                aria-label={COLOURS[c].name}
                title={COLOURS[c].name}
              />
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="field-label">Price</div>
          <div className="flex wrap gap-2" style={{ marginTop: 10 }}>
            {PRICE_BANDS.map((b) => (
              <button key={b.id} className="chip" data-active={band === b.id} onClick={() => setBand(b.id)}>
                {b.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="browser-results">
        <div className="between" style={{ marginBottom: 'var(--s-5)' }}>
          <span className="mono muted" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            {results.length} {results.length === 1 ? 'bouquet' : 'bouquets'}
          </span>
          {(occasion !== 'all' || colour !== 'all' || band !== 'all') && (
            <button
              className="link-underline"
              onClick={() => {
                setOccasion('all');
                setColour('all');
                setBand('all');
              }}
            >
              Clear filters
            </button>
          )}
        </div>
        {results.length ? (
          <div className="product-grid">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--s-8)' }}>
            <p className="display-italic" style={{ fontSize: 22 }}>
              Nothing matches that exactly.
            </p>
            <p className="body" style={{ marginTop: 8 }}>
              Try a different colour or price — or message the concierge and we’ll make one for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
