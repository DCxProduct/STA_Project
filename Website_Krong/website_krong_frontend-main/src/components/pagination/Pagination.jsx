// Pagination.tsx
"use client";

import NumToKhmer from "@/libs/numToKhmer";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function Pagination({ pagination, category }) {
  const locale = useLocale();
  const cateQuery = category > 0 ? `&category=${category}` : "";
  return (
    <div className="flex justify-center mt-6 space-x-2 ">
      {pagination.links.map((link, idx) => (
        <Link
          key={idx}
          href={`?${link.url}${cateQuery}` || "#"}
          prefetch={false}
          className={`px-3 py-1 border rounded-100 ${
            link.active ? "bg-default text-whiteColor" : "hover:bg-gray-200"
          }`}
          scroll={false}
        >
          <span
            dangerouslySetInnerHTML={{ __html: NumToKhmer(link.label, locale) }}
          />
        </Link>
      ))}
    </div>
  );
}
