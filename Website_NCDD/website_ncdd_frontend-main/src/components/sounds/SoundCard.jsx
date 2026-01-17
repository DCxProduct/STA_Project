"use client";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import { IoCalendarOutline, IoVolumeHigh } from "react-icons/io5";
import { motion } from "framer-motion";

const SoundCard = ({ title, href, lang, audio_file, date }) => {
  const t = useTranslations("HomePage");
  const [year, month, day] = date.split("-");
  const audioRef = useRef(null);

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
        // backgroundColor: "#CCE5FF",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 bg-white rounded-lg py-5 px-5 shadow-md"
    >
      <div className="flex items-center space-x-2">
        {/* 🔊 Animated Icon */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <IoVolumeHigh className="text-indigo-600" size={22} />
        </motion.div>

        {/* Title */}
        <h2 className={`lg:text-size-18 xs:text-size-17 line-height-32 text-gray-800 khmer-text-odor:${lang}`}>
          {title}
        </h2>
      </div>

      {/* Date */}
      <div className="flex items-top justify-start mt-3 text-gray-400 border-b-1px pb-2 khmer-font-batr lg:text-size-16 text-size-15">
        <IoCalendarOutline size={20} className="" />
        <p className="">&nbsp;
          {NumToKhmer(day, lang)}&nbsp;
          {MonthInKhmer(month, lang)}&nbsp;
          {NumToKhmer(year, lang)}
        </p>
      </div>

      {/* Audio Player */}
      <div className="mt-4 flex items-center justify-between">
        <audio
          controls
          className="w-full mt-3 rounded-lg"
          ref={audioRef}
          onPlay={() => {
            const event = new CustomEvent("pauseOthers", {
              detail: audioRef.current,
            });
            window.dispatchEvent(event);
          }}
        >
          <source src={audio_file} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </motion.div>
  );
};

export default SoundCard;
