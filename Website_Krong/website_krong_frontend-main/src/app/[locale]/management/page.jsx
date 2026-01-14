import React from "react";
import Image from "next/image";
import ManagementCard from "@/components/management_team/ManagementCard";
const page = () => {
  return (
    <section className="mx-auto container-fluid">
      <div className="">
        <div className="relative">
          <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 px-4 bg-gradient-to-t from-default via-transparent to-transparen">
            {/* "ព័ត៌មានទូទៅ" */}
            <div className="bg-opacity-80 px-6 py-2 rounded-lg">
              <h2 className="text-white text-size-25 lg:text-size-55 md:text-size-42 font-semibold drop-shadow-md">
                ថ្នាក់ដឹកនាំ
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:container-default py-10 mt-10">
        <hr className="mb-8" />
        <h1 className="text-left text-size-23 md:text-size-38 lg:text-size-42 font-bold">
          សមាសភាពគណៈអភិបាលក្រុង
        </h1>

        {/* <div className="flex flex-col items-center mt-6">
          <Image
            src={managemenet_photo}
            alt="management_image"
            className="w-48 h-auto rounded-lg bg-blue-500"
          />
          <h2 className="t font-bold mt-4 text-left">ឈ្មោះតួនាទី កកកកក</h2>
          <p className="text-brown-800 mt-1">អភិបាលក្រុង</p>
        </div> */}
        {datas.map((item, idx) =>
          item.level == 1 ? (
            <ManagementCard
              key={idx}
              img={item.img}
              title={item.title}
              name={item.name}
              position={item.position}
            />
          ) : (
            ""
          )
        )}
      </div>
      <div className="px-4 lg:container-default py-6 ">
        <hr className="mb-8" />
        <h1 className="text-left text-size-23 md:text-size-38 lg:text-size-42 font-bold">
          សមាសភាពគណៈអភិបាលក្រុង
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
          {datas.map((item, idx) =>
            item.level > 1 ? (
              <ManagementCard
                key={idx}
                img={item.img}
                title={item.title}
                name={item.name}
                position={item.position}
              />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
