"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=90",
    alt: "Grand ballroom wedding",
    size: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=90",
    alt: "Bridal bouquet detail",
    size: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=700&q=90",
    alt: "Wedding ceremony arch",
    size: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f29c8a4a60?w=900&q=90",
    alt: "Reception centrepiece",
    size: "wide",
  },
];

export function WeddingShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const headerOp = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="py-24 lg:py-40 bg-charcoal overflow-hidden">
      <div className="max-w-9xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOp }}
          className="text-center mb-16"
        >
          <span className="font-sans text-label-sm uppercase tracking-[0.25em] text-champagne block mb-4">
            Wedding Portfolio
          </span>
          <h2 className="font-serif text-display-xl text-ivory mb-4">
            Crafting the Perfect{" "}
            <em className="not-italic text-dusty-rose">Day</em>
          </h2>
          <p className="font-sans text-body-md text-ivory/50 max-w-xl mx-auto">
            From intimate ceremonies to grand South Asian celebrations, every
            detail designed to exceed expectation.
          </p>
        </motion.div>

        {/* Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative overflow-hidden group ${
                item.size === "tall" ? "row-span-2" : item.size === "wide" ? "col-span-2" : ""
              }`}
            >
              <div
                className={`relative ${
                  item.size === "tall"
                    ? "h-[580px]"
                    : item.size === "wide"
                    ? "h-[280px]"
                    : "h-[280px]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-obsidian/0 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats + CTA */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-12 border-t border-ivory/10">
          <div className="grid grid-cols-3 gap-12 text-center lg:text-left">
            {[
              { value: "500+", label: "Weddings" },
              { value: "GTA", label: "Wide Coverage" },
              { value: "100%", label: "Custom Design" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-4xl lg:text-5xl text-ivory mb-1">{s.value}</p>
                <p className="font-sans text-label-sm text-ivory/40 uppercase tracking-[0.15em]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/weddings" className="btn-outline border-ivory/30 text-ivory hover:bg-ivory hover:text-charcoal">
              View Wedding Services
            </Link>
            <Link
              href="/contact?type=wedding"
              className="inline-flex items-center gap-3 px-8 py-4 bg-dusty-rose text-ivory font-sans text-label-md uppercase tracking-widest hover:bg-rosewood transition-colors duration-300"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
