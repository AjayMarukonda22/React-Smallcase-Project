import React from "react";

const Notfound = () => {
  return (
    <div className="flex justify-center items-center gap-x-2 pb-100">
      <img
        src="./src/images/notfound.svg"
        alt="not found"
        className="h-[500px] w-[600px]"
      ></img>
      <div className="flex flex-col gap-y-2 w-[300px]">
        <p className="font-medium text-2xl">No smallcase found</p>
        <p className="font-medium text-xl opacity-50">
          Try refining your search results or removing some filters!
        </p>
      </div>
    </div>
  );
};

export default Notfound;
