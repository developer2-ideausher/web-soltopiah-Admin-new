import React from "react";
import LeftBlackarrow from "../../icons/LeftBlackarrow";
import RightBlackArrow from "../../icons/RightBlackArrow";
import LeftBlackarrow1 from "../../icons/LeftBlackArrow1";
import RightBlackArrow1 from "../../icons/RightBlackArrow1";
import RightGrey from "../../icons/RightGrey";
import LeftGrey from "../../icons/LeftGrey";

function RobinPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="w-full bg-white shadow-lg py-3 px-5 rounded-b-lg flex justify-end items-center font-sans">
      <div className="border border-[#DCDBE1] rounded-lg flex flex-row items-center">
        <button
          className={`py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1]  bg-white`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {currentPage === 1?(<LeftGrey />):(<LeftBlackarrow1/>)}
        </button>

        <p className="py-[10px] px-[14px] border-r rounded-l-lg border-[#DCDBE1] bg-white">
          {currentPage}/{totalPages}
        </p>

        {/* Right Arrow - Go to Next Page */}
        <button
          className="py-[10px] px-[14px]  rounded-r-lg border-[#DCDBE1] bg-white"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages|| totalPages===0} // Disable if on the last page
        >
          {currentPage === totalPages|| totalPages===0?(<RightGrey />):(<RightBlackArrow1/>)}
        </button>
      </div>
    </div>
  );
}

export default RobinPagination;
