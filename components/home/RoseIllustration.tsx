'use client';

import { forwardRef } from 'react';

// Premium botanical rose illustration — a carefully constructed SVG whose
// petal shapes, gradients, and layering simulate the weight and lighting of
// an actual flower. Used as the centrepiece of the hero; the SVG element
// is forwarded so the Hero can hand a ref to GSAP for scroll animation.

// Petal outlines (base at origin, tip pointing toward negative-y).
// The asymmetric cubic curves give each whorl a slightly different silhouette.
const P = {
  outer: `M 0 0 C -19 -12, -32 -44, -27 -84 C -22 -112, -8 -124, 0 -124
          C 8 -124, 22 -112, 27 -84 C 32 -44, 19 -12, 0 0 Z`,
  mid:   `M 0 0 C -14 -8, -24 -32, -20 -62 C -16 -82, -6 -92, 0 -92
          C 6 -92, 16 -82, 20 -62 C 24 -32, 14 -8, 0 0 Z`,
  inner: `M 0 0 C -10 -6, -17 -23, -14 -46 C -11 -62, -5 -70, 0 -70
          C 5 -70, 11 -62, 14 -46 C 17 -23, 10 -6, 0 0 Z`,
  bud:   `M 0 0 C -6 -4, -11 -16, -9 -30 C -7 -40, -2 -46, 0 -46
          C 2 -46, 7 -40, 9 -30 C 11 -16, 6 -4, 0 0 Z`,
  sepal: `M 0 0 C -6 -8, -9 -20, -6 -40 C -3 -50, 0 -54, 0 -54
          C 0 -54, 3 -50, 6 -40 C 9 -20, 6 -8, 0 0 Z`,
};

// Layer config: [count, radius from center, path key, gradient id, start offset°]
const LAYERS = [
  { n: 8, r: 88,  key: 'outer', gid: 'g-out', off: 0   },
  { n: 7, r: 54,  key: 'mid',   gid: 'g-mid', off: 26  },
  { n: 5, r: 30,  key: 'inner', gid: 'g-inn', off: 8   },
  { n: 4, r: 14,  key: 'bud',   gid: 'g-bud', off: 20  },
] as const;

function petals(layer: (typeof LAYERS)[number]) {
  return Array.from({ length: layer.n }, (_, i) => {
    const a = layer.off + i * (360 / layer.n);
    return (
      <path
        key={i}
        d={P[layer.key]}
        fill={`url(#${layer.gid})`}
        transform={`rotate(${a}) translate(0 ${-layer.r})`}
        data-petal-layer={LAYERS.indexOf(layer)}
      />
    );
  });
}

