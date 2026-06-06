"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sana & Faisal",
    role: "Wedding · Royal Ambassador Hotel, Mississauga",
    body: "Petalique Flora transformed our wedding into something beyond our wildest dreams. The mandap arrangement was breathtaking — every guest couldn't stop talking about the florals. The attention to detail, the colours, the sheer artistry. We are forever grateful.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    date: "October 2024",
  },
  {
    id: 2,
    name: "Priya & Arjun",
    role: "Wedding · Old Mill Toronto",
    body: "From our first consultation to the last petal, the experience was seamless and exquisite. Our bridal bouquet was a masterpiece — soft ivory roses, cascading orchids, just as I'd envisioned. Not a single detail was missed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    date: "September 2024",
  },
  {
    id: 3,
    name: "Jessica & Michael",
    role: "Wedding · The Manor, Bolton",
    body: "The most talented florist team I have ever worked with. Our garden-style arch was the most photographed element of the entire day. They took my Pinterest board and turned it into something ten times more beautiful.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    date: "August 2024",
  },
  {
    id: 4,
    name: "Fatima & Omar",
    role: "Walima · Grand Harbour, Oakville",
    body: "We hired Petalique Flora for both our Mehndi and Walima. The transformation was unreal each time. The team is professional, creative, and genuinely passionate about what they do. Highly recommended for any South Asian celebration.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    date: "July 2024",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -60 }),
  };

  return (
    <section className="py-24 lg:py-40 bg-parchment overflow-hidden">
      <div className="max-w-9xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="section-tag">Testimonials</span>
          <h2 className="font-serif text-display-lg text-charcoal">
            Words from Our Couples
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Quote */}
          <div className="relative">
            <Quote className="w-12 h-12 text-champagne/30 mb-6" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-champagne text-champagne" />
                  ))}
                </div>

                <blockquote className="font-serif text-display-sm text-charcoal leading-relaxed mb-8 italic">
                  &ldquo;{active.body}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-body-sm font-medium text-charcoal">
                      {active.name}
                    </p>
                    <p className="font-sans text-label-sm text-smoke">
                      {active.role}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <p className="font-sans text-label-sm text-smoke/60">{active.date}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 border border-bone/60 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:border-charcoal transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`h-0.5 transition-all duration-300 ${
                      i === current ? "w-8 bg-charcoal" : "w-3 bg-bone/80"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 border border-bone/60 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:border-charcoal transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* All reviews preview */}
          <div className="space-y-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.button
                key={t.id}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`w-full text-left p-5 border transition-all duration-300 ${
                  i === current
                    ? "border-charcoal/30 bg-ivory shadow-sm"
                    : "border-bone/40 hover:border-bone hover:bg-ivory/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-body-sm font-medium text-charcoal">
                      {t.name}
                    </p>
                    <p className="font-sans text-label-sm text-smoke truncate">
                      {t.role}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-champagne text-champagne" />
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}

            <div className="flex items-center gap-4 pt-4">
              <div className="flex">
                {TESTIMONIALS.slice(0, 4).map((t, i) => (
                  <div
                    key={t.id}
                    className="w-8 h-8 rounded-full border-2 border-parchment overflow-hidden relative -ml-2 first:ml-0"
                  >
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-sans text-body-sm text-charcoal font-medium">
                  5.0 on Google
                </p>
                <p className="font-sans text-label-sm text-smoke">
                  200+ verified reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
