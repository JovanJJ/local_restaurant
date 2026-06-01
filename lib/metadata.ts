import type { Metadata } from "next";

type SupportedLang = "sr" | "en";

type RouteCopy = {
  sr: {
    title: string;
    description: string;
  };
  en: {
    title: string;
    description: string;
  };
};

export function normalizeLang(lang: string): SupportedLang {
  return lang === "en" ? "en" : "sr";
}

export function buildLocalizedMetadata(
  lang: string,
  path: string,
  copy: RouteCopy
): Metadata {
  const locale = normalizeLang(lang);
  const siteName = locale === "en" ? "Ethno Restaurant" : "Etno Restoran";
  const localizedCopy = copy[locale];
  const normalizedPath = path ? `/${path.replace(/^\/+/, "")}` : "";

  return {
    title: localizedCopy.title,
    description: localizedCopy.description,
    alternates: {
      languages: {
        sr: `/sr${normalizedPath}`,
        en: `/en${normalizedPath}`,
      },
    },
    openGraph: {
      title: `${localizedCopy.title} | ${siteName}`,
      description: localizedCopy.description,
      siteName,
      locale: locale === "en" ? "en_US" : "sr_RS",
      type: "website",
      images: [
        {
          url: "/hero-image.jpg",
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${localizedCopy.title} | ${siteName}`,
      description: localizedCopy.description,
      images: ["/hero-image.jpg"],
    },
  };
}
