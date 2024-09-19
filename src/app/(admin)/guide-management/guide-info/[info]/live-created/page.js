"use client";
import React, { useEffect, useState } from "react";
import Export from "../../../../../../../icons/Export";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLiveCreated } from "@/Services/Api/Guide/GuideApi";
import dayjs from "dayjs";
import LoaderLarge from "@/components/LoaderLarge";

function Page({ params }) {
  const { info } = params;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (info) => {
    setLoading(true)
    const result = await getLiveCreated(info);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
      setLoading(false)
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(info);
  }, []);
  return (
    <div className="flex flex-col gap-7 ">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <div onClick={() => router.back()}>
            <BackButton />
          </div>
          <p className="text-xl2 font-semibold text-userblack font-sans">
            Guide Management -
            <span className="text-[#AE445A]">Live created</span>
          </p>
        </div>
        <div className="flex flex-row items-center gap-5">
          <select className="py-[10px] px-3 border border-[#DCDBE1] rounded-lg text-sm font-sans font-normal text-userblack focus:outline-none">
            <option value="1">Feb 10 - Feb 16, 22</option>
          </select>
          <div className="bg-white border border-[#DCDBE1] py-[10px] px-3 rounded-lg flex flex-row items-center gap-2">
            <Export />
            <p className="text-sm font-sans font-normal text-userblack">
              Export
            </p>
          </div>
        </div>
      </div>
      <div>
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-liveCreatedTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Time
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Title
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Status
              </span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center bg-white items-center p-10 w-full ">
              <LoaderLarge />
            </div>
          )}
          {data &&
            data.map((item, index) => (
              <div key={item._id || index} className="flex flex-col bg-white min-w-fit w-full ">
                <div className=" grid grid-cols-liveCreatedTable justify-between border-b border-[#E9E9EC] items-center p-4">
                  <p className="text-sm font-sans font-semibold text-[#252322]">
                    {dayjs(item.startDate).format("DD/MM/YYYY")}
                  </p>

                  <span className="text-userblack font-sans font-semibold text-sm">
                  {dayjs(item.startDate).format("hh:mm A")}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm capitalize">
                    {item.title}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm break-all">
                   {item.description }
                  </span>
                  <span className="text-userblack font-sans  font-semibold text-sm capitalize">
                    {item.status}
                  </span>
                </div>
               
              </div>
            ))}
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default Page;
