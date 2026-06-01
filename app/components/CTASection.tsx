"use client";

import { motion } from "framer-motion";

export default function CTASection({ lang }: { lang: string }) {
  const isEn = lang === "en";

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0A0705] px-5 py-20 text-[#E8DCCF] sm:px-8 lg:px-16 lg:py-28"
      aria-label="Reservation call to action"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(176,122,79,0.22),transparent_42%),linear-gradient(180deg,rgba(31,23,19,0.96)_0%,rgba(10,7,5,0.98)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B07A4F]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B07A4F] sm:text-xs">
          {isEn ? "Experience a Night to Remember" : "Doživite Veče Za Pamćenje"}
        </h2>

        <p className="mt-6 max-w-4xl font-serif text-3xl font-light leading-tight tracking-wide text-[#E8DCCF] sm:text-5xl lg:text-6xl">
          {isEn 
            ? <>Book your table and indulge in<br className="hidden sm:block" /> a warm atmosphere, carefully selected wines<br className="hidden sm:block" /> and flavors of the modern Balkans.</>
            : <>Rezervišite svoje mesto i prepustite se<br className="hidden sm:block" /> toploj atmosferi, pažljivo odabranim vinima<br className="hidden sm:block" /> i ukusima modernog Balkana.</>
          }
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 font-sans sm:w-auto sm:flex-row sm:gap-6">
          <a
            href={`/${lang}/rezervacije`}
            className="group relative inline-flex w-full items-center justify-center overflow-hidden bg-[#B07A4F] px-8 py-4.5 text-xs font-medium uppercase tracking-[0.2em] text-[#E8DCCF] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#97643b] hover:shadow-[0_8px_30px_rgba(176,122,79,0.35)] active:translate-y-0 sm:w-56 md:text-sm"
          >
            <span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
              {isEn ? "Reserve Table" : "Rezerviši sto"}
            </span>
          </a>

          <a
            href={`/${lang}/meni`}
            className="group relative inline-flex w-full items-center justify-center overflow-hidden border border-white/20 bg-black/35 px-8 py-4.5 text-xs font-medium uppercase tracking-[0.2em] text-[#E8DCCF] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black active:translate-y-0 sm:w-56 md:text-sm"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
              {isEn ? "View Menu" : "Pogledaj meni"}
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
