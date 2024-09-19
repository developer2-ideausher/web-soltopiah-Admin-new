"use client"
import Link from "next/link";
import React from "react";
import LeftBlackarrow from "../../../../../../../icons/LeftBlackarrow";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import BackButton from "@/components/BackButton";

function Page({ params }) {
  const { info } = params;
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-5">
        <Link href="/guide-management/guide-info">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Session Booked
        </p>
      </div>
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full ">
            <div className="items-center grid grid-cols-sessionTable p-4 justify-between">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Tran. id
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                User. id
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Username
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Time
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Session type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Session cost
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Status
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Guide earning
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full ">
            <div className=" grid grid-cols-sessionTable border-b border-[#E9E9EC] items-center justify-between p-4">
              <span className="text-userblack text-base font-semibold font-sans">
                32861
              </span>
              <span className="text-userblack text-base font-semibold font-sans">
                32861
              </span>

              <span className="text-base font-sans font-semibold text-userblack">
                Albert Flores
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                Feb 27, 2022
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                3:30 PM
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                Free
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                $50
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                Ongoing
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                $120 / hr
              </span>
            </div>
            <div className=" grid grid-cols-sessionTable border-b border-[#E9E9EC] items-center justify-between p-4">
              <span className="text-userblack text-base font-semibold font-sans">
                32861
              </span>
              <span className="text-userblack text-base font-semibold font-sans">
                32861
              </span>

              <span className="text-base font-sans font-semibold text-userblack">
                Albert Flores
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                Feb 27, 2022
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                3:30 PM
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                Free
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                $50
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                Ongoing
              </span>
              <span className="text-base font-sans font-semibold text-userblack">
                $120 / hr
              </span>
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default Page;
