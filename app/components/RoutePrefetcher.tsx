"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const routes = ["", "meni", "rezervacije", "o-nama"];

export default function RoutePrefetcher() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname.split("/").filter(Boolean)[0] === "en" ? "en" : "sr";

  useEffect(() => {
    for (const route of routes) {
      router.prefetch(`/${lang}${route ? `/${route}` : ""}`);
    }
  }, [lang, router]);

  return null;
}
