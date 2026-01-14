import React from "react";

const GOOGLE_MAP = process.env.NEXT_PUBLIC_GOOGLE_MAP;
const FootLocation = () => {
  return (
    <div className="mt-5 lg:mt-0">
      <iframe className="w-full h-full rounded-lg" src={GOOGLE_MAP}></iframe>
    </div>
  );
};

export default FootLocation;
