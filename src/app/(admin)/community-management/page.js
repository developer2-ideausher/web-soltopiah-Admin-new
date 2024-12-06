"use client";
import React, { useEffect, useState } from "react";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";
import Backspace from "../../../../icons/Backspace";
import TopRightArrow from "../../../../icons/TopRightArrow";
import GreyCross from "../../../../icons/GreyCross";
import Link from "next/link";
import Notification from "../../../../icons/Notification";
import PushNotif from "../../../../icons/PushNotif";
import Block from "../../../../icons/Block";
import { getToken } from "@/Services/Cookie/userCookie";
import { getAllCommunitiesApi } from "@/Services/Api/CommunityManagement/GetAllCommunities";
import dayjs from "dayjs";
import LoaderLarge from "@/components/LoaderLarge";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";

function Page() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [filter, setFilter] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);

   
    setCurrentPage(1);
   
   
  };
  const fetchData = async (page) => {
    setLoading(true);
    setCommunities([]);
    const result = await getAllCommunitiesApi(page, sort, searchTerm, filter);

    if (result.status) {
      console.log(result.data.results);
      setCommunities(result.data.results);
      setTotalPages(result.data.totalPages);
    } else {
      console.error(result.message);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, sort, searchTerm, filter]);

  return (
    <div className="flex flex-col gap-7 ">
      <p className="text-xl2 font-sans font-semibold text-userblack">
        Community Management
      </p>
      <div className="flex flex-col">
        {/* <SearchBar /> */}
        <SearchBar
          filterArray={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
            { value: "", label: "All" },
          ]}
          name={"Type"}
          handleSort={sort}
          setHandleSort={setSort}
          setHandleFilter={setFilter}
          handleSearch={handleSearch}
          showAddButton={false}
        />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-communityTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Community name
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date created
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Created by
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Members
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Community type
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center bg-white items-center p-10 w-full ">
              <LoaderLarge />
            </div>
          )}
          {!loading &&
            communities &&
            communities.length === 0 &&
            searchTerm && (
              <div className="flex justify-center items-center bg-white p-10 w-full">
                <p className="text-gray-500 text-sm">
                  No data found for {searchTerm}.
                </p>
              </div>
            )}
          <div className="flex flex-col bg-white min-w-fit w-full ">
            {communities &&
              communities.map((item, index) => (
                <Link
                  key={item._id || index}
                  href={`community-management/${item._id}`}
                >
                  <div className=" grid grid-cols-communityTable justify-between border-b border-[#E9E9EC] items-center p-4 relative">
                    <div className="text-[#252322] font-sans font-semibold text-base flex flex-row items-center gap-2">
                      <img
                        src={item.photo?.url || "newImage.png"}
                        alt="photo"
                        className="w-11 h-11 rounded-lg"
                      />
                      <p>{item.name}</p>
                    </div>
                    <span className="text-userblack w-[250px] font-sans font-semibold text-sm truncate">
                      {item.description}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {dayjs(item.createdAt).format("DD/MM/YYYY")}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {item.groupOwner?.firstName} {item.groupOwner?.lastName}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {item.participantsCount || 0}
                    </span>
                    <div className="w-[150px] ">
                      {item.type == "public" ? (
                        <div className="border border-[#393E59] bg-[#F1F3FB] rounded-md p-3 ">
                          <p className=" text-[#595C69] font-sans font-semibold text-base text-center capitalize">
                            {item.type}
                          </p>
                        </div>
                      ) : (
                        <div className="border border-[#B6576B] bg-[#FCF1F3] rounded-md p-3 ">
                          <p className=" text-[#595C69] font-sans font-semibold text-base text-center">
                            Private
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <RobinPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Page;
