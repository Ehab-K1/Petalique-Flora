type Props = {
  size?: number;
  className?: string;
  label?: string;
};

export function GuaranteeBadge({
  size = 96,
  className = '',
  label = 'Fresh-flower guarantee',
}: Props) {
  return (
    <span
      className={`guarantee-badge ${className}`}
      style={{ width: size, height: size }}
      aria-label={label}
      title={label}
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <path id="circle-arc" d="M 60 60 m -46 0 a 46 46 0 1 1 92 0 a 46 46 0 1 1 -92 0" />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
        <text fontSize="8.4" fontWeight="600" letterSpacing="2.6" fill="currentColor" fontFamily="var(--font-sans, Inter, sans-serif)">
          <textPath href="#circle-arc" startOffset="0">
            FRESH-FLOWER GUARANTEE · BACKED BY PETALIQUE ·
          </textPath>
        </text>
        <g transform="translate(60 60)" fill="currentColor">
          <path d="M0 -22 C 7 -22 13 -16 13 -8 C 13 1 7 9 0 22 C -7 9 -13 1 -13 -8 C -13 -16 -7 -22 0 -22 Z" opacity="0.92" />
          <circle cx="0" cy="-6" r="2.2" fill="var(--paper, #fff)" />
        </g>
      </svg>
    </span>
  );
}
