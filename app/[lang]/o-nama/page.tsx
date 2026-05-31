import Navbar from "@/app/components/Navbar";
import { SlowZoom, FadeInUp } from "@/app/components/MotionWrappers";
import Image from "next/image";
import EmberSparks from "@/app/components/EmberSparks";
import { buildLocalizedMetadata } from "@/lib/metadata";

type ONamaProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: ONamaProps) {
  const { lang } = await params;

  return buildLocalizedMetadata(lang, "o-nama", {
    sr: {
      title: "O nama",
      description:
        "Upoznajte priču restorana Etno Konak, mesto za domaće ukuse, pažljivo birane sastojke i trenutke koji se pamte.",
    },
    en: {
      title: "About Us",
      description:
        "Discover the story of Etno Konak, a restaurant built around homemade flavors, carefully chosen ingredients and memorable moments.",
    },
  });
}

export default async function ONama({ params }: ONamaProps) {
  const { lang } = await params;
  const isEn = lang === "en";

  return (
    <main
      className="min-h-screen bg-[#0A0705] text-[#E8DCCF] selection:bg-[#B07A4F] selection:text-[#1F1713]"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden bg-[#0A0705]">
        <Navbar />
        
        <SlowZoom className="absolute inset-0 z-0">
          <Image
            src="/etnokonak2.png"
            alt="Restoran Ambijent"
            fill
            priority
            quality={92}
            className="object-cover opacity-60"
          />
        </SlowZoom>

        {/* Overlay System */}
        <div className="absolute inset-0 bg-[#0C0806]/65 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,122,79,0.18)_0%,rgba(10,7,5,0.78)_75%,rgba(5,3,2,0.92)_100%)] z-15" />
        <div className="absolute inset-0 bg-[inset_0_0_100px_rgba(0,0,0,0.85)] z-16 pointer-events-none" />
        
        <EmberSparks />

        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
          <FadeInUp delay={0.2}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-tight">
              <span className="text-[#E8DCCF]">{isEn ? "Our" : "Naša"}</span>{" "}
              <span className="italic font-normal text-[#B07A4F]">{isEn ? "Story." : "Priča."}</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.4} className="mt-8">
            <div className="flex flex-col items-center">
              <p className="font-sans text-[#E8DCCF] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.32em]">
                {isEn ? "About Us" : "O nama"}
              </p>
              <div className="mt-4 h-px w-12 bg-[#B07A4F]" />
            </div>
          </FadeInUp>
        </div>

        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#0A0705] to-transparent z-15" />
      </section>

      {/* Content Section */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(176,122,79,0.05),transparent_60%)] pointer-events-none" />

        <div className="space-y-16">
          <FadeInUp delay={0.2}>
            <h2 className="font-serif text-3xl font-light leading-snug tracking-wide text-[#F4E7D8] sm:text-4xl md:text-5xl">
              {isEn ? "We believe that food is not just a meal —" : "Verujemo da hrana nije samo obrok —"} <br className="hidden sm:block" />
              <span className="italic text-[#B07A4F]">{isEn ? "but a moment to remember." : "već trenutak koji se pamti."}</span>
            </h2>
          </FadeInUp>

          <div className="mx-auto h-px w-24 bg-[#B07A4F]/40" />

          <div className="space-y-10 font-sans text-base font-light leading-[2] tracking-wide text-[#D6C5B5] sm:text-lg sm:leading-[2.2]">
            <FadeInUp delay={0.4}>
              <p>
                {isEn 
                  ? "Our restaurant was born from a passion for flavors that bring people together, stories shared at the table, and moments that stay in memory much longer than the last bite."
                  : "Naš restoran je nastao iz strasti prema ukusima koji okupljaju ljude, pričama koje se dele za stolom i trenucima koji ostaju u sećanju mnogo duže od poslednjeg zalogaja."
                }
              </p>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <p>
                {isEn
                  ? "Every dish that comes out of our kitchen carries carefully selected ingredients, dedication, and love for details. We make no compromises when it comes to quality — because we know our guests feel it in every bite."
                  : "Svako jelo koje izlazi iz naše kuhinje nosi pažljivo birane sastojke, posvećenost i ljubav prema detaljima. Ne pravimo kompromis kada je u pitanju kvalitet — jer znamo da ga naši gosti osećaju u svakom zalogaju."
                }
              </p>
            </FadeInUp>

            <FadeInUp delay={0.6}>
              <p>
                {isEn
                  ? "Here you come to relax, to enjoy, and to forget the everyday life for a moment. Whether you come with family, friends, or alone — we want you to always return with a smile."
                  : "Ovde dolazite da se opustite, da uživate i da na trenutak zaboravite na svakodnevnicu. Bilo da dolazite sa porodicom, prijateljima ili sami — želimo da se uvek vratite sa osmehom."
                }
              </p>
            </FadeInUp>

            <FadeInUp delay={0.7}>
              <p className="font-serif text-2xl italic text-[#B07A4F] sm:text-3xl">
                {isEn ? "Because for us, every guest is part of our story." : "Jer za nas, svaki gost je deo naše priče."}
              </p>
            </FadeInUp>
          </div>
        </div>

        <FadeInUp delay={0.8} className="mt-20">
          <div className="relative mx-auto aspect-[21/9] w-full max-w-3xl overflow-hidden rounded-sm border border-[#B07A4F]/20 shadow-2xl">
            <Image
              src="/etnokonak3.png"
              alt="Detail"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705] via-transparent to-transparent" />
          </div>
        </FadeInUp>
      </section>
    </main>
  );
}
