"use client";
import React, { useEffect, useState } from "react";
import Export from "../../../../icons/Export";
// import SearchBar from "@/components/SearchBar";
import MenuDots from "../../../../icons/MenuDots";
import StarRating from "../../../../icons/StarRating";
import Pagination from "@/components/Pagination";
import Block from "../../../../icons/Block";
import Link from "next/link";
import PushNotif from "../../../../icons/PushNotif";
import TopRightArrow from "../../../../icons/TopRightArrow";
import GreyCross from "../../../../icons/GreyCross";
import Backspace from "../../../../icons/Backspace";
import newImage from "../../../../public/newImage.png";
import { getChapters } from "@/Services/Api/CalmnessFeedback/GetCalmness";
import dayjs from "dayjs";
import LoaderLarge from "@/components/LoaderLarge";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";
import html2canvas from "html2canvas";

function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [filter, setFilter] = useState("");

  const handleClick = () => {
    setShowPopUp(!showPopUp);
  };
  const handleSearch = (term) => {
    setSearchTerm(term);

    setCurrentPage(1);
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
  const showModalHandler = () => {
    setShowModal(false);
  };
  const fetchData = async (page) => {
    setLoading(true);
    setData([]);
    const result = await getChapters(page, sort, searchTerm, filter);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
      setTotalPages(result.data.totalPages);
    } else {
      console.log(result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, sort, searchTerm, filter]);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between items-center">
        <p
          id="titleName"
          className="text-xl2 font-semibold text-userblack font-sans"
        >
          Calmness Feedback
        </p>
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
      <div className="flex flex-col">
        {/* <SearchBar /> */}
        <SearchBar
          filterArray={[
            { value: "audio", label: "Audio" },
            { value: "video", label: "Video" },
            { value: "", label: "All" },
          ]}
          name={"Type"}
          setHandleFilter={setFilter}
          handleSort={sort}
          setHandleSort={setSort}
          handleSearch={handleSearch}
          showAddButton={false}
        />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-calmnessTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Content
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Category
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Created by
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Avg. Rating
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
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
                <div
                  key={item._id || index}
                  className=" grid grid-cols-calmnessTable justify-between border-b border-[#E9E9EC] items-center p-4 relative"
                >
                  <div className="text-[#252322] font-sans font-semibold text-base flex flex-row items-center gap-2">
                    <img
                      src={item.thumbnail?.url || "/newImage.png"}
                      alt="calmness image"
                      className="w-11 h-11 rounded-md"
                    />
                    <p>{item.title} </p>
                  </div>
                  <span className="text-userblack font-sans font-semibold text-sm">
                    {item.category?.title || "Na"}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm">
                    {item.creatorRole === "Admin"
                      ? "Admin"
                      : item.creator?.firstName + " " + item.creator?.lastName}
                    {/* {item.creator?.firstName
                      ? `${item.creator.firstName}${
                          item.creator?.lastName
                            ? " " + item.creator.lastName
                            : ""
                        }`
                      : item.creatorRole} */}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm capitalize">
                    {item.type}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm">
                    {dayjs(item.createdAt).format("DD/MM/YYYY")}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm flex flex-row items-center gap-2">
                    <StarRating />
                    <p>{item.ratingsAverage}</p>
                  </span>

                  {/* <button
                    onClick={handleClick}
                    className="text-[#08A03C] font-sans font-semibold text-sm"
                  >
                    <MenuDots />
                  </button> */}
                </div>
              ))}
          </div>
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
