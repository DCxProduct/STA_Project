"use client";

import { usePathname } from "next/navigation";

export default function RouterWrapper({ children }) {
  const pathname = usePathname();
  const localeKey = pathname.split("/")[1]; // assuming URL is /[locale]/...
  return <div key={localeKey + pathname}>{children}</div>;
}
