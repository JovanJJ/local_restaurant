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

export default function ChiefStory({ lang }: { lang: string }) {
  const isEn = lang === "en";

  return (
    <section
      className={`${cormorant.variable} ${montserrat.variable} relative w-full overflow-hidden bg-[#0A0705] px-5 py-24 text-[#E8DCCF] sm:px-8 lg:px-16 lg:py-36`}
      aria-label="Chef's story"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(176,122,79,0.08),transparent_45%)] pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-24">
        {/* Left Side: Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B07A4F] sm:text-xs">
              {isEn ? "The Heart of Our Kitchen" : "Srce Naše Kuhinje"}
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-wide text-[#E8DCCF] sm:text-5xl lg:text-6xl">
              {isEn ? "Tradition with a" : "Tradicija sa"}<br />
              <span className="italic text-[#B07A4F]">{isEn ? "Modern Twist." : "Modernim Pečatom."}</span>
            </h2>
            <div className="mt-10 h-px w-24 bg-[#B07A4F]/60 mx-auto lg:mx-0" />
          </motion.div>

          <div className="mt-12 space-y-8 font-sans text-base font-light leading-relaxed tracking-wide text-stone-300 sm:text-lg sm:leading-loose">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {isEn 
                ? "Every dish in Etno Konak is a tribute to our roots. Our head chef combines old family recipes with modern culinary techniques, creating flavors that bridge generations."
                : "Svako jelo u Etno Konaku je omaž našim korenima. Naš glavni kuvar kombinuje stare porodične recepte sa modernim kulinarskim tehnikama, kreirajući ukuse koji spajaju generacije."
              }
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {isEn
                ? "We believe in the power of local ingredients. From forest mushrooms to artisanal cheeses, every element is selected for its soul and quality."
                : "Verujemo u moć lokalnih sastojaka. Od šumskih pečuraka do zanatskih sireva, svaki element je biran zbog svoje duše i kvaliteta."
              }
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="mt-16 flex items-center justify-center gap-6 lg:justify-start"
          >
            <div className="h-px w-12 bg-[#B07A4F]/40" />
            <span className="font-serif text-2xl italic text-[#B07A4F]">
              Jovan J., {isEn ? "Founder" : "Osnivač"}
            </span>
          </motion.div>
        </div>

        {/* Right Side: Visual Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full max-w-md lg:mt-12"
        >
          <div className="absolute -inset-4 rounded-2xl border border-[#B07A4F]/20 sm:-inset-6" />
          <div className="relative h-full w-full overflow-hidden rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <img
              src="/chief.png"
              alt="Our Chef"
              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705]/80 via-transparent to-transparent" />
          </div>
          
          {/* Floating Luxury Accent */}
          <div className="absolute -bottom-8 -right-8 hidden h-32 w-32 items-center justify-center rounded-full bg-[#B07A4F] text-center shadow-2xl sm:flex">
             <div className="p-4">
                <p className="font-serif text-sm font-medium leading-tight text-[#E8DCCF]">
                  Est.<br />1999
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
