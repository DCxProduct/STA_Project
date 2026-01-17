"use client";
import { useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

export default function DocumentDetail({
  photo_file,
  title,
  fields,
  attach_file,
  downloadIcon,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container ">
      {/* Content */}
      <div className="lg:flex gap-2 rounded-md mt-2">
        <div
          className="lg:basis-2/4 basis-full relative lg:h-[480px] sm:h-[450px] h-[390px] rounded-md bg-gray-200 cursor-pointer "
          onClick={() => setShowModal(true)}
        >
          <Image
            src={photo_file}
            alt="preview"
            fill
            className="lg:object-fill object-scale-down shadow-lg px-1 py-1"
          />
        </div>

        {/* Text Content */}
        <div className="lg:basis-3/5 basis-full ml-1 xs:mt-2">
          <div className="text-black">
            <h1 className="text-size-15 lg:text-size-17 hover:text-default font-normal">
              {title}
            </h1>
            <div className="font-hanuman lg:text-size-15 text-size-15 mt-5">
              {fields.map((field, i) => (
                <div key={i} className="flex gap-2 leading-6">
                  <span>{field.title} :</span>
                  <span className="text-gray-500">{field.value}</span>
                </div>
              ))}
              <a href={attach_file} target="_blank" download>
                <button className="flex items-center gap-3 py-2 px-5 mt-3 rounded-lg border-[#C7DAED] border text-default shadow-md">
                  <span>ទាញយកឯកសារ</span>
                  <Image src={downloadIcon} width={30} height={30} alt="icon" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Preview */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setShowModal(null)} // close when clicking the background
        >
          <div className="relative max-w-[90%] ">
            <Image
              src={photo_file}
              alt="Popup"
              width={1200}
              height={800}
              className="rounded-xl object-contain lg:h-[800px] h-[600px]"
            />
            {/* <button
              onClick={() => setShowModal(null)}
              className="absolute top-2 right-40  bg-white text-default px-2 py-1 rounded"
            >
              <IoMdClose size={30} />
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
