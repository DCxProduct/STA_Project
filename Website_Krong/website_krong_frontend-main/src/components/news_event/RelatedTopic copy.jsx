import React from "react";

const RelatedTopic = ({ data }) => {
  return (
    <section className="lg:container-default py-28 px-4">
      <h1 className="text-size-23 lg:text-size-38 font-extrabold">
        ព័ត៌មានផ្សេងទៀត
      </h1>
      <div className="grid grid-cols-6 mt-5 gap-9 items-center">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="text-size-19 bg-gray-300 text-center text-black font-bold rounded-xl py-4"
          >
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedTopic;
