'use client';

import { useState } from 'react';
import { CEREMONY_TYPES, BUDGET_BANDS } from '@/lib/plans';

export function WeddingInquiry() {
  const [chips, setChips] = useState<string[]>(['Wedding']);
  const [boards, setBoards] = useState<File[]>([]);
  const [pinterest, setPinterest] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggle = (c: string) =>
    setChips((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 6);
    setBoards(files);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      kind: 'wedding',
      ceremonyTypes: chips,
      pinterest,
      boardCount: boards.length,
      boardNames: boards.map((f) => f.name),
      ...Object.fromEntries(form.entries()),
    };
    await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card" style={{ borderColor: 'var(--accent)' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}><span className="dot">●</span> Received</div>
        <h2 className="h2">Your inquiry is in. A florist replies within four working hours.</h2>
        <p className="body-lg" style={{ marginTop: 12, maxWidth: '54ch' }}>
          You&rsquo;ll get a short note confirming we&rsquo;ve read it, and a proposal deck with
          moodboards, installations sketched and packages applied — within seventy-two hours.
        </p>
      </div>
    );
  }

  return (
    <form className="card wedding-form" onSubmit={submit}>
      <div className="field-label">Tell us about the day</div>

      <div className="field" style={{ marginTop: 14 }}>
        <label className="field-label" style={{ marginBottom: 0 }}>What kind of celebration?</label>
        <p className="caption" style={{ marginBottom: 8 }}>Every culture welcomed equally. Pick as many as fit.</p>
        <div className="flex wrap gap-2">
          {CEREMONY_TYPES.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              data-active={chips.includes(c)}
              onClick={() => toggle(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="field-2" style={{ marginTop: 14 }}>
        <div className="field">
          <label htmlFor="w-name">Your name</label>
          <input id="w-name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="w-partner">Partner / co-host</label>
          <input id="w-partner" name="partner" />
        </div>
      </div>

      <div className="field-2" style={{ marginTop: 12 }}>
        <div className="field">
          <label htmlFor="w-email">Email</label>
          <input id="w-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="w-phone">Phone</label>
          <input id="w-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="field-2" style={{ marginTop: 12 }}>
        <div className="field">
          <label htmlFor="w-date">Date</label>
          <input id="w-date" name="date" type="date" required />
        </div>
        <div className="field">
          <label htmlFor="w-budget">Floral budget</label>
          <select id="w-budget" name="budget" defaultValue="">
            <option value="" disabled>Choose a band</option>
            {BUDGET_BANDS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="w-venue">Venue or city</label>
        <input id="w-venue" name="venue" />
      </div>

      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="w-notes">A few sentences about the day</label>
        <textarea id="w-notes" name="notes" placeholder="Palette, vibe, must-haves, what scares you, what you love." />
      </div>

      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="w-pin">Pinterest board (optional)</label>
        <input
          id="w-pin"
          value={pinterest}
          onChange={(e) => setPinterest(e.target.value)}
          placeholder="https://pinterest.com/…"
        />
      </div>

      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="w-files">Moodboard images (up to 6)</label>
        <input id="w-files" type="file" multiple accept="image/*" onChange={onFiles} />
        {boards.length > 0 && (
          <span className="caption">
            {boards.length} image{boards.length === 1 ? '' : 's'} ready to send.
          </span>
        )}
      </div>

      <button type="submit" className="btn btn-block btn-lg" style={{ marginTop: 18 }}>
        Send my inquiry
      </button>
      <p className="caption" style={{ marginTop: 12 }}>
        Florist replies within 4 working hours. Proposal deck within 72 hours.
      </p>
    </form>
  );
}
