'use client';

// TextReveal — word-by-word masked rise for headings. Pass plain text and wrap
// emphasis in *asterisks* to get the ember italic treatment (e.g. "dressing *up*").
// Each word sits in an overflow-clip line so words slide up out of a mask.

import { Fragment } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

type Props = {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
};

const wordV: Variants = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 },
  }),
};

export function TextReveal({ text, className = '', as = 'h2', delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const MotionTag = motion[as];

  const render = (w: string) => {
    const em = w.includes('*');
    const clean = w.replace(/\*/g, '');
    return em ? <em>{clean}</em> : clean;
  };

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className}>
        {words.map((w, i) => (
          <Fragment key={i}>
            {render(w)}
            {i < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
            <motion.span
              custom={i + delay}
              variants={wordV}
              style={{ display: 'inline-block', willChange: 'transform' }}
            >
              {render(w)}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </MotionTag>
  );
}
