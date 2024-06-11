import React from "react";
import { HashLoader, PuffLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen fixed left-0 top-0 z-[9999] backdrop-blur-md  bg-[#FFFFFF99]">
      <HashLoader size={100} color="#232946"></HashLoader>
    </div>
  );
};

export default Loader;
