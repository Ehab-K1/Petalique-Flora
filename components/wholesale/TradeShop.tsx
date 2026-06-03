'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { TradeProductCard } from './TradeProductCard';
import { TradeCart } from './TradeCart';
import { TRADE_ITEMS, TRADE_CATEGORIES, type TradeCategory } from '@/lib/plans';
import { tradeTotals } from '@/lib/trade';
import { money2 } from '@/lib/pricing';
import { useTradeCart } from '@/store/tradeCart';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'name';
const SORTS: { id: Sort; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price ↑' },
  { id: 'price-desc', label: 'Price ↓' },
  { id: 'name', label: 'A–Z' },
];

export function TradeShop() {
  const [cat, setCat] = useState<TradeCategory | 'All'>('All');
  const [sort, setSort] = useState<Sort>('featured');
  const [query, setQuery] = useState('');
  const [drawer, setDrawer] = useState(false);

  const qty = useTradeCart((s) => s.qty);
  const totals = tradeTotals(qty);

  const items = useMemo(() => {
    let list = TRADE_ITEMS.filter((it) => cat === 'All' || it.category === cat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((it) => (it.name + ' ' + it.latin).toLowerCase().includes(q));
    }
    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    if (sort === 'price-desc') sorted.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [cat, sort, query]);

  return (
    <div className="trade-shop">
      <div className="trade-main">
        <div className="trade-toolbar2">
          <div className="trade-cats">
            <button className={`chip ${cat === 'All' ? '' : ''}`} data-active={cat === 'All'} onClick={() => setCat('All')}>
              All stems
            </button>
            {TRADE_CATEGORIES.map((c) => (
              <button key={c} className="chip" data-active={cat === c} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="trade-tools">
            <input
              className="trade-search"
              type="search"
              placeholder="Search stems…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search stems"
            />
            <label className="trade-sort">
              <span className="sr-only">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <motion.div layout className="trade-grid">
          {items.map((it) => (
            <TradeProductCard key={it.id} item={it} />
          ))}
          {items.length === 0 && (
            <p className="caption" style={{ gridColumn: '1 / -1', padding: 'var(--s-6) 0' }}>
              No stems match that search this week.
            </p>
          )}
        </motion.div>
      </div>

      <aside className={`trade-aside ${drawer ? 'is-open' : ''}`}>
        <TradeCart onClose={() => setDrawer(false)} />
      </aside>

      {drawer && <div className="trade-scrim" onClick={() => setDrawer(false)} aria-hidden="true" />}

      {/* Mobile order bar */}
      {totals.totalUnits > 0 && (
        <div className="trade-orderbar">
          <div className="trade-orderbar-info">
            <span className="mono">{totals.totalUnits} units</span>
            <span className="display" style={{ fontSize: 18 }}>
              {money2(totals.subtotal)}
            </span>
          </div>
          <button className="btn btn-ember" onClick={() => setDrawer(true)}>
            Review order
          </button>
        </div>
      )}
    </div>
  );
}
