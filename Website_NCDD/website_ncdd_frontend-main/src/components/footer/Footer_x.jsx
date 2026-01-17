import FooterAbout from "./FooterAbout_x";
import FooterLink from "./FooterLink";
import FootLocation from "./FootLocation";
import ncdd from "@/assets/logos/ncdd.png";
import japan from "@/assets/logos/japan.png";
import undp from "@/assets/logos/undp.png";
import Image from "next/image";
import { fetchData } from "@/services/getApiService";

const Footer = async ({ locale }) => {
  // const { footer_menu } = await fetchData(
  //   `/home/${locale}`,
  //   {},
  //   "revalidation"
  // );
  // const footerLink = footer_menu[0];
  // const contactData = footer_menu[1];
  // const { info } = await fetchData(`/info/${locale}`, {}, "revalidation");
  try {
    const [homeData, infoData] = await Promise.all([
      fetchData(`/home/${locale}`, {}, "revalidation"),
      fetchData(`/info/${locale}`, {}, "revalidation"),
    ]);

    const footer_menu = homeData?.footer_menu || [];
    const footerLink = footer_menu[0] || null;
    const contactData = footer_menu[1] || null;
    const info = infoData?.info || null;
    return (
      <section className="container-fluid bg-default pt-20 relative">
        <div className="px-4 md:container-default">
          <div className=" mx-auto sm:px-0 text-white grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1">
            <FooterAbout data={contactData} locale={locale} info={info} />
            <FooterLink data={footerLink} />
            <FootLocation />
          </div>
        </div>
        {/* Footer SVG */}
        <img src={info.footer_bg} alt="logo"/>
        {/* End footer SVG */}
        <div className="absolute bottom-2 flex gap-6 left-1/2 -translate-x-1/2 text-white items-center text-size-13 md:text-size-19 ">
          <div className="flex gap-2 items-center justify-center">
            <p>សហការរៀបចំដោយ៖ </p>
            <Image src={ncdd} height={38} width={51} alt="logo" />
            <Image src={japan} width={38} height={64} alt="logo" />
            <Image src={undp} width={38} height={51} alt="logo" />
          </div>
          <div>អភិវឌ្ឍដោយ៖ Dcx</div>
        </div>
      </section>
    );
  } catch (error) {
    return (
      <section>
        <h1>Server error...</h1>
      </section>
    );
  }
};

export default Footer;
