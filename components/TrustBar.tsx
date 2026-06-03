import { cutoffLabel } from '@/lib/sameday';
import { AGGREGATE } from '@/lib/reviews';

const MARKS: { k: string; v: string }[] = [
  { k: 'Same-day across the GTA', v: `Order by ${cutoffLabel()} · delivered tonight` },
  { k: 'Fresh-flower guarantee', v: 'Not perfect? We remake it within 24 hours.' },
  { k: 'Hand-tied in Toronto', v: 'Designed in-studio, never warehoused.' },
  {
    k: `${AGGREGATE.rating.toFixed(1)} ★ · ${AGGREGATE.count.toLocaleString('en-CA')} reviews`,
    v: 'Verified buyers across the GTA',
  },
];

export function TrustBar({ className = '' }: { className?: string }) {
  return (
    <div className={`trust-bar ${className}`} role="list">
      {MARKS.map((m) => (
        <div className="trust-mark" role="listitem" key={m.k}>
          <span className="k">{m.k}</span>
          <span className="v">{m.v}</span>
        </div>
      ))}
    </div>
  );
}
