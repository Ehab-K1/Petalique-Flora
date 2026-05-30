'use client';

import { useEffect, useState } from 'react';
import { sameDayState, formatCountdown, cutoffLabel } from '@/lib/sameday';

export function SameDayCountdown({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<ReturnType<typeof sameDayState> | null>(null);

  useEffect(() => {
    const tick = () => setState(sameDayState());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    return (
      <span className={`sameday ${compact ? 'sameday-compact' : ''}`}>
        <span className="sameday-dot" /> <span className="mono">Checking delivery…</span>
      </span>
    );
  }

  if (!state.eligible) {
    return (
      <span className={`sameday next ${compact ? 'sameday-compact' : ''}`}>
        <span className="sameday-dot" />
        <span className="mono">Next-day delivery · order any time</span>
      </span>
    );
  }

  return (
    <span className={`sameday ${compact ? 'sameday-compact' : ''}`}>
      <span className="sameday-dot live" />
      <span className="mono">
        Order in {formatCountdown(state.msToCutoff)} for same-day · cutoff {cutoffLabel()}
      </span>
    </span>
  );
}
