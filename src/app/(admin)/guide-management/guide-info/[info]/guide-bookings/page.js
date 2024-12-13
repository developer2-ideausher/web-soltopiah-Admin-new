"use client";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGuideBookings } from "@/Services/Api/UserManagement/user";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import LoaderLarge from "@/components/LoaderLarge";
import RobinPagination from "@/components/Pagination";
import { truncateName } from "@/Utilities/helper";
import { getGuideBookingsData } from "@/Services/Api/Guide/GuideApi";
import SearchBar from "@/components/AddSearchBar";

dayjs.extend(isBetween);

function Page({ params }) {
  const router = useRouter();
  const { info } = params;
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
    const result = await getGuideBookingsData(info, page, sort, searchTerm);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
      setTotalPages(result.data.totalPages);

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
      <div className="flex flex-row gap-5 items-center">
        <div onClick={() => router.back()}>
          <BackButton />
        </div>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Guide management -{" "}
          <span className="text-[#AE445A]">Guide Bookings</span>{" "}
        </p>
      </div>
      {/* <UserDetailsBox /> */}
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
            <div className="items-center grid grid-cols-userGuideTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Guide name
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Time
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Session Name
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Session cost
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Status
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
          <div className="flex flex-col bg-white min-w-fit w-full">
            {data &&
              data.map((item, index) => (
                <div
                  key={item._id || index}
                  className=" grid grid-cols-userGuideTable justify-between border-b border-[#E9E9EC] items-center p-4"
                >
                  <span className="text-userblack font-sans font-semibold text-base">
                    {item.user?.firstName + " " + item.user?.lastName}
                  </span>
                  <div className="text-userblack font-sans  gap-2 font-normal text-base">
                    <p>{dayjs(item.bookingDate).format("DD/MM/YYYY")}</p>
                  </div>
                  <span className="text-userblack font-sans font-normal  text-base">
                    {item.startTime}
                  </span>
                  <span className="text-userblack font-sans font-normal  text-base">
                    {truncateName(item.guideSession?.name)}
                  </span>
                  <span className="text-userblack font-sans font-normal  text-base">
                    {"$"} {item.cost == 0 ? "Free" : item.cost}
                  </span>

                  <div className="font-sans font-normal text-userblack text-base">
                    {getSessionStatus(
                      item.bookingDate,
                      item.startTime,
                      item.endTime
                    )}
                  </div>
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
        )}
      </div>
    </div>
  );
}

export default Page;
