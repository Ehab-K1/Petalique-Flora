import { rosePrice, COLOURS, WRAPS, BOWS, ADDONS } from './catalog';
import type { ColourId } from './types';

export interface Selection {
  count: number;
  colour: ColourId;
  wrap: string;
  bow: string;
  addOns: string[];
}

const optUp = (list: { id: string; upcharge: number }[], id: string) =>
  list.find((o) => o.id === id)?.upcharge ?? 0;

/** Live unit price for a single bouquet given its full selection. */
export function unitPrice(sel: Selection): number {
  const base = rosePrice(sel.count);
  const colour = COLOURS[sel.colour]?.upcharge ?? 0;
  const wrap = optUp(WRAPS, sel.wrap);
  const bow = optUp(BOWS, sel.bow);
  return base + colour + wrap + bow;
}

export function addOnsTotal(ids: string[]): number {
  return ids.reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0), 0);
}

export function lineTotal(sel: Selection, qty = 1): number {
  return (unitPrice(sel) + addOnsTotal(sel.addOns)) * qty;
}

export const money = (n: number): string =>
  `$${n.toLocaleString('en-CA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export const money2 = (n: number): string =>
  `$${n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
