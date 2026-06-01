import { getMenuItems, getMenuNavigation } from "@/lib/action";
import MenuHero from "./components/MenuHero";
import MenuContent from "./components/MenuContent";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { Suspense } from "react";

type MeniProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: MeniProps) {
  const { lang } = await params;

  return buildLocalizedMetadata(lang, "meni", {
    sr: {
      title: "Meni",
      description:
        "Pregledajte meni restorana Etno Konak: predjela, čorbe, roštilj, jela od mesa, vina, rakije, koktele i domaće deserte.",
    },
    en: {
      title: "Menu",
      description:
        "Browse the Etno Konak menu: appetizers, soups, grill, meat dishes, wines, spirits, cocktails and homemade desserts.",
    },
  });
}

export default async function Meni({ params }: MeniProps) {
  const { lang } = await params;
  const [categories, menuItems] = await Promise.all([
    getMenuNavigation(),
    getMenuItems(),
  ]);

  return (
    <main
      className="min-h-screen bg-[#1F1713] text-[#E8DCCF] selection:bg-[#B07A4F] selection:text-[#1F1713]"
    >
      <MenuHero lang={lang} />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-start lg:px-12">
        <Suspense
          fallback={
            <div className="flex min-h-[360px] flex-1 items-center justify-center">
              <div className="h-px w-24 overflow-hidden bg-[#2D211C]">
                <div className="h-full w-1/2 animate-pulse bg-[#B07A4F]" />
              </div>
            </div>
          }
        >
          <MenuContent
            categories={categories}
            menuItems={menuItems}
            lang={lang}
          />
        </Suspense>
      </div>
    </main>
  );
}
