import React from "react";
import SubLink from "./SubLink";

const FooterLink = ({ data }) => {
  const { links } = data;
  return (
    <div className="grid grid-cols-2 lg:px-10">
      {links.map((item) => (
        <div className="" key={item.id}>
          <h1 className="text-size-17 md:text-size-21 xl:text-size-23 font-bold">
            {item.title}
          </h1>
          <ul className="leading-9">
            {item.sub_links.map((subLink, idx) => (
              <SubLink
                key={idx}
                linkTitle={subLink.title}
                link={subLink.href}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLink;
