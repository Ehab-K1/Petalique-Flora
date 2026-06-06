"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown } from "lucide-react";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-obsidian" /> }
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-obsidian"
      aria-label="Hero"
    >
      {/* 3D Background layer */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <HeroScene scrollY={scrollY} />
      </motion.div>

      {/* Atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col justify-end h-full pb-24 lg:pb-32"
      >
        <div className="max-w-9xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-3xl">
            {/* Pre-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-label-sm uppercase tracking-[0.3em] text-champagne mb-6"
            >
              Luxury Floral Design · Greater Toronto Area
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-display-2xl text-ivory leading-[1.0] mb-6"
            >
              Floral Design for{" "}
              <em className="not-italic text-dusty-rose">Moments</em>
              <br />
              That Become{" "}
              <em className="not-italic text-champagne">Memories</em>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-sans text-body-lg text-ivory/60 mb-10 max-w-xl leading-relaxed"
            >
              Luxury wedding florals, event décor, and handcrafted floral gifting
              across the GTA.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact?type=wedding"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-ivory text-charcoal font-sans text-label-md uppercase tracking-widest transition-all duration-500 hover:bg-dusty-rose hover:text-ivory group"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-ivory/40 text-ivory font-sans text-label-md uppercase tracking-widest transition-all duration-500 hover:border-ivory hover:bg-ivory/10"
              >
                Shop Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-12 hidden lg:flex flex-col items-end gap-2 z-10"
      >
        <div className="flex gap-8">
          {[
            { value: "500+", label: "Weddings" },
            { value: "12+", label: "Years" },
            { value: "5★", label: "Reviews" },
          ].map((stat) => (
            <div key={stat.label} className="text-right">
              <p className="font-serif text-2xl text-ivory">{stat.value}</p>
              <p className="font-sans text-label-sm text-ivory/40 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-label-sm text-ivory/30 uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-ivory/30" />
        </motion.div>
      </motion.div>

      {/* Vertical text decoration */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 writing-vertical hidden xl:block z-10">
        <span className="font-sans text-label-sm text-ivory/20 uppercase tracking-[0.3em]">
          Petalique Flora
        </span>
      </div>
    </section>
  );
}
