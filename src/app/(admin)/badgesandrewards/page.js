"use client";
import React, { useEffect, useState } from "react";

import SearchIcon from "../../../../icons/SearchIcon";

import Profile from "../../../../public/Profile.png";
import {
  getAllBadgesApi,
  getImageCacheRemover,
  switchBadgeApi,
} from "@/Services/Api/Badges/BadgesApi";
import LoaderLarge from "@/components/LoaderLarge";
import Link from "next/link";
import { Switch } from "@mui/material";
import { truncateDescription, truncateName } from "@/Utilities/helper";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";

function Page() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");

  const handleSearch = (term) => {
    setSearchTerm(term);

    setCurrentPage(1);
  };
  
  const fetchData = async (page) => {
    setLoading(true);
    setBadges("");
    const result = await getAllBadgesApi(page, sort, searchTerm);
    if (result.status) {
      console.log(result.data.results);
      setBadges(result.data.results);
      setTotalPages(result.data.totalPages);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, sort, searchTerm]);
  const handleToggle = async (index) => {
    const badge = badges[index];
    console.log(index);
    const newStatus = !badge.isEnabled;

    setBadges((prevBadges) => {
      const updatedBadges = [...prevBadges];
      updatedBadges[index].isEnabled = newStatus;
      return updatedBadges;
    });

    const result = await switchBadgeApi(badge._id, newStatus);
    if (!result.status) {
      console.error(result.message);

      setBadges((prevBadges) => {
        const revertedBadges = [...prevBadges];
        revertedBadges[index].isEnabled = !newStatus;
        return revertedBadges;
      });
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <p className="text-xl2 font-sans font-semibold text-userblack">
        Badges and Rewards
      </p>
      <div className="flex flex-col">
        <SearchBar
          handleSort={sort}
          setHandleSort={setSort}
          handleSearch={handleSearch}
          showAddButton={false}
          showFilters={false}
        />

        <div className="w-full  booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-badgeTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Badge
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Awarding Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm text-center">
                Status
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Action
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center bg-white items-center p-10 w-full ">
              <LoaderLarge />
            </div>
          )}
          {!loading && badges && badges.length === 0 && (
            <div className="flex justify-center items-center bg-white p-10 w-full">
              <p className="text-gray-500 text-sm">
                {searchTerm
                  ? `No data found for "${searchTerm}".`
                  : "No data yet."}
              </p>
            </div>
          )}
          <div>
            {badges &&
              badges.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex flex-col bg-white min-w-fit w-full"
                >
                  <div className=" grid grid-cols-badgeTable justify-between border-b border-[#E9E9EC] items-center p-4">
                    <div className="flex gap-4 items-center ">
                      <img
                        src={getImageCacheRemover(
                          item.photo?.url,
                          "Profile.png"
                        )}
                        alt="badge"
                        className="w-11 h-11 rounded-full"
                      />
                      <p
                        title={item.name}
                        className="text-userblack font-sans font-semibold text-sm capitalize"
                      >
                        {truncateName(item.name)}
                      </p>
                    </div>

                    <span
                      title={item.description}
                      className="text-userblack font-sans font-semibold text-sm capitalize"
                    >
                      {truncateDescription(item.description)}
                    </span>
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={item.isEnabled}
                        onChange={() => handleToggle(index)}
                        color="primary"
                      />
                      <span>
                        {item.isEnabled ? "Activated" : "Deactivated"}
                      </span>
                    </div>
                    <Link href={`/badgesandrewards/${item._id}`}>
                      <span className="text-[#AE445A] font-sans w-[400px]  font-semibold text-sm">
                        Edit
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {badges && badges.length > 0 && (
          <RobinPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
