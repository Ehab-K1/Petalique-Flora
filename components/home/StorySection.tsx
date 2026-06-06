"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-cream overflow-hidden">
      <div className="max-w-9xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Images */}
          <div className="relative">
            {/* Primary image */}
            <motion.div
              style={{ y: y1 }}
              className="relative aspect-[3/4] overflow-hidden max-w-sm"
            >
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=90"
                alt="Luxury bridal bouquet"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Secondary image */}
            <motion.div
              style={{ y: y2 }}
              className="absolute -right-4 lg:-right-12 top-32 w-48 lg:w-64 aspect-[4/5] overflow-hidden border-4 border-cream shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=90"
                alt="Wedding ceremony florals"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Floating quote */}
            <div className="absolute -bottom-8 lg:bottom-0 left-0 lg:-left-8 bg-charcoal text-ivory p-6 max-w-[200px]">
              <p className="font-serif text-lg italic leading-snug mb-2">
                &ldquo;Every petal tells your story&rdquo;
              </p>
              <p className="font-sans text-label-sm text-ivory/50 uppercase tracking-widest">
                Est. 2012
              </p>
            </div>
          </div>

          {/* Right: Story */}
          <div className="lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-tag">Our Story</span>
              <h2 className="font-serif text-display-xl text-charcoal mb-6 leading-tight">
                Where Art Meets{" "}
                <em className="not-italic text-dusty-rose">Nature&apos;s</em>{" "}
                Beauty
              </h2>
              <div className="space-y-4 mb-8">
                <p className="font-sans text-body-lg text-charcoal/70 leading-relaxed">
                  Founded in Mississauga and rooted in the rich tapestry of South
                  Asian floral traditions, Petalique Flora has spent over a decade
                  crafting the florals behind some of the GTA&apos;s most cherished
                  celebrations.
                </p>
                <p className="font-sans text-body-md text-charcoal/60 leading-relaxed">
                  Each arrangement is a collaboration — your vision, our craft.
                  We believe florals are not decoration but narrative: the whisper
                  of a season, the weight of a moment, the colour of a love story
                  in bloom.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-bone/40">
                {[
                  { value: "500+", label: "Weddings Designed" },
                  { value: "12+", label: "Years of Craft" },
                  { value: "5.0★", label: "Average Rating" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-3xl text-charcoal mb-1">{stat.value}</p>
                    <p className="font-sans text-label-sm text-smoke/80 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 font-sans text-label-sm uppercase tracking-widest text-charcoal hover:text-rosewood transition-colors group"
              >
                Discover Our Atelier
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
