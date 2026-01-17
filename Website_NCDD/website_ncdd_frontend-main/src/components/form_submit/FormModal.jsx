// components/FormModal.jsx
"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaWindowClose } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function FormModal({ isOpen, onClose }) {
  const locale = useLocale();
  const t = useTranslations("Search");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      toast.error(t("documentSize"));
      setFile(null);
      e.target.value = ""; // reset
    } else {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      toast.error(t("inputFillIn"));
      return;
    }
    const formData = new FormData();
    formData.append("comment_name", name ?? "");
    formData.append("comment_message", message);
    formData.append("comment_document", file ?? "");

    try {
      const response = await fetch(`${API_URL}/comment`, {
        method: "POST",
        headers: {
          Authorization: API_KEY,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Submission failed");
      toast.success(t("success"));
      setName("");
      setMessage("");
      setFile(null);
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      toast.error(t("failed"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <h2 className={`lg:text-size-35 text-size-28 khmer-text-odor:${locale} text-center text-default mb-4`}>
          {t("comment")}
        </h2>

        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          {/* Name and File Row */}
          <div className="grid grid-cols-0 sm:grid-cols-0 gap-0">
            <div>
              <label className="block text-gray-700 mb-1">
                {t("name")}
              </label>
              <input
                name="comment_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder={t("yourName")}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="hidden">
              <label className="block text-black mb-1">{t("document")}</label>
              <input
                type="file"
                name="comment_document"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="w-full p-2 border-dashed border-2 border-gray-300 rounded-md bg-gray-100"
              />
              <p className=" text-sm text-gray-500">{t("maxFileSize")}</p>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 mb-1">
              {t("massage")}<span className="text-red-500">*</span>
            </label>
            <textarea
              name="comment_message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              placeholder={t("yourMassage")}
              className="w-full border rounded-md p-2"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-default text-white py-2 px-6 rounded-md "
            >
              {t("submit")}
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-size-32"
        >
          <FaWindowClose />
        </button>
      </div>
    </div>
  );
}
