'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Product, ColourId } from '@/lib/types';
import { COLOURS, WRAPS, BOWS, ADDONS, COUNT_PRESETS, rosePrice } from '@/lib/catalog';
import { unitPrice, addOnsTotal, money } from '@/lib/pricing';
import { useCart } from '@/store/cart';
import { ProductImage } from './ProductImage';
import { SameDayCountdown } from './SameDayCountdown';
import { ReviewStars } from './ReviewStars';
import { StickyBuyBar } from './StickyBuyBar';
import { reviewsFor, aggregateFor } from '@/lib/reviews';

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
  const [activeImage, setActiveImage] = useState(1);

  const buyRef = useRef<HTMLDivElement | null>(null);

  const sel = { count, colour, wrap, bow, addOns };
  const unit = useMemo(() => unitPrice(sel), [count, colour, wrap, bow]);
  const total = (unit + addOnsTotal(addOns)) * qty;
  const isEngraved = bow === 'engraved';

  const reviews = reviewsFor(product.slug, 4);
  const agg = aggregateFor(product.slug);

  // Frequently-bought-together: pick 3 add-ons as a bundle
  const bundleIds = ADDONS.slice(0, 3).map((a) => a.id);
  const bundleSelected = bundleIds.every((id) => addOns.includes(id));
  const bundleSubtotal = ADDONS.slice(0, 3).reduce((s, a) => s + a.price, 0);

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

  function addBundle() {
    setAddOns((cur) => [...new Set([...cur, ...bundleIds])]);
  }

  return (
    <>
      <div className="pdp-v2">
        {/* Gallery */}
        <div className="pdp-v2-gallery">
          <div className="pdp-v2-main">
            <ProductImage
              slug={product.slug}
              index={activeImage}
              alt={`${product.name} — image ${activeImage} of 5`}
              priority
              ratio="4/5"
              sizes="(max-width: 900px) 100vw, 620px"
            />
          </div>
          <div className="pdp-v2-thumbs" role="tablist" aria-label="Bouquet photos">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                role="tab"
                aria-selected={activeImage === n}
                aria-label={`Photo ${n} of 5`}
                className={`pdp-v2-thumb ${activeImage === n ? 'on' : ''}`}
                onClick={() => setActiveImage(n)}
              >
                <ProductImage
                  slug={product.slug}
                  index={n}
                  alt=""
                  ratio="1/1"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Buy rail */}
        <div className="pdp-v2-rail" ref={buyRef}>
          <nav className="pdp-v2-crumb">
            <Link href="/bouquets">Bouquets</Link> <span aria-hidden="true">/</span> {product.name}
          </nav>

          <h1 className="pdp-v2-name h1">{product.name}</h1>

          <div className="pdp-v2-meta">
            <ReviewStars rating={agg.rating} count={agg.count} size={13} />
            {product.inSeason && <span className="badge">In season</span>}
          </div>

          <div className="pdp-v2-pricerow">
            <span className="pdp-v2-price">{money(unit)}</span>
            <span className="pdp-v2-priceunit">/ bouquet</span>
          </div>

          <p className="body pdp-v2-desc">{product.description}</p>

          {/* Rose count */}
          <div className="pdp-v2-option">
            <div className="pdp-v2-option-head">
              <span className="pdp-v2-option-label">Rose count</span>
              <span className="pdp-v2-option-val">{count} stems</span>
            </div>
            <div className="flex wrap gap-2">
              {COUNT_PRESETS.map((p) => (
                <button
                  key={p.count}
                  className="chip"
                  data-active={count === p.count}
                  onClick={() => setCount(p.count)}
                >
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
          <div className="pdp-v2-option">
            <div className="pdp-v2-option-head">
              <span className="pdp-v2-option-label">Colour</span>
              <span className="pdp-v2-option-val">{COLOURS[colour].name}</span>
            </div>
            <div className="flex wrap gap-3" style={{ alignItems: 'center' }}>
              {product.colours.map((c) => (
                <button
                  key={c}
                  className="dot-swatch"
                  data-active={colour === c}
                  style={{ background: COLOURS[c].hex, width: 32, height: 32 }}
                  onClick={() => setColour(c)}
                  aria-label={COLOURS[c].name}
                  title={`${COLOURS[c].name}${COLOURS[c].upcharge ? ` · +${money(COLOURS[c].upcharge)}` : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Wrap */}
          <div className="pdp-v2-option">
            <div className="pdp-v2-option-head">
              <span className="pdp-v2-option-label">Wrap</span>
              <span className="pdp-v2-option-val">{WRAPS.find((w) => w.id === wrap)!.name}</span>
            </div>
            <div className="flex wrap gap-2">
              {WRAPS.map((w) => (
                <button
                  key={w.id}
                  className="chip"
                  data-active={wrap === w.id}
                  onClick={() => setWrap(w.id)}
                >
                  {w.name}
                  {w.upcharge > 0 && <span className="muted"> +{money(w.upcharge)}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Bow */}
          <div className="pdp-v2-option">
            <div className="pdp-v2-option-head">
              <span className="pdp-v2-option-label">Ribbon</span>
              <span className="pdp-v2-option-val">{BOWS.find((b) => b.id === bow)!.name}</span>
            </div>
            <div className="flex wrap gap-2">
              {BOWS.map((b) => (
                <button
                  key={b.id}
                  className="chip"
                  data-active={bow === b.id}
                  onClick={() => setBow(b.id)}
                >
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
          <div className="field" style={{ marginTop: 4 }}>
            <label htmlFor="message">Gift message · hand-written by our team</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say the thing you'd say in person."
              maxLength={400}
            />
          </div>

          {/* Same-day cue right above CTA */}
          <div className="pdp-v2-countdown">
            <SameDayCountdown />
          </div>

          {/* Quantity + buy */}
          <div className="pdp-v2-buy">
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
              {added ? 'Added to cart ✓' : `Add to cart — ${money(total)}`}
            </button>
          </div>
          <button className="btn btn-block btn-ink pdp-v2-buynow" onClick={buyNow}>
            Buy now — checkout in 60 seconds
          </button>

          {/* Trust row */}
          <ul className="pdp-v2-trust">
            <li>
              <span className="pdp-v2-trust-k">Fresh-flower guarantee</span>
              <span className="pdp-v2-trust-v">Or we remake it within 24 hours.</span>
            </li>
            <li>
              <span className="pdp-v2-trust-k">Free GTA delivery on subscriptions</span>
              <span className="pdp-v2-trust-v">Same-day for one-off orders.</span>
            </li>
            <li>
              <span className="pdp-v2-trust-k">Secure checkout</span>
              <span className="pdp-v2-trust-v">Card, Apple Pay or Google Pay — by Stripe.</span>
            </li>
          </ul>

          {/* Frequently bought together */}
          <section className="pdp-v2-bundle" aria-labelledby="bundle-h">
            <h2 id="bundle-h" className="h3">Frequently bought together</h2>
            <p className="caption">Add all three for {money(bundleSubtotal)}.</p>
            <div className="pdp-v2-bundle-row">
              {ADDONS.slice(0, 3).map((a) => {
                const on = addOns.includes(a.id);
                return (
                  <div key={a.id} className={`pdp-v2-bundle-card ${on ? 'on' : ''}`}>
                    <ProductImage
                      slug={`addon-${a.id}`}
                      alt={a.name}
                      ratio="1/1"
                      sizes="120px"
                    />
                    <div>
                      <div className="pdp-v2-bundle-name">{a.name}</div>
                      <div className="caption">{money(a.price)}</div>
                    </div>
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
            <button
              className="btn btn-block btn-ghost"
              onClick={addBundle}
              disabled={bundleSelected}
            >
              {bundleSelected ? 'Bundle added ✓' : `Add all three to cart — ${money(bundleSubtotal)}`}
            </button>
          </section>

          {/* Reviews */}
          <section className="pdp-v2-reviews" aria-labelledby="reviews-h">
            <header className="pdp-v2-reviews-head">
              <h2 id="reviews-h" className="h3">What buyers say</h2>
              <ReviewStars rating={agg.rating} count={agg.count} size={13} />
            </header>
            <ul className="pdp-v2-reviews-list">
              {reviews.map((r) => (
                <li key={r.id} className="pdp-v2-review">
                  <div className="pdp-v2-review-head">
                    <ReviewStars rating={r.rating} showNumber={false} size={12} />
                    {r.verified && <span className="badge">Verified buyer</span>}
                  </div>
                  <p className="pdp-v2-review-quote">{r.quote}</p>
                  <p className="caption">
                    {r.name} · {r.location} · {r.product}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Sticky buy bar */}
      <StickyBuyBar triggerRef={buyRef}>
        <div className="sticky-buy-product">
          <div className="sticky-buy-thumb">
            <ProductImage
              slug={product.slug}
              alt={product.name}
              ratio="1/1"
              sizes="56px"
            />
          </div>
          <div>
            <div className="sticky-buy-name">{product.name}</div>
            <div className="caption">{count} stems · {COLOURS[colour].name}</div>
          </div>
        </div>
        <div className="sticky-buy-actions">
          <span className="sticky-buy-price">{money(total)}</span>
          <button className="btn btn-sm" onClick={addToCart}>
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </StickyBuyBar>
    </>
  );
}
