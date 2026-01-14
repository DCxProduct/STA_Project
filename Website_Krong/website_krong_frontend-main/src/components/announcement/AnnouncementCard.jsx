import React from "react";
import { GiNewspaper } from "react-icons/gi";
import "./style.css";

const AnnouncementCard = () => {
  return (
    <div className="flex-row sm:flex border shadow-md rounded-lg p-2 place-items-center neumorphic-card cursor-pointer hover:scale-105 transition-all duration-300">
      <GiNewspaper className="basis-1/3 text-4xl mx-auto sm:mt-0 mt-2 mb-2 sm:mb-0" />
      <p className="text-sm sm:text-[15px] basis-2/3 line-clamp-4 sm:line-clamp-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
        cupiditate illum neque. Inventore eaque et delectus vel ratione fugiat
        sapiente dolorem ab? Molestiae tenetur veritatis quidem suscipit eos
        maxime molestias.
      </p>
    </div>
  );
};

export default AnnouncementCard;
