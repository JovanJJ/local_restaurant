"use client";

import { motion } from "framer-motion";

export default function TestimonialsSection({ lang }: { lang: string }) {
  const isEn = lang === "en";

  const testimonials = [
    {
      text: {
        sr: "Autentičan ambijent i hrana koja vraća u detinjstvo. Svaki put se oduševim gostoprimstvom i kvalitetom usluge.",
        en: "Authentic atmosphere and food that brings back childhood memories. I'm always delighted by the hospitality and service quality.",
      },
      author: "Milica R.",
      role: { sr: "Ljubitelj domaće kuhinje", en: "Traditional Food Lover" },
    },
    {
      text: {
        sr: "Najbolji ćevapi u gradu, bez premca. Atmosfera je topla i prava domaćinska, savršeno za porodični ručak.",
        en: "The best cevapi in town, hands down. The atmosphere is warm and truly domestic, perfect for a family lunch.",
      },
      author: "Marko P.",
      role: { sr: "Redovni gost", en: "Regular Guest" },
    },
  ];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0A0705] px-5 py-24 text-[#E8DCCF] sm:px-8 lg:px-16 lg:py-36"
      aria-label="Guest testimonials"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(176,122,79,0.06),transparent_40%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center text-center lg:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B07A4F] sm:text-xs"
          >
            {isEn ? "Guest Impressions" : "Utisci Naših Gostiju"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-serif text-4xl font-light leading-tight tracking-wide text-[#E8DCCF] sm:text-5xl lg:text-6xl"
          >
            {isEn ? "What They Say" : "Šta Kažu"} <span className="italic text-[#B07A4F]">{isEn ? "About Us" : "O Nama"}</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mt-8 h-px w-24 bg-[#B07A4F]/60"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 + 0.3 }}
              className="relative rounded-2xl border border-[#B07A4F]/10 bg-[#140E0C]/40 p-8 backdrop-blur-sm sm:p-12"
            >
              <div className="mb-8 font-serif text-5xl text-[#B07A4F]/30 select-none">“</div>
              <p className="relative z-10 font-sans text-base font-light italic leading-[1.8] tracking-wide text-[#D6C5B5] sm:text-lg sm:leading-relaxed">
                {isEn ? t.text.en : t.text.sr}
              </p>
              <div className="mt-10 flex flex-col gap-1">
                <span className="font-serif text-xl font-medium tracking-wide text-[#E8DCCF]">
                  {t.author}
                </span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#B07A4F]">
                  {isEn ? t.role.en : t.role.sr}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
