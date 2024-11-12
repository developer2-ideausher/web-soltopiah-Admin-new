"use client";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getFriends } from "@/Services/Api/UserManagement/user";
import LoaderLarge from "@/components/LoaderLarge";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import RobinPagination from "@/components/Pagination";

function Page({ params }) {
  const router = useRouter();

  const { info } = params;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchData = async (page) => {
    setLoading(true);
    const result = await getFriends(info,page);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
    } else {
      console.error(result.message);
    }
    setLoading(false)
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <div onClick={() => router.back()}>
          <BackButton />
        </div>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Guide management -<span className="text-[#AE445A]"> Friends</span>
        </p>
      </div>
      {/* <UserDetailsBox /> */}
      <div className="flex flex-col">
        <SearchBar />
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-userFriendsTable justify-between p-4">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  User name
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  User ID
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Account Created
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

            {!loading && data.length === 0 && (
              <div className="text-center bg-white text-lg font-semibold text-gray-600 p-4">
                No friends found.
              </div>
            )}
            <div className="flex flex-col bg-white min-w-fit w-full">
              {data &&
                data.map((item, index) => {
                  const currentUser =
                    item.user1?._id === users ? item.user2 : item.user1;
                  return (
                    <div
                      key={item._id || index}
                      className=" grid grid-cols-userFriendsTable justify-between border-b border-[#E9E9EC] items-center p-4"
                    >
                      <span className="text-userblack font-sans font-semibold text-base">
                        {currentUser?.firstName || "Unknown"}{" "}
                        {currentUser?.lastName || ""}{" "}
                      </span>

                      <span className="text-userblack  font-sans font-semibold text-base">
                        {currentUser?._id || "N/A"}
                      </span>

                      <span className="text-userblack  font-sans font-semibold text-base">
                        {dayjs(currentUser?.createdAt).format("DD/MM/YYYY")}
                      </span>
                      <span className="text-userblack font-sans font-semibold text-base">
                        Subscribed
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        

          <RobinPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />      </div>
    </div>
  );
}

export default Page;
