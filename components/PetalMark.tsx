export function PetalMark({
  size = 24,
  color = 'var(--ember)',
  center = 'var(--cream)',
  className = '',
  spin = false,
}: {
  size?: number;
  color?: string;
  center?: string;
  className?: string;
  spin?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={`${className} ${spin ? 'petal-spin' : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx="24"
          cy="13.5"
          rx="5"
          ry="10"
          fill={color}
          opacity="0.92"
          transform={`rotate(${a} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="3.3" fill={center} />
    </svg>
  );
}
