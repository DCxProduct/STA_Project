import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ImportantInfoSticky = ({ title, img, link }) => {
  return (
    <motion.div
      whileHover="hover"
      variants={{
        hover: {
          scale: [1, 1.05, 1],
          transition: { duration: 0.6, repeat: Infinity },
        },
      }}
      className="ml-auto w-fit transition-all duration-300 "
    >
      <Link
        href={link}
        className="group flex flex-row-reverse items-center bg-[#d4e9fb] text-[#105090] rounded-md shadow-sm px-2 py-1.5 w-fit transition-all duration-300"
      >
        {/* Icon on right */}
        <div className="relative w-6 h-6 sm:w-8 sm:h-8 shrink-0">
          <Image
            src={img}
            alt="icon"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 24px, 32px"
          />
        </div>

        {/* Text on left, expand right-to-left */}
        <div className="mr-2 whitespace-nowrap opacity-0 max-w-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-500 ease-in-out text-sm sm:text-base overflow-hidden">
          {title}
        </div>
      </Link>
    </motion.div>
  );
};

export default ImportantInfoSticky;
