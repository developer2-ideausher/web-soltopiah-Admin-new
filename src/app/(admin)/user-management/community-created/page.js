import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import Link from "next/link";
import React from "react";
import newImage from "../../../../../public/newImage.png";

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/user-management/users">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Users management -
          <span className="text-[#AE445A]"> Community created</span>
        </p>
      </div>
      <UserDetailsBox />
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-userCommunityCreatedTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Community thumbnail
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full">
            <div className=" grid grid-cols-userCommunityCreatedTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="text-userblack font-sans flex flex-row items-center gap-3 font-semibold text-base">
                <img src={newImage.src} alt="" />
                <p>14 days meditation challenge</p>
              </div>
              <span className="text-userblack font-sans font-semibold text-base">
                Unsuccessful people make their decisions based on their current
                situations. Successful people make their....
              </span>

              <div className="font-sans font-normal text-base">Public</div>
            </div>
            <div className=" grid grid-cols-userCommunityCreatedTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="text-userblack font-sans flex flex-row items-center gap-3 font-semibold text-base">
                <img src={newImage.src} alt="" />
                <p>14 days meditation challenge</p>
              </div>
              <span className="text-userblack  font-sans font-semibold text-base">
                Unsuccessful people make their decisions based on their current
                situations. Successful people make their....
              </span>

              <div className="font-sans font-normal text-base">Private</div>
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default page;
