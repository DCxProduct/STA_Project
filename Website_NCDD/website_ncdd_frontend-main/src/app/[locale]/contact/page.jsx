import axios from "axios";
import React from "react";
import BarTitle from "@/components/section_title/BarTitle";
import HtmlContent from "@/libs/htmlContent";
import RightSide from "@/components/right_side/RightSide";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const page = async ({ params }) => {
  const apiKey = process.env.API_KEY;
  const { locale, id } = params;
  const response = await axios.get(`${API_URL}/contact-us/${locale}`, {
    headers: { Authorization: apiKey },
  });
  const res = await response.data;
  const { results, relatednva } = res;
  const data = results.topic[0];
  const { news, videos, prakas } = relatednva;

  return (
    <section key={id} className="container md:py-10 xs:py-5 ">
      <div className="flex justify-between  gap-2">
        <div className="lg:basis-4/6 basis-full shadow-box-front md:px-5 xs:px-3 md:py-10 xs:py-5 mr-2 ml-2 rounded-xl bg-white">
          <div>
            <BarTitle
              title={data.title}
              marginBottom={"mb-10"}
              textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
              textColor={"text-default"}
              color={"default"}
            />
          </div>
          <div className="lg:text-size-18 mt-5 line-height-32">
            <HtmlContent content={data.details} />
          </div>
          <div className="py-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.32521457087933!2d104.92699288347205!3d11.537259692229059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310950da06a14b61%3A0xce99094448663e2f!2z4Z6i4Z-K4Z634Z6T4Z6f4Z-K4Z644Z6M4Z644Z6M4Z644Z6i4Z-B4Z6fIC0g4Z6C4Z6O4Z-I4Z6A4Z6Y4Z-S4Z6Y4Z624Z6S4Z634Z6A4Z624Z6a4Z6H4Z624Z6P4Z63IOGen-GemOGfkuGemuGetuGelOGfi-GegOGetuGemuGeouGet-GenOGejOGfkuGejeGek-GfjeGej-GetuGemOGelOGfguGelOGelOGfkuGemuGeh-GetuGekuGet-GelOGej-GfgeGemeGfkuGemSDhnpPhn4XhnpDhn5LhnpPhnrbhnoDhn4vhnoDhn5Lhnprhn4Thnpjhnofhnrbhno_hnrc!5e0!3m2!1sen!2skh!4v1748916758495!5m2!1sen!2skh"
              width="100%"
              height="500"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* right side */}
        <RightSide
          locale={locale}
          news={news}
          videos={videos}
          prakas={prakas}
        />
        {/* End right side */}
      </div>
    </section>
  );
};

export default page;
