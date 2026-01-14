"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
} from "next-share";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { FaPhoneAlt, FaTelegramPlane, FaTiktok } from "react-icons/fa";

export default function ShareButtons({ url, title }) {
  return (
    <section>
      <div className="flex gap-3">
        <FacebookShareButton url={url} title={title}>
          <div className="border-2 rounded-full px-2 hover: py-2 hover:bg-NavBar hover:text-whiteColor transition-all duration-300 hover:-translate-y-1 cursor-pointer ">
            <FaFacebookF size={20} />
          </div>
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <div className="border-2 rounded-full px-2  py-2 hover:bg-NavBar hover:text-whiteColor transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <FaTwitter size={20} />
          </div>
        </TwitterShareButton>
        <TelegramShareButton url={url} title={title}>
          <div className="border-2 rounded-full px-2 hover: py-2 hover:bg-NavBar hover:text-whiteColor transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <FaTelegramPlane size={20} />
          </div>
        </TelegramShareButton>
        <LinkedinShareButton url={url} title={title}>
          <div className="border-2 rounded-full px-2 hover: py-2 hover:bg-NavBar hover:text-whiteColor transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <FaLinkedinIn size={20} />
          </div>
        </LinkedinShareButton>
      </div>
    </section>
  );
}
