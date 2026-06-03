// Pure pricing helpers for the wholesale storefront. Volume breaks apply
// per line (per item quantity), matching how the trade desk actually quotes.

import { TRADE_ITEMS, VOLUME_BREAKS, tradeBreak, type TradeItem } from './plans';

export interface TradeLine {
  item: TradeItem;
  qty: number;
  unit: number; // discounted per-unit
  line: number; // discounted line total
  listLine: number; // pre-discount line total
  discount: number;
  label: string;
  belowMoq: boolean;
}

export function lineFor(item: TradeItem, qty: number): TradeLine {
  const brk = tradeBreak(qty);
  const unit = item.pricePerUnit * (1 - brk.discount);
  return {
    item,
    qty,
    unit,
    line: qty * unit,
    listLine: qty * item.pricePerUnit,
    discount: brk.discount,
    label: brk.label,
    belowMoq: qty > 0 && qty < item.moq,
  };
}

export interface TradeTotals {
  lines: TradeLine[];
  subtotal: number;
  listTotal: number;
  savings: number;
  totalUnits: number;
  hasBelowMoq: boolean;
}

export function tradeTotals(qty: Record<string, number>): TradeTotals {
  const lines = TRADE_ITEMS.filter((it) => (qty[it.id] || 0) > 0).map((it) =>
    lineFor(it, qty[it.id]),
  );
  const subtotal = lines.reduce((s, l) => s + l.line, 0);
  const listTotal = lines.reduce((s, l) => s + l.listLine, 0);
  const totalUnits = lines.reduce((s, l) => s + l.qty, 0);
  return {
    lines,
    subtotal,
    listTotal,
    savings: listTotal - subtotal,
    totalUnits,
    hasBelowMoq: lines.some((l) => l.belowMoq),
  };
}

/** The next volume break above `qty`, or null if already at the top tier. */
export function nextBreak(qty: number) {
  const upcoming = VOLUME_BREAKS.find((b) => b.min > qty);
  if (!upcoming) return null;
  return { needed: upcoming.min - qty, label: upcoming.label, discount: upcoming.discount };
}
