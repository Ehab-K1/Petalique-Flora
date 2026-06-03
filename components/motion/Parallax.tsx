'use client';

// Parallax — translates its child on the Y axis as it passes through the
// viewport. speed is roughly the fraction of travel (0.2 = subtle drift).

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export function Parallax({
  children,
  speed = 0.18,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const range = speed * 120;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
