"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GreenLive from "../../../../icons/GreenLive";
import RobinPagination from "@/components/Pagination";
import LoaderLarge from "@/components/LoaderLarge";
import AddSearchBar from "@/components/AddSearchBar";
import { getAllPlaylists } from "@/Services/Api/Guide/GuideApi";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const fetchData = async (
    page = 1,
    search = "",
    order = "desc",
    filterValue = ""
  ) => {
    try {
      setData([]);
      setLoading(true);
      const result = await getAllPlaylists(
        page,
        10,
        search,
        order,
        filterValue
      );
      if (result.status) {
        console.log(result.data.results);
        setData(result.data.results || []);
        setTotalPages(result.data.totalPages || 1);
        setCurrentPage(result.data.page || 1);
      }
    } catch (error) {
      toast.error(error.message || "Error occured, please try again");
    }
    setLoading(false);
  };
  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const handleSort = (order) => {
    console.log("Sort order changed to:", order);
    setSortOrder(order);
    setCurrentPage(1);
  };
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData(1, searchTerm, sortOrder, filter);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    fetchData(currentPage, searchTerm, sortOrder, filter);
  }, [sortOrder, filter]);

  useEffect(() => {
    fetchData(currentPage, searchTerm, sortOrder, filter);
  }, [currentPage]);

  // useEffect(() => {
  //   fetchData(currentPage, searchTerm, sortOrder,filter);
  // }, [currentPage]);

  // // ✨ CHANGED: Initial load only (removed fetchData from here)
  // useEffect(() => {
  //   fetchData(1, "", sortOrder,"");
  // }, []);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between items-center">
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Playlists Management
        </p>
        {/* <Link href="/quickreads/quick-reads-requests">
          <button className="py-2 px-3 border border-[#08A03C] bg-white flex flex-row items-center gap-2 rounded-lg">
            <GreenLive />
            <p className="text-sm font-sans font-normal text-[#08A03C]">
              Create Playlists
            </p>
          </button>
        </Link> */}
      </div>
      <div className="flex flex-col">
        <AddSearchBar
          filterArray={[
            { value: "audio", label: "Audio" },
            { value: "video", label: "Video" },
            { value: "", label: "All" },
          ]}
          name={"Media Type"}
          handleSort={handleSort}
          setHandleSort={setSortOrder}
          setHandleFilter={handleFilterChange}
          handleSearch={handleSearch}
          showAddButton={true}
          title="Add new"
          route="/playlists/createPlaylist"
        />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-testTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Title
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              {/* <span className="text-[#666576] ml-2 font-sans font-normal text-sm">
                Created By
              </span> */}

              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Media Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm text-center">
                Status
              </span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center bg-white items-center p-10 w-full ">
              <LoaderLarge />
            </div>
          )}
          {!loading && data && data.length === 0 && (
            <div className="flex justify-center items-center bg-white p-10 w-full">
              {searchTerm || filter ? (
                <p className="text-gray-500 text-sm">
                  No data found
                  {searchTerm && ` for "${searchTerm}"`}
                  {filter && ` with filter "${filter}"`}.
                </p>
              ) : (
                <p className="text-gray-500 text-sm">No data found.</p>
              )}
            </div>
          )}
          <div className="flex flex-col bg-white min-w-fit w-full ">
            {data &&
              data.map((item, index) => (
                <Link
                  key={item._id || index}
                  href={`/playlists/${item._id}`}
                  className="hover:bg-slate-100"
                >
                  <div className=" grid grid-cols-testTable justify-between border-b border-[#E9E9EC] items-center p-4">
                    <div className="flex flex-row items-center gap-2">
                      <img
                        className={`w-8 h-8 object-cover rounded-full`}
                        src={item?.thumbnail?.url}
                        alt=""
                      />
                      <span
                        title={item.title}
                        className="text-userblack font-sans font-semibold text-sm truncate"
                      >
                        {item.title}
                      </span>
                    </div>
                    <span
                      title={item.description}
                      className="text-userblack font-sans font-semibold text-sm truncate"
                    >
                      {item.description}
                    </span>
                    {/* <div className="flex flex-row items-center gap-2">
                      <img
                          className={`w-8 h-8 object-cover rounded-full`}
                          src={
                            item?.thumbnail?.url
                          }
                          alt=""
                        />
                      <span className="text-userblack font-sans font-semibold text-sm text-center ml-2">
                        {item.creatorRole == "Guide"
                          ? item?.creator?.firstName
                          : "Soltopiah"}
                      </span>
                    </div> */}

                    <span className="text-userblack font-sans font-semibold text-sm">
                      {dayjs(item.createdAt).format("MMM DD YYYY")}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm capitalize">
                      {item?.type}
                    </span>
                    <span
                      className={`py-1 px-5 text-center w-[100px]  rounded-[78px] border font-sans font-normal text-base capitalize ${
                        item.isDisabled
                          ? "bg-red-100 text-red-500 border-red-500"
                          : "bg-[#DDFDE8] text-[#08A03C] border-[#A8FBC4]"
                      }`}
                    >
                      {item.isDisabled ? "Disabled" : "Active"}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        {!loading && data && data.length > 0 && totalPages > 1 && (
          <RobinPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
