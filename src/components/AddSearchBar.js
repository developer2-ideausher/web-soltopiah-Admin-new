"use client";
import React, { useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import Filter from "../../icons/Filter";
import Sort from "../../icons/Sort";
import Export from "../../icons/Export";
import Plus from "../../icons/Plus";
import Link from "next/link";

function SearchBar({
  title = "Add",
  route = "/dashboard",
  showAddButton = true,
  handleSort,
  setHandleSort,
  handleSearch,
}) {
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleSelection = (value) => {
    setSelectedSort(value); // Update selected sort value
    setHandleSort(value); // Update parent sort handler

    // Close modal after 3 seconds
    setTimeout(() => {
      setShowSort(false);
    }, 1000);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear the previous timeout
    }
  
    const timeout = setTimeout(() => {
      if (value.trim() === "") {
        handleSearch(""); // Reset data if the input is empty
      } else {
        handleSearch(value.trim()); // Trigger search with the trimmed value
      }
    }, 1000); // Adjust debounce delay as needed
  
    setDebounceTimeout(timeout); // Save the timeout ID
  };
  

  return (
    <div className="bg-white py-3 px-5 rounded-t-lg w-full flex flex-row items-center justify-between font-sans">
      <div className="flex flex-row gap-4 items-center">
        <div className="border py-2 px-4 rounded-md border-[#DCDBE1] w-[340px] flex flex-row items-center gap-2">
          <SearchIcon />
          <input
            value={searchTerm}
            onChange={handleInputChange}
            type="text"
            placeholder="Search "
          />
        </div>
        <div className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2">
          <Filter />
          <p className="text-sm font-sans font-normal text-userblack">
            Filters
          </p>
        </div>
        <div className="flex flex-col gap-2 relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2"
          >
            <Sort />
            <p className="text-sm font-sans font-normal text-userblack">Sort</p>
          </button>
          {showSort && (
            <div className="w-32 bg-white p-4 rounded-xl absolute top-12 border border-[#ededed] right-0 left-0">
              <h5 className="text-black text-sm font-semibold">Date</h5>
              <label className="w-full flex items-center gap-2 mt-4 cursor-pointer">
                <input
                  checked={selectedSort === "asc"}
                  onChange={(e) => handleSelection(e.currentTarget.value)}
                  type="radio"
                  name="time"
                  id="declined"
                  value="asc"
                />
                <h6 className="text-xs text-black font-normal">Old to new</h6>
              </label>
              <label className="w-full flex items-center gap-2 mt-4 cursor-pointer">
                <input
                  checked={selectedSort === "desc"}
                  onChange={(e) => handleSelection(e.currentTarget.value)}
                  type="radio"
                  name="time"
                  id="all"
                  value="desc"
                />
                <h6 className="text-xs text-black font-normal">New to old</h6>
              </label>
            </div>
          )}
        </div>
      </div>
      {showAddButton && (
        <Link href={route}>
          <button className="rounded-lg py-2 px-3 flex flex-row items-center gap-3 border border-[#DCDBE1]">
            <p className="text-sm font-sans font-semibold text-black">
              {title}
            </p>
            <Plus />
          </button>
        </Link>
      )}
    </div>
  );
}

export default SearchBar;
