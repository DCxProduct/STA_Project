export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { fetchData } from "@/services/getApiService";
import SlideShow from "@/components/carousel/SlideShow";
import ManagementMessage from "@/components/management_message/ManagementMessage";
import LocalInformation from "@/components/local_information/LocalInformation";
import LocalService from "@/components/local_service/LocalService";
import Visit from "@/components/visit/Visit";
import NewsAndEvent from "@/components/news_event/NewsAndEvent";
import Emergency from "@/components/emergency_number/Emergency";
import Weather from "@/components/weather/Weather";
import PreloaderPrimary from "@/components/shared/others/PreloaderPrimary";

// ✅ Loading Component (Shows a loading message/spinner)
const Loading = () => <PreloaderPrimary />;

export default async function Home({ params }) {
  const locale = params?.locale || "km";

  try {
    const { welcome, statistical, cards, tourism, news, emergencys, banners } =
      await fetchData(`/home/${locale}`, {}, "no-store");
    return (
      <main className="lg:px-0" key={locale}>
        <Suspense fallback={<PreloaderPrimary />}>
          <SlideShow data={banners} />
          <ManagementMessage data={welcome} />
          <LocalInformation data={statistical} lang={locale} />
          <LocalService data={cards} />
          <Visit data={tourism} />
          <NewsAndEvent data={news} lang={locale} />
          <Emergency data={emergencys} />
          <Weather />
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <p className="text-center text-red-500">Failed to load data.</p>;
  }
}
