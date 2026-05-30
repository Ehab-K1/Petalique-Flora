'use client';

import { useState } from 'react';

const ITEMS = [
  {
    q: 'How do I keep the roses open through Saturday?',
    a: 'Cut 1cm off each stem on a 45° angle, change the water every other day, and keep them out of direct sun and away from fruit. The care card with every order has the same instructions, with a QR for the 30-second film.',
  },
  {
    q: 'What time will my same-day delivery arrive?',
    a: 'Order by 1pm Toronto time and we deliver the same day, almost always between 4pm and 9pm. You’ll get SMS tracking with a one-hour window the moment the driver leaves the atelier.',
  },
  {
    q: 'Where do you deliver?',
    a: 'Same-day across the GTA (Mississauga, Toronto, Etobicoke, Vaughan, Brampton, Oakville, Burlington). Next-day for the wider Greater Toronto and Hamilton area. Outside the region — please message the concierge.',
  },
  {
    q: 'Can I send something for a sympathy?',
    a: 'Yes — White Address and Lavender Hour are our most-chosen sympathy bouquets. We package these without bow or branding by default. A handwritten card is included and never charged.',
  },
  {
    q: 'How does the subscription work?',
    a: 'Choose Petite, Signature or Grand at the cadence you want. We deliver the same morning each week, swap the vessel, and leave. You can pause, skip, or change the plan in one tap from the order email.',
  },
  {
    q: 'Do you do non-wedding events?',
    a: 'Yes. Engagements, Nikkahs, receptions, corporate openings, christenings — anything that calls for flowers, we’ll design for it. Use the wedding form and tell us the day.',
  },
  {
    q: 'What if it arrives less than perfect?',
    a: 'We remake the bouquet, no questions, and we’ll have it on the doorstep the next morning. That’s our re-bloom guarantee — on every stem, every order.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {ITEMS.map((it, i) => (
        <details key={it.q} open={open === i} onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && setOpen(i)}>
          <summary>
            <span className="display-italic" style={{ fontSize: 22 }}>{it.q}</span>
            <span className="faq-mark" aria-hidden="true" />
          </summary>
          <p className="body" style={{ marginTop: 12, maxWidth: '60ch' }}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
