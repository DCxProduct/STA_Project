import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["km", "ken"];
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./app/lang/${locale}.json`)).default,
  };
});
