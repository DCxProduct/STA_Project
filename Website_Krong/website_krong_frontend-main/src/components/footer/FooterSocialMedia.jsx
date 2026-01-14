import React from "react";
import { FiFacebook } from "react-icons/fi";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialYoutube } from "react-icons/sl";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";
import playstore from "@/assets/images/demo/play_store.png";
import appstore from "@/assets/images/demo/app_store.png";

const FooterSocialMedia = () => {
  return (
    <div>
      <h1 className="font-bayon text-xl sm:text-2xl">ប្រព័ន្ធផ្សព្វផ្សាយ</h1>
      <div className="flex gap-5 text-3xl mt-4">
        <a
          href=""
          className="cursor-pointer hover:scale-125 transition-all duration-75"
        >
          <FiFacebook />
        </a>
        <a
          href=""
          className="cursor-pointer hover:scale-125 transition-all duration-75"
        >
          <SlSocialYoutube />
        </a>
        <a
          href=""
          className="cursor-pointer hover:scale-125 transition-all duration-75"
        >
          <PiTelegramLogo />
        </a>
        <a
          href=""
          className="cursor-pointer hover:scale-125 transition-all duration-75"
        >
          <BsTwitterX />
        </a>
      </div>
      <h1 className="font-bayon text-xl sm:text-2xl mt-2 mb-2">
        គណេន្យភាពសង្គម
      </h1>
      <div className="flex gap-2">
        <Image
          src={playstore}
          width={100}
          className="cursor-pointer"
          alt="logo"
        />
        <Image
          src={appstore}
          width={100}
          className="cursor-pointer"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default FooterSocialMedia;
