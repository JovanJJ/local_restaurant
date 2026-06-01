import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import { cormorant, montserrat } from "./fonts";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Etno Konak",
    template: "%s | Etno Konak",
  },
  description:
    "Etno Konak is an authentic Serbian restaurant in Jagodina with traditional food, local drinks and warm hospitality.",
  applicationName: "Etno Konak",
  keywords: [
    "Etno Konak",
    "Serbian restaurant",
    "Jagodina restaurant",
    "traditional Serbian food",
    "restaurant reservations",
  ],
  authors: [{ name: "Etno Konak" }],
  creator: "Etno Konak",
  publisher: "Etno Konak",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Etno Konak",
    description:
      "Authentic Serbian restaurant in Jagodina with traditional dishes, rakija, desserts and reservations.",
    siteName: "Etno Konak",
    type: "website",
    locale: "sr_RS",
    images: [
      {
        url: "/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Etno Konak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Etno Konak",
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
      <body className={`${cormorant.variable} ${montserrat.variable} min-h-full flex flex-col bg-[#0A0705]`}>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
