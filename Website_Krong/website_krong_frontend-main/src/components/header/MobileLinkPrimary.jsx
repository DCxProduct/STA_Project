import Link from "next/link";

const MobileLinkPrimary = ({ item }) => {
  const { title, href, status } = item;
  return (
    <Link
      href={href || "#"}
      className="leading-1 text-sm pl-15px pt-3 pb-7px font-medium text-default"
    >
      {title}
    </Link>
  );
};

export default MobileLinkPrimary;
