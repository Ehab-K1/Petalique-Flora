'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Placeholder } from '@/components/Placeholder';
import { money2 } from '@/lib/pricing';
import { lineFor, nextBreak } from '@/lib/trade';
import { useTradeCart } from '@/store/tradeCart';
import type { TradeItem } from '@/lib/plans';

const STOCK: Record<string, { label: string; cls: string }> = {
  in: { label: 'In stock', cls: 'badge' },
  low: { label: 'Low stock', cls: 'badge badge-ember' },
  pre: { label: 'Pre-order', cls: 'badge trade-badge-pre' },
};

export function TradeProductCard({ item }: { item: TradeItem }) {
  const qty = useTradeCart((s) => s.qty[item.id] || 0);
  const setQty = useTradeCart((s) => s.setQty);
  const remove = useTradeCart((s) => s.remove);

  const step = item.unit === 'bunch' ? 1 : 5;
  const line = lineFor(item, qty);
  const nb = nextBreak(qty);
  const stock = STOCK[item.stock];

  return (
    <motion.article layout className={`trade-card ${qty > 0 ? 'is-active' : ''}`}>
      <div className="trade-card-media">
        <Placeholder label={`${item.name} · ${item.grade}`} tone={item.tone} ratio="4 / 3" />
        <span className="trade-card-cat mono">{item.category}</span>
        <span className={`trade-card-stock ${stock.cls}`}>{stock.label}</span>
      </div>

      <div className="trade-card-body">
        <div className="between" style={{ alignItems: 'baseline', gap: 10 }}>
          <h3 className="display trade-card-name">{item.name}</h3>
          <span className="display trade-card-price">
            {money2(item.pricePerUnit)}
            <span className="trade-card-unit">/{item.unit}</span>
          </span>
        </div>
        <p className="display-italic muted" style={{ fontSize: 13.5, marginTop: 1 }}>
          {item.latin}
        </p>
        <p className="caption" style={{ marginTop: 10, minHeight: 36 }}>
          {item.blurb}
        </p>

        <div className="trade-card-meta mono">
          <span>MOQ {item.moq}</span>
          <span>·</span>
          <span>{item.grade}</span>
        </div>

        <div className="trade-card-foot">
          <AnimatePresence mode="popLayout" initial={false}>
            {qty === 0 ? (
              <motion.button
                key="add"
                type="button"
                className="btn btn-sm btn-block"
                onClick={() => setQty(item.id, item.moq)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Add to order
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                className="trade-stepper-wrap"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="trade-stepper" role="group" aria-label={`${item.name} quantity`}>
                  <button type="button" onClick={() => setQty(item.id, qty - step)} aria-label="Decrease">
                    −
                  </button>
                  <input
                    type="number"
                    min={0}
                    step={step}
                    value={qty}
                    onChange={(e) => setQty(item.id, Number(e.target.value))}
                    aria-label={`${item.name} quantity, ${item.unit}s`}
                  />
                  <button type="button" onClick={() => setQty(item.id, qty + step)} aria-label="Increase">
                    +
                  </button>
                </div>
                <div className="trade-stepper-readout">
                  <span className="mono trade-line-total">{money2(line.line)}</span>
                  {line.discount > 0 && (
                    <span className="tag">−{Math.round(line.discount * 100)}% · {line.label}</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {qty > 0 && line.belowMoq && (
          <p className="caption trade-warn">Below MOQ — add {item.moq - qty} more {item.unit}s to order.</p>
        )}
        {qty > 0 && !line.belowMoq && nb && (
          <p className="caption trade-nudge">
            + {nb.needed} {item.unit}s to reach <strong>{nb.label}</strong> and save{' '}
            {Math.round(nb.discount * 100)}%.
          </p>
        )}
        {qty > 0 && (
          <button type="button" className="trade-remove link-underline" onClick={() => remove(item.id)}>
            Remove
          </button>
        )}
      </div>
    </motion.article>
  );
}
