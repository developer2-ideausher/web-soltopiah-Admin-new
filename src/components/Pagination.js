import React from 'react'
import LeftBlackarrow from "../../icons/LeftBlackarrow";
import Horizontal3dots from "../../icons/Horizontal3dots";
import RightBlackArrow from "../../icons/RightBlackArrow";

function Pagination() {
  return (
    <div className="w-full bg-white shadow-lg py-3 px-5 rounded-b-lg flex flex-row justify-between items-center">
    <div className="flex flex-row items-center gap-3 ">
      <p className="text-sm font-sans font-normal text-userblack">
        Entries per page
      </p>

      <select className=" focus:outline-none py-[10px] px-4 border border-[#DCDBE1] rounded-md w-[100]">
        <option value="1">5</option>
        <option value="2">10</option>
        <option value="3">15</option>
        <option value="4">20</option>
      </select>
    </div>
    <div className="border border-[#DCDBE1] rounded-lg flex flex-row items-center">
      <button className="py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1] bg-white">
        <LeftBlackarrow />
      </button>
      <button className="py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1] bg-white">
        1
      </button>
      <button className="py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1] bg-white">
        <Horizontal3dots />
      </button>
      <button className="py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1] bg-white">
        4
      </button>
      <button className="py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1] bg-white">
        5
      </button>
      <button className="py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1] bg-white">
        <Horizontal3dots />
      </button>

      <button className="py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1] bg-white">
        10
      </button>
      <button className="py-[10px] px-[14px]  rounded-r-lg border-[#DCDBE1] bg-white">
        <RightBlackArrow />
      </button>
    </div>
  </div>
  )
}

export default Pagination
