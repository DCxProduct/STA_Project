export const locales = ["km", "ken"];
export const localePrefix = "km";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });

// import { defineRouting } from "next-intl/routing";

// const routing = defineRouting({ locales, defaultLocale: "km" });
// export const { Link, redirect, usePathname, useRouter } =
//   createNavigation(routing);
