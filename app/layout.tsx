import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import RoutePrefetcher from "./components/RoutePrefetcher";
import { cormorant, montserrat } from "./fonts";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Etno Restoran",
    template: "%s | Etno Restoran",
  },
  description:
    "Etno Restoran is an authentic Serbian restaurant in Jagodina with traditional food, local drinks and warm hospitality.",
  applicationName: "Etno Restoran",
  keywords: [
    "Etno Restoran",
    "Serbian restaurant",
    "Jagodina restaurant",
    "traditional Serbian food",
    "restaurant reservations",
  ],
  authors: [{ name: "Etno Restoran" }],
  creator: "Etno Restoran",
  publisher: "Etno Restoran",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Etno Restoran",
    description:
      "Authentic Serbian restaurant in Jagodina with traditional dishes, rakija, desserts and reservations.",
    siteName: "Etno Restoran",
    type: "website",
    locale: "sr_RS",
    images: [
      {
        url: "/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Etno Restoran",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Etno Restoran",
    description:
      "Authentic Serbian restaurant in Jagodina with traditional dishes, rakija, desserts and reservations.",
    images: ["/hero-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="h-full antialiased"
    >
      <body className={`${cormorant.variable} ${montserrat.variable} min-h-full flex flex-col bg-[#18110E]`}>
        <RoutePrefetcher />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
