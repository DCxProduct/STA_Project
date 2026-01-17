"use client";

import { useEffect, useState, useMemo } from "react";
import ImportantInfoSticky from "../ncdd_division/ImportantInfoSticky";

export default function ImportantButton({ importnatInfo }) {
  const [visible, setVisible] = useState(false);

  // Use useMemo to avoid re-sorting on every render
  const sortedInfo = useMemo(
    () => [...importnatInfo].sort((a, b) => a.id - b.id),
    [importnatInfo]
  );

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-[8%] right-0 sm:right-4 z-50 transition-all duration-500 ease-linear transform ${
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-10 pointer-events-none"
      }`}
    >
      <div className="py-2 px-2 rounded-lg max-w-96 space-y-3 hidden lg:block">
        {sortedInfo.map((item, idx) => (
          <ImportantInfoSticky
            key={item.id ?? idx} // prefer unique id for key
            title={item.title}
            img={item.photo_file}
            link={item.fields?.[0]?.value}
          />
        ))}
      </div>
    </div>
  );
}
