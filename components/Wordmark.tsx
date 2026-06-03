import Link from 'next/link';

export function Wordmark({
  size = 18,
  sub = false,
  href,
  className = '',
}: {
  size?: number;
  sub?: boolean;
  href?: string;
  className?: string;
}) {
  const mark = (
    <span
      className={`wordmark-v2 ${className}`}
      style={{ fontSize: size }}
      aria-label="Petalique"
    >
      <span className="wm-word">PETALIQUE</span>
      <span className="wm-dot" aria-hidden="true" />
      {sub && <span className="wm-sub">Flowers, same-day GTA</span>}
    </span>
  );
  if (href) {
    return (
      <Link href={href} aria-label="Petalique — home">
        {mark}
      </Link>
    );
  }
  return mark;
}
