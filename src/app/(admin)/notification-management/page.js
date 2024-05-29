import SearchBar from "@/components/AddSearchBar";
import React from "react";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";

function page() {
  return (
    <div className="flex flex-col gap-7 ">
      <p className="text-xl2 font-sans font-semibold text-userblack">
        Notification Management
      </p>
      <div className="flex flex-col">
        <SearchBar route={"/notification-management/create-notification"} />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-notificationTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Title
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Message
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full ">
            <div className=" grid grid-cols-notificationTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                Get Care free!
              </span>

              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                Feb 27, 2022, 23:57
              </span>

              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                Successful people make their decisions based on where they want
                to be.”
              </span>
            </div>
            <div className=" grid grid-cols-notificationTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                Get Care free!
              </span>

              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                Feb 27, 2022, 23:57
              </span>

              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                Successful people make their decisions based on where they want
                to be.”
              </span>
            </div>
            <div className=" grid grid-cols-notificationTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                Get Care free!
              </span>

              <span className="text-userblack w-[250px] font-sans font-semibold text-sm">
                Feb 27, 2022, 23:57
              </span>

              <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                Successful people make their decisions based on where they want
                to be.”
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
