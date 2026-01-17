"use client";

import NewsAndEventCard from "@/components/news_event/NewsAndEventCard";
import Pagination from "@/components/pagination/Pagination";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export default function Page({ params }) {
  const { locale } = params;
  const searchParams = useSearchParams();
  // Get from query string
  const search_word = searchParams.get("search_word") || "";
  const page = searchParams.get("page") || "1";

  const [searchWord, setSearchWord] = useState(search_word);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const router = useRouter();

  const t = useTranslations("Search");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchWord) {
      toast.error("សូមបំពេញពាក្យគន្លឹះដើម្បីស្វែងរក!");
      return;
    }
    if (!searchWord.trim()) return;
    setHasSearched(true);
    router.push(`?page=1`);
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/search?search_word=${searchWord}&lang=${locale}`,
        {
          headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!searchWord) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/search?search_word=${searchWord}&lang=${locale}&page=${page}`,
          {
            headers: {
              Authorization: API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search_word, page]); // 👈 fetch again when page changes

  return (
    <section className="lg:container-default px-4 bg-gray-100 ">
      <div className=" px-4 py-10 items-center">
        <div className=" text-center">
          <h1 className={`text-size-23 md:text-4xl khmer-text-odor:${locale} text-gray-800 mb-2 leading-snug`}>
            {t("searchHere")}
          </h1>
          <p className="text-gray-500 mb-6 md:text-lg text-size-15 mt-2">
            {t("searchByTopic")}
          </p>

          <form
            onSubmit={handleSearch}
            className="relative mt-10 lg:w-[70%] mx-auto"
          >
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder={t("search")}
              className="w-full rounded-lg border border-gray-300 px-6 py-3 pr-12 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      {/* Results Section */}
      <div className="mt-10">
        {loading && (
          <p className="text-center text-gray-500">កំពុងស្វែងរក...</p>
        )}
        {results.topics && results.topics.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {results.topics.map((item, idx) => (
              <NewsAndEventCard
                key={idx}
                img={item.photo_file}
                title={item.title}
                type={item.Joined_categories[0]?.title}
                view={item.visits}
                description={item.details}
                date={item.date}
                link={item.href}
                id={item.id}
                lang={locale}
              />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="flex items-center justify-center w-full min-h-[200px]">
            <p className="text-center text-gray-400 text-lg">គ្មានលទ្ធផល</p>
          </div>
        ) : (
          <p></p>
        )}
        {results.topics ? (
          <div className="pb-10 mb-10">
            <Pagination pagination={results} />
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
