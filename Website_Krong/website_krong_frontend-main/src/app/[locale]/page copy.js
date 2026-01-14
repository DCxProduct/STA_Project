import Announcement from "@/components/announcement/Announcement";
import FeedBackButton from "@/components/button/FeedBackButton";
import Carousel from "@/components/carousel/Carousel";
import SlideShow from "@/components/carousel/SlideShow";
import Emergency from "@/components/emergency_number/Emergency";
import Footer from "@/components/footer/Footer";
import LocalInformation from "@/components/local_information/LocalInformation";
import LocalService from "@/components/local_service/LocalService";
import ManagementMessage from "@/components/management_message/ManagementMessage";
import NewsAndEvent from "@/components/news_event/NewsAndEvent";
import NewsEvents from "@/components/news_events/NewsEvents";
import Unit from "@/components/unit/Unit";
import HomeVideo from "@/components/video/HomeVideo";
import Visit from "@/components/visit/Visit";
import VisitCard from "@/components/visit/VisitCard";
import Weather from "@/components/weather/Weather";
import { getLocale } from "next-intl/server";
import Image from "next/image";

export default async function Home() {
  const locale = await getLocale();
  return (
    <main className="lg:px-0">
      <SlideShow />
      {/* <Carousel /> */}
      <ManagementMessage />
      <LocalInformation />
      <LocalService />
      <Visit />
      <NewsAndEvent />
      <Emergency />
      <Weather />

      {/* <Unit />
      <Announcement />
      <NewsEvents />
      <HomeVideo /> */}
      {/* <HoverButton /> */}
    </main>
  );
}
