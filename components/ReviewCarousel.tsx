'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ReviewStars } from './ReviewStars';
import type { Review } from '@/lib/reviews';

type Props = {
  reviews: Review[];
  autoAdvanceMs?: number;
};

export function ReviewCarousel({ reviews, autoAdvanceMs = 6000 }: Props) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const paused = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % reviews.length);
    }, autoAdvanceMs);
    return () => window.clearInterval(id);
  }, [reduced, autoAdvanceMs, reviews.length]);

  const cardWidthPct = 100 / Math.min(reviews.length, 3);

  return (
    <div
      className="reviews-carousel"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div className="reviews-carousel-track-wrap">
        <motion.ul
          className="reviews-carousel-track"
          animate={{ x: `-${active * cardWidthPct}%` }}
          transition={reduced ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {reviews.map((r) => (
            <li key={r.id} className="review-card" style={{ flexBasis: `${cardWidthPct}%` }}>
              <ReviewStars rating={r.rating} showNumber={false} size={14} />
              <p className="review-quote">{r.quote}</p>
              <div className="review-foot">
                <span className="review-name">{r.name}</span>
                <span className="review-meta">
                  {r.product} · {r.location}
                </span>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="reviews-carousel-dots" role="tablist" aria-label="Review pages">
        {reviews.map((r, i) => (
          <button
            key={r.id}
            role="tab"
            aria-selected={active === i}
            aria-label={`Review ${i + 1} of ${reviews.length}`}
            className={`reviews-dot ${active === i ? 'on' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
