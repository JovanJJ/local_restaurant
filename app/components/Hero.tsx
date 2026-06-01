import Navbar from "@/app/components/Navbar";
import { SlowZoom } from "@/app/components/MotionWrappers";
import EmberSparks from "@/app/components/EmberSparks";
import Image from "next/image";
import Link from "next/link";

export default function Hero({ lang }: { lang: string }) {
    const isEn = lang === "en";

    return (
        <section
            className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-[#18110E] sm:min-h-[600px]"
            aria-label="Restaurant Hero Banner"
        >
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />

            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full select-none pointer-events-none overflow-hidden z-0">
                <SlowZoom className="w-full h-full">
                    <Image
                        src="/hero-image.jpg"
                        alt="Hero"
                        fill
                        priority
                        quality={78}
                        sizes="100vw"
                        className="object-cover select-none pointer-events-none"
                    />
                </SlowZoom>
            </div>

            {/* Dark Warm Overlay System */}
            <div className="absolute inset-0 bg-[#0C0806]/65 z-10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,122,79,0.18)_0%,rgba(24,17,14,0.78)_75%,rgba(14,9,7,0.92)_100%)] z-15" />
            <div className="absolute inset-0 bg-[inset_0_0_100px_rgba(0,0,0,0.85)] z-16 pointer-events-none" />
            <EmberSparks />

            {/* Shared Navigation */}
            <Navbar />

            {/* Center Content Container */}
            <div className="relative z-25 mt-20 flex max-w-4xl select-text flex-col items-center justify-center px-6 text-center sm:mt-0">
                <div className="flex items-center gap-3 mb-5">
                    <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#B07A4F]" />
                    <span className="font-sans text-[#B07A4F] uppercase tracking-[0.3em] text-xs font-semibold">
                        {isEn ? "Gourmet paradise for all senses" : "Gurmanski raj za sva čula"}
                    </span>
                    <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#B07A4F]" />
                </div>

                <div>
                    <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extralight text-[#E8DCCF] leading-[1.1] mb-6 tracking-wide">
                        {isEn ? "Taste the passion." : "Okusite strast."}<br className="sm:hidden" />
                        <span className="italic font-light text-[#B07A4F] ml-1 sm:ml-2">{isEn ? "Experience tradition." : "Doživite tradiciju."}</span>
                    </h1>
                </div>

                <div>
                    <p className="font-sans text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed mb-12 tracking-wide">
                        {isEn 
                          ? "Welcome to a world of superior gastronomy where every dish tells a unique story, created from carefully selected local ingredients and served with pure love."
                          : "Dobrodošli u svet vrhunske gastronomije gde svako jelo priča jedinstvenu priču, kreiranu od pažljivo biranih lokalnih sastojaka i posluženu sa čistom ljubavlju."
                        }
                    </p>
                </div>

                <div className="font-sans flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full sm:w-auto">
                    <Link
                        href={`/${lang}/rezervacije`}
                        prefetch={true}
                        className="group relative inline-flex items-center justify-center w-full sm:w-56 px-8 py-4.5 bg-[#B07A4F] text-[#E8DCCF] text-xs md:text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 ease-out hover:bg-[#97643b] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_8px_30px_rgba(176,122,79,0.35)] overflow-hidden"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        <span className="relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
                            {isEn ? "Reserve" : "Rezerviši"}
                        </span>
                    </Link>

                    <Link
                        href={`/${lang}/meni`}
                        prefetch={true}
                        className="group relative inline-flex items-center justify-center w-full sm:w-56 px-8 py-4.5 bg-black/35 backdrop-blur-md text-[#E8DCCF] text-xs md:text-sm font-medium uppercase tracking-[0.2em] rounded-none border border-white/20 transition-all duration-300 ease-out hover:bg-white hover:text-black hover:border-white hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                    >
                        <span className="relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
                            {isEn ? "Explore menu" : "Istraži meni"}
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
