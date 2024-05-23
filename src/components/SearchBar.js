import React from 'react'
import SearchIcon from '../../icons/SearchIcon';
import Filter from "../../icons/Filter";
import Sort from "../../icons/Sort";
import Export from "../../icons/Export";

function SearchBar() {
  return (
    <div className="bg-white py-3 px-5 rounded-t-lg w-full flex flex-row gap-4 items-center">
        <div className="border py-2 px-4 rounded-md border-[#DCDBE1] w-[340px] flex flex-row items-center gap-2">
          <SearchIcon />
          <input type="text" placeholder="Search in users" />
        </div>
        <div className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2">
            <Filter/>
          <p className="text-sm font-sans font-normal text-userblack">
            Filters
          </p>
        </div>
        <div className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2">
            <Sort/>
          <p className="text-sm font-sans font-normal text-userblack">
          Sort
          </p>
        </div>
        {/* <div className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2">
            <Export/>
          <p className="text-sm font-sans font-normal text-userblack">
          Export
          </p>
        </div> */}
      </div>
  )
}

export default SearchBar
