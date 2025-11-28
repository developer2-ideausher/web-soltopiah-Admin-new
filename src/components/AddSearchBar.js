"use client";
import React, { useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import Filter from "../../icons/Filter";
import Sort from "../../icons/Sort";
import Export from "../../icons/Export";
import Plus from "../../icons/Plus";
import Link from "next/link";
import { Check, RefreshCcw } from "lucide-react";

function SearchBar({
  title = "Add",
  route = "/dashboard",
  showAddButton = true,
  showFilters = true,
  sort = true,
  showSearch = true,
  handleSort,
  setHandleSort,
  setHandleFilter,
  handleSearch,
  name,
  filterArray,
  showRefresh = false,
  showApproveButton = false,
  handleRefresh,
  handleApprove,
}) {
  const [showSort, setShowSort] = useState(false);
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("desc");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  // const filterArray = [
  //   { value: "public", label: "Public" },
  //   { value: "private", label: "Private" },
  // ];
  const handleSelection = (value) => {
    setSelectedSort?.(value); // Update selected sort value
    setHandleSort?.(value); // Update parent sort handler

    // Close modal after 3 seconds
    setTimeout(() => {
      setShowSort(false);
    }, 1000);
  };
  const handleFilterSelection = (value) => {
    setSelectedFilter?.(value); // Update selected sort value
    setHandleFilter?.(value); // Update parent sort handler

    // Close modal after 3 seconds
    setTimeout(() => {
      setShowFilterDropDown(false);
    }, 1000);
  };
  const handleInputChange = (e) => {
    const value = e.target.value.trimStart(); // Remove leading spaces
    setSearchTerm?.(value);
    console.log(searchTerm, "robin");
    if (value.length > 3) {
    }
    // Clear previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Handle empty input immediately
    if (value.trim() === "") {
      setSearchTerm("");
      handleSearch?.(""); // Fetch default data
      return;
    }

    // Debounced search for non-empty input
    const timeout = setTimeout(() => {
      const trimmedValue = value.trim();
      handleSearch?.(trimmedValue); // Pass trimmed search term
    }, 1000); // Adjust debounce delay as needed

    setDebounceTimeout(timeout); // Save debounce timeout ID
  };

  return (
    <div className="bg-white py-3 px-5 rounded-t-lg w-full flex flex-row items-center justify-between font-sans">
      <div className="flex flex-row gap-4 items-center">
        {showSearch && (
          <div className="border py-2 px-4 rounded-md border-[#DCDBE1] w-[340px] flex flex-row items-center gap-2">
            <SearchIcon />
            <input
              value={searchTerm}
              onChange={handleInputChange}
              type="text"
              placeholder="Search "
              className="w-full"
            />
          </div>
        )}
        {showFilters && (
          <div className="flex flex-col gap-2 relative">
            <button
              onClick={() => {
                setShowFilterDropDown(!showFilterDropDown);
                setShowSort(false);
              }}
              className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2"
            >
              <Filter />
              <p className="text-sm font-sans font-normal text-userblack">
                Filters
              </p>
            </button>
            {showFilterDropDown && (
              <div className="w-32 bg-white p-4 rounded-xl absolute top-12 border border-[#ededed] z-50 right-0 left-0">
                <h5 className="text-black text-sm font-semibold">{name}</h5>
                {filterArray &&
                  filterArray.map((item, index) => (
                    <label
                      key={index}
                      className="w-full flex items-center gap-2 mt-4 cursor-pointer"
                    >
                      {console.log(selectedFilter, item.value)}
                      <input
                        checked={selectedFilter == item.value}
                        onChange={(e) =>
                          handleFilterSelection(e.currentTarget.value)
                        }
                        type="radio"
                        name="time"
                        id="declined"
                        value={item.value}
                      />

                      <h6 className="text-xs text-black font-normal">
                        {item.label}
                      </h6>
                    </label>
                  ))}
                {/* <label className="w-full flex items-center gap-2 mt-4 cursor-pointer">
                  <input
                    checked={selectedFilter === "public"}
                    onChange={(e) =>
                      handleFilterSelection(e.currentTarget.value)
                    }
                    type="radio"
                    name="time"
                    id="all"
                    value="public"
                  />
                  <h6 className="text-xs text-black font-normal">Public</h6>
                </label> */}
              </div>
            )}
          </div>
        )}
        {sort && (
          <div className="flex flex-col gap-2 relative">
            <button
              onClick={() => {
                setShowSort(!showSort);
                setShowFilterDropDown(false);
              }}
              className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2"
            >
              <Sort />
              <p className="text-sm font-sans font-normal text-userblack">
                Sort
              </p>
            </button>
            {showSort && (
              <div className="w-32 bg-white p-4 rounded-xl absolute top-12 border border-[#ededed] z-50 right-0 left-0">
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
          
        )}
         {showApproveButton && (
              <button
                onClick={handleApprove}
                className="flex flex-row items-center gap-2 border text-sm font-sans font-normal text-black rounded-md py-2 px-3  hover:shadow-md"
              >
                Approve <Check size={16} />
              </button>
            )}
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
      {showRefresh && (
        <button
          onClick={handleRefresh}
          className="flex flex-row items-center gap-2 border text-sm font-sans font-normal text-black rounded-md py-2 px-3  hover:shadow-md"
        >
          Refresh <RefreshCcw size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
