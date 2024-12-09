"use client";
import React, { useEffect, useState } from "react";
import Export from "../../../../../../../icons/Export";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import newImage from "../../../../../../../public/newImage.png";
import MenuDots from "../../../../../../../icons/MenuDots";
import { useRouter } from "next/navigation";
import { getContent } from "@/Services/Api/Guide/GuideApi";
import LoaderLarge from "@/components/LoaderLarge";
import { truncateDescription, truncateName } from "@/Utilities/helper";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";
import dayjs from "dayjs";
import html2canvas from "html2canvas";

function Page({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { info } = params;
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
 
  const handleSearch = (term) => {
    setSearchTerm(term);

    setCurrentPage(1);
    // Fetch filtered data based on search term
  };
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
  const fetchData = async (page) => {
    setLoading(true);
    setData([])
    const result = await getContent(info,page, sort, searchTerm);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
      setTotalPages(result.data.totalPages);

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
          <div className="cursor-pointer" onClick={() => router.back()}>
            <BackButton />
          </div>
          <p className="text-xl2 font-semibold text-userblack font-sans">
            Guide Management -
            <span id="titleName" className="text-[#AE445A]"> Content uploaded</span>
          </p>
        </div>
        <div className="flex flex-row items-center gap-5">
          {/* <select className="py-[10px] px-3 border border-[#DCDBE1] rounded-lg text-sm font-sans font-normal text-userblack focus:outline-none">
            <option value="1">Feb 10 - Feb 16, 22</option>
          </select> */}
          <button onClick={handleExport} className="bg-white border border-[#DCDBE1] py-[10px] px-3 rounded-lg flex flex-row items-center gap-2">
            <Export />
            <p className="text-sm font-sans font-normal text-userblack">
              Export
            </p>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <SearchBar  name={"Type"}
          handleSort={sort}
          setHandleSort={setSort}
          setHandleFilter={""}
          handleSearch={handleSearch}
          showAddButton={false}
          showFilters={false} />
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
              {/* <span className="text-[#666576] font-sans font-normal text-sm"></span> */}
            </div>
          </div>
          {loading && (
            <div className="flex justify-center items-center bg-white">
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
                <div className=" grid grid-cols-contentUploadedTable justify-between border-b border-[#E9E9EC] items-center p-4">
                  <div className="flex flex-row items-center gap-4">
                    <img
                      src={item.thumbnail?.url || newImage.src}
                      alt="thumbnail"
                      className="w-11 h-11 rounded-md "
                    />
                    <p title={item.title} className="text-sm font-sans font-semibold text-[#252322]">
                      {truncateName(item.title)}
                    </p>
                  </div>
                  <span title={item.description} className="text-userblack w-[300px] font-sans font-semibold text-sm">
                    {truncateDescription(item.description) || "NA"}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm capitalize">
                    {item.category?.title || "Na"}
                  </span>
                  <span className="text-userblack font-sans  font-semibold text-sm capitalize">
                    {item.type}
                  </span>
                  <span className="text-userblack font-sans  font-semibold text-sm capitalize">
                    {item.accessibility}
                  </span>
                  {/* <span className="text-userblack font-sans  font-semibold text-sm">
                    <MenuDots />
                  </span> */}
                </div>
              </div>
            ))}
        </div>
        {data.length <= 0 ? (
          ""
        ) : (
          <RobinPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}{" "}
      </div>
    </div>
  );
}

export default Page;
