import Navbar from "@/app/components/Navbar";
import { SlowZoom, FadeInUp } from "@/app/components/MotionWrappers";
import Image from "next/image";
import EmberSparks from "@/app/components/EmberSparks";
import { buildLocalizedMetadata } from "@/lib/metadata";

type RezervacijeProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: RezervacijeProps) {
  const { lang } = await params;

  return buildLocalizedMetadata(lang, "rezervacije", {
    sr: {
      title: "Kontakt i rezervacije",
      description:
        "Rezervišite sto ili poručite hranu iz restorana Etno Restoran u Jagodini. Pronađite telefon, radno vreme i adresu.",
    },
    en: {
      title: "Contact and Reservations",
      description:
        "Book a table or order food from Etno Restoran in Jagodina. Find the phone number, opening hours and address.",
    },
  });
}

export default async function Rezervacije({ params }: RezervacijeProps) {
  const { lang } = await params;
  const isEn = lang === "en";

  return (
    <main
      className="min-h-screen bg-[#0A0705] text-[#E8DCCF] selection:bg-[#B07A4F] selection:text-[#1F1713]"
    >
      <section className="relative h-[60vh] w-full overflow-hidden bg-[#0A0705]">
        <Navbar />

        <SlowZoom className="absolute inset-0 z-0">
          <Image
            src="/etnokonak.jpg"
            alt="Ambijent"
            fill
            priority
            quality={92}
            className="object-cover opacity-60"
          />
        </SlowZoom>

        <div className="absolute inset-0 bg-[#0C0806]/65 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,122,79,0.18)_0%,rgba(10,7,5,0.78)_75%,rgba(5,3,2,0.92)_100%)] z-15" />
        <div className="absolute inset-0 bg-[inset_0_0_100px_rgba(0,0,0,0.85)] z-16 pointer-events-none" />

        <EmberSparks />

        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
          <FadeInUp delay={0.2}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-tight">
              <span className="text-[#E8DCCF]">{isEn ? "Contact &" : "Kontakt &"}</span>{" "}
              <span className="italic font-normal text-[#B07A4F]">{isEn ? "Reservations." : "Rezervacije."}</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.4} className="mt-6">
            <p className="font-sans text-[#E8DCCF] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.32em]">
              {isEn ? "Secure your spot on time" : "Obezbedite vaše mesto na vreme"}
            </p>
          </FadeInUp>
        </div>

        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#0A0705] to-transparent z-15" />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(176,122,79,0.08),transparent_50%)] pointer-events-none" />
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Ordering Card */}
          <FadeInUp delay={0.2} className="group relative overflow-hidden border border-[#B07A4F]/20 bg-[#18110E]/80 p-8 shadow-2xl backdrop-blur-sm transition-all hover:border-[#B07A4F]/40 lg:p-12">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#B07A4F]/5 blur-3xl transition-all group-hover:bg-[#B07A4F]/10" />

            <h2 className="font-serif text-3xl font-light tracking-wide text-[#F4E7D8] lg:text-4xl">
              {isEn ? "Order Food" : "Poručite hranu"}
            </h2>
            <div className="my-6 h-px w-16 bg-[#B07A4F]" />
            <p className="font-sans text-base font-light leading-relaxed text-[#D6C5B5] lg:text-lg">
              {isEn
                ? "Order your favorite dishes quickly and easily by phone. Enjoy authentic flavors in the comfort of your home."
                : "Naručite vaša omiljena jela brzo i jednostavno telefonom. Uživajte u autentičnim ukusima u udobnosti vašeg doma."
              }
            </p>

            <div className="mt-10">
              <a
                href="tel:+38135244555"
                className="inline-flex items-center gap-4 font-sans text-lg font-semibold tracking-wider text-[#E8DCCF] transition-colors hover:text-[#B07A4F]"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#E8DCCF] transition-colors group-hover:fill-[#B07A4F]" xmlns="http://www.w3.org/2000/svg"><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.8-3.9-9-8.7-9v2c3.7 0 6.7 3.1 6.7 7z" /></svg>
                {isEn ? "Ordering" : "Poručivanje"}: +381 35 111 222
              </a>
            </div>
          </FadeInUp>

          {/* Reservation Card */}
          <FadeInUp delay={0.4} className="group relative overflow-hidden border border-[#B07A4F]/20 bg-[#18110E]/80 p-8 shadow-2xl backdrop-blur-sm transition-all hover:border-[#B07A4F]/40 lg:p-12">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#B07A4F]/5 blur-3xl transition-all group-hover:bg-[#B07A4F]/10" />

            <h2 className="font-serif text-3xl font-light tracking-wide text-[#F4E7D8] lg:text-4xl">
              {isEn ? "Book a Table" : "Rezervišite sto"}
            </h2>
            <div className="my-6 h-px w-16 bg-[#B07A4F]" />
            <p className="font-sans text-base font-light leading-relaxed text-[#D6C5B5] lg:text-lg">
              {isEn
                ? "Reserve your table in advance and secure a spot without waiting. Ideal for business lunches or family celebrations."
                : "Rezervišite svoj sto unapred i obezbedite mesto bez čekanja. Idealno za poslovne ručkove ili porodične proslave."
              }
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <a
                href="tel:+38135244555"
                className="inline-flex items-center gap-4 font-sans text-lg font-semibold tracking-wider text-[#E8DCCF] transition-colors hover:text-[#B07A4F]"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#E8DCCF] transition-colors group-hover:fill-[#B07A4F]" xmlns="http://www.w3.org/2000/svg"><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.8-3.9-9-8.7-9v2c3.7 0 6.7 3.1 6.7 7z" /></svg>
                {isEn ? "Call us" : "Pozovite nas"}: +381 35 111 222
              </a>
            </div>
          </FadeInUp>
        </div>

        {/* Extra Info */}
        <div className="mt-20 grid gap-12 border-t border-[#B07A4F]/10 pt-16 md:grid-cols-2">
          <FadeInUp delay={0.6}>
            <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-[#B07A4F]">
              {isEn ? "Opening Hours" : "Radno vreme"}
            </h3>
            <div className="mt-6 space-y-4 font-sans text-base font-light text-[#D6C5B5]">
              <div className="flex justify-between border-b border-[#B07A4F]/10 pb-2">
                <span>{isEn ? "Every day" : "Svakim danom"}</span>
                <span className="text-[#E8DCCF]">09:00 - 00:00</span>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.8}>
            <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-[#B07A4F]">
              {isEn ? "Where to find us" : "Gde se nalazimo"}
            </h3>
            <p className="mt-6 font-serif text-2xl font-light text-[#E8DCCF]">
              Čočetova 58, Jagodina, Srbija
            </p>
            <p className="mt-2 font-sans text-sm font-light text-[#A99380]">
              {isEn ? "In the heart of Jagodina, near the city park." : "U srcu Jagodine, nadomak gradskog parka."}
            </p>
            <div className="mt-8">
              <a
                href="https://maps.app.goo.gl/YQMsJgTQnNRLK41m8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex border-b border-[#B07A4F] pb-1 font-sans text-xs font-semibold uppercase tracking-widest text-[#B07A4F] transition-all hover:text-[#E8DCCF] hover:border-[#E8DCCF]"
              >
                {isEn ? "Show on map" : "Prikaži na mapi"}
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </main>
  );
}
