'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import DropdownWrapper from "../shared/wrappers/DropdownWrapper";
import DropdownPrimary from "../dropdown/DropdownPrimary";

export default function Navitem({ navItem, locale, children }) {
  const pathname = usePathname();

  if (!navItem) return null;

  const { title, href, sub_links, isRelative } = navItem;
  const finalHref = isRelative ? `/${locale}${href}` : href;

  const isActive =
    pathname === finalHref || // matches exact main menu
    sub_links?.some((link) => pathname === link.href); // matches exact submenu

  return (
    <li
      className={`nav-item group xs:text-size-16 xl:text-size-18 khmer-text-odor:${locale} hover:text-white ${
        isActive ? "text-white" : ""
      }`}
    >
      {href ? (
        <Link href={finalHref} className="gap-3 block">
          {title}
        </Link>
      ) : (
        <span
          className="gap-3 cursor-pointer flex items-center"
          aria-haspopup={sub_links?.length > 0}
        >
          {title}
          {sub_links?.length > 0 && (
            <i className="icofont-rounded-down group-hover:rotate-180 transition-transform duration-300"></i>
          )}
        </span>
      )}

      {sub_links?.length > 0 && (
        <DropdownWrapper>
          <DropdownPrimary items={sub_links} />
        </DropdownWrapper>
      )}

      {children}
    </li>
  );
}
