import React from "react";
import LocalInformationCard from "./LocalInformationCard";
const LocalInformation = ({ data, lang }) => {
  const { topics } = data;

  return (
    <div className="container-fluid bg-default border-t-NavBar border-t-1px">
      <div className="px-0 md:container lg:container-default grid grid-cols-3 lg:grid-cols-5">
        {topics.map((item, idx) => (
          <LocalInformationCard
            key={idx}
            title={item.title}
            icon={item.photo_file}
            info={item.fields[0].value}
            backGround={idx % 2 == 0 ? "bg-NavBar" : ""}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
};

export default LocalInformation;
