import React from "react";
import FooterAbout from "./FooterAbout";
import FooterContach from "./FooterContach";
import FooterSocialMedia from "./FooterSocialMedia";
import { fetchData } from "@/services/getApiService";
import FooterLink from "./FooterLink";
import bg_footer from "@/assets/images/img/bg_footer.png";

const Footer = async ({ locale }) => {
  const { footer_menu, mobile_url } = await fetchData(
    `/home/${locale}`,
    {},
    "revalidate"
  );
  const contact = footer_menu[1].details;
  const msg = footer_menu[1].msg;
  const { links } = footer_menu[0];
  const socail = footer_menu[1].details.social;
  const { section_title, topics } = mobile_url;
  const mobile = topics;

  return (
    <section className="bg-blueDefault">
      <div className="mx-auto container px-4 sm:px-0 text-white grid grid-cols-1 sm:grid-cols-3 gap-6 py-8"
      style={{
              backgroundImage: `url(${bg_footer.src})`, 
              backgroundRepeat: "no-repeat",                     
              backgroundPosition: "left bottom",
            }}
      >
        <FooterAbout data={contact} msg={msg} />
        {/* <FooterContach /> */}
        <FooterLink data={links} />
        <FooterSocialMedia
          title={socail.msg}
          details={socail.details}
          mobile_title={section_title}
          mobile_url={mobile}
        />
      </div>
    </section>
  );
};

export default Footer;
