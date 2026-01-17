import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";

export default function DocumentTable({ rows }) {
  const locale = useLocale();
  const t = useTranslations("DetailPage");
  //   const rows = [
  //     "ផែនការអនុវត្តយុទ្ធសាស្ត្រ (ដំណាក់កាល១) ២០២១–២០២៥",
  //     "ការបោះបង់ផែនការយុទ្ធសាស្ត្រជាតិនៅ កដី២",
  //     "កម្មវិធីជាតិដំណាក់កាលទី២ សម្រាប់សេចក្ដីផ្តើម",
  //     "សេចក្ដីសង្ខេបនៃកម្មវិធីជាតិ",
  //   ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-size-17">
        <thead>
          <tr className="bg-[#EBF5F9] text-center  text-gray-800 font-bold border border-gray-200">
            <th className={`px-4 py-2 text-start w-3/4 border-r-1px khmer-text-odor:${locale}`}>{t("title")}</th>
            <th className={`px-4 py-2 w-1/4 khmer-text-odor:${locale}`}>{t("download")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border border-gray-200`}
            >
              <td className="px-4 py-3  text-gray-700 border-r-1px">
                {item.title}
              </td>
              <td className="px-4 py-3 mx-auto text-center">
                <a
                  className="flex items-center justify-center gap-1 text-[#497DB2] font-semibold"
                  href={item.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("downloadDoc")}
                  <FaDownload />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
