import React from "react";
import BarTitle from "../section_title/BarTitle";
import NewsSmallCard from "../news_event/NewsSmallCard";
import VideoCardRight from "../video/VideoCardRight";
import PrakasCardRight from "../prakas/PrakasCardRight";

const RightSide = ({ news, locale, videos, prakas }) => {
  const prakasItem = prakas.topics;
  const video = videos.topics[0];
  const videoTitle = videos.section_title;
  const { section_title, topics } = news;
  const sortedTopics = [...prakasItem].sort((a, b) => b.id - a.id);
  return (
    <div className="lg:basis-2/6 px-5 py-10 ml-1 bg-white rounded-xl hidden lg:block shadow-box-front">
      <div>
        <div>
          <BarTitle
            title={section_title}
            marginBottom={"mb-10"}
            textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
            textColor={"text-default"}
            color={"default"}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 mt-5">
          {topics.map((item, idx) => (
            <NewsSmallCard
              key={idx}
              title={item.title}
              date={item.date}
              href={item.href}
              photo_file={item.photo_file}
              locale={locale}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mt-14">
          <BarTitle
            title={videoTitle}
            marginBottom={"mb-10"}
            textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
            textColor={"text-default"}
            color={"default"}
          />
        </div>
        <div>
          <VideoCardRight
            title={video.title}
            date={video.date}
            href={video.href}
            locale={locale}
            video={video.video_file}
          />
        </div>
      </div>
      <div>
        <div className="mt-14">
          <BarTitle
            title={prakas.cat_title}
            marginBottom={"mb-10"}
            textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
            textColor={"text-default"}
            color={"default"}
          />
        </div>
        <div>
          {sortedTopics.map((item, idx) => (
            <PrakasCardRight
              key={idx}
              lang={locale}
              title={item.title}
              date={item.date}
              href={item.href}
              expire_date={item.expire_date}
              visits={item.visits}
              type={"small"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
