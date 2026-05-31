import { getMenuItems, getMenuNavigation } from "@/lib/action";
import MenuSidebar from "./components/MenuSidebar";
import MenuHero from "./components/MenuHero";
import FilteredItems from "./components/FilteredItems";
import { buildLocalizedMetadata, normalizeLang } from "@/lib/metadata";

type MeniProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params, searchParams }: MeniProps) {
  const [{ lang }, resolvedParams, categories] = await Promise.all([
    params,
    searchParams,
    getMenuNavigation(),
  ]);
  const locale = normalizeLang(lang);
  const selectedSubcategory = categories
    .flatMap((category) => category.subcategories)
    .find((subcategory) => subcategory.slug === resolvedParams.category);
  const selectedName = selectedSubcategory?.name[locale];

  return buildLocalizedMetadata(lang, "meni", {
    sr: {
      title: selectedName ? `Meni - ${selectedName}` : "Meni",
      description:
        "Pregledajte meni restorana Etno Konak: predjela, čorbe, roštilj, jela od mesa, vina, rakije, koktele i domaće deserte.",
    },
    en: {
      title: selectedName ? `Menu - ${selectedName}` : "Menu",
      description:
        "Browse the Etno Konak menu: appetizers, soups, grill, meat dishes, wines, spirits, cocktails and homemade desserts.",
    },
  });
}

export default async function Meni({ params, searchParams }: MeniProps) {
  const { lang } = await params;
  const resolvedParams = await searchParams;
  const [categories, menuItems] = await Promise.all([
    getMenuNavigation(),
    getMenuItems(),
  ]);

  // Determine selected subcategory
  const allSubcategories = categories.flatMap(c => c.subcategories);
  const selectedSlug = resolvedParams.category || allSubcategories[0]?.slug;
  
  const currentSubcategory = allSubcategories.find(s => s.slug === selectedSlug);
  const filteredItems = menuItems.filter(
    (item) => item.subcategorySlug === selectedSlug
  );

  return (
    <main
      className="min-h-screen bg-[#1F1713] text-[#E8DCCF] selection:bg-[#B07A4F] selection:text-[#1F1713]"
    >
      <MenuHero lang={lang} />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-start lg:px-12">
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
      </div>
    </main>
  );
}
