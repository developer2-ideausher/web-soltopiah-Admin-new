"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LeftBlackarrow from "../../../../../../../icons/LeftBlackarrow";
import BackButton from "@/components/BackButton";
import isBetween from "dayjs/plugin/isBetween";
import LoaderLarge from "@/components/LoaderLarge";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { guideSessionBooked } from "@/Services/Api/Guide/GuideApi";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";

dayjs.extend(isBetween);

function Page({ params }) {
  const { info } = params;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");

  const handleSearch = (term) => {
    setSearchTerm(term);

    setCurrentPage(1);
    // Fetch filtered data based on search term
  };
  const fetchData = async (page) => {
    setLoading(true);
    setData([]);
    const result = await guideSessionBooked(info, page, sort, searchTerm);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);

      setLoading(false);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, sort, searchTerm]);
  const getSessionStatus = (bookingDate, startTime, endTime) => {
    const sessionStart = dayjs(`${bookingDate} ${startTime}`);
    const sessionEnd = dayjs(`${bookingDate} ${endTime}`);
    const now = dayjs();

    if (now.isBetween(sessionStart, sessionEnd)) {
      return "Ongoing";
    } else if (now.isBefore(sessionStart)) {
      return "Upcoming";
    } else {
      return "Completed";
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-5">
        <button onClick={() => router.back()}>
          <BackButton />
        </button>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Session Booked
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
          <div className="bg-[#F0F2F5] min-w-fit w-full ">
            <div className="items-center grid grid-cols-sessionTable p-4 justify-between">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Tran. id
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                User. id
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Username
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Time
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Session type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Session cost
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Status
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Guide earning
              </span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center items-center bg-white">
              <LoaderLarge />
            </div>
          )}

          {!loading &&
            data.length === 0 &&
            (searchTerm ? (
              <div className="flex justify-center items-center bg-white p-10 w-full">
                <p className="text-gray-500 text-sm">
                  No data found for {searchTerm}.
                </p>
              </div>
            ) : (
              <div className="text-center bg-white text-lg font-semibold text-gray-600 p-4">
                No data yet.
              </div>
            ))}
          <div className="flex flex-col bg-white min-w-fit w-full ">
            {data &&
              data.map((item, index) => (
                <div
                  key={item._id || index}
                  className=" grid grid-cols-sessionTable border-b border-[#E9E9EC] items-center justify-between p-4"
                >
                  <span className="text-userblack text-base font-semibold font-sans">
                    32861
                  </span>
                  <span
                    title={item._id}
                    className="text-userblack text-base font-semibold font-sans"
                  >
                    {item._id.slice(-8)}
                  </span>

                  <span className="text-base font-sans font-semibold text-userblack">
                    {item.user?.firstName}{" "}
                    {item.user.lastName ? item.user.lastName : ""}
                  </span>
                  <span className="text-base font-sans font-semibold text-userblack">
                    {dayjs(item.bookingDate).format("DD/MM/YYYY")}
                  </span>
                  <span className="text-base font-sans font-semibold text-userblack">
                    {item.startTime}
                  </span>
                  <span className="text-base font-sans font-semibold text-userblack">
                    {item.cost == 0 ? "Free" : "Paid"}
                  </span>
                  <span className="text-base font-sans font-semibold text-userblack">
                    {"$"} {item.cost == 0 ? "--" : item.cost}
                  </span>
                  <span className="text-base font-sans font-semibold text-userblack">
                    {getSessionStatus(
                      item.bookingDate,
                      item.startTime,
                      item.endTime
                    )}
                  </span>
                  <span className="text-base font-sans font-semibold text-userblack">
                    $120 / hr
                  </span>
                </div>
              ))}
          </div>
        </div>
        {data && data.length > 0 && (
          <RobinPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}{" "}
      </div>
    </div>
  );
}

export default Page;
