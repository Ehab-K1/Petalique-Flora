'use client';

// Cinematic dark hero. The layout mirrors the direction reference: warm-black
// stage, editorial headline left, large rose illustration right, vertical
// "SCROLL TO UNFOLD" side indicator. GSAP drives the rose parallax and the
// initial bloom-in (no Three.js — no SSR crash, no WebGL requirement).

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';
import { RoseIllustration } from './RoseIllustration';
import { TextReveal } from '@/components/motion/TextReveal';
import { Magnetic } from '@/components/motion/Magnetic';

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const roseRef     = useRef<SVGSVGElement>(null);
  const introRef    = useRef<HTMLDivElement>(null);
  const reduce      = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!reduce) {
        // ── Bloom-in on mount ──────────────────────────────────────────────
        // Each petal layer appears in sequence (outer → inner), creating the
        // sense of a flower opening as the page loads.
        const layers = roseRef.current?.querySelectorAll('[data-petal-layer]');
        if (layers?.length) {
          gsap.from(Array.from(layers), {
            opacity: 0,
            scale: 0.6,
            transformOrigin: 'center 85%',
            duration: 1.4,
            ease: 'back.out(1.4)',
            stagger: { amount: 1.2, from: 'start' },
            delay: 0.25,
          });
        }

        // ── Idle breathe ──────────────────────────────────────────────────
        gsap.to(roseRef.current, {
          scale: 1.03,
          duration: 3.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: 'center center',
        });

        // ── Scroll: rose drifts up, intro copy fades ───────────────────────
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(roseRef.current, { y: p * -100 });
            gsap.set(introRef.current, { opacity: 1 - p * 1.8, y: p * -60 });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="dk-hero" ref={sectionRef}>
      {/* Decorative background: radial light pool behind the rose */}
      <div className="dk-hero-glow" aria-hidden="true" />

      {/* Left column: editorial copy */}
      <div className="dk-hero-text" ref={introRef}>
        <div className="eyebrow dk-eyebrow">
          <span className="dot" style={{ color: '#d87888' }}>●</span>{' '}
          Canadian luxury floral house
        </div>

        <TextReveal
          as="h1"
          className="h-hero dk-hero-h1"
          text="For the moments worth *dressing* *up* for."
        />

        <p className="body-lg dk-hero-lede">
          A floral house for gifting, weekly subscriptions, weddings and
          wholesale&nbsp;— designed with an editorial eye, delivered with a
          family&rsquo;s warmth.
        </p>

        <div className="hero-cta-row">
          <Magnetic>
            <Link href="/bouquets" className="btn btn-lg dk-btn-primary">
              Shop bouquets
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/subscriptions" className="btn btn-lg dk-btn-ghost">
              Weekly flowers
            </Link>
          </Magnetic>
        </div>

        {/* Animated scroll cue */}
        <div className="dk-scrollcue" aria-hidden="true">
          <span className="mono">Scroll</span>
          <span className="dk-scrollcue-line" />
        </div>
      </div>

      {/* Right column: the rose */}
      <div className="dk-hero-rose-col">
        <RoseIllustration ref={roseRef} className="dk-rose" />
      </div>

      {/* Vertical "SCROLL TO UNFOLD" side indicator */}
      <div className="dk-side-label" aria-hidden="true">
        <span className="mono">Scroll to unfold</span>
      </div>
    </section>
  );
}
