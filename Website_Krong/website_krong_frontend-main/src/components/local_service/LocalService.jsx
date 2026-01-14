import React from "react";
import LocalServiceCard from "./LocalServiceCard";

const LocalService = ({ data }) => {
  const { topics } = data;
  // const topic = topics[0];

  // const title = topic.title;
  // const link = topic.href;
  return (
    <div className="bg-backGroundDefault md:container-fluid px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-14 container py-5 md:py-120px">
        {topics.map((item, idx) => (
          <LocalServiceCard
            key={idx}
            title={item.title}
            link={item.fields[0].value}
            icon={item.photo_file}
          />
        ))}
        {/* <LocalServiceCard /> */}
        {/* <LocalServiceCard />
        <LocalServiceCard />
        <LocalServiceCard />
        <LocalServiceCard />
        <LocalServiceCard /> */}
      </div>
    </div>
  );
};

export default LocalService;
