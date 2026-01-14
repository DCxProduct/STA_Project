"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function ContactForm({ apiKey }) {
  const t = useTranslations("Contact");
  const [form, setForm] = useState({
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    contact_subject: "",
    contact_message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.contact_name ||
      !form.contact_phone ||
      !form.contact_subject ||
      !form.contact_message
    ) {
      toast.error("សូមបំពេញទិន្នន័យទាំងអស់ដែលត្រូវការ!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Request failed");

      toast.success("បានបញ្ជូនដោយជោគជ័យ!");
      setForm({
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        contact_subject: "",
        contact_message: "",
      });
    } catch (error) {
      toast.error("មានបញ្ហាក្នុងការបញ្ជូនទម្រង់");
    }
  };

  return (
    <section className="lg:container-default px-4">
      <div className="mx-auto p-6  mt-8 rounded pb-24">
        <h2 className="text-center lg:text-size-50 text-size-25 font-bold text-default mb-6 ">
          {t("informationForm")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 "
        >
          <div>
            <label className="block font-bold mb-1">{t("name")}</label>
            <input
              name="contact_name"
              value={form.contact_name}
              onChange={handleChange}
              className="w-full border-b-1px p-2 rounded"
              required
              placeholder={t("name")}
            />
          </div>

          <div>
            <label className="block font-bold mb-1">{t("mobile")}:</label>
            <input
              name="contact_phone"
              value={form.contact_phone}
              onChange={handleChange}
              className="w-full border-b-1px p-2 rounded"
              required
              type="tel"
              placeholder={t("mobile")}
            />
          </div>

          <div>
            <label className="block font-bold mb-1">{t("email")}</label>
            <input
              name="contact_email"
              type="email"
              value={form.contact_email}
              onChange={handleChange}
              className="w-full border-b-1px p-2 rounded"
              placeholder={t("email")}
            />
          </div>

          <div>
            <label className="block font-bold mb-1">{t("topic")}</label>
            <input
              name="contact_subject"
              value={form.contact_subject}
              onChange={handleChange}
              className="w-full border-b-1px p-2 rounded"
              required
              placeholder={t("topic")}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold mb-1">{t("requestRaised")}</label>
            <textarea
              name="contact_message"
              value={form.contact_message}
              onChange={handleChange}
              className="w-full border-b-1px p-2 rounded min-h-[120px]"
              required
            />
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-default px-8 py-2 rounded hover:bg-blue-700 text-white"
            >
              {t("submit")}
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </section>
  );
}
