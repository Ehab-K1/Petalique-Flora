'use client';

// The five service lines as an interactive editorial index: hovering a line
// swaps the art-directed preview on the right and pulls the row forward.
// Every row is a real link, so it stays keyboard- and crawler-friendly.

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Placeholder } from '@/components/Placeholder';

type Tone = 'blush' | 'ember' | 'sage' | 'cream' | 'aubergine';

const LINES: { k: string; n: string; d: string; entry: string; href: string; tone: Tone; shot: string }[] = [
  { k: '01', n: 'Weddings & Events', d: 'Bouquets, ceremony & reception florals, installations and décor.', entry: 'Consult-led', href: '/weddings', tone: 'blush', shot: 'Ceremony arch · 4:5 · backlit' },
  { k: '02', n: 'Gifting', d: 'Named bouquets and gift boxes, same-day across the GTA.', entry: 'From $90', href: '/bouquets', tone: 'ember', shot: 'The Sunday · 4:5 · window light' },
  { k: '03', n: 'Corporate & Subscriptions', d: 'Weekly arrangements for offices, lobbies, hotels & restaurants.', entry: 'From $240/mo', href: '/corporate', tone: 'sage', shot: 'Hotel lobby install · 4:5 · evening' },
  { k: '04', n: 'Wholesale', d: 'Fresh stems by the bunch or box for florists, planners & studios.', entry: 'Trade pricing', href: '/wholesale', tone: 'cream', shot: 'Cooler, boxed stems · 4:5 · cold store' },
  { k: '05', n: 'Lived Spaces', d: 'Standing home arrangements and seasonal styling for the table you live at.', entry: 'From $120', href: '/subscriptions', tone: 'aubergine', shot: 'Dining table, mid-week · 4:5 · home' },
];

export function FiveLines() {
  const [active, setActive] = useState(0);
  const cur = LINES[active];

  return (
    <div className="five-lines">
      <ol className="five-lines-list">
        {LINES.map((b, i) => (
          <li key={b.k}>
            <Link
              href={b.href}
              className={`five-line ${i === active ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="mono five-line-k">{b.k}</span>
              <span className="five-line-main">
                <span className="display five-line-n">{b.n}</span>
                <span className="caption five-line-d">{b.d}</span>
              </span>
              <span className="mono five-line-entry">{b.entry}</span>
              <span className="five-line-arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="five-lines-preview" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.k}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '100%' }}
          >
            <Placeholder label={cur.shot} tone={cur.tone} ratio="4 / 5" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
