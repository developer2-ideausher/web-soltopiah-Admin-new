"use client";
import React, { useState } from "react";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";
import WhitePlus from "../../../../icons/WhitePlus";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

function Page() {
  const [showTable, setShowTable] = useState(true);
  const handleClcik1 = () => {
    setShowTable(true);
  };
  const handleClcik2 = () => {
    setShowTable(false);
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center justify-between">
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Content Management
        </p>
        <Link href="/content-manage/create-content"><button className="flex flex-row items-center gap-2 bg-[#3090E9] p-3 rounded-full">
          <WhitePlus />
          <p className="text-base font-sans font-normal text-white">
            Create content
          </p>
        </button></Link>
      </div>
      <div className="flex flex-row items-center ">
        <button
          onClick={handleClcik1}
          className={` ${
            showTable
              ? "text-[#252322] border-b-4 border-black bg-[#0000000D]"
              : "text-[#838383]"
          } py-2 px-6 text-base  font-semibold font-sans `}
        >
          Courses
        </button>
        <button
          onClick={handleClcik2}
          className={`${
            showTable
              ? "text-[#838383]"
              : " text-[#252322] border-b-4 border-black bg-[#0000000D]"
          }  py-2 px-6 text-base  font-semibold font-sans`}
        >
          Singles
        </button>
      </div>

      <div className="flex flex-col">
        <SearchBar />
        {showTable && (
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-contentTable justify-between p-4">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Course
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Description
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Created by
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Category
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Type
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Date Created
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Access type
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm"></span>
              </div>
            </div>
            <div className="flex flex-col bg-white min-w-fit w-full ">
              <div className=" grid grid-cols-contentTable border-b justify-between border-[#E9E9EC] items-center p-4">
                <div className="flex flex-row items-center gap-4">
                  <img src="image1.png" alt="" />
                  <p className="text-sm font-sans font-semibold text-[#252322]">
                    Designed to give you mental peace
                  </p>
                </div>
                <span className="text-userblack w-[350px] font-sans font-semibold text-sm">
                  
                  Successful people make their decisions based on where they
                  want to be.”
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Soltopiah
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Mental Health
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Blog
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Feb 27, 2024
                </span>
                <span className="bg-[#F9882433] w-[80px] text-center border border-[#F9882436] py-1 px-2 rounded-full text-[#B35605] font-sans font-semibold text-sm">
                  Premium
                </span>
              </div>
              <div className="grid grid-cols-contentTable border-b justify-between border-[#E9E9EC] items-center p-4">
                <div className="flex flex-row items-center gap-4">
                  <img src="image1.png" alt="" />
                  <p className="text-sm font-sans font-semibold text-[#252322]">
                    Designed to give you mental peace
                  </p>
                </div>
                <span className="text-userblack w-[350px] font-sans font-semibold text-sm">
                  
                  Successful people make their decisions based on where they
                  want to be.”
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Soltopiah
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Mental Health
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Blog
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Feb 27, 2024
                </span>
                <span className="bg-[#00000014] w-[80px] text-center border border-[#0000001C] py-1 px-2 rounded-full text-black font-sans font-semibold text-sm">
                  Free
                </span>
              </div>
            </div>
          </div>
        )}
        {!showTable && (
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-contentSinglesTable justify-between p-4">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Course
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm">
                  Created by
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Category
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Type
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Date Created
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Access type
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm"></span>
              </div>
            </div>
            <div className="flex flex-col bg-white min-w-fit w-full ">
              <div className=" grid grid-cols-contentSinglesTable border-b justify-between border-[#E9E9EC] items-center p-4">
                <div className="flex flex-row items-center gap-4">
                  <img src="image1.png" alt="" />
                  <p className="text-sm font-sans font-semibold text-[#252322]">
                    Designed to give you mental peace{" "}
                  </p>
                </div>

                <span className="text-userblack font-sans font-semibold text-sm">
                  Soltopiah
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Mental Health
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Blog
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Feb 27, 2024
                </span>
                <span className="bg-[#F9882433] w-[80px] text-center border border-[#F9882436] py-1 px-2 rounded-full text-[#B35605] font-sans font-semibold text-sm">
                  Premium
                </span>
              </div>
              <div className=" grid grid-cols-contentSinglesTable border-b justify-between border-[#E9E9EC] items-center p-4">
                <div className="flex flex-row items-center gap-4">
                  <img src="image1.png" alt="" />
                  <p className="text-sm font-sans font-semibold text-[#252322]">
                    Designed to give you mental peace{" "}
                  </p>
                </div>

                <span className="text-userblack font-sans font-semibold text-sm">
                  Soltopiah
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Mental Health
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Blog
                </span>
                <span className="text-userblack font-sans font-semibold text-sm">
                  Feb 27, 2024
                </span>
                <span className="bg-[#F9882433] w-[80px] text-center border border-[#F9882436] py-1 px-2 rounded-full text-[#B35605] font-sans font-semibold text-sm">
                  Premium
                </span>
              </div>
            </div>
          </div>
        )}

        <Pagination />
      </div>
    </div>
  );
}

export default Page;
