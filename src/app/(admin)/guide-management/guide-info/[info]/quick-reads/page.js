"use client";
import React, { useEffect, useState } from "react";
import Export from "../../../../../../../icons/Export";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import newImage from "../../../../../../../public/newImage.png";
import { useRouter } from "next/navigation";
import { getQuickReads } from "@/Services/Api/Guide/GuideApi";
import dayjs from "dayjs";
import LoaderLarge from "@/components/LoaderLarge";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";
import html2canvas from "html2canvas";

function Page({ params }) {
  const { info } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const handleExport = async () => {
    const element = document.getElementById("right-side"); // or any other element you want to capture
    const titleElement = document.getElementById("titleName");
    const titleText = titleElement ? titleElement.textContent.trim() : "Record";
    html2canvas(element, {
      useCORS: true,
      logging: true,
      renderer: {
        type: "canvas",
        quality: 1,
      },
    }).then((canvas) => {
      const imageDataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${titleText}-${dayjs().format("DD-MM-YYYY")}.png`;
      link.href = imageDataURL;
      link.click();
    });
  };
  const handleSearch = (term) => {
    setSearchTerm(term);

    setCurrentPage(1);
    // Fetch filtered data based on search term
  };

  const router = useRouter();
  const fetchData = async (page) => {
    setLoading(true);
    setData([]);
    const result = await getQuickReads(info, page, sort, searchTerm);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
      setLoading(false);
    } else {
      console.error(result.message);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, sort, searchTerm]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <div onClick={() => router.back()}>
            <BackButton />
          </div>
          <p className="text-xl2 font-semibold text-userblack font-sans">
            Guide Management -
            <span id="titleName" className="text-[#AE445A]">
              {" "}
              Quick reads
            </span>
          </p>
        </div>
        <div className="flex flex-row items-center gap-5">
          {/* <select className="py-[10px] px-3 border border-[#DCDBE1] rounded-lg text-sm font-sans font-normal text-userblack focus:outline-none">
            <option value="1">Feb 10 - Feb 16, 22</option>
          </select> */}
          <button
            onClick={handleExport}
            className="bg-white border border-[#DCDBE1] py-[10px] px-3 rounded-lg flex flex-row items-center gap-2"
          >
            <Export />
            <p className="text-sm font-sans font-normal text-userblack">
              Export
            </p>
          </button>
        </div>
      </div>
      <div>
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
            <div className="items-center grid grid-cols-quickreadsTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Thumbnail
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Category
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Slides
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
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
          {data &&
            data.map((item, index) => (
              <div
                key={item._id || index}
                className="flex flex-col bg-white min-w-fit w-full "
              >
                <div className=" grid grid-cols-quickreadsTable justify-between border-b border-[#E9E9EC] items-center p-4">
                  <div className="flex flex-row items-center gap-4">
                    <img
                      src={item.pictures?.[0]?.url || newImage.src}
                      alt="quickReadsImage"
                      className="w-11 h-11 rounded-md"
                    />
                    <p className="text-sm font-sans font-semibold text-[#252322]">
                      {item.title}
                    </p>
                  </div>
                  <span className="text-userblack  font-sans font-semibold text-sm">
                    {item.title}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm">
                    {item.pictures?.length}
                  </span>
                  <span className="text-userblack font-sans  font-semibold text-sm">
                    {dayjs(item.createdAt).format("DD/MM/YYYY")}
                  </span>
                  <span className="text-userblack font-sans  font-semibold text-sm capitalize">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
        {data && data.length > 0 && (
          <RobinPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
