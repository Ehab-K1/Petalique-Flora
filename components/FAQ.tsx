'use client';

import { useState } from 'react';
import { cutoffLabel } from '@/lib/sameday';

const ITEMS: { q: string; a: string }[] = [
  {
    q: 'How do I keep the flowers fresh through the weekend?',
    a: 'Cut 1cm off each stem at a 45° angle, change the water every other day, and keep them out of direct sun and away from fruit. The care card with every order has the same instructions, with a QR for the 30-second studio video.',
  },
  {
    q: 'What time will my same-day delivery arrive?',
    a: `Order by ${cutoffLabel()} Toronto time and we deliver the same day, almost always between 4pm and 9pm. You'll get a tracking text with a one-hour window the moment your driver leaves the studio.`,
  },
  {
    q: 'Where do you deliver?',
    a: 'Same-day across the GTA (Toronto, Etobicoke, Mississauga, Vaughan, Brampton, Oakville, Burlington, Richmond Hill, Markham). Next-day for the wider Greater Toronto and Hamilton area. Outside the region — message us via the chat in the bottom corner.',
  },
  {
    q: 'Can I send something for a sympathy?',
    a: 'Yes — White Address and Lavender Hour are our most-chosen sympathy bouquets. We package these without bow or branding by default. A hand-written card is included and never charged.',
  },
  {
    q: 'How does the subscription work?',
    a: 'Choose Petite, Signature or Grand at the cadence you want. We deliver the same morning each week, swap your vessel, and leave. You can pause, skip, or change the plan in one tap from the order email.',
  },
  {
    q: 'Do you do non-wedding events?',
    a: 'Yes. Engagements, Nikkahs, receptions, corporate openings, christenings — anything that calls for flowers, we will design for it. Use the wedding form and tell us the day.',
  },
  {
    q: 'What if it arrives less than perfect?',
    a: 'Send a photo within 24 hours and we remake the bouquet, no questions, with same-day re-delivery. That is the fresh-flower guarantee — on every stem, every order.',
  },
  {
    q: 'How do you handle returns and cancellations?',
    a: 'Same-day orders can be cancelled up to 30 minutes before they enter production. Subscriptions can be paused or cancelled any time from your account. Wedding deposits are 30% of the contract and become non-refundable 60 days before the date.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {ITEMS.map((it, i) => (
        <details key={it.q} open={open === i} onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && setOpen(i)}>
          <summary>
            <span className="faq-q">{it.q}</span>
            <span className="faq-mark" aria-hidden="true" />
          </summary>
          <p className="body" style={{ marginTop: 12, maxWidth: '60ch' }}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
