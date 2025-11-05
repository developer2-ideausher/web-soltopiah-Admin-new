"use client";
import LoaderLarge from "@/components/LoaderLarge";
import RobinPagination from "@/components/Pagination";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddSearchBar from "@/components/AddSearchBar";
import { getAllInvites } from "@/Services/Api/Invites/page";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const UserInviteTable = ({refreshKey}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAllInvites("NormalUser",currentPage, 10);
      if (result.data) {
        setData(result.data.results || []);
        setTotalPages(result.data.totalPages || 1);
        setCurrentPage(result.data.page || 1);
      }
    } catch (error) {
      toast.error(error.message || "Error occured, please try again");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [refreshKey,currentPage]);
  return (
    <div className="flex flex-col">
      <AddSearchBar
        filterArray={[
          { value: "audio", label: "Audio" },
          { value: "video", label: "Video" },
          { value: "", label: "All" },
        ]}
        name={"Media Type"}
        // handleSort={handleSort}
        // setHandleSort={setSortOrder}
        // setHandleFilter={handleFilterChange}
        // handleSearch={handleSearch}
        showAddButton={false}
        title="Add new"
        route="/playlists/createPlaylist"
      />
      <div className="w-full overflow-x-scroll booking-table-wrapper">
        <div className="bg-[#F0F2F5] min-w-fit w-full">
          <div className="items-center grid grid-cols-userInviteTable justify-between p-4">
            <span className="text-[#666576] font-sans font-normal text-sm">
              User
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm">
              Email Id
            </span>
            {/* <span className="text-[#666576] ml-2 font-sans font-normal text-sm">
                Created By
              </span> */}

            <span className="text-[#666576] font-sans font-normal text-sm">
              Issued On
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm">
              Code
            </span>
            {/* <span className="text-[#666576] font-sans font-normal text-sm text-center">
              Type
            </span> */}
            <span className="text-[#666576] font-sans font-normal text-sm text-center">
              Expiry
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm text-center">
              Invite accepted on
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm text-center">
              Status
            </span>
            <span className=" font-sans font-normal text-sm text-center"></span>
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
                <div className=" grid grid-cols-userInviteTable justify-between border-b border-[#E9E9EC] items-center p-4">
                  <div className="flex flex-row items-center gap-2">
                    {/* <img
                                            className={`w-8 h-8 object-cover rounded-full`}
                                            src={item?.thumbnail?.url}
                                            alt=""
                                        /> */}
                    <span
                      title={item.name}
                      className="text-userblack font-sans font-semibold text-sm truncate"
                    >
                      {item.name}
                    </span>
                  </div>
                  <span
                    title={item.email}
                    className="text-userblack font-sans font-semibold text-sm truncate"
                  >
                    {item.email}
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
                    {dayjs(item.createdAt).format("DD/MM/YYYY ,   hh:mm A")}
                  </span>

                  <span className="text-userblack font-sans font-semibold text-sm capitalize">
                    {item?.code}
                  </span>
                  {/* <span className="text-userblack font-sans font-semibold text-sm capitalize">
                    {item?.type}
                  </span> */}
                  <span className="text-userblack font-sans font-semibold text-sm text-center">
                    {dayjs(item.expiry).format("DD/MM/YYYY , hh:mm A")}{" "}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm text-center">
                    {item?.acceptedAt
                      ? dayjs(item.acceptedAt).format("DD/MM/YYYY hh:mm A")
                      : "--"}
                  </span>
                  <div className="flex justify-center">
                    <span
                      className={`py-1 px-5  w-[100px] rounded-[78px] border font-sans font-normal text-base capitalize  
    ${
      item.status === "revoked" || item.status === "expired"
        ? "bg-red-100 text-red-500 border-red-500"
        : item.status === "accepted"
        ? "bg-[#DDFDE8] text-[#08A03C] border-[#A8FBC4]"
        : item.status === "pending"
        ? "bg-orange-100 text-orange-500 border-orange-500"
        : ""
    }`}
                    >
                      {item.status}
                    </span>
                  </div>
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
  );
};

export default UserInviteTable;
