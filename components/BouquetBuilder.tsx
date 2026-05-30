'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { COLOURS, WRAPS, BOWS, COUNT_PRESETS, rosePrice } from '@/lib/catalog';
import type { ColourId } from '@/lib/types';
import { unitPrice, money } from '@/lib/pricing';
import { useCart } from '@/store/cart';
import { SameDayCountdown } from './SameDayCountdown';

const STEPS = ['Count', 'Colour', 'Wrap', 'Bow', 'Message', 'Schedule'] as const;
const BUILDER_COLOURS: ColourId[] = ['white', 'blush', 'pink', 'red', 'peach', 'lavender', 'butter', 'terracotta', 'midnight', 'ombre'];

/** Phyllotaxis (sunflower) layout so the preview reads like a top-down bouquet. */
function bloomDots(count: number) {
  const visible = Math.min(count, 44);
  const out: { x: number; y: number; r: number; breath: boolean }[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < visible; i++) {
    const radius = Math.sqrt(i / visible);
    const theta = i * golden;
    out.push({
      x: 50 + Math.cos(theta) * radius * 42,
      y: 50 + Math.sin(theta) * radius * 42,
      r: 7.5 - radius * 2.5,
      breath: i % 4 === 3,
    });
  }
  return out;
}

export function BouquetBuilder() {
  const router = useRouter();
  const add = useCart((s) => s.add);

  const [step, setStep] = useState(0);
  const [count, setCount] = useState(24);
  const [colour, setColour] = useState<ColourId>('blush');
  const [wrap, setWrap] = useState(WRAPS[0].id);
  const [bow, setBow] = useState(BOWS[0].id);
  const [engraving, setEngraving] = useState('');
  const [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState<{ type: 'sameday' | 'date'; date: string }>({ type: 'sameday', date: '' });

  const sel = { count, colour, wrap, bow, addOns: [] as string[] };
  const unit = useMemo(() => unitPrice(sel), [count, colour, wrap, bow]);
  const dots = useMemo(() => bloomDots(count), [count]);
  const isEngraved = bow === 'engraved';
  const colourHex = COLOURS[colour].hex;

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  function finish() {
    add({
      productSlug: 'custom',
      name: 'Your bouquet',
      count,
      colour,
      colourName: COLOURS[colour].name,
      wrap: WRAPS.find((w) => w.id === wrap)!.name,
      bow: BOWS.find((b) => b.id === bow)!.name,
      engraving: isEngraved ? engraving : undefined,
      message: message || undefined,
      schedule: schedule.type === 'sameday' ? 'Same-day' : schedule.date,
      addOns: [],
      unitPrice: unit,
      qty: 1,
    });
    router.push('/cart');
  }

  return (
    <div className="builder">
      {/* Live preview */}
      <div className="builder-canvas">
        <div className="bloom-stage">
          <div className="bloom" aria-label={`${count} ${COLOURS[colour].name} roses`}>
            {dots.map((d, i) => (
              <span
                key={i}
                className="bloom-dot"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  width: d.r * 2 + (d.breath ? -2 : 0),
                  height: d.r * 2 + (d.breath ? -2 : 0),
                  background: d.breath ? '#F4EFE6' : colourHex,
                }}
              />
            ))}
          </div>
          <div className="ribbon-strip">
            <span className="mono">{isEngraved && engraving ? `“${engraving}”` : 'Petalique Flora'}</span>
          </div>
        </div>
        <div className="bloom-readout">
          <span className="mono">
            {count} {COLOURS[colour].name} roses · {WRAPS.find((w) => w.id === wrap)!.name}
          </span>
          <span className="display" style={{ fontSize: 22 }}>
            {money(unit)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="builder-controls">
        <div className="stepline" role="progressbar" aria-valuenow={step + 1} aria-valuemax={STEPS.length}>
          {STEPS.map((s, i) => (
            <button
              key={s}
              className="stepseg"
              data-state={i < step ? 'done' : i === step ? 'active' : 'todo'}
              onClick={() => setStep(i)}
              aria-label={`Step ${i + 1}: ${s}`}
            />
          ))}
        </div>
        <div className="mono builder-steplabel">
          Step {step + 1} / {STEPS.length} · {STEPS[step]}
        </div>

        {step === 0 && (
          <div className="builder-step">
            <h2 className="h3">How many roses?</h2>
            <div className="flex wrap gap-2" style={{ marginTop: 16 }}>
              {COUNT_PRESETS.map((p) => (
                <button key={p.count} className="chip" data-active={count === p.count} onClick={() => setCount(p.count)}>
                  {p.count} · {money(rosePrice(p.count))}
                </button>
              ))}
            </div>
            <div className="pdp-slider" style={{ marginTop: 16 }}>
              <input type="range" min={6} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} aria-label="Rose count" />
              <span className="caption">{count} stems · drag for any number from 6 to 100</span>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="builder-step">
            <h2 className="h3">What colour should they be?</h2>
            <div className="flex wrap gap-3" style={{ marginTop: 18, alignItems: 'center' }}>
              {BUILDER_COLOURS.map((c) => (
                <button
                  key={c}
                  className="dot-swatch"
                  data-active={colour === c}
                  style={{ background: COLOURS[c].hex, width: 38, height: 38 }}
                  onClick={() => setColour(c)}
                  title={COLOURS[c].name}
                  aria-label={COLOURS[c].name}
                />
              ))}
            </div>
            <p className="caption" style={{ marginTop: 14 }}>
              {COLOURS[colour].name}
              {COLOURS[colour].upcharge ? ` · +${money(COLOURS[colour].upcharge)} for tinted stems` : ''}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="builder-step">
            <h2 className="h3">Wrapped how?</h2>
            <div className="grid gap-2" style={{ marginTop: 16 }}>
              {WRAPS.map((w) => (
                <button key={w.id} className={`option-tile ${wrap === w.id ? 'on' : ''}`} onClick={() => setWrap(w.id)}>
                  <span className="display" style={{ fontSize: 18 }}>
                    {w.name}
                  </span>
                  <span className="caption">{w.note}</span>
                  <span className="mono option-tile-price">{w.upcharge ? `+${money(w.upcharge)}` : 'Included'}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="builder-step">
            <h2 className="h3">Finished with which ribbon?</h2>
            <div className="grid gap-2" style={{ marginTop: 16 }}>
              {BOWS.map((b) => (
                <button key={b.id} className={`option-tile ${bow === b.id ? 'on' : ''}`} onClick={() => setBow(b.id)}>
                  <span className="display" style={{ fontSize: 18 }}>
                    {b.name}
                  </span>
                  <span className="caption">{b.note}</span>
                  <span className="mono option-tile-price">{b.upcharge ? `+${money(b.upcharge)}` : 'Included'}</span>
                </button>
              ))}
            </div>
            {isEngraved && (
              <div className="field" style={{ marginTop: 14 }}>
                <label htmlFor="b-engraving">Engraving · two letters, a date, or one word</label>
                <input id="b-engraving" maxLength={18} value={engraving} onChange={(e) => setEngraving(e.target.value)} placeholder="A & S · 06 / 24 · forever" />
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="builder-step">
            <h2 className="h3">What should the card say?</h2>
            <div className="field" style={{ marginTop: 16 }}>
              <label htmlFor="b-message">Hand-written by the team, never printed</label>
              <textarea id="b-message" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={400} placeholder="Say the thing you’d say in person." />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="builder-step">
            <h2 className="h3">When should it arrive?</h2>
            <div className="grid gap-2" style={{ marginTop: 16 }}>
              <button className={`option-tile ${schedule.type === 'sameday' ? 'on' : ''}`} onClick={() => setSchedule({ type: 'sameday', date: '' })}>
                <span className="display" style={{ fontSize: 18 }}>
                  Same-day
                </span>
                <SameDayCountdown />
              </button>
              <button className={`option-tile ${schedule.type === 'date' ? 'on' : ''}`} onClick={() => setSchedule((s) => ({ ...s, type: 'date' }))}>
                <span className="display" style={{ fontSize: 18 }}>
                  Pick a date
                </span>
                <span className="caption">Choose the morning it should land.</span>
              </button>
              {schedule.type === 'date' && (
                <div className="field">
                  <label htmlFor="b-date">Delivery date</label>
                  <input id="b-date" type="date" value={schedule.date} onChange={(e) => setSchedule({ type: 'date', date: e.target.value })} />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="builder-nav">
          <div className="between" style={{ width: '100%' }}>
            <button className="link-underline" onClick={back} disabled={step === 0} style={{ opacity: step === 0 ? 0.3 : 1 }}>
              ← Back
            </button>
            {step < STEPS.length - 1 ? (
              <button className="btn" onClick={next}>
                Continue
              </button>
            ) : (
              <button className="btn btn-ember" onClick={finish}>
                Add to cart · {money(unit)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
