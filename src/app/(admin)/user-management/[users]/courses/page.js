"use client";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import newImage from "../../../../../../public/newImage.png";
import { useRouter } from "next/navigation";
import {
  getCreatedChallenges,
  userCourses,
} from "@/Services/Api/UserManagement/user";
import LoaderLarge from "@/components/LoaderLarge";
import { truncateDescription, truncateName } from "@/Utilities/helper";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";

function Page({ params }) {
  const { users } = params;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term.trim() === "") {
      // If search is empty, reset to default data
      fetchData(1);
      // Fetch default data
      return;
    }
    setCurrentPage(1);
    // Fetch filtered data based on search term
    fetchData(currentPage, sort, term);
  };
  const fetchData = async (page) => {
    setLoading(true);
    setData([]);
    const result = await userCourses(users, page, sort, searchTerm);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
      setTotalPages(result.data.totalPages);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, sort, searchTerm]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <div onClick={() => router.back()}>
          <BackButton />
        </div>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Users management - <span className="text-[#AE445A]">Courses</span>{" "}
        </p>
      </div>
      {/* <UserDetailsBox  /> */}
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
            <div className="items-center grid grid-cols-userCourses justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Name
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Progress
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Access
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
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
                  className=" grid grid-cols-userCourses justify-between border-b border-[#E9E9EC] items-center p-4"
                >
                  <div className="text-userblack font-sans flex flex-row items-center gap-3 font-semibold text-base ">
                    <img
                      src={item.course?.thumbnail.url || "/Frame1.png"}
                      alt="image"
                      className="w-11 h-11 rounded-md"
                    />
                    <p>{truncateName(item.course?.title)}</p>
                  </div>
                  <span className="text-userblack w-[350px] font-sans font-semibold text-base">
                    {item.progressPercentage + "%"}
                  </span>

                  <span className="text-userblack font-sans font-semibold text-base capitalize">
                    {item.course?.accessibility}
                  </span>

                  <div className="font-sans font-normal text-base capitalize">
                    {item.course?.courseContentType}
                  </div>
                </div>
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
