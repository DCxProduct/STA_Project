import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import FeedBackButton from "@/components/button/FeedBackButton";
const SearchEmailButton = () => {
  const t = useTranslations("Search");
  return (
    <div className="flex items-center gap-3 text-NavBar text-size-15 justify-center">      
    {/*<Link
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=info@ncdd.gov.kh&subject=${t("email")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="flex items-center gap-1 border-r-2 pr-3 border-gray-300">
          <FaMessage size={18} />
          <p className="pl-1">{t("email")}</p>
        </button>
      </Link>*/}

      <FeedBackButton/>
      
      <Link href={"/search"}>
        <button className="flex items-center gap-1 ">
          <FaSearch size={20} />
          <p className="pl-1">{t("search")}</p>
        </button>
      </Link>
    </div>
  );
};

export default SearchEmailButton;
