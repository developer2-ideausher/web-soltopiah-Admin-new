import BackButton from "@/components/BackButton";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-5">
        <Link href="/category-management">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Category management
        </p>
      </div>
   
        <form className="flex flex-col w-1/3 gap-10">
            <div className="flex flex-col gap-2">
                
            
          <p className="text-sm font-sans font-semibold text-userblack">
            Thumbnail
          </p>
          <div className="py-3 px-4 w-[168px] rounded-xl bg-white border border-[#E7E5E4] h-40 flex items-center justify-center text-sm font-sans font-normal text-[#9C9896] relative ">
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer"/>
            Add Banner
          </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-sans font-semibold text-userblack">
              Name
            </p>
            <input
              type="text"
              className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal text-[#9C9896]"
              placeholder="Enter title"
            />
          </div>
          <div className="w-1/2">
            <button className="text-base font-sans font-semibold bg-[#AE445A] w-full p-4 rounded-lg text-white">Next</button>
            
          </div>
        </form>
      
    </div>
  );
}

export default page;
