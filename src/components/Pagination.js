import React from "react";
import LeftBlackarrow from "../../icons/LeftBlackarrow";
import RightBlackArrow from "../../icons/RightBlackArrow";

function RobinPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="w-full bg-white shadow-lg py-3 px-5 rounded-b-lg flex justify-end items-center">
      <div className="border border-[#DCDBE1] rounded-lg flex flex-row items-center">
        <button
          className="py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1] bg-white"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <LeftBlackarrow />
        </button>

        <p className="py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1] bg-white">
          {currentPage}/{totalPages}
        </p>

        {/* Right Arrow - Go to Next Page */}
        <button
          className="py-[10px] px-[14px]  rounded-r-lg border-[#DCDBE1] bg-white"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages} // Disable if on the last page
        >
          <RightBlackArrow />
        </button>
      </div>
    </div>
  );
}

export default RobinPagination;
