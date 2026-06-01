import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { SlowZoom } from "@/app/components/MotionWrappers";

export default function MenuHero({ lang }: { lang: string }) {
  const isEn = lang === "en";

  return (
    <section className="relative h-[60vh] min-h-[460px] w-full overflow-hidden bg-[#0A0705] sm:min-h-0">
      {/* Shared Navigation */}
      <Navbar />
      
      {/* Background Image/Overlay with slow zoom */}
      <SlowZoom className="absolute inset-0 z-0">
        <Image
          src="/hero-image.jpg"
          alt="Restaurant Background"
          fill
          priority
          quality={78}
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1713]/70 via-[#1F1713]/50 to-[#1F1713]" />
      </SlowZoom>
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-32 text-center sm:pt-0">
        <div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-tight">
            <span className="text-[#E8DCCF]">{isEn ? "See our" : "Pogledajte"}</span>{" "}
            <span className="italic font-normal text-[#B07A4F]">{isEn ? "offer." : "našu ponudu."}</span>
          </h1>
        </div>
        
        <div className="mt-8">
          <p className="font-sans text-[#E8DCCF] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.32em]">
            {isEn ? "Freshness, quality and taste in every dish." : "Svežina, kvalitet i ukus u svakom jelu."}
          </p>
          <div className="mx-auto mt-10 h-px w-24 bg-[#B07A4F]/60" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#1F1713] to-transparent" />
    </section>
  );
}
