import Link from 'next/link';

export function Wordmark({
  size = 26,
  sub = true,
  href,
  className = '',
}: {
  size?: number;
  sub?: boolean;
  href?: string;
  className?: string;
}) {
  const mark = (
    <span className={`wordmark ${className}`} style={{ fontSize: size }} aria-label="Petalique Flora">
      <span className="word">
        Petali<span className="q">q</span>ue
      </span>
      {sub && <span className="flora">F · L · O · R · A</span>}
    </span>
  );
  if (href) {
    return (
      <Link href={href} aria-label="Petalique Flora — home">
        {mark}
      </Link>
    );
  }
  return mark;
}
