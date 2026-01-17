// import { useLocale } from "next-intl";
// import { getLocale } from "next-intl/server";
const NumToKhmer = (numEn, lang, locale = "ken") => {
  if (lang === locale) return numEn;
  const numKh = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return numEn
    .toString()
    .split("")
    .map((char) => (/\d/.test(char) ? numKh[parseInt(char, 10)] : char))
    .join("");
};

export default NumToKhmer;
