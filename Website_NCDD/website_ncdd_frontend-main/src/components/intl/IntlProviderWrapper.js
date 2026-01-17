"use client";

import { NextIntlClientProvider } from "next-intl";

export default function IntlProviderWrapper({ children, locale, messages }) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Phnom_Penh"
    >
      {children}
    </NextIntlClientProvider>
  );
}
