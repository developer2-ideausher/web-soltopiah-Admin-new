"use client";
import React, { useEffect, useState } from "react";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";
import Profile2 from "../../../../public/Profile2.png";
import GreenLive from "../../../../icons/GreenLive";
import LiveButton from "../../../../icons/LiveButton";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Loader from "@/components/Loader";
import { getToken } from "@/Services/Cookie/userCookie";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function Page() {
  const [liveManagementData, setLiveManagementData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllLiveEventApi();
  }, []);
  const token = getToken();

  const getAllLiveEventApi = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setLoading(true);

    fetch(process.env.NEXT_PUBLIC_URL + "/live-events", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.results);
        setLiveManagementData(result.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-7">
        <div className="flex flex-row justify-between items-center">
          <p className="text-userblack font-semibold text-xl2 font-sans">
            Live Management
          </p>
          <Link href="/live-manage/live-requests">
            <button className="py-2 px-3 border border-[#EE3E3E] bg-white flex flex-row items-center gap-2 rounded-lg">
              <LiveButton />
              <p className="text-sm font-sans font-normal text-[#EE3E3E]">
                Live Requests(21)
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
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Category
                </span>

                <span className="text-[#666576] text-center font-sans font-normal text-sm">
                  Status
                </span>
              </div>
            </div>
            <div className="flex flex-col bg-white min-w-fit w-full">
              {liveManagementData &&
                liveManagementData.map((item, index) => (
                  <div key={item._id || index}  className=" grid grid-cols-LiveMainTable justify-between border-b border-[#E9E9EC] items-center p-4">
                    <span className="text-userblack font-sans font-semibold text-base">
                      {item.title}
                    </span>
                    <div className="text-userblack font-sans flex flex-row items-center gap-2 font-semibold text-base">
                      <img src={item.guide.profilePic?.url || Profile2.src} alt=""
                       onError={(e) => { e.target.src = Profile2.src; }} // 
                       className="h-8 w-8 rounded-full object-cover" />
                      {/* <img src={item.guide.profilePic==null?Profile2.src:item.guide.profilePic} alt=""/> */}
                      <p>{item.guide.firstName+' '+item.guide.lastName}</p>
                    </div>
                    <span className="text-userblack font-sans font-semibold text-base">
                      {dayjs(item.startDate).format("ddd MMM DD,YY")}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-base">
                      {dayjs(item.startDate).format("HH:mm")}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-base">
                      Meditatation
                    </span>

                    <div
                      className={`${
                        item.status === "pending"
                          ? "bg-[#F9882433] border-[#F9882436] text-[#B35605]"
                          : "bg-[#DDFDE8] text-[#08A03C] border-[#A8FBC4]"
                      }  py-1 px-3 text-center rounded-[78px] border  font-sans font-normal  text-base capitalize`}
                    >
                      {item.status}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <Pagination />
        </div>
      </div>
    </>
  );
}

export default Page;
