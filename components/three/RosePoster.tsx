// Static rose poster — pure SVG, no JS, no network. Serves as the LCP-first
// paint, the Suspense fallback while WebGL hydrates, and the reduced-motion /
// low-power substitute. Built from concentric whorls of petals in Bone & Ember.

const GOLDEN = 137.5;

function whorl(count: number, radius: number, len: number, width: number, fill: string, opacity: number, offset = 0) {
  return Array.from({ length: count }).map((_, i) => {
    const a = offset + i * (360 / count) + ((i * GOLDEN) % 12);
    return (
      <path
        key={`${radius}-${i}`}
        d={`M0 0 C ${width} ${-len * 0.25}, ${width * 0.5} ${-len}, 0 ${-len} C ${-width * 0.5} ${-len}, ${-width} ${-len * 0.25}, 0 0 Z`}
        fill={fill}
        opacity={opacity}
        transform={`rotate(${a}) translate(0 ${-radius})`}
      />
    );
  });
}

export function RosePoster({ className = '' }: { className?: string }) {
  return (
    <div className={`rose-poster ${className}`} aria-hidden="true">
      <svg viewBox="-150 -150 300 300" width="100%" height="100%" role="presentation">
        <defs>
          <radialGradient id="rp-glow" cx="50%" cy="46%" r="60%">
            <stop offset="0%" stopColor="rgba(138,74,63,0.28)" />
            <stop offset="55%" stopColor="rgba(168,148,114,0.10)" />
            <stop offset="100%" stopColor="rgba(168,148,114,0)" />
          </radialGradient>
          <radialGradient id="rp-petal-outer" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#caa49a" />
            <stop offset="100%" stopColor="#a05f53" />
          </radialGradient>
          <radialGradient id="rp-petal-mid" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#b87a6c" />
            <stop offset="100%" stopColor="#8a4a3f" />
          </radialGradient>
          <radialGradient id="rp-petal-inner" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#8a4a3f" />
            <stop offset="100%" stopColor="#6b3128" />
          </radialGradient>
        </defs>

        <circle cx="0" cy="0" r="150" fill="url(#rp-glow)" />
        <g>
          {whorl(13, 96, 128, 64, 'url(#rp-petal-outer)', 0.96, 0)}
          {whorl(10, 70, 104, 54, 'url(#rp-petal-mid)', 0.97, 18)}
          {whorl(8, 46, 80, 44, 'url(#rp-petal-mid)', 0.98, 9)}
          {whorl(6, 26, 56, 34, 'url(#rp-petal-inner)', 1, 24)}
          {whorl(4, 12, 34, 24, 'url(#rp-petal-inner)', 1, 0)}
          <circle cx="0" cy="0" r="7" fill="#5a2a22" />
        </g>
      </svg>
    </div>
  );
}
