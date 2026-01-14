import Link from "next/link";
import DropdownWrapper from "../shared/wrappers/DropdownWrapper";
import DropdownPrimary from "../dropdown/DropdownPrimary";

export default function Navitem({ navItem, idx, children, locale }) {
  const { title, href, sub_links, isRelative, sub_links_count } = navItem;

  return (
    <li key={idx} className={`nav-item group `}>
      {href ? (
        <Link href={`${href}`} className="gap-3 block">
          {title}
        </Link>
      ) : (
        <span className="gap-3 cursor-pointer flex items-center">
          {title}
          {sub_links_count > 0 ? (
            <i className="icofont-rounded-down group-hover:rotate-180 transition-transform duration-300"></i>
          ) : (
            <p></p>
          )}
        </span>
      )}

      {/* dropdown */}
      {children}
      <DropdownWrapper>
        <DropdownPrimary items={sub_links} />
      </DropdownWrapper>
    </li>
  );
}
