"use client";
import React, { useEffect, useState } from "react";
import AddSearchBar from "../../../components/AddSearchBar";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";

import GreenLive from "../../../../icons/GreenLive";
import Link from "next/link";
import { getToken } from "@/Services/Cookie/userCookie";
import dayjs from "dayjs";
import Loader from "@/components/Loader";

function Page() {
  const [quickReadData, setQuickReadData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllQuickreadsDataApi();
  }, []);
  const token = getToken();
  const getAllQuickreadsDataApi = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_URL + "/quick-reads", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.results);
        setQuickReadData(result.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return (
    <>
      {" "}
      {loading && <Loader />}
      <div className="flex flex-col gap-7">
        <div className="flex flex-row justify-between items-center">
          <p className="text-userblack font-semibold text-xl2 font-sans">
            Quick reads management
          </p>
          <Link href="/quickreads/quick-reads-requests">
            <button className="py-2 px-3 border border-[#08A03C] bg-white flex flex-row items-center gap-2 rounded-lg">
              <GreenLive />
              <p className="text-sm font-sans font-normal text-[#08A03C]">
                Quick read Request (21)
              </p>
            </button>
          </Link>
        </div>
        <div className="flex flex-col">
          <AddSearchBar title="Add new" route="/quickreads/add-new-quickread" />
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-quickreadsMainTable justify-between p-4">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Title
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Created By
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Category
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm">
                  Date
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Slides
                </span>
              </div>
            </div>
            <div className="flex flex-col bg-white min-w-fit w-full ">
              {quickReadData &&
                quickReadData.map((item, index) => (
                  <div
                    key={item._id || index}
                    className=" grid grid-cols-quickreadsMainTable justify-between border-b border-[#E9E9EC] items-center p-4"
                  >
                    <span className="text-userblack font-sans font-semibold text-sm"> 
                      {item.title}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      Wade Warren
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      Free
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {dayjs(item.createdAt).format("MMM DD YYYY")}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      23456
                    </span>
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
