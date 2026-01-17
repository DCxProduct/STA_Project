import Link from "next/link";
import React from "react";
import { FaTelegram, FaFacebook, FaYoutube } from "react-icons/fa";

const MobileSocial = () => {
  return (
    <div>
      <ul className="flex gap-6 items-center mb-5 mt-5 justify-center">
        <li>
          <Link className="facebook" href="#">
            <FaFacebook className="text-[#1877F2] hover:text-[#1877F2] hover:text-4xl transition-all duration-200 ease-in text-2xl" />
          </Link>
        </li>

        <li>
          <Link className="google" href="#">
            <FaYoutube className="text-[#FF0000] hover:text-[#FF0000] hover:text-4xl transition-all duration-200 ease-in text-2xl" />
          </Link>
        </li>
        <li>
          <Link className="google" href="#">
            <FaTelegram className="text-[#24A1DE] hover:text-[#24A1DE] hover:text-4xl transition-all duration-200 ease-in text-2xl" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileSocial;
