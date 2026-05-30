import { cutoffLabel } from '@/lib/sameday';

const MARKS = [
  { k: 'Same-day GTA', v: `Order by ${cutoffLabel()}` },
  { k: 'Re-bloom guarantee', v: 'Or we remake it' },
  { k: 'Hand-tied', v: 'Mississauga atelier' },
  { k: '4.97 ★', v: '1,100+ moments' },
];

export function TrustBar({ className = '' }: { className?: string }) {
  return (
    <div className={`trust-bar ${className}`} role="list">
      {MARKS.map((m) => (
        <div className="trust-mark" role="listitem" key={m.k}>
          <span className="mono k">{m.k}</span>
          <span className="caption v">{m.v}</span>
        </div>
      ))}
    </div>
  );
}
