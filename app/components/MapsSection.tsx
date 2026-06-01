"use client";

import { motion } from "framer-motion";

export default function MapsSection({ lang }: { lang: string }) {
  const isEn = lang === "en";
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.920761544066!2d21.26460721207793!3d43.9671913319452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4756c4050037b387%3A0x8cf50cdab21f4199!2z0JDQutCy0LAg0J_QsNGA0Log0IjQsNCz0L7QtNC40L3QsA!5e1!3m2!1ssr!2srs!4v1780314044364!5m2!1ssr!2srs";

  return (
    <section
      className="relative w-full overflow-hidden bg-[#18110E] px-5 py-20 text-[#E8DCCF] sm:px-8 lg:px-16 lg:py-28"
      aria-label="Restaurant location map"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,17,14,0.34)_0%,rgba(31,23,19,0)_36%,rgba(24,17,14,0.44)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B07A4F]/35 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-9">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-center"
        >
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B07A4F] sm:text-xs">
            {isEn ? "Visit Us" : "Posetite nas"}
          </span>
          <h2 className="mt-5 font-serif text-4xl font-light text-[#E8DCCF] leading-tight tracking-wide sm:text-5xl lg:text-6xl">
            Čočetova 58, Jagodina
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-sm font-light leading-8 tracking-wide text-stone-300 sm:text-base">
            {isEn ? "Open every day from 9:00 to 00:00." : "Otvoreno svakog dana od 9:00 do 00:00."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 46 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden rounded-2xl border border-[#B07A4F]/30 bg-[#18110E] p-2 shadow-[0_28px_90px_rgba(0,0,0,0.58)] sm:p-3"
        >
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(176,122,79,0.18),transparent_42%)] pointer-events-none" />
          <div className="relative h-[360px] overflow-hidden rounded-xl border border-white/8 sm:h-[430px] lg:h-[520px]">
            <iframe
              src={mapUrl}
              title="Location"
              className="h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        <motion.a
          href="https://maps.app.goo.gl/YQMsJgTQnNRLK41m8"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="group relative inline-flex w-full items-center justify-center overflow-hidden bg-[#B07A4F] px-8 py-4.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#E8DCCF] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#97643b] hover:shadow-[0_8px_30px_rgba(176,122,79,0.35)] active:translate-y-0 sm:w-56 md:text-sm"
        >
          <span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
            {isEn ? "View Map" : "Pogledaj mapu"}
          </span>
        </motion.a>
      </div>
    </section>
  );
}
