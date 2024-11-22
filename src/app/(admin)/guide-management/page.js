"use client";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import MenuDots from "../../../../icons/MenuDots";

import Pagination from "@/components/Pagination";
import GreyCross from "../../../../icons/GreyCross";
import TopRightArrow from "../../../../icons/TopRightArrow";
import Backspace from "../../../../icons/Backspace";
import Link from "next/link";
import { getToken } from "@/Services/Cookie/userCookie";
import dayjs from "dayjs";
import Loader from "@/components/Loader";
import Frame1 from "../../../../public/Frame1.png";
import LoaderLarge from "@/components/LoaderLarge";
import DeleteModal from "@/components/DeleteModal";
import { truncateName } from "@/Utilities/helper";
import RobinPagination from "@/components/Pagination";

function Page() {
  const [popupIndex, setPopupIndex] = useState(null);
  const [guideData, setGuideData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [guideToDelete, setGuideToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllGuideApi(currentPage);
  }, [refresh, currentPage]);
  const handleDelete = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,

      redirect: "follow",
    };
    setDeleteLoading(true);
    fetch(process.env.NEXT_PUBLIC_URL + `/guides/${id}`, requestOptions)
      // .then((response) => {
      //   console.log(response)
      //   response.json()
      // })

      .then((result) => {
        console.log(result);

        setDeleteLoading(false);
        setShowModal(false);
        setGuideToDelete(null);
        setRefresh((prev) => !prev);
      })
      .catch((error) => {
        console.error("error while deleting", error);
        setDeleteLoading(false);
      });
  };
  const token = getToken();
  const getAllGuideApi = (page) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setLoading(true);
    setGuideData([])
    fetch(
      process.env.NEXT_PUBLIC_URL + `/guides?page=${page}&limit=10`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.results);
        setGuideData(result.data.results);
        setTotalPages(result.data.totalPages);

        setLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  const confirmDelete = (id) => {
    setGuideToDelete(id);
    setShowModal(true);
    setPopupIndex(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setGuideToDelete(null);
  };

  const handleModalDelete = () => {
    setShowModal(false);
    if (guideToDelete) {
      handleDelete(guideToDelete);
    }
  };
  return (
    <>
      {showModal && (
        <DeleteModal onDelete={handleModalDelete} onClose={handleModalClose} />
      )}
      {deleteLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 z-50">
          <LoaderLarge />
        </div>
      )}
      <div className="flex flex-col gap-7">
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Guide Management
        </p>
        <div className="flex flex-col">
          <SearchBar />
          <div className="w-full overflow-x-scroll booking-table-wrapper  ">
            <div className="bg-[#F0F2F5] min-w-fit w-full ">
              <div className="items-center grid grid-cols-guideTable p-4 justify-between">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  User Id
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Guide Name
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Account Created
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm text-center">
                  Type
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm text-center">
                  Revenue
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm text-center">
                  Total bookings
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm"></span>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center bg-white items-center p-10 w-full ">
                <LoaderLarge />
              </div>
            )}
            <div className="flex flex-col bg-white min-w-fit w-full ">
              {guideData &&
                guideData.map((item, index) => {
                  return (
                    <div
                      key={item._id || index}
                      className=" grid grid-cols-guideTable border-b border-[#E9E9EC] items-center justify-between p-4 relative"
                    >
                      <span className="text-userblack text-base font-semibold font-sans">
                        {item._id}
                      </span>
                      <div className="flex flex-row items-center gap-2">
                        <img
                          className="w-8 h-8 object-cover rounded-full"
                          src={
                            item.profilePic ? item.profilePic.url : Frame1.src
                          }
                          alt=""
                        />
                        <div className="flex flex-col">
                          <p className="text-base font-semibold font-sans text-userblack">
                            {truncateName(item.firstName + " " + item.lastName)}
                          </p>
                          <p className="text-base font-sans font-normal text-[#666576]">
                            {item.phone}
                          </p>
                        </div>
                      </div>
                      <span className="text-base font-sans font-semibold text-userblack">
                        {dayjs(item.createdAt).format("MMM DD YYYY")}
                      </span>
                      <span className="text-base font-sans font-semibold text-userblack text-center">
                        {item.hasPremiumPlan?"Premium" :"Free"}
                      </span>
                      <span className="text-base font-sans font-semibold text-userblack text-center">
                        NA
                      </span>
                      <span className="text-base font-sans font-semibold text-userblack text-center">
                        {item.bookingsCount}
                      </span>
                      <button
                        onClick={() =>
                          setPopupIndex(popupIndex === index ? null : index)
                        }
                        className="text-base font-sans font-semibold text-userblack"
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
                          <Link
                            href={`/guide-management/guide-info/${item._id}`}
                          >
                            <div className="flex flex-row items-center gap-3">
                              <TopRightArrow />
                              <p className="text-sm font-sans font-normal text-[#753B5B]">
                                Open full view
                              </p>
                            </div>
                          </Link>

                          <div
                            onClick={() => confirmDelete(item._id)}
                            className="flex flex-row items-center gap-3"
                          >
                            <Backspace />
                            <p className="text-sm font-sans font-normal text-[#EE3E3E] cursor-pointer">
                              Remove
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
            <RobinPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Page;
