"use client";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Frame1 from "../../../../../public/Frame1.png";
import { getToken } from "@/Services/Cookie/userCookie";
import { toast } from "react-toastify";
import LoaderLarge from "@/components/LoaderLarge";

function Page() {
  const [liveData, setLiveData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllLiveApi();
  }, []);
  const token = getToken();
  const getAllLiveApi = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setLoading(true);
    fetch(
      process.env.NEXT_PUBLIC_URL + "/live-events?status=pending",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.results);
        setLiveData(result.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch data");

        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-5">
        <Link href="/live-manage">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Live Request
        </p>
      </div>
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-LiveReqTable justify-between p-4">
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
            </div>
          </div>
          {loading && (
            <div className="flex justify-center bg-white items-center p-10 w-full ">
              <LoaderLarge />
            </div>
          )}
          <div className="flex flex-col bg-white min-w-fit w-full">
            {liveData &&
              liveData.map((item, index) => (
                <Link
                  key={index}
                  href={`/live-manage/live-requests/${item._id}`}
                >
                  <div className=" grid grid-cols-LiveReqTable justify-between border-b border-[#E9E9EC] items-center p-4">
                    <span className="text-userblack font-sans font-semibold text-base">
                      {item.title}
                    </span>
                    <div className="text-userblack font-sans flex flex-row items-center gap-2 font-semibold text-base">
                      <img
                        className="h-8 w-8 object-cover rounded-full"
                        src={
                          item.guide && item.guide.profilePic
                            ? item.guide.profilePic.url
                            : Frame1.src
                        }
                        alt=""
                      />

                      <p>
                        {item.guide === null
                          ? "Removed Guide"
                          : (item.guide.firstName
                              ? item.guide.firstName
                              : item.guide._id.slice(-4)) +
                            " " +
                            (item.guide.lastName ? item.guide.lastName : "")}
                      </p>
                    </div>
                    <span className="text-userblack font-sans font-semibold text-base">
                      Mon, Feb 16, 24
                    </span>
                    <span className="text-userblack font-sans font-semibold text-base">
                      3:30 PM
                    </span>
                    <span className="text-userblack font-sans font-semibold text-base">
                      Meditatation
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default Page;
