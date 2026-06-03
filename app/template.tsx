'use client';

// Route-change transition. template.tsx remounts on every navigation, so this
// gives every page a soft cinematic enter — carrying the motion language across
// the whole site, not just the homepage.

import { motion, useReducedMotion } from 'motion/react';

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  // Opacity-only: a transform here would establish a containing block and break
  // every position:sticky element on the page (hero stage, filter rails, PDP
  // gallery, plan summaries, the trade cart). Fade is enough to carry continuity.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
