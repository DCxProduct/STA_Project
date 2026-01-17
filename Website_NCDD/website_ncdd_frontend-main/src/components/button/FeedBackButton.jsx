"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { MdOutlineCommentBank } from "react-icons/md";
import FormModal from "../form_submit/FormModal";

const FeedBackButton = () => {
  const t = useTranslations("Search");
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {/* className="bg-default rounded-md text-white text-size-19  lg:ml-2 border-white"
      className="lg:ml-2 lg:flex items-center gap-2 lg:px-4 lg:py-3 mt-2 lg:mt-0"
      */}
      <button className="flex items-center lg:gap-2 xs:gap-0 md:border-r-2 pr-3 md:border-gray-300"        
        onClick={() => setShowModal(true)}
      >
        <MdOutlineCommentBank size={26} />
        <span className="hidden lg:block">{t("email")}</span>
      </button>
      {/* <MdOutlineCommentBank size={26} className="lg:hidden" /> */}
      <FormModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default FeedBackButton;
