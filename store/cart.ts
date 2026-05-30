'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine } from '@/lib/types';

interface CartState {
  lines: CartLine[];
  add: (line: Omit<CartLine, 'id'>) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (line) =>
        set((s) => ({ lines: [...s.lines, { ...line, id: uid() }] })),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          lines: s.lines.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)),
        })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () =>
        get().lines.reduce(
          (sum, l) => sum + (l.unitPrice + l.addOns.reduce((a, x) => a + x.price, 0)) * l.qty,
          0,
        ),
    }),
    { name: 'petalique-cart' },
  ),
);
