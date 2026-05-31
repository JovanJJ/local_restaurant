"use client";

import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { motion } from "framer-motion";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function VisualGallery({ lang }: { lang: string }) {
  const isEn = lang === "en";

  return (
    <section
      className={`${cormorant.variable} ${montserrat.variable} relative w-full overflow-hidden bg-[#0A0705] px-5 py-24 text-[#E8DCCF] sm:px-8 lg:px-16 lg:py-36`}
      aria-label="Gallery of restaurant visuals"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,122,79,0.04),transparent_50%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center text-center lg:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B07A4F] sm:text-xs"
          >
            {isEn ? "Moments from the Kitchen" : "Momenti Iz Kuhinje"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-serif text-4xl font-light leading-tight tracking-wide text-[#E8DCCF] sm:text-5xl lg:text-6xl"
          >
            {isEn ? "Visual" : "Vizuelna"} <span className="italic text-[#B07A4F]">{isEn ? "Inspiration" : "Inspiracija"}</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mt-8 h-px w-24 bg-[#B07A4F]/60"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/etnokonak.jpg", delay: 0.1 },
            { src: "/etnokonak2.png", delay: 0.2 },
            { src: "/etnokonak3.png", delay: 0.3 },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: img.delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-[#140E0C] shadow-2xl"
            >
              <img
                src={img.src}
                alt="Gallery"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-[#0A0705]/20 transition-opacity duration-500 group-hover:opacity-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
