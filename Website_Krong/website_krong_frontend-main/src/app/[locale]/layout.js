import { Koh_Santepheap } from "next/font/google";
import "@/app/globals.css";
import "@/assets/css/icofont.min.css";
import Header from "@/components/header/Header";
import NavbarTop from "@/components/header/NavbarTop";
import Scrollup from "@/components/shared/buttons/ScrollUp";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { locales } from "../../../navigation";
import { notFound } from "next/navigation";
import Footer from "@/components/footer/Footer";
import ProgressBar from "@/components/progressbar/ProgressBar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fetchData } from "@/services/getApiService";
import { ToastContainer } from "react-toastify";
import GAProvider from "./GAProvider";
import GoogleAnalytics from "@/components/analytic/GoogleAnalytics";
import TrackingProvider from "@/components/analytic/TrackingProvider";

export const koh = Koh_Santepheap({
  subsets: ["latin"],
  variable: "--font-koh", // Add CSS variable for Tailwind
  weight: ["400", "700", "900"],
});

// export const metadata = {
//   description: "ក្រុងបានលុង",
//   keyword:
//     "ក្រុងបានលុង,krong banloung,banloung,ban loung,mundulkiri,ខេត្តមណ្ណលគិរី,មណ្ឌលគិរី",
// };

export async function generateMetadata({ params }) {
  const locale = params?.locale || "km"; // support for i18n if needed
  const res = await fetchData(`/info/${locale}`, {}, "revalidate");
  const data = res.info;
  return {
    title: data.site_title,
    description: data.site_desc,
    keywords: data.site_keywords, // make sure your API uses this key
    icons: {
      icon: data.fav_icon, // or an array of icon objects
    },
  };
}

export default function RootLayout({ children, params }) {
  const { locale } = params;
  if (!locales.includes(locale)) {
    notFound();
  }
  const messages = useMessages();

  return (
    <html className={`${koh.variable}`} lang={locale}>
      <NextIntlClientProvider
        locale={locale || "km"}
        defaultLocale="km"
        messages={messages}
      >
        <body className={`koh relativ z-0 ${koh.variable}`}>
          {/* <PreloaderPrimary /> */}
          {/* <DynamicFavicon /> */}
          <NavbarTop />
          <Header />
          <ToastContainer />
          {children}
          <GAProvider />
          <GoogleAnalytics />
          <TrackingProvider />
          <ProgressBar />
          <SpeedInsights />
          <Footer locale={locale} />
          {/* <CopyRight /> */}

          {/* theme fixed shadow */}
          <div>
            <Scrollup />
          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
