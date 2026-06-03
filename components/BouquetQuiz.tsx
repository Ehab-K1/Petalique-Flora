'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/catalog';
import { money } from '@/lib/pricing';
import { ProductCard } from './ProductCard';

type Answer = 'a' | 'b' | 'c' | 'd';
const Q = [
  {
    q: 'How should the moment feel?',
    opts: [
      { id: 'a', label: 'Romantic', tags: ['anniversary', 'blush', 'red'] },
      { id: 'b', label: 'Celebratory', tags: ['congratulations', 'butter', 'peach'] },
      { id: 'c', label: 'Calm & considered', tags: ['sympathy', 'just-because', 'lavender'] },
      { id: 'd', label: 'A grand gesture', tags: ['anniversary', 'apology', 'red'] },
    ],
  },
  {
    q: 'How would your recipient describe their taste?',
    opts: [
      { id: 'a', label: 'Classic', tags: ['the-sunday', 'white-address'] },
      { id: 'b', label: 'Editorial', tags: ['taupe-and-cream', 'terracotta-table'] },
      { id: 'c', label: 'Quietly luxurious', tags: ['ember-anniversary', 'still-water'] },
      { id: 'd', label: 'Joyful', tags: ['butter-light', 'morning-market'] },
    ],
  },
  {
    q: 'Are you sending it for a specific occasion?',
    opts: [
      { id: 'a', label: 'Anniversary', tags: ['anniversary'] },
      { id: 'b', label: 'Birthday or congrats', tags: ['birthday', 'congratulations'] },
      { id: 'c', label: 'No occasion at all', tags: ['just-because'] },
      { id: 'd', label: 'Something tender', tags: ['sympathy', 'apology'] },
    ],
  },
  {
    q: 'What should it cost, more or less?',
    opts: [
      { id: 'a', label: 'Around $90', tags: ['under-100'] },
      { id: 'b', label: 'Around $120 – $150', tags: ['100-150'] },
      { id: 'c', label: 'Over $150 — the gesture matters', tags: ['over-150'] },
      { id: 'd', label: 'No ceiling — make it right', tags: ['the-fifty'] },
    ],
  },
] as const;

function recommend(answers: (Answer | null)[]) {
  const scored = PRODUCTS.map((p) => {
    let score = 0;
    answers.forEach((ans, idx) => {
      if (!ans) return;
      const tags = Q[idx].opts.find((o) => o.id === ans)?.tags ?? [];
      tags.forEach((t) => {
        if (p.slug === t) score += 4;
        if (p.occasions.some((o) => o === t)) score += 2;
        if (p.colours.some((c) => c === t)) score += 2;
        if (t === 'under-100' && p.basePrice < 100) score += 2;
        if (t === '100-150' && p.basePrice >= 100 && p.basePrice <= 150) score += 2;
        if (t === 'over-150' && p.basePrice > 150) score += 2;
      });
    });
    return { p, score };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.p);
  return scored;
}

export function BouquetQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>([null, null, null, null]);

  const done = answers.every((a) => a !== null);
  const recs = useMemo(() => (done ? recommend(answers) : []), [done, answers]);

  function answer(id: Answer) {
    const copy = [...answers];
    copy[step] = id;
    setAnswers(copy);
    if (step < Q.length - 1) setStep(step + 1);
  }

  if (done) {
    return (
      <div className="quiz-result">
        <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 10 }}>
          <span className="dot">●</span> Three you should consider
        </div>
        <h2 className="h1 center-text" style={{ maxWidth: '20ch', margin: '0 auto 28px' }}>
          We&rsquo;d send one of these.
        </h2>
        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {recs.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
        <div className="center" style={{ justifyContent: 'center', gap: 12, marginTop: 32 }}>
          <button className="link-underline" onClick={() => { setAnswers([null, null, null, null]); setStep(0); }}>
            Start over
          </button>
          <Link href="/bouquets" className="btn btn-ghost">All bouquets</Link>
        </div>
      </div>
    );
  }

  const current = Q[step];
  return (
    <div className="quiz">
      <div className="stepline" style={{ maxWidth: 480, margin: '0 auto 18px' }}>
        {Q.map((_, i) => (
          <span key={i} className="stepseg" data-state={i < step ? 'done' : i === step ? 'active' : 'todo'} />
        ))}
      </div>
      <div className="mono center-text muted" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Question {step + 1} of {Q.length}
      </div>
      <h2 className="h1 center-text" style={{ maxWidth: '22ch', margin: '14px auto 28px' }}>
        {current.q}
      </h2>
      <div className="grid gap-3" style={{ maxWidth: 520, margin: '0 auto' }}>
        {current.opts.map((o) => (
          <button key={o.id} className="option-tile" onClick={() => answer(o.id as Answer)}>
            <span className="display" style={{ fontSize: 22 }}>{o.label}</span>
          </button>
        ))}
      </div>
      {step > 0 && (
        <div className="center-text" style={{ marginTop: 22 }}>
          <button className="link-underline" onClick={() => setStep(step - 1)}>← Back</button>
        </div>
      )}
    </div>
  );
}
