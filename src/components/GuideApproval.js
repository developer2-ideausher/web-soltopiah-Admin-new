import React, { useEffect, useState } from "react";
import SearchBar from "./AddSearchBar";
import LoaderLarge from "./LoaderLarge";
import RobinPagination from "./Pagination";
import { toast } from "react-toastify";
import { getGuideRequests } from "@/Services/Api/Guide/GuideApi";
import { truncateName } from "@/Utilities/helper";
import dayjs from "dayjs";
import MenuDots from "../../icons/MenuDots";
import GreyCross from "../../icons/GreyCross";
import TopRightArrow from "../../icons/TopRightArrow";
import Link from "next/link";
import Frame1 from "../../public/Frame1.png";

const GuideApproval = () => {
  const [loading, setLoading] = useState(false);
  const [guideData, setGuideData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [popupIndex, setPopupIndex] = useState(null);
  const [filter, setFilter] = useState("");
  const fetchData = async (
    page,
    search = "",
    sort = "desc",
    filterValue = ""
  ) => {
    try {
      setLoading(true);
      setGuideData(null);
      const result = await getGuideRequests(
        page,
        filterValue,
        10,
        search,
        sort
      );
      if (result.data) {
        setGuideData(result.data.results);
        setTotalPages(result.data.totalPages);
      }
    } catch (error) {
      toast.error(error.message || "Error occured, please try again");
    }
    setLoading(false);
  };
  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };
  const handleSort = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData(1, searchTerm, sortOrder, filter);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    fetchData(currentPage, searchTerm, sortOrder, filter);
  }, [sortOrder, filter]);

  useEffect(() => {
    fetchData(currentPage, searchTerm, sortOrder, filter);
  }, [currentPage]);

  return (
    <div className="flex flex-col">
      <SearchBar
        filterArray={[
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
          { value: "", label: "All" },
        ]}
        name={"status"}
        showFilters={true}
        handleSort={handleSort}
        setHandleSort={setSortOrder}
        setHandleFilter={handleFilterChange}
        handleSearch={handleSearch}
        showAddButton={false}
      />
      <div className="w-full overflow-x-scroll booking-table-wrapper  ">
        <div className="bg-[#F0F2F5] min-w-fit w-full ">
          <div className="items-center grid grid-cols-guideTable1 p-4 justify-between">
            <span className="text-[#666576] font-sans font-normal text-sm">
              Request Id
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm">
              Guide Name
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm">
              Specialization
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm">
              Years of Experience
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm text-center">
              Date Created
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm text-center ml-2">
              Status
            </span>

            <span className="text-[#666576] font-sans font-normal text-sm"></span>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center bg-white items-center p-10 w-full ">
            <LoaderLarge />
          </div>
        )}
        {!loading && guideData && guideData.length === 0 && (
          <div className="flex justify-center items-center bg-white p-10 w-full">
            {searchTerm ? (
              <p className="text-gray-500 text-sm font-sans">
                No data found
                {searchTerm && ` for "${searchTerm}"`}
                {filter && ` with status "${filter}"`}
              </p>
            ) : (
              <p className="text-gray-500 text-sm font-sans">No data found.</p>
            )}
          </div>
        )}
        <div
          className={`flex flex-col bg-white min-w-fit w-full ${
            popupIndex !== null ? "pb-4" : ""
          }`}
        >
          <>
            {guideData &&
              guideData.map((item, index) => {
                return (
                  <div
                    key={item._id || index}
                    className=" grid grid-cols-guideTable1 border-b border-[#E9E9EC] items-center justify-between p-4 relative"
                  >
                    <span className="text-userblack text-base font-semibold font-sans">
                      {item._id}
                    </span>
                    <div className="flex flex-row items-center gap-2">
                      <img
                        className="w-8 h-8 object-cover rounded-full"
                        src={item.profilePic ? item.profilePic.url : Frame1.src}
                        alt=""
                      />
                      <div className="flex flex-col">
                        <p
                          title={item.firstName}
                          className="text-base font-semibold font-sans text-userblack truncate"
                        >
                          {truncateName(item.firstName + " " + item.lastName)}
                        </p>
                        <p className="text-base font-sans font-normal text-[#666576]">
                          {item.phone}
                        </p>
                      </div>
                    </div>
                    <span className="text-base font-sans font-semibold text-userblack">
                      {item?.specializedCategories?.length
                        ? item.specializedCategories
                            .map((category) => category?.title)
                            .filter(Boolean)
                            .join(", ")
                        : "--"}
                    </span>

                    <span className="text-base font-sans font-semibold text-userblack text-center">
                      {item.experienceYears}
                    </span>
                    <span className="text-base font-sans font-semibold text-userblack text-center">
                      {dayjs(item.createdAt).format("DD/MM/YYYY")}
                    </span>
                    <span
                      className={`text-base font-sans font-semibold  rounded-full border p-1 text-center ml-2  ${
                        item?.onboarding?.status === "approved"
                          ? "border-green-500 bg-green-100 text-green-500 "
                          : "border-red-500 bg-red-100 text-red-500"
                      }`}
                    >
                      {item?.onboarding?.status}
                    </span>
                    <button
                      onClick={() =>
                        setPopupIndex(popupIndex === index ? null : index)
                      }
                      className="text-base font-sans font-semibold text-userblack flex justify-end"
                    >
                      <MenuDots />
                    </button>
                    {popupIndex === index && (
                      <div className="bg-[#FDF8F9] border-[#D7A1AC] border p-3 rounded-xl myPopup shadow-lg w-[166px]  absolute right-12 top-8 flex flex-col gap-3  z-50">
                        <div className="flex flex-row items-center justify-between">
                          <p className="text-sm font-sans font-normal text-userblack">
                            Action
                          </p>
                          <button onClick={() => setPopupIndex(null)}>
                            <GreyCross />
                          </button>
                        </div>
                        <Link href={`/guide-management/requests/${item._id}`}>
                          <div className="flex flex-row items-center gap-3">
                            <TopRightArrow />
                            <p className="text-sm font-sans font-normal text-[#753B5B]">
                              Open full view
                            </p>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
          </>
        </div>
      </div>
      {guideData && totalPages && totalPages > 1 ? (
        <RobinPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </div>
  );
};

export default GuideApproval;
