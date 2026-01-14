import Image from "next/image";
import React from "react";
import { FaEye, FaRegCalendarAlt } from "react-icons/fa";
import ShareButtons from "@/components/button/ShareButtons";
import { fetchData } from "@/services/getApiService";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import HtmlContent from "@/libs/htmlContent";
import ScholarshipCard from "@/components/scholarship/ScholarshipCard";
const page = async ({ params }) => {
  // const results = {
  //   route: "/scholarship/detail/",
  //   datas: [
  //     {
  //       id: 1,
  //       img: img,
  //       type: "ឈ្មោះស្ថាប័ន",
  //       view: "1989",
  //       title:
  //         "សេចក្ដីជូនដំណឹង ស្ដីពីអាហារូបករណ៍ទេព កោសល្យឌីជីថលតេជោ ថ្នាក់បរិញ្ញាបត្រ ច",
  //       description:
  //         "ក្រោមការយកចិត្តទុកដាក់ជាប្រចាំលើអនាគតយុវជន យុវនារី ក្នុងយុគសម័យឌីជីថល សម្តេចអគ្គមហាសេនាប....",
  //       date: "ខែធ្នូ ១៣, ២០២៤",
  //       href: "news/1",
  //     },
  //     {
  //       id: 2,
  //       img: img2,
  //       type: "ឈ្មោះស្ថាប័ន",
  //       view: "1200",
  //       title:
  //         "សេចក្ដីជូនដំណឹង ស្ដីពីអាហារូបករណ៍ទេព កោសល្យឌីជីថលតេជោ ថ្នាក់បរិញ្ញាបត្រ ច",
  //       description:
  //         "ក្រោមការយកចិត្តទុកដាក់ជាប្រចាំលើអនាគតយុវជន យុវនារី ក្នុងយុគសម័យឌីជីថល សម្តេចអគ្គមហាសេនាប....",
  //       date: "ខែធ្នូ ១៤, ២០២៤",
  //       href: "news/2",
  //     },
  //     {
  //       id: 3,
  //       img: img1,
  //       type: "ឈ្មោះស្ថាប័ន",
  //       view: "1456",
  //       title:
  //         "សេចក្ដីជូនដំណឹង ស្ដីពីអាហារូបករណ៍ទេព កោសល្យឌីជីថលតេជោ ថ្នាក់បរិញ្ញាបត្រ ច",
  //       description:
  //         "ក្រោមការយកចិត្តទុកដាក់ជាប្រចាំលើអនាគតយុវជន យុវនារី ក្នុងយុគសម័យឌីជីថល សម្តេចអគ្គមហាសេនាប....",
  //       date: "ខែធ្នូ ១៥, ២០២៤",
  //       href: "news/3",
  //     },
  //     {
  //       id: 4,
  //       img: img,
  //       type: "ឈ្មោះស្ថាប័ន",
  //       view: "1678",
  //       title:
  //         "សេចក្ដីជូនដំណឹង ស្ដីពីអាហារូបករណ៍ទេព កោសល្យឌីជីថលតេជោ ថ្នាក់បរិញ្ញាបត្រ ច",
  //       description:
  //         "ក្រោមការយកចិត្តទុកដាក់ជាប្រចាំលើអនាគតយុវជន យុវនារី ក្នុងយុគសម័យឌីជីថល សម្តេចអគ្គមហាសេនាប....",
  //       date: "ខែធ្នូ ១៦, ២០២៤",
  //       href: "news/4",
  //     },
  //   ],
  // };
  const { id, locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; // put this in your .env file
  const url = `${baseUrl}/scholarships/detail/${id}`;

  const { results, relatedTopic } = await fetchData(
    `/scholarships/page/${id}/${locale}`,
    {},
    "revalidate"
  );

  const { section_title } = results;
  const { title, details, date, photo_file, Joined_categories, visits } =
    results.topic[0];

  const [year, month, day] = date.split("-");

  return (
    <section className="container-fluid mx-auto">
      <div className="lg:container py-14 px-4">
        <div className="relative w-full px-2 lg:px-0 rounded-2xl xl:h-[750px] lg:h-[600px] md:h-[500px] h-[300px]">
          <Image
            src={photo_file}
            alt="scholarship_image"
            className="object-cover rounded-2xl border-[2px]"
            fill
          />
        </div>
        <div>
          <h1 className="xl:text-size-40 lg:text-size-35 md:text-size-28 text-size-19 font-bold py-4 mt-6">
            {title}
          </h1>
          <div className="flex items-center gap-6 justify-start text-size-15 md:text-size-21 mt-10">
            <div className="bg-default text-whiteColor px-3 py-2 rounded-2xl">
              {section_title}
            </div>
            <div className="flex items-center gap-2">
              <FaRegCalendarAlt />
              {/* {MonthInKhmer(month)} {NumToKhmer(day)} {NumToKhmer(year)} */}
              {MonthInKhmer(month, locale)} {NumToKhmer(day, locale)},&nbsp;
              {NumToKhmer(year, locale)}
            </div>
            <div className="flex items-center gap-2">
              <FaEye />
              {NumToKhmer(visits, locale)}
              {/* {NumToKhmer(data.view)} */}
            </div>
          </div>
        </div>
        <div className="mt-9 py-4 lg:text-size-19 text-size-15">
          <HtmlContent content={details} />
          <br />
          <hr className="h-1 my-4 bg-gray-100" />
        </div>
        <div className="flex items-center py-4 gap-6 px-4 md:px-0">
          <p className="text-size-17 md:text-size-23 mb-2">ចែករំលែកបន្ត ៖ </p>
          <ShareButtons url={url} title={title} />
        </div>
      </div>
      <div className="bg-backGroundDefault py-14">
        <div className="container-default">
          <h1 className="text-size-23 lg:text-size-38 font-bold md:text-size-25">
            ដំណឹងអាហារូបករណ៍ផ្សេងទៀត
          </h1>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {relatedTopic.map((item, idx) => (
              <ScholarshipCard
                key={idx}
                img={item.photo_file}
                title={item.title}
                type={item.Joined_categories[0].title}
                view={item.visits}
                description={item.details}
                date={item.expire_date}
                link={item.href}
                id={id}
                route={item.href}
                lang={locale}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
