'use client';

// Cinematic hero. A tall section with a sticky stage: scroll progress drives the
// rose's `bloom` (bud → full open) while the intro copy lifts away and a
// manifesto line scrubs in. This is the homepage's signature sequence.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';
import { RoseStage } from '@/components/three/RoseStage';
import { TextReveal } from '@/components/motion/TextReveal';
import { Magnetic } from '@/components/motion/Magnetic';

export function Hero() {
  const bloomRef = useRef(0.08);
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      bloomRef.current = 0.62;
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          bloomRef.current = 0.08 + self.progress * 0.92;
        },
      });

      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        })
        .to(introRef.current, { opacity: 0, y: -70, filter: 'blur(8px)', ease: 'none' }, 0.32)
        .fromTo(
          manifestoRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: 'none' },
          0.46,
        )
        .to(manifestoRef.current, { opacity: 0, y: -30, ease: 'none' }, 0.86);
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="cine-hero" ref={sectionRef}>
      <div className="cine-hero-sticky">
        <div className="cine-hero-stage">
          <RoseStage bloomRef={bloomRef} />
        </div>
        <div className="cine-hero-veil" />

        <div className="container cine-hero-overlay">
          <div className="cine-intro" ref={introRef}>
            <div className="eyebrow" style={{ marginBottom: 22 }}>
              <span className="dot">●</span> Canadian luxury floral house
            </div>
            <TextReveal
              as="h1"
              className="h-hero cine-hero-h1"
              text="For the moments worth *dressing* *up* for."
            />
            <p className="body-lg cine-hero-lede">
              A floral house for gifting, weekly subscriptions, weddings and wholesale — designed
              with an editorial eye, delivered with a family&rsquo;s warmth.
            </p>
            <div className="hero-cta-row">
              <Magnetic>
                <Link href="/bouquets" className="btn btn-lg">
                  Shop bouquets
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/subscriptions" className="btn btn-lg btn-ghost">
                  Weekly flowers
                </Link>
              </Magnetic>
            </div>
            <div className="cine-scrollcue">
              <span className="mono">Scroll</span>
              <span className="cine-scrollcue-line" />
            </div>
          </div>

          <div className="cine-manifesto" ref={manifestoRef} aria-hidden={reduce ? 'true' : undefined}>
            <p className="pull cine-manifesto-line">
              Flowers are how love <em>sounds out loud</em>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
