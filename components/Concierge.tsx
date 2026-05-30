'use client';

import { useEffect, useState } from 'react';

// Floating concierge pill. Appears after ~30s or 30% scroll. Routes to a single
// inbox (WhatsApp / Instagram). Reply SLA: 2 hours.
export function Concierge() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 30000);
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      if (pct > 0.3) setShow(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="concierge">
      {open && (
        <div className="concierge-card">
          <div className="mono concierge-eyebrow">Concierge · replies within 2 hours</div>
          <p className="body" style={{ margin: '8px 0 14px' }}>
            Not sure what to send? Tell us the moment and we’ll choose for you.
          </p>
          <div className="grid gap-2">
            <a className="btn btn-sm btn-block" href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              Message on WhatsApp
            </a>
            <a
              className="btn btn-sm btn-ghost btn-block"
              href="https://instagram.com/petalique_flora"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on Instagram
            </a>
          </div>
        </div>
      )}
      <button className="concierge-pill" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? 'Close' : 'Message us'}
      </button>
    </div>
  );
}
