import Image from "next/image";
import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { LuQuote } from "react-icons/lu";
import HtmlContent from "@/libs/htmlContent";

const ManagementMessage = ({ data }) => {
  const { topics } = data;
  const topic = topics[0];
  const managementImage = topic.photo_file;
  const messageFromManagement = topic.title;
  const messageData = topic.details;
  const managementName = topic.fields[0].value;
  return (
    <section className="container-fluid mx-auto py-120px sm:px-0  bg-default">
      <div className="lg:flex px-4 md:container-default text-white xs:mx-auto">
        <div className="">
          <Image
            src={managementImage}
            alt="managmenet_image"
            className=""
            width={425}
            height={524}
          />
          <div className=" max-w-[425px]">
            <h1 className="text-center font-Koh_Santepheap text-size-23 lg:text-size-32 mt-6 ">
              {managementName}
            </h1>
          </div>
        </div>
        <div className=" basis-2/3 lg:ml-11 relative">
          <h1 className="text-size-38 lg:text-size-34">
            <RiDoubleQuotesL className="text-whiteColor" />
          </h1>
          <h2 className="text-size-26 lg:text-size-44 text-whiteColor ">
            {/* សាររបស់អភិបាលនៃគណ:អភិបាលក្រុងបានលុង */}
            {messageFromManagement}
          </h2>
          <div className="max-w-4xl text-size-17 lg:text-size-22 grid grid-rows-3-3 gap-10 font-extralight">
            {/* <p>
              សូមក្រាបថ្វាយបង្គំ ព្រះករុណាព្រះបាទសម្តេចព្រះបរមនាថ នរោត្តម
              សីហមុនី ព្រះមហាក្សត្រ នៃព្រះរាជាណាចក្រកម្ពុជា
              ជាទីសក្ការៈដ៏ខ្ពង់ខ្ពស់បំផុត! សូមគោរពជូន សម្តេច ឯកឧត្តម លោកជំទាវ
              លោក-លោកស្រី និងបងប្អូនជនរួមជាតិជាទី គោរពស្រឡាញ់រាប់អាន!
            </p> */}

            <HtmlContent content={messageData} />
          </div>
          <div className="absolute right-0 font-extralight text-whiteColor text-size-38 lg:text-size-34">
            <LuQuote />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagementMessage;
