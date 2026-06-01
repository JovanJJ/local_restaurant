import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Etno Restoran",
  },
  description:
    "Etno Restoran is an authentic Serbian restaurant in Jagodina with traditional food, local drinks and warm hospitality.",
};

export default function RootPage() {
  redirect("/sr");
}
