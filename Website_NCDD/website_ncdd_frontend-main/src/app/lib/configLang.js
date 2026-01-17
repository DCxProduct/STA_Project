import React from "react";

const configLang = (lang) => {
  const langs = {
    km: "km",
    ken: "en",
  };
  return langs[lang];
};

export default configLang;
