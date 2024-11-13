"use client";
import React, { useEffect, useState } from "react";
import MenuDots from "../../../../icons/MenuDots";
import Frame1 from "../../../../public/Frame1.png";
import GreenLive from "../../../../icons/GreenLive";
import LiveButton from "../../../../icons/LiveButton";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Loader from "@/components/Loader";
import { getToken } from "@/Services/Cookie/userCookie";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { toast } from "react-toastify";
import LoaderLarge from "@/components/LoaderLarge";
import { useRouter } from "next/navigation";
import { getlive, getPendingCount } from "@/Services/Api/LiveManagament/Live";
import RobinPagination from "@/components/Pagination";

dayjs.extend(utc);

function Page() {
  const [liveManagementData, setLiveManagementData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  // useEffect(() => {
  //   if (!token) {
  //     toast.error("Session expired, login again");
  //     router.push("/login");
  //   } else {
  //     getAllLiveEventApi();
  //   }
  // }, []);
  // const token = getToken();

  // const getAllLiveEventApi = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer " + token);

  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };
  //   setLoading(true);

  //   fetch(process.env.NEXT_PUBLIC_URL + "/live-events", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result.data.results);
  //       if (result.message === "Failed to authenticate") {
  //         toast.error(result.message, { toastId: "1wmdewimmmmm" });
  //         router.push("/login");
  //       } else {
  //         setLiveManagementData(result.data.results);
  //         const liverequests = result.data.results;
  //         console.log("new", liverequests);
  //         const pendingLiveRequests = liverequests.filter(
  //           (item) => item.status === "pending"
  //         );
  //         console.log("hi", pendingLiveRequests);
  //         setPendingCount(pendingLiveRequests.length);
  //       }

  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error("Failed to fetch data. Please try again later.");
  //       setLoading(false);
  //     });
  // };

  const fetchData = async (page) => {
    setLoading(true);

    const result = await getlive(page);
    if (result.status) {
      console.log(result.data.results);
      console.log("Total pages:", result.data.totalPages);

      setLiveManagementData(result.data.results);
      setTotalPages(result.data.totalPages);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  const fetchPendingCount = async (page) => {
    setLoading(true);

    const result = await getPendingCount(page);
    if (result.status) {
      console.log(result.data);
      setPendingCount(result.data?.totalResults);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData(currentPage);
    fetchPendingCount(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col gap-7">
        <div className="flex flex-row justify-between items-center">
          <p className="text-userblack font-semibold text-xl2 font-sans">
            Live Management
          </p>
          <Link href="/live-manage/live-requests">
            <button className="py-2 px-3 border border-[#EE3E3E] bg-white flex flex-row items-center gap-2 rounded-lg">
              <LiveButton />
              <p className="text-sm font-sans font-normal text-[#EE3E3E]">
                Live Requests({pendingCount})
              </p>
            </button>
          </Link>
        </div>
        <div className="flex flex-col">
          <SearchBar />
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-LiveMainTable justify-between p-4">
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

                <span className="text-[#666576] text-center font-sans font-normal text-sm">
                  Status
                </span>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center bg-white items-center p-10 w-full ">
                <LoaderLarge />
              </div>
            )}
            <div className="flex flex-col bg-white min-w-fit w-full">
              {liveManagementData &&
                liveManagementData.map((item, index) => (
                  <Link
                    key={item._id || index}
                    href={`/live-manage/${item._id}`}
                  >
                    <div className=" grid grid-cols-LiveMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
                      <span className="text-userblack font-sans font-semibold text-base">
                        {item.title}
                      </span>
                      <div className="text-userblack font-sans flex flex-row items-center gap-2 font-semibold text-base">
                        <img
                          src={
                            item.guide && item.guide.profilePic
                              ? item.guide.profilePic.url
                              : Frame1.src
                          }
                          alt=""
                          onError={(e) => {
                            e.target.src = Profile2.src;
                          }} //
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <p>
                          {item.guide == null
                            ? "Removed Guide"
                            : `${
                                item.guide.firstName ?? item.guide._id.slice(-4)
                              } ${item.guide.lastName ?? ""}`}
                        </p>
                        {/* <p>{item.guide?._id.slice(-4)??"Removed Guide"}</p> */}
                      </div>
                      <span className="text-userblack font-sans font-semibold text-base">
                        {dayjs(item.startDate).format("DD/MM/YYYY")}
                      </span>
                      <span className="text-userblack font-sans font-semibold text-base">
                        {dayjs(item.startDate).utc().format("hh:mm A")}
                      </span>

                      <div
                        className={`${
                          item.status === "pending" &&
                          "bg-[#F9882433] border-[#F9882436] text-[#B35605]"
                        } ${
                          item.status === "approved" &&
                          "bg-[#DDFDE8] text-[#08A03C] border-[#A8FBC4]"
                        } ${
                          item.status === "declined" &&
                          "bg-red-100 text-red-500 border-red-500"
                        }  py-1 px-3 text-center rounded-[78px] border  font-sans font-normal text-base capitalize`}
                      >
                        {item.status}
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
    </>
  );
}

export default Page;
