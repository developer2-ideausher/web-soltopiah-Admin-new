import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import Link from "next/link";
import React from "react";
import Profile2 from "../../../../../public/Profile2.png"

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/user-management/users">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">Users management - <span className="text-[#AE445A]">Guide Bookings</span> </p>
      </div>
      <UserDetailsBox/>
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-LiveMainTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
              Guide name
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

              <span className="text-[#666576] font-sans font-normal text-sm">Status</span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full">
            <div className=" grid grid-cols-LiveMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack font-sans font-semibold text-base">
              Albert Flores
              </span>
              <div className="text-userblack font-sans  gap-2 font-normal text-base">
               <p>Feb 27, 2022</p> 
              </div>
              <span className="text-userblack font-sans font-normal  text-base">
              9:30 AM
              </span>
              <span className="text-userblack font-sans font-normal  text-base">
              Mental Health
              </span>
              <span className="text-userblack font-sans font-normal  text-base">
              $80
              </span>

              <div className="font-sans font-normal text-userblack text-base">
              Upcoming
              </div>
            </div>
            <div className=" grid grid-cols-LiveMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack font-sans font-semibold text-base">
              Albert Flores
              </span>
              <div className="text-userblack font-sans  gap-2 font-normal text-base">
               <p>Feb 27, 2022</p> 
              </div>
              <span className="text-userblack font-sans font-normal  text-base">
              9:30 AM
              </span>
              <span className="text-userblack font-sans font-normal  text-base">
              Mental Health
              </span>
              <span className="text-userblack font-sans font-normal  text-base">
              $80
              </span>

              <div className="font-sans font-normal text-userblack text-base">
              Ongoing
              </div>
            </div>
            <div className=" grid grid-cols-LiveMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack font-sans font-semibold text-base">
              Albert Flores
              </span>
              <div className="text-userblack font-sans  gap-2 font-normal text-base">
               <p>Feb 27, 2022</p> 
              </div>
              <span className="text-userblack font-sans font-normal  text-base">
              9:30 AM
              </span>
              <span className="text-userblack font-sans font-normal  text-base">
              Mental Health
              </span>
              <span className="text-userblack font-sans font-normal  text-base">
              $80
              </span>

              <div className="font-sans font-normal text-userblack text-base">
              Completed
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
