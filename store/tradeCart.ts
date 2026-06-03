'use client';

// Trade order state — deliberately separate from the consumer gifting cart
// (store/cart.ts) so a florist's bulk order never collides with a gift bag.
// Stores a simple { itemId: quantity } map; pricing is derived in lib/trade.ts.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TradeCartState {
  qty: Record<string, number>;
  setQty: (id: string, n: number) => void;
  add: (id: string, n: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalUnits: () => number;
}

export const useTradeCart = create<TradeCartState>()(
  persist(
    (set, get) => ({
      qty: {},
      setQty: (id, n) =>
        set((s) => {
          const next = { ...s.qty };
          const v = Math.max(0, Math.floor(n) || 0);
          if (v === 0) delete next[id];
          else next[id] = v;
          return { qty: next };
        }),
      add: (id, n) => get().setQty(id, (get().qty[id] || 0) + n),
      remove: (id) =>
        set((s) => {
          const next = { ...s.qty };
          delete next[id];
          return { qty: next };
        }),
      clear: () => set({ qty: {} }),
      totalUnits: () => Object.values(get().qty).reduce((a, b) => a + b, 0),
    }),
    { name: 'petalique-trade' },
  ),
);
