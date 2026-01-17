import "@/app/globals.css";
import "@/assets/css/icofont.min.css";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "@/components/header/Header";
import NavbarTop from "@/components/header/NavbarTop";
import Scrollup from "@/components/shared/buttons/ScrollUp";
import Footer from "@/components/footer/Footer";
import ProgressBar from "@/components/progressbar/ProgressBar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fetchData } from "@/services/getApiService";
import { ToastContainer } from "react-toastify";
import CopyRight from "@/components/copyright/CopyRight";
import IntlProviderWrapper from "@/components/intl/IntlProviderWrapper";
import { notFound } from "next/navigation";
import { locales } from "../../../navigation";
import { getMessages } from "next-intl/server"; // server-safe
import ImportantButton from "@/components/important_button /ImportantButton";

// Server-side layout data
async function layoutServerData(locale) {
  const [infoRes, cardsRes] = await Promise.all([
    fetchData(`/info/${locale}`, {}, "revalidate"),
    fetchData(`/home/${locale}`, {}, "revalidate"),
  ]);

  return {
    info: infoRes?.info || {},
    cards: cardsRes?.cards || {},
  };
}

// Metadata generation
export async function generateMetadata({ params }) {
  const locale = params?.locale || "km";
  const { info } = await layoutServerData(locale);

  return {
    title: info.site_title,
    description: info.site_desc,
    keywords: info.site_keywords,
    icons: {
      icon: info.fav_icon,
    },
  };
}

// ✅ Make RootLayout async
export default async function RootLayout({ children, params }) {
  const { locale } = params;
  if (!locales.includes(locale)) {
    notFound();
  }

  // Use only server-safe functions here
  const messages = await getMessages();
  const { cards } = await layoutServerData(locale);
  const { cards_bottom } = cards;
  const importnatInfo = cards_bottom.topics;

  return (
    <html lang={locale}>
      <body className={`relative z-0 khmer-text-batr:${locale} bg-bodyBg2`}>
        <IntlProviderWrapper locale={locale} messages={messages}>
          <NavbarTop />
          <Header />
          <ToastContainer />
          <div>
            <ImportantButton importnatInfo={importnatInfo} />
          </div>
          {children}

          <ProgressBar />
          <SpeedInsights />
          <Footer locale={locale} />
          <CopyRight locale={locale} />

          <div>
            <Scrollup />
          </div>
        </IntlProviderWrapper>
      </body>
    </html>
  );
}
