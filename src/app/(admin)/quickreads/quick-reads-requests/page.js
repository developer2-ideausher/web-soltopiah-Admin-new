"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { getToken } from "@/Services/Cookie/userCookie";
import dayjs from "dayjs";
import Loader from "@/components/Loader";
import Frame1 from "../../../../../public/Frame1.png";
import LoginImage from "../../../../../public/LoginImage.png";


function Page() {
  const [QuickRequestsData, setQuickRequestsData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllQuickRequestApi();
  }, []);
  const token = getToken();

  const getAllQuickRequestApi = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };
    setLoading(true);

    fetch(
      process.env.NEXT_PUBLIC_URL + "/quick-reads?status=pending",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.results);
        setQuickRequestsData(result.data.results);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-7">
        <div className="flex flex-row gap-5 items-center">
          <Link href="/quickreads">
            <BackButton />
          </Link>
          <p className="text-userblack font-semibold text-xl2 font-sans">
            Quick reads
          </p>
        </div>
        <div className="flex flex-col">
          <SearchBar />
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-quickReadsRequestTable justify-between p-4">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Title
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Published by
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Date
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm">
                  Category
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Time
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Slides
                </span>
              </div>
            </div>
            <div className="flex flex-col bg-white min-w-fit w-full">
              {QuickRequestsData &&
                QuickRequestsData.map((item, index) => (
                  <Link
                    key={index}
                    href={`/quickreads/quick-reads-request?requestID=${item._id}`}
                  >
                    <div className=" grid grid-cols-quickReadsRequestTable justify-between border-b border-[#E9E9EC] items-center p-4">
                      <span className="text-userblack  font-sans font-semibold text-base">
                        {item.title}
                      </span>
                      <div className="text-userblack font-sans flex flex-row items-center gap-3 font-semibold text-base">
                        <img
                          className="w-8 h-8 object-cover rounded-full"
                          src={
                            item.creatorRole === "Guide"
                              ? item.creator.profilePic
                                ? item.creator.profilePic.url
                                : Frame1.src
                              : LoginImage.src
                          }
                          alt=""
                        />
                        <p> {item.creatorRole == "Guide"
                          ? item?.creator.firstName
                          : "Soltopiah"}</p>
                      </div>

                      <span className="text-userblack font-sans font-semibold text-base">
                        {dayjs(item.updatedAt).format("MMM DD,YYYY")}
                      </span>
                      <span className="text-userblack font-sans font-semibold text-base">
                        Mental Health
                      </span>

                      <div className="text-userblack  font-sans font-semibold text-base">
                        {dayjs(item.updatedAt).format("h:mm a")}
                      </div>
                      <div className="text-userblack  font-sans font-semibold text-base">
                        {item.pictures.length}
                      </div>
                    </div>
                  </Link>
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
