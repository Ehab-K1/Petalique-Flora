'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type Props = {
  triggerRef: React.RefObject<HTMLElement | null>;
  children: ReactNode;
};

export function StickyBuyBar({ triggerRef, children }: Props) {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const target = triggerRef.current;
    if (!target) return;
    observer.current = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-72px 0px 0px 0px' },
    );
    observer.current.observe(target);
    return () => observer.current?.disconnect();
  }, [triggerRef]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="sticky-buy"
          role="region"
          aria-label="Add to cart"
          initial={reduced ? false : { y: 64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: 64, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container sticky-buy-inner">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
