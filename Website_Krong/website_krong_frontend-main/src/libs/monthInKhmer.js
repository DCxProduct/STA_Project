import { useLocale } from "next-intl";

export function MonthInKhmer(index, localActive) {
  // const localActive = useLocale();
  const khmerMonths = [
    "",
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ",
  ];

  const englishMonths = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  index = parseInt(index, 10);
  if (index < 1 || index > 12) {
    return "";
  }

  return localActive === "km" ? khmerMonths[index] : englishMonths[index];
}
