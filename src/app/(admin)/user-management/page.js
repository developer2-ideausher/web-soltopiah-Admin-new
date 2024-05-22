import React from "react";

import SearchBar from "@/components/SearchBar";
import GreenDot from "../../../../icons/GreenDot";
import MenuDots from "../../../../icons/MenuDots";
import Link from "next/link";
import RedDot from "../../../../icons/RedDot";
import BlueDot from "../../../../icons/BlueDot";

function page() {
  return (
    <div className="flex flex-col gap-7">
      <p className="text-userblack font-semibold text-xl2 font-sans">Users</p>

      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-userTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Users
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                User ID
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Account created
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                User Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                status
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Action
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full ">
          <div className=" grid grid-cols-userTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-2">
                <img src="Profile.png" alt="" />
                <div className="flex flex-col ">
                  <p className="text-sm font-sans font-bold text-[#252322]">
                    Henry Fiat
                  </p>
                  <p className="text-base font-normal font-sans text-[#666576]">
                    (406) 555-0120
                  </p>
                </div>
              </div>
              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                012364
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Feb 27, 2022, 23:57
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Subscribed
              </span>
              <div className=" py-1 px-3 w-[100px] rounded-md border-[#B9F4C8] border font-sans  font-semibold text-sm flex flex-row items-center gap-2 text-[#2BAB4B]">
                <GreenDot/>
                <p>Active</p>
              </div>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm flex flex-row items-center gap-5">
                <p>Unblock</p>
                <p>Block</p>
              </span>
              

              <button className="text-white  font-sans font-semibold text-sm">
                <MenuDots/>
              </button>
            </div>
            <div className=" grid grid-cols-userTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-2">
                <img src="Profile.png" alt="" />
                <div className="flex flex-col ">
                  <p className="text-sm font-sans font-bold text-[#252322]">
                    Henry Fiat
                  </p>
                  <p className="text-base font-normal font-sans text-[#666576]">
                    (406) 555-0120
                  </p>
                </div>
              </div>
              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                012364
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Feb 27, 2022, 23:57
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Subscribed
              </span>
              <div className=" py-1 px-3 w-[100px] rounded-md border-[#FFB8BC] border font-sans  font-semibold text-sm flex flex-row items-center gap-2 text-[#E43A42]">
                <RedDot/>
                <p>Expired</p>
              </div>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm flex flex-row items-center gap-5">
                <p>Unblock</p>
                <p>Block</p>
              </span>
              

              <button className="text-white  font-sans font-semibold text-sm">
                <MenuDots/>
              </button>
            </div>
            <div className=" grid grid-cols-userTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-2">
                <img src="Profile.png" alt="" />
                <div className="flex flex-col ">
                  <p className="text-sm font-sans font-bold text-[#252322]">
                    Henry Fiat
                  </p>
                  <p className="text-base font-normal font-sans text-[#666576]">
                    (406) 555-0120
                  </p>
                </div>
              </div>
              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                012364
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Feb 27, 2022, 23:57
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Subscribed
              </span>
              <div className=" py-1 px-3 w-[120px] rounded-md border-[#3090E9] border font-sans  font-semibold text-sm flex flex-row items-center gap-2 text-[#3090E9]">
                <BlueDot/>
                <p>Non-Active</p>
              </div>
              <span className="text-userblack font-sans w-[300px] font-semibold text-sm flex flex-row items-center gap-5">
                <p>Unblock</p>
                <p>Block</p>
              </span>
              

              <button className="text-white  font-sans font-semibold text-sm">
                <MenuDots/>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
