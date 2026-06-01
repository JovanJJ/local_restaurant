"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SlowZoom } from "@/app/components/MotionWrappers";

export default function SignatureDishes({ lang }: { lang: string }) {
  const isEn = lang === "en";

  return (
    <section
      className="w-full min-h-screen lg:h-screen lg:min-h-[750px] flex flex-col lg:flex-row bg-[#18110E] overflow-hidden relative"
      aria-label="Signature Dishes Showcase"
    >
      {/* Food Images Collage */}
      <div className="w-full lg:w-[60%] h-[550px] sm:h-[650px] lg:h-full bg-[#221813] p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#3A2A23]/60 z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#B07A4F]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-2xl h-full flex flex-col justify-center gap-6 sm:gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative aspect-[16/9] md:aspect-[16/8] lg:h-[48%] lg:aspect-auto rounded-xl overflow-hidden shadow-2xl border border-white/5"
          >
            <SlowZoom className="w-full h-full">
              <Image
                src="/cevapi.png"
                alt="Cevapi"
                fill
                className="object-cover"
              />
            </SlowZoom>
            {/* Elegant dark-warm linear gradient overlay under the text for legibility on light texture images */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#18110E]/85 via-[#18110E]/30 to-transparent pointer-events-none z-10" />

            <div className="absolute bottom-6 left-6 text-[#E8DCCF] z-20">
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#B07A4F] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {isEn ? "MAIN DISH" : "GLAVNO JELO"}
              </span>
              <h3 className="font-serif text-2xl font-light tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {isEn ? "Homemade Cevapi" : "Domaći Ćevapi na Somunu"}
              </h3>
            </div>
          </motion.div>

          <div className="w-full relative h-[220px] sm:h-[300px] lg:h-[40%] flex justify-between items-end">
            <motion.div
              animate={{ y: [-6, 6] }}
              transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
              className="absolute left-[6%] bottom-2 w-[28%] aspect-[2/3] lg:h-[95%] lg:aspect-auto rounded-xl shadow-2xl overflow-hidden"
            >
              <Image src="/wine.png" alt="Wine" fill className="object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="absolute right-[4%] top-0 w-[58%] aspect-[4/3] lg:h-[95%] lg:aspect-auto rounded-xl shadow-2xl overflow-hidden"
            >
              <SlowZoom className="w-full h-full">
                <Image src="/baklave.png" alt="Baklava" fill className="object-cover" />
              </SlowZoom>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Info Container */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#18110E] text-[#E8DCCF] z-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="max-w-md w-full flex flex-col justify-center text-center items-center py-14 px-10 rounded-2xl bg-[#1A1310] border border-[#2D211C] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#B07A4F] to-transparent shadow-[0_1px_10px_#B07A4F]" />

          <span className="font-sans text-[#B07A4F] uppercase tracking-[0.3em] text-[10px] font-semibold mb-4">
            {isEn ? "RECOMMENDED MENU" : "PREPORUČENI MENI"}
          </span>

          <h2 className="font-serif text-4xl font-light tracking-wide text-[#E8DCCF] leading-tight mb-2">
            {isEn ? "House Specialty" : "Specijalitet Kuće"}
          </h2>

          <div className="text-[#B07A4F] text-sm tracking-[0.25em] font-light mb-8 select-none">
            ──────────────
          </div>

          <div className="font-sans text-[#E8DCCF] text-sm leading-[2] font-light space-y-6 tracking-wide max-w-[340px]">
            <p>
              {isEn
                ? "Hand-prepared grilled cevapi, served with homemade flatbread, fresh onions, roasted peppers and creamy kajmak."
                : "Ručno pripremljeni ćevapi sa roštilja, posluženi uz domaći somun, svež luk, pečenu papriku i kremasti kajmak. "
              }
            </p>
            <p>
              {isEn
                ? "With a carefully selected Vranac, which perfectly accompanies the rich flavors of grilled dishes."
                : "Uz pažljivo odabrani Vranac, koji savršeno prati bogate ukuse jela sa roštilja."
              }
            </p>
            <p>
              {isEn
                ? "For the perfect end to the meal, we serve traditional baklava prepared according to a homemade recipe."
                : "Za savršen završetak obroka, poslužujemo tradicionalnu baklavu pripremljenu po domaćoj recepturi."
              }
            </p>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2D211C] to-transparent my-8" />

          <div className="flex flex-col items-center gap-1.5 w-full">
            <span className="font-sans text-[9px] text-stone-500 uppercase tracking-widest">
              {isEn ? "Full menu with drink" : "Kompletan meni sa pićem"}
            </span>
            <span className="font-serif text-4xl font-light text-[#B07A4F] tracking-widest mt-1">
              2750 din
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
