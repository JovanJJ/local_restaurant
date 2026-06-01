"use client";

import { motion } from "framer-motion";

export default function VisualGallery({ lang }: { lang: string }) {
  const isEn = lang === "en";

  return (
    <section
      className="relative w-full overflow-hidden bg-[#18110E] px-5 py-24 text-[#E8DCCF] sm:px-8 lg:px-16 lg:py-36"
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
            {isEn ? "Moments from the Kitchen" : "Momenti i Atmosfera"}
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
              <div className="absolute inset-0 bg-[#18110E]/20 transition-opacity duration-500 group-hover:opacity-0" />
            </motion.div>
          ))}
        </div>

        {/* Social Media Link Connect */}
        <div className="mt-16 flex flex-col items-center justify-center text-center gap-5 border-t border-[#B07A4F]/10 pt-12">
          <p className="font-sans text-xs font-light tracking-wider text-[#D6C5B5] max-w-sm">
            {isEn
              ? "Follow us for more photos and news"
              : "Pratite nas za još fotografija i novosti"
            }
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[#B07A4F]/20 bg-[#1A1310] text-[#D6C5B5] transition-all duration-300 hover:border-[#B07A4F]/60 hover:text-[#B07A4F] hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[#B07A4F]/20 bg-[#1A1310] text-[#D6C5B5] transition-all duration-300 hover:border-[#B07A4F]/60 hover:text-[#B07A4F] hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
