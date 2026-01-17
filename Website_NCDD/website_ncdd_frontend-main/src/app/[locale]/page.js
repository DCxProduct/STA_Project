export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { fetchData } from "@/services/getApiService";
import SlideShow from "@/components/carousel/SlideShow";
import Welcome from "@/components/carousel/Welcome";
import ManagementMessage from "@/components/management_message/ManagementMessage";
import NewsAndEvent from "@/components/news_event/NewsAndEvent";
import PreloaderPrimary from "@/components/shared/others/PreloaderPrimary";
import Prakas from "@/components/prakas/Prakas";
import Project from "@/components/project/Project";
import Sounds from "@/components/sounds/Sounds";
import HomeVideo from "@/components/video/HomeVideo";
import NewsMarquee from "@/components/marquee/NewsMarquee";

// ✅ Loading Component (Shows a loading message/spinner)
const Loading = () => <PreloaderPrimary />;

export default async function Home({ params }) {
  const locale = params?.locale || "km";

  try {
    const {
      news,
      banners,
      management,
      abouts,
      cards,
      prakas,
      projects,
      sounds,
      videos,
      text_running,
      ncdd,
    } = await fetchData(`/home/${locale}`, {}, "revalidation");
    return (
      <main className="lg:px-0" key={locale}>
        <Suspense fallback={<PreloaderPrimary />}>
          <SlideShow
            data={banners}
            management={management}
            abouts={abouts}
            cards={cards}
            ncdd = {ncdd}
          />
          <Welcome management={management} abouts={abouts} cards={cards} ncdd = {ncdd} />
          <ManagementMessage data={management} cards={cards} />
          <NewsAndEvent data={news} lang={locale} />
          <Prakas data={prakas} lang={locale} />
          <Project projects={projects} lang={locale} />
          <Sounds data={sounds} lang={locale} />
          <HomeVideo data={videos} lang={locale} />
          <NewsMarquee data={text_running} />
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <p className="text-center text-red-500">Failed to load data.</p>;
  }
}
