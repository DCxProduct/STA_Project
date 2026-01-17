"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SoundCard from "./SoundCard";
import SectionTitle from "../section_title/SectionTitle";
import BarTitle from "../section_title/BarTitle";

const Sounds = ({ data, lang }) => {
  const { section_title, topics } = data;
  const t = useTranslations("HomePage");

  useEffect(() => {
    const handlePauseOthers = (e) => {
      const currentAudio = e.detail;
      const allAudios = document.querySelectorAll("audio");
      allAudios.forEach((audio) => {
        if (audio !== currentAudio) {
          audio.pause();
        }
      });
    };

    window.addEventListener("pauseOthers", handlePauseOthers);
    return () => {
      window.removeEventListener("pauseOthers", handlePauseOthers);
    };
  }, []);

  return (
    <section
      className="container-fluid bg-backGroundDefault py-10 mr-2 ml-2"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="md:container xl:px-4">
        <div className={`flex justify-between items-top khmer-text-odor:${lang}`}>
          <BarTitle
            title={section_title}
            marginBottom={"mb-2"}
            textSize={"lg:text-size-26 text-size-23"}
            textColor={"text-default"}
            color={"default"}
          />

          <div className="">
            <Link
              href={"/sound"}
              className=" text-size-13 md:text-size-15 lg:text-size-15 bg-[#E7EEF4] text-[#4270A5] lg:px-4 px-3 lg:py-2 py-2 rounded-3xl  cursor-pointer hover:bg-cardDefault hover:rounded-3xl hover:text-default"
            >
              {t("findMore")}
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 items-center md:gap-6 gap-2 mt-3">
          {topics.map((item, idx) => (
            <SoundCard
              key={idx}
              title={item.title}
              date={item.date}
              href={item.href}
              audio_file={item.audio_file}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sounds;
