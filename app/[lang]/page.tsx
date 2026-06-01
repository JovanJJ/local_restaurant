import CTASection from "../components/CTASection";
import ChiefStory from "../components/ChiefStory";
import Hero from "../components/Hero";
import MapsSection from "../components/MapsSection";
import SignatureDishes from "../components/SignatureDishes";
import TestimonialsSection from "../components/TestimonialsSection";
import VisualGallery from "../components/VisualGallery";
import { buildLocalizedMetadata } from "@/lib/metadata";

type HomeProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: HomeProps) {
  const { lang } = await params;

  return buildLocalizedMetadata(lang, "", {
    sr: {
      title: "Početna",
      description:
        "Etno Restoran u Jagodini spaja domaću kuhinju, tradicionalna pića, prijatan ambijent i rezervacije za svaki povod.",
    },
    en: {
      title: "Home",
      description:
        "Etno Restoran in Jagodina brings together homemade Serbian cuisine, traditional drinks, a warm atmosphere and reservations for every occasion.",
    },
  });
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-[#18110E]">
      <Hero lang={lang} />
      <SignatureDishes lang={lang} />
      <VisualGallery lang={lang} />
      <ChiefStory lang={lang} />
      <TestimonialsSection lang={lang} />
      <MapsSection lang={lang} />
      <CTASection lang={lang} />
    </div>
  );
}
