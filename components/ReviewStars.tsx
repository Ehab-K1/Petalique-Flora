type Props = {
  rating: number;
  count?: number;
  size?: number;
  showNumber?: boolean;
  className?: string;
};

export function ReviewStars({
  rating,
  count,
  size = 14,
  showNumber = true,
  className = '',
}: Props) {
  const clamped = Math.max(0, Math.min(5, rating));
  const pct = (clamped / 5) * 100;
  const label =
    count !== undefined
      ? `${clamped.toFixed(1)} out of 5, from ${count.toLocaleString('en-CA')} reviews`
      : `${clamped.toFixed(1)} out of 5`;

  return (
    <span
      className={`review-stars ${className}`}
      aria-label={label}
      style={{ fontSize: size }}
    >
      <span className="rs-track" aria-hidden="true">
        <span className="rs-fill" style={{ width: `${pct}%` }}>★★★★★</span>
        <span className="rs-empty">★★★★★</span>
      </span>
      {showNumber && (
        <span className="rs-meta">
          <strong>{clamped.toFixed(1)}</strong>
          {count !== undefined && <span className="rs-count">({count.toLocaleString('en-CA')})</span>}
        </span>
      )}
    </span>
  );
}