export const RoseIllustration = forwardRef<SVGSVGElement, { className?: string }>(
  function RoseIllustration({ className = '' }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="-220 -230 440 440"
        width="100%"
        height="100%"
        className={`rose-illustration ${className}`}
        role="presentation"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Atmospheric studio glow behind the rose */}
          <radialGradient id="atm-glow" cx="50%" cy="48%" r="50%">
            <stop offset="0%"   stopColor="rgba(220,100,110,0.38)" />
            <stop offset="40%"  stopColor="rgba(180,70,85,0.18)" />
            <stop offset="75%"  stopColor="rgba(140,50,65,0.06)" />
            <stop offset="100%" stopColor="rgba(100,30,45,0)" />
          </radialGradient>

          {/* Petal gradients — userSpaceOnUse so the light direction is fixed
              (upper-left key light). Each layer gets progressively deeper tones
              as the petals converge toward the center. */}
          <linearGradient id="g-out" x1="-180" y1="-180" x2="160" y2="160"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#f6c0c8" />
            <stop offset="42%"  stopColor="#d87888" />
            <stop offset="100%" stopColor="#943048" />
          </linearGradient>

          <linearGradient id="g-mid" x1="-140" y1="-140" x2="120" y2="120"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#e8a0b0" />
            <stop offset="45%"  stopColor="#c06070" />
            <stop offset="100%" stopColor="#882040" />
          </linearGradient>

          <linearGradient id="g-inn" x1="-100" y1="-100" x2="80" y2="80"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#d88098" />
            <stop offset="50%"  stopColor="#a84868" />
            <stop offset="100%" stopColor="#701828" />
          </linearGradient>

          <linearGradient id="g-bud" x1="-60" y1="-60" x2="50" y2="50"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#c06080" />
            <stop offset="55%"  stopColor="#882858" />
            <stop offset="100%" stopColor="#5a1030" />
          </linearGradient>

          <linearGradient id="g-sepal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#2a4228" />
            <stop offset="100%" stopColor="#182818" />
          </linearGradient>

          {/* Petal highlight: a translucent sheen that catches the key light */}
          <linearGradient id="g-shine" x1="0%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%"   stopColor="rgba(255,235,230,0.36)" />
            <stop offset="60%"  stopColor="rgba(255,210,215,0.10)" />
            <stop offset="100%" stopColor="rgba(255,190,200,0)" />
          </linearGradient>

          {/* Soft glow on outermost petals — simulates camera bloom */}
          <filter id="bloom-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          </filter>

          {/* Inter-petal drop shadow for layering depth */}
          <filter id="depth-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="8"
              floodColor="rgba(60,10,20,0.45)" />
          </filter>
        </defs>

        {/* ── Atmospheric halo ── */}
        <ellipse cx="0" cy="8" rx="210" ry="195" fill="url(#atm-glow)" />

        {/* ── Blurred bloom duplicate (soft glow on outer petals) ── */}
        <g filter="url(#bloom-glow)" opacity="0.55">
          {LAYERS[0] && Array.from({ length: LAYERS[0].n }, (_, i) => {
            const a = LAYERS[0].off + i * (360 / LAYERS[0].n);
            return (
              <path key={i} d={P.outer}
                fill="#e06878" opacity={0.5}
                transform={`rotate(${a}) translate(0 ${-LAYERS[0].r})`} />
            );
          })}
        </g>

        {/* ── Sepals (behind outer petals, dark green base notes) ── */}
        <g filter="url(#depth-shadow)" opacity="0.85">
          {Array.from({ length: 5 }, (_, i) => {
            const a = i * 72 + 36;
            return (
              <path key={i} d={P.sepal}
                fill="url(#g-sepal)"
                transform={`rotate(${a}) translate(0 -92) scale(1.6 1.8)`} />
            );
          })}
        </g>

        {/* ── Outer petals ── */}
        <g filter="url(#depth-shadow)">
          {petals(LAYERS[0])}
        </g>

        {/* ── Highlight sheen on outer petals ── */}
        <g opacity="0.7" style={{ mixBlendMode: 'screen' } as React.CSSProperties}>
          {Array.from({ length: LAYERS[0].n }, (_, i) => {
            const a = LAYERS[0].off + i * (360 / LAYERS[0].n);
            return (
              <path key={i} d={P.outer}
                fill="url(#g-shine)"
                transform={`rotate(${a}) translate(0 ${-LAYERS[0].r})`} />
            );
          })}
        </g>

        {/* ── Mid petals ── */}
        <g filter="url(#depth-shadow)">
          {petals(LAYERS[1])}
        </g>

        {/* ── Inner petals ── */}
        <g>
          {petals(LAYERS[2])}
        </g>

        {/* ── Bud petals ── */}
        <g>
          {petals(LAYERS[3])}
        </g>

        {/* ── Center ── */}
        <circle cx="0" cy="0" r="13" fill="#4a0820" />
        <circle cx="0" cy="0" r="7"  fill="#320010" />
        {/* pistil catch-light */}
        <circle cx="-2" cy="-3" r="3.5" fill="rgba(255,160,140,0.28)" />
      </svg>
    );
  }
);
