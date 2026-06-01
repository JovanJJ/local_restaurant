"use client";

import Image from "next/image";
import type { MenuItemWithHierarchy, LocalizedString } from "@/lib/action";
import { PageTransition, GentleFloat, StaggeredFadeIn } from "@/app/components/MotionWrappers";

interface FilteredItemsProps {
  items: MenuItemWithHierarchy[];
  subcategoryName: string | LocalizedString;
  lang: string;
}

export default function FilteredItems({
  items,
  subcategoryName,
  lang,
}: FilteredItemsProps) {
  const isEn = lang === "en";

  if (items.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-[#A99380]">
        {isEn ? "No items available in this category." : "Nema dostupnih stavki u ovoj kategoriji."}
      </div>
    );
  }

  const featuredItem = items[0];
  const currentSubName = typeof subcategoryName === "string" 
    ? subcategoryName 
    : (lang === "en" ? subcategoryName.en : subcategoryName.sr);

  return (
    <PageTransition keyStr={currentSubName}>
      <div className="space-y-16">
        {/* Featured Item */}
        <section>
          <div className="mb-8">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B07A4F]">
              {isEn ? "Featured from offer" : "Izdvajamo iz ponude"} • {currentSubName}
            </p>
          </div>
          
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[#B07A4F]/20 shadow-2xl">
              <GentleFloat className="relative w-full h-full">
                <Image
                  src={featuredItem.imageUrl || "/hero-image.jpg"}
                  alt={lang === "en" ? featuredItem.title.en : featuredItem.title.sr}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </GentleFloat>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1713]/60 to-transparent pointer-events-none" />
            </div>
            
            <div className="flex flex-col">
              <h2 className="font-serif text-4xl font-light tracking-wide text-[#E8DCCF] lg:text-5xl xl:text-6xl">
                {lang === "en" ? featuredItem.title.en : featuredItem.title.sr}
              </h2>
              <div className="my-6 h-px w-20 bg-[#B07A4F]" />
              {featuredItem.description && (
                <p className="font-sans text-base font-light leading-relaxed text-[#D6C5B5] lg:text-lg">
                  {lang === "en" ? featuredItem.description.en : featuredItem.description.sr}
                </p>
              )}
              <div className="mt-8 flex items-center gap-4">
                <span className="font-serif text-3xl text-[#B07A4F]">
                  {Number(featuredItem.price).toLocaleString("sr-RS")} RSD
                </span>
                <div className="h-px flex-1 bg-[#B07A4F]/20" />
              </div>
            </div>
          </div>
        </section>

        {/* Full List */}
        <section>
          <div className="mb-10 flex items-center gap-6">
            <h3 className="shrink-0 font-serif text-2xl font-light tracking-widest text-[#E8DCCF] uppercase">
              {isEn ? "Complete List" : "Kompletna Lista"}
            </h3>
            <div className="h-px w-full bg-gradient-to-r from-[#B07A4F]/40 to-transparent" />
          </div>

          <div className="grid gap-x-12 gap-y-8 md:grid-cols-1">
            {items.map((item, index) => (
              <StaggeredFadeIn 
                key={item.id}
                index={index}
                className="group flex flex-col justify-between gap-2 border-b border-[#B07A4F]/10 pb-6 transition-colors hover:border-[#B07A4F]/30 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <h4 className="font-serif text-xl font-medium tracking-wide text-[#F4E7D8] transition-colors group-hover:text-[#B07A4F]">
                      {lang === "en" ? item.title.en : item.title.sr}
                    </h4>
                    <div className="hidden h-px flex-1 border-t border-dotted border-[#B07A4F]/30 group-hover:border-[#B07A4F]/60 sm:block" />
                  </div>
                  {item.description && (
                    <p className="mt-2 font-sans text-sm font-light italic text-[#A99380] transition-colors group-hover:text-[#D6C5B5]">
                      {lang === "en" ? item.description.en : item.description.sr}
                    </p>
                  )}
                </div>
                <div className="whitespace-nowrap font-sans text-sm font-semibold tracking-wider text-[#B07A4F] sm:text-base">
                  {Number(item.price).toLocaleString("sr-RS")} RSD
                </div>
              </StaggeredFadeIn>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
