import React from "react";
import Export from "../../../../icons/Export";

import SearchBar from "@/components/AddSearchBar";
import Pagination from "@/components/Pagination";

function page() {
  return (
    <div className="flex flex-col gap-7 ">
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl2 font-semibold text-userblack font-sans">
          Calmness Feedback
        </p>
        <div className="flex flex-row items-center gap-5">
          <select className="py-[10px] px-3 border border-[#DCDBE1] rounded-lg text-sm font-sans font-normal text-userblack focus:outline-none">
            <option value="1">Feb 10 - Feb 16, 22</option>
          </select>
          <div className="bg-white border border-[#DCDBE1] py-[10px] px-3 rounded-lg flex flex-row items-center gap-2">
            <Export />
            <p className="text-sm font-sans font-normal text-userblack">
              Export
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <SearchBar title="Add Challenge" />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-challengeTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Name
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Duration
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Created by
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Participants
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Status
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full ">
            <div className=" grid grid-cols-challengeTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-4">
                <img src="image1.png" alt="" />
                <p className="text-sm font-sans font-semibold text-[#252322]">
                  14 days meditation challenge 
                </p>
              </div>
              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                Successful people make their decisions based on where they want
                to be.”
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                10 days
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Soltopiah
              </span>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                Public
              </span>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                5482
              </span>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                Past
              </span>

              <button className="text-white p-4 rounded-lg w-[150px] bg-[#AE445A] font-sans font-semibold text-sm">
                Forum
              </button>
            </div>
            <div className=" grid grid-cols-challengeTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-4">
                <img src="image1.png" alt="" />
                <p className="text-sm font-sans font-semibold text-[#252322]">
                  14 days meditation challenge 
                </p>
              </div>
              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                Successful people make their decisions based on where they want
                to be.”
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                10 days
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Soltopiah
              </span>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                Public
              </span>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                5482
              </span>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                Ongoing
              </span>

              <button className="text-white p-4 rounded-lg w-[150px] bg-[#AE445A] font-sans font-semibold text-sm">
                Forum
              </button>
            </div>
            <div className=" grid grid-cols-challengeTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-4">
                <img src="image1.png" alt="" />
                <p className="text-sm font-sans font-semibold text-[#252322]">
                  14 days meditation challenge 
                </p>
              </div>
              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                Successful people make their decisions based on where they want
                to be.”
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                10 days
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Soltopiah
              </span>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                Public
              </span>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                5482
              </span>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                Upcoming
              </span>

              <button className="text-white p-4 rounded-lg w-[150px] bg-[#AE445A] font-sans font-semibold text-sm">
                Forum
              </button>
            </div>

          </div>
        </div>
        <Pagination/>

      </div>
    </div>
  );
}

export default page;
