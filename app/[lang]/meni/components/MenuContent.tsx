"use client";

import { useSearchParams } from "next/navigation";
import type { MenuItemWithHierarchy, MenuNavigationCategory } from "@/lib/action";
import FilteredItems from "./FilteredItems";
import MenuSidebar from "./MenuSidebar";

interface MenuContentProps {
  categories: MenuNavigationCategory[];
  menuItems: MenuItemWithHierarchy[];
  lang: string;
}

export default function MenuContent({
  categories,
  menuItems,
  lang,
}: MenuContentProps) {
  const searchParams = useSearchParams();
  const allSubcategories = categories.flatMap((category) => category.subcategories);
  const selectedSlug = searchParams.get("category") || allSubcategories[0]?.slug;
  const currentSubcategory = allSubcategories.find(
    (subcategory) => subcategory.slug === selectedSlug
  );
  const filteredItems = menuItems.filter(
    (item) => item.subcategorySlug === selectedSlug
  );

  return (
    <>
      <MenuSidebar
        categories={categories}
        selectedSlug={selectedSlug}
        lang={lang}
      />

      <section className="flex-1 lg:pl-8">
        <FilteredItems
          items={filteredItems}
          subcategoryName={currentSubcategory?.name || ""}
          lang={lang}
        />
      </section>
    </>
  );
}
