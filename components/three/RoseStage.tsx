'use client';

// Chooses between the live WebGL rose and the static poster, and lazy-loads the
// Three bundle so it never ships to users who can't (or shouldn't) run it.

import dynamic from 'next/dynamic';
import { type MutableRefObject } from 'react';
import { RosePoster } from './RosePoster';
import { useLowPower } from './useLowPower';

const RoseScene = dynamic(() => import('./RoseScene'), {
  ssr: false,
  loading: () => <RosePoster />,
});

export function RoseStage({ bloomRef }: { bloomRef?: MutableRefObject<number> }) {
  const low = useLowPower();

  // Until the client decides (and for reduced-motion / low-power), show poster.
  if (low === null || low) return <RosePoster />;

  return <RoseScene bloomRef={bloomRef} effects />;
}
