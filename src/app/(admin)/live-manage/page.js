import React from "react";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";
import Profile2 from '../../../../public/Profile2.png'
import GreenLive from "../../../../icons/GreenLive";
import LiveButton from "../../../../icons/LiveButton";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between items-center">
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Live Management
        </p>
        <Link href="/live-manage/live-requests"><button className="py-2 px-3 border border-[#EE3E3E] bg-white flex flex-row items-center gap-2 rounded-lg">
          <LiveButton />
          <p className="text-sm font-sans font-normal text-[#EE3E3E]">
            Live Requests(21)
          </p>
        </button></Link>
      </div>
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-LiveMainTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Session tittle
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Hosted by
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Date
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
              Time
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Category
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">Status</span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full">
            <div className=" grid grid-cols-LiveMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack font-sans font-semibold text-base">
              Sunday reset
              </span>
              <div className="text-userblack font-sans flex flex-row items-center gap-2 font-semibold text-base">
                <img src={Profile2.src} alt=""/>
               <p>Albert Flores</p> 
              </div>
              <span className="text-userblack font-sans font-semibold text-base">
              Mon, Feb 16, 24
              </span>
              <span className="text-userblack font-sans font-semibold text-base">
              3:30 PM
              </span>
              <span className="text-userblack font-sans font-semibold text-base">
              Meditatation
              </span>

              <div className="bg-[#DDFDE8] p-3 rounded-[78px] border border-[#A8FBC4] font-sans font-normal text-[#08A03C] text-base">
              Upcoming
              </div>
            </div>
            <div className=" grid grid-cols-LiveMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack font-sans font-semibold text-base">
              Sunday reset
              </span>
              <div className="text-userblack font-sans flex flex-row items-center gap-2 font-semibold text-base">
                <img src={Profile2.src} alt=""/>
               <p>Albert Flores</p> 
              </div>
              <span className="text-userblack font-sans font-semibold text-base">
              Mon, Feb 16, 24
              </span>
              <span className="text-userblack font-sans font-semibold text-base">
              3:30 PM
              </span>
              <span className="text-userblack font-sans font-semibold text-base">
              Meditatation
              </span>

              <div className="bg-[#DDFDE8] p-3 rounded-[78px] border border-[#A8FBC4] font-sans font-normal text-[#08A03C] text-base">
              Upcoming
              </div>
            </div>
            <div className=" grid grid-cols-LiveMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack font-sans font-semibold text-base">
              Sunday reset
              </span>
              <div className="text-userblack font-sans flex flex-row items-center gap-2 font-semibold text-base">
                <img src={Profile2.src} alt=""/>
               <p>Albert Flores</p> 
              </div>
              <span className="text-userblack font-sans font-semibold text-base">
              Mon, Feb 16, 24
              </span>
              <span className="text-userblack font-sans font-semibold text-base">
              3:30 PM
              </span>
              <span className="text-userblack font-sans font-semibold text-base">
              Meditatation
              </span>

              <div className="bg-[#DDFDE8] p-3 rounded-[78px] border border-[#A8FBC4] font-sans font-normal text-[#08A03C] text-base">
              Upcoming
              </div>
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default page;
