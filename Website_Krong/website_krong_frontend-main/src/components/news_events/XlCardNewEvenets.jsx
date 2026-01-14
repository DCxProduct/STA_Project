import Image from "next/image";
import React from "react";
import newsImg from "@/assets/images/demo/news.png";
import { LuEye } from "react-icons/lu";
import { BsCalendar2Day } from "react-icons/bs";

const XlCardNewEvenets = () => {
  return (
    <div className="border border-gray-200 px-2 py-3 rounded-md">
      <div className="">
        <Image src={newsImg} className="object-contain" alt={newsImg} />
      </div>
      <div className="">
        <h3 className="font-bayon mt-2 mb-3 line-clamp-2 text-sm lg:text-base">
          សេចក្តីប្រកាសព័ត៌មានលទ្ធផលនៃវេទិកាផ្សព្វផ្សាយស្តីពីការអនុវត្តការងារ
        </h3>
        <p className="font-hanuman text-sm text-left line-clamp-3">
          សេចក្តីប្រកាសព័ត៌មានលទ្ធផលនៃវេទិកាផ្សព្វផ្សាយស្តីពីការអនុវត្តការងារសេចក្តីប្រកាសព័ត៌មានលទ្ធផលនៃវេទិកាផ្សព្វផ្សាយនេះ
          មានអ្នកចូលរួមប្រមាណ ២៥០រូប មកពីតំណាងក្រសួង ស្ថាប័ន
          រដ្ឋបាលថ្នាក់ក្រោមជាតិ ដៃគូអភិវឌ្ឍន៍ អង្គការសង្គមស៊ីវិល យុវជន
          និងអ្នកសារព័ត៌មាន ដើម្បីមានឱកាសស្វែងយល់...
        </p>
      </div>
      <div className="sm:flex justify-between">
        <div className="flex items-center gap-2">
          <LuEye />
          <p className="text-size-11">123</p>
        </div>
        <div className="flex items-center gap-2">
          <BsCalendar2Day />
          <p className="text-size-11">20-09-2024</p>
        </div>
      </div>
    </div>
  );
};

export default XlCardNewEvenets;
