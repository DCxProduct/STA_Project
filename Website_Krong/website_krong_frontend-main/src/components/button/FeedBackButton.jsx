"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { MdOutlineCommentBank } from "react-icons/md";
import FormModal from "../form_submit/FormModal";

const FeedBackButton = () => {
  const t = useTranslations("HomePage");
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-default rounded-md text-white text-size-19  lg:ml-2 border-white">
      <button
        className="lg:ml-2 lg:flex items-center gap-2 lg:px-4 lg:py-3 mt-2 lg:mt-0"
        onClick={() => setShowModal(true)}
      >
        <MdOutlineCommentBank size={26} />
        <span className="hidden lg:block">{t("feedBack")}</span>
      </button>
      {/* <MdOutlineCommentBank size={26} className="lg:hidden" /> */}
      <FormModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default FeedBackButton;
