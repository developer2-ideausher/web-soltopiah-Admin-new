"use client";
import React, { useEffect, useState } from "react";
import Export from "../../../../../../../icons/Export";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import newImage from "../../../../../../../public/newImage.png";
import MenuDots from "../../../../../../../icons/MenuDots";
import { useRouter } from "next/navigation";
import { getContent } from "@/Services/Api/Guide/GuideApi";
import LoaderLarge from "@/components/LoaderLarge";

function Page({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { info } = params;
  const fetchData = async () => {
    setLoading(true);
    const result = await getContent(info);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
      setLoading(false);
    } else {
      console.error(result.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <div onClick={() => router.back()}>
            <BackButton />
          </div>
          <p className="text-xl2 font-semibold text-userblack font-sans">
            Guide Management -
            <span className="text-[#AE445A]"> Content uploaded</span>
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
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-contentUploadedTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Thumbnail
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Category
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Access
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center items-center bg-white">
              <LoaderLarge />
            </div>
          )}

          {!loading && data.length === 0 && (
            <div className="text-center bg-white text-lg font-semibold text-gray-600 p-4">
              No data yet.
            </div>
          )}

          {data &&
            data.map((item, index) => (
              <div
                key={item._id || index}
                className="flex flex-col bg-white min-w-fit w-full "
              >
                <div className=" grid grid-cols-contentUploadedTable justify-between border-b border-[#E9E9EC] items-center p-4">
                  <div className="flex flex-row items-center gap-4">
                    <img
                      src={item.thumbnail?.url || newImage.src}
                      alt="thumbnail"
                      className="w-11 h-11 rounded-md"
                    />
                    <p className="text-sm font-sans font-semibold text-[#252322]">
                      {item.title}
                    </p>
                  </div>
                  <span className="text-userblack w-[300px] font-sans font-semibold text-sm">
                    {item.description}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm capitalize">
                    {item.category?.title}
                  </span>
                  <span className="text-userblack font-sans  font-semibold text-sm capitalize">
                    {item.type}
                  </span>
                  <span className="text-userblack font-sans  font-semibold text-sm capitalize">
                    {item.accessibility}
                  </span>
                  <span className="text-userblack font-sans  font-semibold text-sm">
                    <MenuDots />
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
