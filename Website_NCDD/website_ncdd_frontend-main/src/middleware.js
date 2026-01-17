import createMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "../navigation";

export default createMiddleware({
  locales: ["km", "ken"],
  // localePrefix,
  defaultLocale: "km",
  localePrefix: "never",
  localeDetection: true,
  timeZone: "Asia/Phnom_Penh",
});

// only applies this middleware to files in the app directory
export const config = {
  // matcher: ["/((?!api|_next|.*\\..*).*)"],
  matcher: ["/((?!api|_next|_vercel\\..*).*)"],
};
