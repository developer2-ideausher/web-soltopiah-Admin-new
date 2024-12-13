"use client";
import SearchBar from "@/components/AddSearchBar";
import BackButton from "@/components/BackButton";
import LoaderLarge from "@/components/LoaderLarge";
import RobinPagination from "@/components/Pagination";
import Pagination from "@/components/Pagination";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import { getListenedAudio } from "@/Services/Api/UserManagement/user";
import { truncateDescription, truncateName } from "@/Utilities/helper";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page({ params }) {
  const router = useRouter();
  const { users } = params;
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
    const result = await getListenedAudio(users, page, sort, searchTerm);
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
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <div onClick={() => router.back()}>
          <BackButton />
        </div>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Users management -
          <span className="text-[#AE445A]"> Audio Listened</span>
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
            <div className="items-center grid grid-cols-userAudioTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Title
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Category
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
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
                  className=" grid grid-cols-userAudioTable justify-between border-b border-[#E9E9EC] items-center p-4"
                >
                  <span className="text-userblack font-sans font-semibold text-base">
                    {truncateName(item?.chapter?.title) || "Na"}
                  </span>
                  <div className="text-userblack font-sans  gap-2 font-normal text-base">
                    <p>
                      {truncateDescription(item?.chapter?.description) || "NA"}
                    </p>
                  </div>
                  <span className="text-userblack font-sans font-normal  text-base">
                    {item?.chapterCategory?.title || "NA"}
                  </span>
                  <span className="text-userblack font-sans font-normal  text-base">
                    {dayjs(item?.createdAt).format("DD/MM/YYYY") || "NA"}
                  </span>
                  <span className="text-userblack font-sans font-normal capitalize text-base">
                    {item?.chapter?.accessibility || "NA"}
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
        )}
      </div>
    </div>
  );
}

export default Page;
