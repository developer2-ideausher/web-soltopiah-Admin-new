"use client"
import React from "react";
import Export from "../../../../../../icons/Export";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import newImage from "../../../../../../public/newImage.png"
import { useRouter } from "next/navigation";

function Page() {
  const router =useRouter()

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <div onClick={()=>router.back()}>
            <BackButton />
          </div>
          <p className="text-xl2 font-semibold text-userblack font-sans">
            Guide Management -
            <span className="text-[#AE445A]"> Quick reads</span>
          </p>
        </div>
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
      <div>
      <SearchBar/>

      <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-quickreadsTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
              Thumbnail
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Category
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Slides
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
              Date
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Status
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full ">
            <div className=" grid grid-cols-quickreadsTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-4">
                <img src={newImage.src} alt="" />
                <p className="text-sm font-sans font-semibold text-[#252322]">
                14 days meditation challenge
                </p>
              </div>
              <span className="text-userblack  font-sans font-semibold text-sm">
              23456
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
              561
              </span>
              <span className="text-userblack font-sans  font-semibold text-sm">
              Feb 27, 2022
              </span>
              <span className="text-userblack font-sans  font-semibold text-sm">
              Plublished
              </span>
              
            </div>
            <div className=" grid grid-cols-quickreadsTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-4">
                <img src={newImage.src} alt="" />
                <p className="text-sm font-sans font-semibold text-[#252322]">
                14 days meditation challenge
                </p>
              </div>
              <span className="text-userblack  font-sans font-semibold text-sm">
              23456
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
              561
              </span>
              <span className="text-userblack font-sans  font-semibold text-sm">
              Feb 27, 2022
              </span>
              <span className="text-userblack font-sans  font-semibold text-sm">
              Plublished
              </span>
              
            </div>
            <div className=" grid grid-cols-quickreadsTable justify-between border-b border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-4">
                <img src={newImage.src} alt="" />
                <p className="text-sm font-sans font-semibold text-[#252322]">
                14 days meditation challenge
                </p>
              </div>
              <span className="text-userblack  font-sans font-semibold text-sm">
              23456
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
              561
              </span>
              <span className="text-userblack font-sans  font-semibold text-sm">
              Feb 27, 2022
              </span>
              <span className="text-userblack font-sans  font-semibold text-sm">
              Plublished
              </span>
              
            </div>
          
            
          </div>
        </div>
        <Pagination/>
      </div>
    </div>
  );
}

export default Page;
