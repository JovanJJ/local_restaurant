"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = [
  { label: { sr: "Početna", en: "Home" }, href: "" },
  { label: { sr: "MENI", en: "MENU" }, href: "meni" },
  { label: { sr: "Naručivanje", en: "Ordering" }, href: "rezervacije" },
  { label: { sr: "O nama", en: "About" }, href: "o-nama" },
];

export default function Footer() {
  const pathname = usePathname();
  const lang = pathname.split("/").filter(Boolean)[0] === "en" ? "en" : "sr";
  const getHref = (path: string) => `/${lang}${path ? `/${path}` : ""}`;

  return (
    <footer
      className="relative overflow-hidden bg-[#18110E] px-5 py-20 text-[#E8DCCF] sm:px-8 lg:px-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(176,122,79,0.14),transparent_38%),linear-gradient(180deg,rgba(31,23,19,0.76)_0%,rgba(24,17,14,1)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B07A4F]/40 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
        <Link href={`/${lang}`} prefetch={true} className="group relative inline-flex">
          <div className="absolute -inset-3 rounded-xl bg-[#B07A4F]/10 opacity-0 blur-lg transition-opacity duration-700 group-hover:opacity-100" />
          <Image
            src="/logo.png"
            alt="Restoran Logo"
            width={280}
            height={96}
            className="relative h-18 w-auto object-contain transition-transform duration-500 group-hover:scale-105 md:h-24"
          />
        </Link>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-x-8 gap-y-3 font-sans text-xs font-light tracking-wider text-[#D6C5B5] sm:flex-row">
            <a href="mailto:jovanjj99@gmail.com" className="transition-colors hover:text-[#B07A4F]">
              jovanjj99@gmail.com
            </a>
            <span className="hidden h-4 w-px bg-[#2D211C] sm:block" />
            <a href="tel:+38135244555" className="transition-colors hover:text-[#B07A4F]">
              +381 616315603
            </a>
            <span className="hidden h-4 w-px bg-[#2D211C] sm:block" />
            <p className="cursor-default">
              Cocetova 58, Jagodina, Srbija
            </p>
          </div>

          <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] sm:gap-x-9 sm:text-xs">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={getHref(link.href)}
                prefetch={true}
                className="transition-colors duration-300 hover:text-[#B07A4F]"
              >
                {link.label[lang]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-[#2D211C] to-transparent" />

        <div className="flex flex-col items-center gap-2">
          <p className="font-serif text-xl font-light tracking-wide text-[#B07A4F] sm:text-2xl">
            Vas Restoran
          </p>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#A99380]">
            © 2026 Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
}
