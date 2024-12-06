"use client";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Profile2 from "../../../../../../public/Profile2.png";
import Frame1 from "../../../../../../public/Frame1.png";
import { useRouter } from "next/navigation";
import { userParticipated } from "@/Services/Api/UserManagement/user";
import LoaderLarge from "@/components/LoaderLarge";
import { truncateDescription, truncateName } from "@/Utilities/helper";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";

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
    
  };

  const fetchData = async (page) => {
    setLoading(true);
    setData([])
    const result = await userParticipated(users, page, sort, searchTerm);
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
          Users management -{" "}
          <span className="text-[#AE445A]">Participated challenges</span>{" "}
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
            <div className="items-center grid grid-cols-userParticipatedTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Name
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Duration (in days)
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Categories
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Created By
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
                  className=" grid grid-cols-userParticipatedTable justify-between border-b border-[#E9E9EC] items-center p-4"
                >
                  <div className="text-userblack font-sans flex flex-row items-center gap-3 font-semibold text-base">
                    <img
                      src={item.challenge?.thumbnail?.url || Frame1.src}
                      alt="thumbnail"
                      className="w-11 h-11 rounded-md"
                    />
                    <p>{truncateName(item.challenge?.title)}</p>
                  </div>
                  <span className="text-userblack  font-sans font-semibold text-base">
                    {truncateDescription(item.challenge?.description)}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-base">
                    {item.challenge?.durationInDays}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-base">
                    {truncateName(item.challengeCategory?.title)}
                  </span>

                  <div className="font-sans font-normal text-base">
                    {item.challengeCreator?.firstName ||
                    item.challengeCreator?.lastName
                      ? `${item.challengeCreator?.firstName || ""} ${
                          item.challengeCreator?.lastName || ""
                        }`.trim()
                      : "Admin"}
                  </div>
                </div>
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
