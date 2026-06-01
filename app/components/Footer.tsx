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
              Čočetova 58, Jagodina, Srbija
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

          {/* Social Icons inside Footer */}
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-[#B07A4F]/15 bg-[#1F1713]/80 text-[#D6C5B5] transition-all duration-300 hover:border-[#B07A4F]/50 hover:text-[#B07A4F] hover:-translate-y-0.5 active:translate-y-0 shadow-md"
              aria-label="Facebook"
            >
              <svg className="h-4.5 w-4.5 fill-current transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-[#B07A4F]/15 bg-[#1F1713]/80 text-[#D6C5B5] transition-all duration-300 hover:border-[#B07A4F]/50 hover:text-[#B07A4F] hover:-translate-y-0.5 active:translate-y-0 shadow-md"
              aria-label="Instagram"
            >
              <svg className="h-4.5 w-4.5 fill-current transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
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
