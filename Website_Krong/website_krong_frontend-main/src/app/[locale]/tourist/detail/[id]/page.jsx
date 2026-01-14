import React from "react";
import Image from "next/image";
import ShareButtons from "@/components/button/ShareButtons";
import RelatedTourist from "@/components/visit/RelatedTourist";
import { fetchData } from "@/services/getApiService";
import HtmlContent from "@/libs/htmlContent";
import { getLocale } from "next-intl/server";
const page = async ({ params }) => {
  // const datas = {
  //   title: "តំបន់ការពារធម្មជាតិបឹងយក្សឡោម",
  //   text: "តំបន់ការពារធម្មជាតិបឹងយក្សឡោម ស្ថិតនៅចំកណ្តាលក្រុងសៀមរាប ប្រទេសកម្ពុជា។ វាគឺជាសក្ខីភាពនៃភាពប៉ិនប្រសប់របស់មនុស្ស ការលះបង់ និងជំនាញសិល្បៈ។ អង្គរវត្តត្រូវបានទទួលស្គាល់ថា ជាបូជនីយដ្ឋានសាសនាដ៏ធំបំផុតក្នុងពិភពលោក ប្រាសាទអង្គរវត្តទាក់ទាញអ្នកទស្សនារាប់លាននាក់ជារៀងរាល់ឆ្នាំ ដែលមានបំណងចង់ស្វែងយល់ពីតំបន់បុរាណរបស់វា និងស្វែងយល់ពីមន្តអាគមនៅក្នុងស្ថាបត្យកម្មដ៏ស្មុគស្មាញ និងប្រវត្តិរឿងរ៉ាវរបស់វា។ ចូរស្វែងយល់ពីអច្ឆរិយៈដែលកំពុងរង់ចាំអ្នកទេសចរនៅទីតាំងដ៏ល្បីល្បាញនេះ។",
  //   img: [tourist_detail1, tourist_detail2, tourist_detail1, tourist_detail2],
  //   conclusion:
  //     "តំបន់ការពារធម្មជាតិបឹងយក្សឡោម ស្ថិតនៅចំកណ្តាលក្រុងសៀមរាប ប្រទេសកម្ពុជា។ វាគឺជាសក្ខីភាពនៃភាពប៉ិនប្រសប់របស់មនុស្ស ការលះបង់ និងជំនាញសិល្បៈ។ អង្គរវត្តត្រូវបានទទួលស្គាល់ថា ជាបូជនីយដ្ឋានសាសនាដ៏ធំបំផុតក្នុងពិភពលោក ប្រាសាទអង្គរវត្តទាក់ទាញអ្នកទស្សនារាប់លាននាក់ជារៀងរាល់ឆ្នាំ ដែលមានបំណងចង់ស្វែងយល់ពីតំបន់បុរាណរបស់វា និងស្វែងយល់ពីមន្តអាគមនៅក្នុងស្ថាបត្យកម្មដ៏ស្មុគស្មាញ និងប្រវត្តិរឿងរ៉ាវរបស់វា។ ចូរស្វែងយល់ពីអច្ឆរិយៈដែលកំពុងរង់ចាំអ្នកទេសចរនៅទីតាំងដ៏ល្បីល្បាញនេះ។",
  //   relatedTopic: [
  //     {
  //       id: "1",
  //       img: tourist1,
  //       title: "តំបន់ការពារធម្មជាតិបឹងយក្សឡោម",
  //       link: "....",
  //     },
  //     {
  //       id: "2",
  //       img: tourist2,
  //       title: "មូលនិធិដំរី Airavata",
  //       link: "....",
  //     },
  //     {
  //       id: "3",
  //       img: tourist4,
  //       title: "ដំណើរកំសាន្តព្រៃភ្នំបានលុង",
  //       link: "....",
  //     },
  //     {
  //       id: "4",
  //       img: tourist5,
  //       title: "បឹងអូរជំុ",
  //       link: "....",
  //     },
  //     {
  //       id: "4",
  //       img: tourist5,
  //       title: "បឹងអូរជំុ",
  //       link: "....",
  //     },
  //     {
  //       id: "4",
  //       img: tourist5,
  //       title: "បឹងអូរជំុ",
  //       link: "....",
  //     },
  //     {
  //       id: "4",
  //       img: tourist5,
  //       title: "បឹងអូរជំុ",
  //       link: "....",
  //     },
  //     {
  //       id: "4",
  //       img: tourist5,
  //       title: "បឹងអូរជំុ",
  //       link: "....",
  //     },
  //     {
  //       id: "4",
  //       img: tourist5,
  //       title: "បឹងអូរជំុ",
  //       link: "....",
  //     },
  //   ],
  // };
  const { id } = params;
  const locale = await getLocale();
  const { results } = await fetchData(`/tourism-areas/page/${id}/${locale}`);
  const { topic } = results;
  const { title, details, date, photo_file, href, related_topics } = topic[0];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; // put this in your .env file
  const url = `${baseUrl}/tourist/detail/${id}`;
  return (
    <section className="container-fluid mx-auto">
      <div className="relative mb-10 xl:h-[700px] lg:h-[600px] md:h-[500px] h-[300px]">
        <Image
          src={photo_file}
          alt="background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 px-4 bg-gradient-to-t from-default via-transparent to-transparen">
          {/* "ព័ត៌មានទូទៅ" */}
          <div className="bg-opacity-80 px-6 py-2 rounded-lg">
            <div className="container mx-auto text-center">
              <h2 className="text-white text-size-25 lg:text-size-55 md:text-size-42 font-semibold drop-shadow-md">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:container px-4 lg:px-0">
        <div className="py-8 pb-12">
          <p className="text-size-15 lg:text-size-19">
            <HtmlContent content={details} />
          </p>
        </div>
        <hr />
        <div className="flex items-center py-4 gap-6 px-4 md:px-0 pb-20 mt-5">
          <p className="text-size-17 md:text-size-23 mb-2">ចែករំលែកបន្ត ៖ </p>
          <ShareButtons url={url} title={title} />
        </div>
      </div>
      <div className="px-4 lg:pz-0 lg:container-default bg-backGroundDefault py-20">
        <h1 className="text-size-19 lg:text-size-35 md:text-size-23 font-bold">
          តំបន់ទេសចរណ៍ផ្សេងទៀត
        </h1>
        <div>
          <RelatedTourist data={related_topics} />
        </div>
      </div>
    </section>
  );
};

export default page;
