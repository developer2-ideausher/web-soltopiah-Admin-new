import React from "react";
import Export from "../../../../icons/Export";
import Plus from "../../../../icons/Plus";
import Sort from "../../../../icons/Sort";
import Filter from "../../../../icons/Filter";
import SearchIcon from "../../../../icons/SearchIcon";
import Edit from "../../../../icons/Edit";
import MenuDots from "../../../../icons/MenuDots";
import EarningsChart from "@/components/DashBoardNew/EarrningsChart";
import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl2 font-semibold text-userblack font-sans">
          Subscription
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
      <div className="flex flex-col gap-4 bg-white midxl:w-3/5  xl:w-3/5 2xl:w-2/5 rounded-xl p-8">
        <div className="flex flex-row items-center justify-between">
          <p className="text-base font-sans font-bold text-userblack">
            Subscription
          </p>
          <select className="py-2 px-3 rounded-lg border border-[#DCDBE1]">
            <option value="1">Weekly</option>
          </select>
        </div>
        <EarningsChart />
        <div className="flex flex-row justify-center items-center gap-10">
          <div className=" flex flex-row items-center gap-2">
            <p className="border border-dashed border-[#0F75BC] w-8"></p>
            <p className="font-sans text-base font-normal text-userblack">
              Anually
            </p>
          </div>
          <div className=" flex flex-row items-center gap-2">
            <p className="border border-[#0F75BC] w-8"></p>
            <p className="font-sans text-base font-normal text-userblack">
              Monthly
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="bg-white py-3 px-5 rounded-t-lg w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4 items-center">
            <div className="border py-2 px-4 rounded-md border-[#DCDBE1] w-[340px] flex flex-row items-center gap-2">
              <SearchIcon />
              <input type="text" placeholder="Search in users" />
            </div>
            <div className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2">
              <Filter />
              <p className="text-sm font-sans font-normal text-userblack">
                Filters
              </p>
            </div>
            <div className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2">
              <Sort />
              <p className="text-sm font-sans font-normal text-userblack">
                Sort
              </p>
            </div>
            <div className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2">
              <Export />
              <p className="text-sm font-sans font-normal text-userblack">
                Export
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            <button className="rounded-lg py-2 px-3 flex flex-row items-center gap-3 border border-[#DCDBE1]">
              <p>Edit Plan</p>
              <Edit />
            </button>
            <Link href='/subscriptions/add-subscription'><button className="rounded-lg py-2 px-3 flex flex-row items-center gap-3 border border-[#DCDBE1]">
              <p>Add</p>
              <Plus />
            </button></Link>
          </div>
        </div>
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-subscriptionTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Title
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                No. Of Users
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Revenue
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Status
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full ">
            <div className=" grid grid-cols-subscriptionTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="text-[#252322] font-sans font-semibold text-base flex flex-row items-center gap-2">
                <img src="newImage.png" alt="" />
                <p>Designed to give you mental peace </p>
              </div>
              <span className="text-userblack font-sans font-semibold text-sm">
                Annual
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Feb 20, 2024
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                158900
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                $2200
              </span>
              <span className="text-userblack font-sans font-semibold text-sm flex flex-row items-center gap-2">
                <p>Activate</p>
              </span>

              <button className="text-[#08A03C] font-sans font-semibold text-sm">
                <MenuDots />
              </button>
            </div>
            <div className=" grid grid-cols-subscriptionTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="text-[#252322] font-sans font-semibold text-base flex flex-row items-center gap-2">
                <img src="newImage.png" alt="" />
                <p>Designed to give you mental peace </p>
              </div>
              <span className="text-userblack font-sans font-semibold text-sm">
                Annual
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Feb 20, 2024
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                158900
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                $2200
              </span>
              <span className="text-userblack font-sans font-semibold text-sm flex flex-row items-center gap-2">
                <p>Activate</p>
              </span>

              <button className="text-[#08A03C] font-sans font-semibold text-sm">
                <MenuDots />
              </button>
            </div>
            <div className=" grid grid-cols-subscriptionTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="text-[#252322] font-sans font-semibold text-base flex flex-row items-center gap-2">
                <img src="newImage.png" alt="" />
                <p>Designed to give you mental peace </p>
              </div>
              <span className="text-userblack font-sans font-semibold text-sm">
                Annual
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Feb 20, 2024
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                158900
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                $2200
              </span>
              <span className="text-userblack font-sans font-semibold text-sm flex flex-row items-center gap-2">
                <p>Activate</p>
              </span>

              <button className="text-[#08A03C] font-sans font-semibold text-sm">
                <MenuDots />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
