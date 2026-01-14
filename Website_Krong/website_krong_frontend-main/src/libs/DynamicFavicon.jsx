// app/layout.tsx (or in a separate component included in layout)
"use client";

import { fetchData } from "@/services/getApiService";
import { useLocale } from "next-intl";
import { useEffect } from "react";

function DynamicFavicon() {
  const locale = useLocale();
  useEffect(() => {
    async function fetchFavicon() {
      const { info } = await fetchData(`/info/${locale}`);
      const { fav_icon } = info;
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = fav_icon;
      // Remove any existing favicons
      const existingIcons = document.querySelectorAll("link[rel~='icon']");
      existingIcons.forEach((el) => el.remove());
      document.head.appendChild(link);
    }
    fetchFavicon();
  }, [locale]);

  return null;
}

export default DynamicFavicon;
