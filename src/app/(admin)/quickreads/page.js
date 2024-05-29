import React from "react";
import AddSearchBar from "../../../components/AddSearchBar";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";

import GreenLive from "../../../../icons/GreenLive";
import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between items-center">
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Quick reads management
        </p>
       <Link href="/quickreads/quick-reads-requests"><button className="py-2 px-3 border border-[#08A03C] bg-white flex flex-row items-center gap-2 rounded-lg">
          <GreenLive />
          <p className="text-sm font-sans font-normal text-[#08A03C]">
            Quick read Request
          </p>
        </button></Link> 
      </div>
      <div className="flex flex-col">
        <AddSearchBar title="Add new" route='/quickreads/add-new-quickread'/>
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-quickreadsMainTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Title
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Created By
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Category
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Slides
              </span>

              
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full ">
            <div className=" grid grid-cols-quickreadsMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack font-sans font-semibold text-sm">
                
                14 days meditation challenge
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Wade Warren
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Free
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Feb 27, 2024
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                23456
              </span>

              
            </div>
            <div className=" grid grid-cols-quickreadsMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack font-sans font-semibold text-sm">
                
                14 days meditation challenge
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Wade Warren
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Free
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Feb 27, 2024
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                23456
              </span>

              
            </div>
            <div className=" grid grid-cols-quickreadsMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack font-sans font-semibold text-sm">
                
                14 days meditation challenge
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Wade Warren
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Free
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Feb 27, 2024
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                23456
              </span>

              
            </div>
            
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default page;
