'use client';

import { useMemo, useState } from 'react';
import { TRADE_ITEMS, VOLUME_BREAKS, tradeBreak } from '@/lib/plans';
import { money2 } from '@/lib/pricing';

const STOCK_LABEL: Record<string, { label: string; tone: string }> = {
  in: { label: 'In stock', tone: 'sage' },
  low: { label: 'Low stock', tone: 'ember' },
  pre: { label: 'Pre-order', tone: 'champagne' },
};

export function WholesaleTable() {
  const [qty, setQty] = useState<Record<string, number>>({});

  const totals = useMemo(() => {
    const lines = TRADE_ITEMS.map((it) => {
      const q = qty[it.id] ?? 0;
      const brk = tradeBreak(q);
      const unit = it.pricePerUnit * (1 - brk.discount);
      return { it, q, unit, line: q * unit, discount: brk.discount, label: brk.label };
    });
    const sub = lines.reduce((s, l) => s + l.line, 0);
    return { lines, sub };
  }, [qty]);

  const handle = (id: string, v: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.floor(v) || 0) }));

  return (
    <div className="wholesale">
      <div className="trade-toolbar">
        <div className="trade-breaks">
          {VOLUME_BREAKS.map((b) => (
            <span key={b.label} className="mono">
              {b.label} <span style={{ color: 'var(--ember)' }}>{b.discount ? `−${Math.round(b.discount * 100)}%` : '—'}</span>
            </span>
          ))}
        </div>
        <span className="caption">Trade prices · Net-30 with approved account.</span>
      </div>

      <table className="trade-table">
        <thead>
          <tr>
            <th>Stem</th>
            <th>Unit</th>
            <th>Stock</th>
            <th>MOQ</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Line</th>
          </tr>
        </thead>
        <tbody>
          {totals.lines.map(({ it, q, unit, line, label }) => {
            const stock = STOCK_LABEL[it.stock];
            const belowMoq = q > 0 && q < it.moq;
            return (
              <tr key={it.id}>
                <td>
                  <span className="display" style={{ fontSize: 17 }}>{it.name}</span>
                  <div className="display-italic muted" style={{ fontSize: 13 }}>{it.latin}</div>
                </td>
                <td className="mono">{it.unit}</td>
                <td>
                  <span className={`badge ${stock.tone === 'ember' ? 'badge-ember' : ''}`}>
                    {stock.label}
                  </span>
                </td>
                <td className="mono">{it.moq}</td>
                <td className="mono">{money2(unit)}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={q || ''}
                    onChange={(e) => handle(it.id, Number(e.target.value))}
                    aria-label={`${it.name} quantity`}
                    placeholder={`${it.moq}+`}
                  />
                  {belowMoq && <span className="caption err" style={{ color: 'var(--ember-deep)' }}>Below MOQ</span>}
                  {q > 0 && <span className="caption">{label}</span>}
                </td>
                <td className="mono">{money2(line)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} style={{ textAlign: 'right' }} className="mono">Estimated total</td>
            <td className="display" style={{ fontSize: 22 }}>{money2(totals.sub)}</td>
          </tr>
        </tfoot>
      </table>

      <p className="caption" style={{ marginTop: 14 }}>
        Pricing visible. Live stock and reserved boxes unlock once your trade account is approved.
      </p>
    </div>
  );
}
