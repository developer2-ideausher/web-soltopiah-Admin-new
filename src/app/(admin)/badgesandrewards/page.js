import React from "react";
import Plus from "../../../../icons/Plus";
import Export from "../../../../icons/Export";
import Sort from "../../../../icons/Sort";
import Filter from "../../../../icons/Filter";
import SearchIcon from "../../../../icons/SearchIcon";
import MenuDots from "../../../../icons/MenuDots";
import Intermediate from "../../../../icons/Intermediate";
import Beginner from "../../../../icons/Beginner";
import Advance from "../../../../icons/Advance";

function page() {
  return (
    <div className="flex flex-col gap-7">
      <p className="text-xl2 font-sans font-semibold text-userblack">
        Badges and Rewards
      </p>
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
            <button className="rounded-lg py-2 px-3 bg-[#AE445A]">
              <p className="text-white font-sans font-semibold text-base">
                All Rewards
              </p>
            </button>
            <button className="rounded-lg py-2 px-3 flex flex-row items-center gap-3 border border-[#DCDBE1]">
              <p className="">Add</p>
              <Plus />
            </button>
          </div>
        </div>
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-badgeTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Badge
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Tittle
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Total Received
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Message
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full">
            <div className=" grid grid-cols-badgeTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack  font-sans font-semibold text-sm">
                <Intermediate />
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Milestone Achievements
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Intermediate
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                15
              </span>
              <span className="text-[#AE445A] font-sans w-[400px]  font-semibold text-sm">
                Unlock your full potential! Earn badges and rewards by taking
                small steps towards your goals every day.
              </span>

              <button className="text-[#08A03C] font-sans font-semibold text-sm">
                <MenuDots />
              </button>
            </div>
            <div className=" grid grid-cols-badgeTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack  font-sans font-semibold text-sm">
                <Beginner />
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Milestone Achievements
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Beginner
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                15
              </span>
              <span className="text-[#AE445A] font-sans w-[400px]  font-semibold text-sm">
                Unlock your full potential! Earn badges and rewards by taking
                small steps towards your goals every day.
              </span>

              <button className="text-[#08A03C] font-sans font-semibold text-sm">
                <MenuDots />
              </button>
            </div>
            <div className=" grid grid-cols-badgeTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <span className="text-userblack  font-sans font-semibold text-sm">
                <Advance />
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Milestone Achievements
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                Advanced
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
                15
              </span>
              <span className="text-[#AE445A] font-sans w-[400px]  font-semibold text-sm">
                Unlock your full potential! Earn badges and rewards by taking
                small steps towards your goals every day.
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
