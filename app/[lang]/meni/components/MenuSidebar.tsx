"use client";

import type { MenuNavigationCategory } from "@/lib/action";
import Link from "next/link";

interface MenuSidebarProps {
  categories: MenuNavigationCategory[];
  selectedSlug?: string;
  lang: string;
}

export default function MenuSidebar({ categories, selectedSlug, lang }: MenuSidebarProps) {
  const activeSlug = selectedSlug || categories[0]?.subcategories[0]?.slug;
  const isEn = lang === "en";

  return (
    <aside className="w-full lg:sticky lg:top-10 lg:max-h-[calc(100vh-5rem)] lg:w-72 lg:shrink-0 lg:overflow-y-auto">
      <nav
        aria-label="Filter menija"
        className="border border-[#B07A4F]/24 bg-[#18110E]/78 px-6 py-8 shadow-[0_22px_70px_rgba(0,0,0,0.38)] backdrop-blur-sm"
      >
        <div className="mb-8 border-b border-[#B07A4F]/18 pb-6 text-center">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B07A4F]">
            {isEn ? "Our Offer" : "Naša ponuda"}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-light leading-none tracking-wide text-[#E8DCCF]">
            {isEn ? "Menu" : "Jelovnik"}
          </h2>
        </div>

        <div className="space-y-8">
          {categories.map((category) => (
            <section key={category.id} aria-labelledby={`filter-${category.slug}`}>
              <h3
                id={`filter-${category.slug}`}
                className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-[#B07A4F]/70"
              >
                {isEn ? category.name.en : category.name.sr}
              </h3>

              <ul className="mt-4 space-y-1">
                {category.subcategories.map((subcategory) => {
                  const isActive = activeSlug === subcategory.slug;
                  const name = isEn ? subcategory.name.en : subcategory.name.sr;
                  return (
                    <li key={subcategory.id}>
                      <Link
                        href={`/${lang}/meni?category=${subcategory.slug}`}
                        scroll={false}
                        prefetch={true}
                        className={`group flex items-center justify-between gap-4 py-2 font-sans text-sm transition-all duration-300 ${
                          isActive 
                            ? "text-[#F4E7D8] translate-x-1" 
                            : "text-[#D6C5B5] hover:text-[#F4E7D8] hover:translate-x-1"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isActive && <span className="h-1 w-1 rounded-full bg-[#B07A4F]" />}
                          {name}
                        </span>
                        <span className={`min-w-7 rounded-full border px-2 py-0.5 text-center text-[10px] font-semibold transition-colors ${
                          isActive 
                            ? "border-[#B07A4F] bg-[#B07A4F]/10 text-[#E8DCCF]" 
                            : "border-[#B07A4F]/18 text-[#B07A4F] group-hover:border-[#B07A4F]/45 group-hover:text-[#E8DCCF]"
                        }`}>
                          {subcategory.itemCount}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </nav>
    </aside>
  );
}
