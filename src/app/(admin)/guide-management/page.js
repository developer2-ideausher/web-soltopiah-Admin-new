"use client";
import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";
import MenuDots from "../../../../icons/MenuDots";

import Pagination from "@/components/Pagination";
import GreyCross from "../../../../icons/GreyCross";
import TopRightArrow from "../../../../icons/TopRightArrow";
import Backspace from "../../../../icons/Backspace";
import Link from "next/link";

function page() {
  const [showPopUp, setShowPopUp] = useState(false);
  const handleClick = () => {
    setShowPopUp(!showPopUp);
  };
  return (
    <div className="flex flex-col gap-7">
      <p className="text-userblack font-semibold text-xl2 font-sans">
        Guide Management
      </p>
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper  ">
          <div className="bg-[#F0F2F5] min-w-fit w-full ">
            <div className="items-center grid grid-cols-guideTable p-4 justify-between">
              <span className="text-[#666576] font-sans font-normal text-sm">
                User Id
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Guide Name
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Account Created
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Revenue
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Total bookings
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full ">
            <div className=" grid grid-cols-guideTable border-b border-[#E9E9EC] items-center justify-between p-4 relative">
              <span className="text-userblack text-base font-semibold font-sans">
                1231
              </span>
              <div className="flex flex-row gap-2">
                <img src="Profile2.png" alt="" />
                <div className="flex flex-col">
                  <p className="text-base font-semibold font-sans text-userblack">
                    Albert Flores
                  </p>
                  <p className="text-base font-sans font-normal text-[#666576]">
                    (406) 555-0120
                  </p>
                </div>
              </div>
              <span className="text-base font-sans font-semibold text-userblack">
                Feb 27, 2024
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                Subscribed
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                $1200
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                32
              </span>
              <button
                onClick={handleClick}
                className="text-base font-sans font-semibold text-userblack"
              >
                <MenuDots />
              </button>
              {showPopUp && (
                <div className="bg-[#FDF8F9] border-[#D7A1AC] border p-3 rounded-xl shadow-lg w-[166px]  absolute right-12 top-8 flex flex-col gap-3">
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-sm font-sans font-normal text-userblack">
                      Action
                    </p>
                    <button onClick={handleClick}>
                      <GreyCross />
                    </button>
                  </div>
                  <Link href={"/guide-management/guide-info"}>
                    <div className="flex flex-row items-center gap-3">
                      <TopRightArrow />
                      <p className="text-sm font-sans font-normal text-[#753B5B]">
                        Open full view
                      </p>
                    </div>
                  </Link>

                  <div className="flex flex-row items-center gap-3">
                    <Backspace />
                    <p className="text-sm font-sans font-normal text-[#EE3E3E]">
                      Remove
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className=" grid grid-cols-guideTable border-b border-[#E9E9EC] items-center justify-between p-4">
              <span className="text-userblack text-base font-semibold font-sans">
                1231
              </span>
              <div className="flex flex-row gap-2">
                <img src="Profile2.png" alt="" />
                <div className="flex flex-col">
                  <p className="text-base font-semibold font-sans text-userblack">
                    Albert Flores
                  </p>
                  <p className="text-base font-sans font-normal text-[#666576]">
                    (406) 555-0120
                  </p>
                </div>
              </div>
              <span className="text-base font-sans font-semibold text-userblack">
                Feb 27, 2024
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                Subscribed
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                $1200
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                32
              </span>
              <button className="text-base font-sans font-semibold text-userblack">
                <MenuDots />
              </button>
            </div>
            <div className=" grid grid-cols-guideTable border-b border-[#E9E9EC] items-center justify-between p-4">
              <span className="text-userblack text-base font-semibold font-sans">
                1231
              </span>
              <div className="flex flex-row gap-2">
                <img src="Profile2.png" alt="" />
                <div className="flex flex-col">
                  <p className="text-base font-semibold font-sans text-userblack">
                    Albert Flores
                  </p>
                  <p className="text-base font-sans font-normal text-[#666576]">
                    (406) 555-0120
                  </p>
                </div>
              </div>
              <span className="text-base font-sans font-semibold text-userblack">
                Feb 27, 2024
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                Subscribed
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                $1200
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                32
              </span>
              <button className="text-base font-sans font-semibold text-userblack">
                <MenuDots />
              </button>
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default page;
