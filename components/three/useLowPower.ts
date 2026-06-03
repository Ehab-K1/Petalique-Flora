'use client';

// Decides whether to render the live WebGL rose or fall back to the poster.
// Conservative: small viewports, low core counts, coarse pointers, reduced
// motion, or a failed WebGL probe all drop to the static poster.

import { useEffect, useState } from 'react';

export function useLowPower(): boolean | null {
  // null = undecided (render nothing / poster) until mounted on the client.
  const [low, setLow] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const narrow = window.innerWidth < 760;
    const fewCores = (navigator.hardwareConcurrency || 8) <= 4;

    let noWebGL = false;
    try {
      const c = document.createElement('canvas');
      noWebGL = !(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      noWebGL = true;
    }

    setLow(reduce || noWebGL || (narrow && coarse) || (coarse && fewCores));
  }, []);

  return low;
}
