'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { money2 } from '@/lib/pricing';
import { tradeTotals } from '@/lib/trade';
import { VOLUME_BREAKS } from '@/lib/plans';
import { useTradeCart } from '@/store/tradeCart';

export function TradeCart({ onClose }: { onClose?: () => void }) {
  const qty = useTradeCart((s) => s.qty);
  const setQty = useTradeCart((s) => s.setQty);
  const remove = useTradeCart((s) => s.remove);
  const clear = useTradeCart((s) => s.clear);

  const [contact, setContact] = useState({ business: '', email: '', date: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [ref, setRef] = useState('');

  const totals = tradeTotals(qty);
  const empty = totals.lines.length === 0;

  async function requestOrder(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    const payload = {
      kind: 'wholesale-order',
      ...contact,
      units: totals.totalUnits,
      subtotal: money2(totals.subtotal),
      lines: totals.lines.map((l) => `${l.qty}× ${l.item.name} @ ${money2(l.unit)}`),
    };
    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      /* demo mode — proceed to confirmation regardless */
    }
    setRef('PF-' + Math.random().toString(36).slice(2, 7).toUpperCase());
    setState('done');
    clear();
  }

  if (state === 'done') {
    return (
      <div className="trade-cart">
        <div className="trade-cart-head">
          <span className="field-label">Order requested</span>
          {onClose && (
            <button className="trade-cart-close" onClick={onClose} aria-label="Close order">
              ✕
            </button>
          )}
        </div>
        <h3 className="h3" style={{ marginTop: 8 }}>
          We&rsquo;re on it.
        </h3>
        <p className="body" style={{ marginTop: 10 }}>
          Your request <span className="mono">{ref}</span> is in. The trade desk confirms live stock
          and a delivery window within one working day, Net-30 on approved accounts.
        </p>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 18 }} onClick={() => setState('idle')}>
          Start another order
        </button>
      </div>
    );
  }

  return (
    <div className="trade-cart">
      <div className="trade-cart-head">
        <span className="field-label">Your order</span>
        <div className="center gap-3">
          {!empty && (
            <button className="trade-cart-clear" onClick={clear}>
              Clear
            </button>
          )}
          {onClose && (
            <button className="trade-cart-close" onClick={onClose} aria-label="Close order">
              ✕
            </button>
          )}
        </div>
      </div>

      {empty ? (
        <p className="caption trade-cart-empty">
          No stems yet. Add from the catalogue — volume breaks at 100, 250 and 500 apply per line,
          automatically.
        </p>
      ) : (
        <>
          <ul className="trade-cart-lines">
            <AnimatePresence initial={false}>
              {totals.lines.map((l) => (
                <motion.li
                  key={l.item.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="trade-cart-line"
                >
                  <div className="trade-cart-line-top">
                    <span className="display" style={{ fontSize: 16 }}>
                      {l.item.name}
                    </span>
                    <span className="mono">{money2(l.line)}</span>
                  </div>
                  <div className="trade-cart-line-bottom">
                    <div className="trade-stepper trade-stepper-sm">
                      <button type="button" onClick={() => setQty(l.item.id, l.qty - (l.item.unit === 'bunch' ? 1 : 5))} aria-label="Decrease">
                        −
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={l.qty}
                        onChange={(e) => setQty(l.item.id, Number(e.target.value))}
                        aria-label={`${l.item.name} quantity`}
                      />
                      <button type="button" onClick={() => setQty(l.item.id, l.qty + (l.item.unit === 'bunch' ? 1 : 5))} aria-label="Increase">
                        +
                      </button>
                    </div>
                    <span className="mono trade-cart-unitprice">
                      {l.discount > 0 ? (
                        <>
                          <s>{money2(l.item.pricePerUnit)}</s> {money2(l.unit)}
                        </>
                      ) : (
                        money2(l.unit)
                      )}
                      /{l.item.unit}
                    </span>
                    <button type="button" className="trade-cart-x" onClick={() => remove(l.item.id)} aria-label={`Remove ${l.item.name}`}>
                      ✕
                    </button>
                  </div>
                  {l.belowMoq && <span className="caption trade-warn">Below MOQ ({l.item.moq})</span>}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="trade-cart-totals">
            <div className="summary-row">
              <span className="caption">Total stems / bunches</span>
              <span className="mono">{totals.totalUnits}</span>
            </div>
            {totals.savings > 0 && (
              <div className="summary-row">
                <span className="caption ember">Volume savings</span>
                <span className="mono ember">−{money2(totals.savings)}</span>
              </div>
            )}
            <div className="summary-row trade-cart-subtotal">
              <span className="display" style={{ fontSize: 18 }}>
                Estimated subtotal
              </span>
              <span className="display" style={{ fontSize: 22 }}>
                {money2(totals.subtotal)}
              </span>
            </div>
          </div>

          {totals.hasBelowMoq && (
            <p className="caption trade-warn" style={{ marginTop: 6 }}>
              Some lines are below minimum order quantity. The trade desk will confirm before invoicing.
            </p>
          )}

          <form className="trade-cart-form" onSubmit={requestOrder}>
            <div className="field-2">
              <div className="field">
                <label htmlFor="tc-business">Business</label>
                <input
                  id="tc-business"
                  required
                  value={contact.business}
                  onChange={(e) => setContact({ ...contact, business: e.target.value })}
                  autoComplete="organization"
                />
              </div>
              <div className="field">
                <label htmlFor="tc-date">Need by</label>
                <input
                  id="tc-date"
                  type="date"
                  value={contact.date}
                  onChange={(e) => setContact({ ...contact, date: e.target.value })}
                />
              </div>
            </div>
            <div className="field" style={{ marginTop: 12 }}>
              <label htmlFor="tc-email">Work email</label>
              <input
                id="tc-email"
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                autoComplete="email"
              />
            </div>
            <button type="submit" className="btn btn-ember btn-block btn-lg" style={{ marginTop: 16 }} disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Request this order'}
            </button>
            <p className="caption" style={{ marginTop: 10 }}>
              A quote, not a charge. Live stock confirmed within one working day · Net-30 on approved
              accounts.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
