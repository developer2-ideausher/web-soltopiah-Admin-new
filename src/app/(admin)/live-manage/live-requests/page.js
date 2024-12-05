"use client";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Frame1 from "../../../../../public/Frame1.png";
import { getToken } from "@/Services/Cookie/userCookie";
import { toast } from "react-toastify";
import LoaderLarge from "@/components/LoaderLarge";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getPendingCount } from "@/Services/Api/LiveManagament/Live";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";

dayjs.extend(utc);

function Page() {
  const [liveData, setLiveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term.trim() === "") {
      // If search is empty, reset to default data
      fetchPendingCount(1);
      // Fetch default data
      return;
    }
    setCurrentPage(1);
    // Fetch filtered data based on search term
    fetchPendingCount(currentPage, sort, term);
  };

  const fetchPendingCount = async (page) => {
    setLoading(true);
    setLiveData([]);

    const result = await getPendingCount(page, sort, searchTerm);
    if (result.status) {
      console.log(result.data);
      setLiveData(result.data?.results);
      setTotalPages(result.data.totalPages);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPendingCount(currentPage);
  }, [currentPage, sort, searchTerm]);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-5">
        <Link href="/live-manage">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Live Requests
        </p>
      </div>
      <div className="flex flex-col">
        <SearchBar
          name={"Type"}
          handleSort={sort}
          setHandleSort={setSort}
          setHandleFilter={""}
          handleSearch={handleSearch}
          showAddButton={false}
          showFilters={false}
        />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-LiveReqTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Session tittle
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Hosted by
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Time
              </span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center bg-white items-center p-10 w-full ">
              <LoaderLarge />
            </div>
          )}
          {!loading &&
            liveData &&
            liveData.length === 0 &&
            searchTerm && (
              <div className="flex justify-center items-center bg-white p-10 w-full">
                <p className="text-gray-500 text-sm">
                  No data found for {searchTerm}.
                </p>
              </div>
            )}
          <div className="flex flex-col bg-white min-w-fit w-full">
            {liveData &&
              liveData.map((item, index) => (
                <Link
                  key={index}
                  href={`/live-manage/live-requests/${item._id}`}
                >
                  <div className=" grid grid-cols-LiveReqTable justify-between border-b border-[#E9E9EC] items-center p-4">
                    <span className="text-userblack font-sans font-semibold text-base">
                      {item.title}
                    </span>
                    <div className="text-userblack font-sans flex flex-row items-center gap-2 font-semibold text-base">
                      <img
                        className="h-8 w-8 object-cover rounded-full"
                        src={
                          item.guide && item.guide.profilePic
                            ? item.guide.profilePic.url
                            : Frame1.src
                        }
                        alt=""
                      />

                      <p>
                        {item.guide === null
                          ? "Removed Guide"
                          : (item.guide.firstName
                              ? item.guide.firstName
                              : item.guide._id.slice(-4)) +
                            " " +
                            (item.guide.lastName ? item.guide.lastName : "")}
                      </p>
                    </div>
                    <span className="text-userblack font-sans font-semibold text-base">
                      {dayjs(item.startDate).format("DD/MM/YYYY")}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-base">
                      {dayjs(item.startDate).utc().format("hh:mm A")}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <RobinPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />{" "}
      </div>
    </div>
  );
}

export default Page;
