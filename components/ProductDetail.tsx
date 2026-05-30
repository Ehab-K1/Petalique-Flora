'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Product, ColourId } from '@/lib/types';
import { COLOURS, WRAPS, BOWS, ADDONS, COUNT_PRESETS, rosePrice } from '@/lib/catalog';
import { unitPrice, addOnsTotal, money } from '@/lib/pricing';
import { useCart } from '@/store/cart';
import { Placeholder } from './Placeholder';
import { SameDayCountdown } from './SameDayCountdown';

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const add = useCart((s) => s.add);

  const [count, setCount] = useState(product.defaultCount);
  const [colour, setColour] = useState<ColourId>(product.defaultColour);
  const [wrap, setWrap] = useState(WRAPS[0].id);
  const [bow, setBow] = useState(BOWS[0].id);
  const [engraving, setEngraving] = useState('');
  const [message, setMessage] = useState('');
  const [qty, setQty] = useState(1);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  const sel = { count, colour, wrap, bow, addOns };
  const unit = useMemo(() => unitPrice(sel), [count, colour, wrap, bow]);
  const total = (unit + addOnsTotal(addOns)) * qty;
  const isEngraved = bow === 'engraved';

  function buildLine() {
    return {
      productSlug: product.slug,
      name: product.name,
      count,
      colour,
      colourName: COLOURS[colour].name,
      wrap: WRAPS.find((w) => w.id === wrap)!.name,
      bow: BOWS.find((b) => b.id === bow)!.name,
      engraving: isEngraved ? engraving : undefined,
      message: message || undefined,
      addOns: addOns.map((id) => {
        const a = ADDONS.find((x) => x.id === id)!;
        return { id: a.id, name: a.name, price: a.price };
      }),
      unitPrice: unit,
      qty,
    };
  }

  function addToCart() {
    add(buildLine());
    setAdded(true);
    setTimeout(() => setAdded(false), 2600);
  }

  function buyNow() {
    add(buildLine());
    router.push('/checkout');
  }

  const toggleAddon = (id: string) =>
    setAddOns((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div className="pdp">
      {/* Gallery */}
      <div className="pdp-gallery">
        <div className="pdp-thumbs">
          {['Front', 'Detail', 'In box', 'Held'].map((t) => (
            <Placeholder key={t} label={t} tone={product.imageTone} ratio="1 / 1" className="pdp-thumb" />
          ))}
        </div>
        <Placeholder label={product.shotLabel} tone={product.imageTone} ratio="4 / 5" className="pdp-main" />
      </div>

      {/* Info */}
      <div className="pdp-info">
        <nav className="mono pdp-crumb">
          <Link href="/bouquets">Bouquets</Link> / {product.name}
        </nav>

        <h1 className="display pdp-name">{product.name}</h1>
        <p className="display-italic muted pdp-latin">{product.latin}</p>

        <div className="pdp-pricerow">
          <span className="display pdp-price">{money(unit)}</span>
          <span className="pdp-rating">
            <span className="ember">★</span> {product.rating.toFixed(2)}
            <span className="muted"> · {product.reviews} reviews</span>
          </span>
          {product.inSeason && <span className="badge">In season</span>}
        </div>

        <p className="body pdp-desc">{product.description}</p>

        {/* Rose count */}
        <div className="option-row">
          <div className="option-head">
            <span className="field-label">Rose count</span>
            <span className="mono option-val">{count} stems</span>
          </div>
          <div className="flex wrap gap-2">
            {COUNT_PRESETS.map((p) => (
              <button key={p.count} className="chip" data-active={count === p.count} onClick={() => setCount(p.count)}>
                {p.count} · {money(rosePrice(p.count))}
              </button>
            ))}
          </div>
          <div className="pdp-slider">
            <input
              type="range"
              min={6}
              max={100}
              step={1}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              aria-label="Custom rose count"
            />
            <span className="caption">Custom · drag for 6–100 stems</span>
          </div>
        </div>

        {/* Colour */}
        <div className="option-row">
          <div className="option-head">
            <span className="field-label">Colour</span>
            <span className="mono option-val">{COLOURS[colour].name}</span>
          </div>
          <div className="flex wrap gap-3" style={{ alignItems: 'center' }}>
            {product.colours.map((c) => (
              <button
                key={c}
                className="dot-swatch"
                data-active={colour === c}
                style={{ background: COLOURS[c].hex, width: 34, height: 34 }}
                onClick={() => setColour(c)}
                aria-label={COLOURS[c].name}
                title={`${COLOURS[c].name}${COLOURS[c].upcharge ? ` · +${money(COLOURS[c].upcharge)}` : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Wrap */}
        <div className="option-row">
          <div className="option-head">
            <span className="field-label">Wrap</span>
            <span className="mono option-val">{WRAPS.find((w) => w.id === wrap)!.name}</span>
          </div>
          <div className="flex wrap gap-2">
            {WRAPS.map((w) => (
              <button key={w.id} className="chip" data-active={wrap === w.id} onClick={() => setWrap(w.id)}>
                {w.name}
                {w.upcharge > 0 && <span className="muted"> +{money(w.upcharge)}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Bow */}
        <div className="option-row">
          <div className="option-head">
            <span className="field-label">Bow / ribbon</span>
            <span className="mono option-val">{BOWS.find((b) => b.id === bow)!.name}</span>
          </div>
          <div className="flex wrap gap-2">
            {BOWS.map((b) => (
              <button key={b.id} className="chip" data-active={bow === b.id} onClick={() => setBow(b.id)}>
                {b.name}
                {b.upcharge > 0 && <span className="muted"> +{money(b.upcharge)}</span>}
              </button>
            ))}
          </div>
          {isEngraved && (
            <div className="field" style={{ marginTop: 12 }}>
              <label htmlFor="engraving">Engraving · two letters, a date, or one word</label>
              <input
                id="engraving"
                maxLength={18}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                placeholder="A & S · 06 / 24 · forever"
              />
            </div>
          )}
        </div>

        {/* Message */}
        <div className="field" style={{ marginTop: 8 }}>
          <label htmlFor="message">Gift message · hand-written by the team</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say the thing you’d say in person."
            maxLength={400}
          />
        </div>

        {/* Quantity + buy */}
        <div className="pdp-buy">
          <div className="qty">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
              –
            </button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
              +
            </button>
          </div>
          <button className="btn btn-block btn-lg" onClick={addToCart}>
            {added ? 'Added ✓' : `Add to cart · ${money(total)}`}
          </button>
        </div>
        <button className="btn btn-block btn-ember" onClick={buyNow} style={{ marginTop: 10 }}>
          Buy it now
        </button>

        <div className="pdp-assurance">
          <SameDayCountdown />
          <span className="caption">
            <strong>Re-bloom guarantee.</strong> If it arrives less than perfect, we remake it — no
            questions.
          </span>
        </div>

        {/* Add-ons */}
        <div className="addons">
          <div className="field-label" style={{ marginBottom: 12 }}>
            Complete the gift
          </div>
          {ADDONS.map((a) => {
            const on = addOns.includes(a.id);
            return (
              <div className={`addon ${on ? 'on' : ''}`} key={a.id}>
                <Placeholder label="" tone="cream" ratio="1 / 1" className="addon-thumb" />
                <div className="addon-body">
                  <div className="addon-name display">{a.name}</div>
                  <div className="caption">{a.desc}</div>
                </div>
                <div className="addon-price mono">{money(a.price)}</div>
                <button
                  className="addon-add"
                  data-on={on}
                  onClick={() => toggleAddon(a.id)}
                  aria-label={on ? `Remove ${a.name}` : `Add ${a.name}`}
                >
                  {on ? '✓' : '+'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
