"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderEntrance } from "./MotionWrappers";

const navLinks = [
  { label: { sr: "Početna", en: "Home" }, href: "" },
  { label: { sr: "MENI", en: "MENU" }, href: "meni" },
  { label: { sr: "Naručivanje", en: "Ordering" }, href: "rezervacije" },
  { label: { sr: "O nama", en: "About" }, href: "o-nama" },
];

export default function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] === "en" ? "en" : "sr";
  const currentPath = segments.slice(1).join("/");

  const getHref = (path: string) => `/${lang}/${path}`;

  return (
    <div className="absolute left-0 right-0 top-4 z-30 flex justify-center px-4 pointer-events-none md:top-8 md:px-5">
      <HeaderEntrance className="w-full max-w-6xl flex flex-col items-center gap-3 pointer-events-auto sm:gap-5 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-5 sm:gap-8">
          <Link href={`/${lang}`} className="relative group transition-all duration-300">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 to-amber-700/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <Image
              src="/logo.png"
              alt="Restoran Logo"
              width={200}
              height={68}
              sizes="(max-width: 767px) 148px, 200px"
              className="relative h-10 w-auto object-contain transition-all duration-500 ease-out group-hover:scale-105 md:h-16"
            />
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-3 border-l border-white/10 pl-5 sm:pl-8">
            <Link 
              href={`/sr/${currentPath}`}
              className={`transition-all duration-300 hover:scale-110 ${lang === 'sr' ? 'grayscale-0 ring-1 ring-[#B07A4F] ring-offset-2 ring-offset-[#0A0705] rounded-full' : 'grayscale opacity-50 hover:opacity-100 hover:grayscale-0'}`}
            >
              <Image src="/serbia-flag.svg" alt="Serbian" width={24} height={24} className="h-6 w-6 rounded-full object-cover" />
            </Link>
            <Link 
              href={`/en/${currentPath}`}
              className={`transition-all duration-300 hover:scale-110 ${lang === 'en' ? 'grayscale-0 ring-1 ring-[#B07A4F] ring-offset-2 ring-offset-[#0A0705] rounded-full' : 'grayscale opacity-50 hover:opacity-100 hover:grayscale-0'}`}
            >
              <Image src="/uk-flag.svg" alt="English" width={24} height={24} className="h-6 w-6 rounded-full object-cover" />
            </Link>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-[#E8DCCF] sm:gap-x-8 sm:gap-y-3 sm:text-xs sm:tracking-[0.22em]">
          {navLinks.map((link) => {
            const href = getHref(link.href);
            const isActive = pathname === href || (link.href === "" && pathname === `/${lang}`);
            return (
              <Link
                key={link.label.sr}
                href={href}
                className={`transition-all duration-300 hover:text-[#B07A4F] ${
                  isActive 
                    ? "text-[#B07A4F] scale-110" 
                    : "text-[#E8DCCF] hover:scale-105"
                }`}
              >
                {lang === 'en' ? link.label.en : link.label.sr}
              </Link>
            );
          })}
        </nav>
      </HeaderEntrance>
    </div>
  );
}
