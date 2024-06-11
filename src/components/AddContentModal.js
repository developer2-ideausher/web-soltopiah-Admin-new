import React from "react";
import BlackCross from "../../icons/BlackCross";
import Search from "../../icons/Search";
import ModalImage from "../../public/ModalImage.png";

function AddContentModal({ onclose }) {
  const handleclose = () => {
    onclose();
  };
  return (
    <div className="bg-white flex flex-col gap-8 w-[614px] p-4 rounded-xl">
      <div className="flex flex-row items-center justify-between ">
        <p className="text-base font-sans font-semibold text-userblack">
          Add content to course
        </p>
        <div className="flex flex-row items-center gap-2">
          <div className="rounded-full bg-[#E9EBF7] border border-[#D6DAF0] flex flex-row items-center gap-1 p-1">
            <Search />
            <input
              type="text"
              className="w-full bg-[#E9EBF7] rounded-xl text-xs font-sans font-normal "
              placeholder="Search for audio and video content"
            />
          </div>
          <button onClick={handleclose}>
            <BlackCross />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 items-start">
          <img src={ModalImage.src} />
          <div className="flex flex-col gap-2">
            <p className="text-xs font-sans font-normal text-[#3090E9]">Audio</p>
            <p className="text-sm font-sans font-semibold text-userblack">Meditating with jasmine cupper</p>
            <p className="text-xs font-sans font-normal text-[#848BB3]">54m</p>
            
          </div>
        </div>
        <div className="flex flex-row gap-2 items-start">
          <img src={ModalImage.src} />
          <div className="flex flex-col gap-2">
            <p className="text-xs font-sans font-normal text-[#3090E9]">Video</p>
            <p className="text-sm font-sans font-semibold text-userblack">Meditating with jasmine cupper</p>
            <p className="text-xs font-sans font-normal text-[#848BB3]">54m</p>
            
          </div>
        </div>
        <div className="flex flex-row gap-2 items-start">
          <img src={ModalImage.src} />
          <div className="flex flex-col gap-2">
            <p className="text-xs font-sans font-normal text-[#3090E9]">Audio</p>
            <p className="text-sm font-sans font-semibold text-userblack">Meditating with jasmine cupper</p>
            <p className="text-xs font-sans font-normal text-[#848BB3]">54m</p>
            
          </div>
        </div>
        <div className="flex flex-row gap-2 items-start">
          <img src={ModalImage.src} />
          <div className="flex flex-col gap-2">
            <p className="text-xs font-sans font-normal text-[#3090E9]">Video</p>
            <p className="text-sm font-sans font-semibold text-userblack">Meditating with jasmine cupper</p>
            <p className="text-xs font-sans font-normal text-[#848BB3]">54m</p>
            
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center gap-3">
        <button onClick={handleclose} className="bg-[#C8C8C8] text-black p-3 rounded-lg w-full text-base font-sans font-normal">Reset</button>
        <button onClick={handleclose} className="bg-[#AE445A] text-white p-3 rounded-lg w-full text-base font-sans font-normal">Save</button>
        
      </div>
    </div>
  );
}

export default AddContentModal;
